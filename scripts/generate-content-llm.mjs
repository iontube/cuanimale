/**
 * Generates unique article content using Gemini 2.5 Flash API.
 * Reads existing JSON data, sends titles + breed traits to Gemini,
 * and updates JSON files with unique content.
 *
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { BREED_TRAITS } from './breed-traits.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');

import { callGemini } from '/Users/luc/Directoare/shared-gemini.mjs';
const BATCH_SIZE = 5; // questions per request - lower = higher quality
const CONCURRENCY = 1; // parallel requests
const SAVE_EVERY = 100; // save progress every N articles
const ANIMALS = ['caini', 'pisici', 'rozatoare', 'pasari', 'exotice'];

// ═══════════════════════════════════════════════════════════════
// GEMINI API CALL
// ═══════════════════════════════════════════════════════════════

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ═══════════════════════════════════════════════════════════════
// PROMPT BUILDER
// ═══════════════════════════════════════════════════════════════

function buildPrompt(batch) {
  const questions = batch.map((q, i) => {
    let context = '';
    if (q.rpiasaTraits) {
      const t = q.rpiasaTraits;
      context = `Rasă: ${t.nume}. Temperament: ${t.temperament}. Greutate: ${t.greutate || '?'}. Durată viață: ${t.durata_viata || '?'}. Energie: ${t.energie || '?'}. Probleme sănătate: ${(t.probleme_sanatate || []).join(', ')}. Blană: ${t.blana || '?'}. Dresabilitate: ${t.dresabilitate || '?'}. Exercițiu: ${t.exercitiu_zilnic || '?'}. Particularități relevante: ${t['particularitati_' + q.subcategorie] || 'nu sunt specificate'}.`;
    }
    return `${i + 1}. Titlu: "${q.titlu}"${context ? `\n   Context rasă: ${context}` : ''}`;
  }).join('\n');

  return `Ești un medic veterinar cu 20 de ani de experiență. Scrii răspunsuri pentru un site românesc despre animale de companie. Oamenii ajung pe aceste pagini din Google, căutând exact aceste întrebări.

REGULI:
- Prima propoziție din intro RĂSPUNDE DIRECT la întrebare. Fără ocolișuri. Dacă cineva întreabă "De ce latră câinele noaptea?" primul lucru pe care îl citește e răspunsul concret.
- Scrie ca un om real, nu ca un AI. ZERO fraze de genul: "este important de menționat", "în concluzie", "haideți să", "nu în ultimul rând", "trebuie subliniat", "un aspect esențial", "merită menționat".
- Fiecare articol trebuie să fie COMPLET DIFERIT ca informație, nu doar reformulat.
- Dacă e despre o rasă specifică, scrie DOAR informații reale despre acea rasă (greutate, temperament, predispoziții, nevoi specifice). Nu informații generice care se aplică la orice câine.
- Informații practice pe care cititorul le poate aplica imediat.
- Conținutul trebuie să fie suficient de bun încât Google sau un chatbot AI să-l citeze ca sursă de referință.
- 250-400 cuvinte per articol.
- Limba română naturală, conversațională dar informată.

Scrie articole pentru aceste ${batch.length} întrebări:
${questions}

Format JSON strict - array de obiecte, câte unul per întrebare, în aceeași ordine:
[
  {
    "intro": "2-3 propoziții. Prima propoziție = răspunsul direct. A doua = context scurt.",
    "sectiuni": [
      {
        "titlu": "Titlu secțiune descriptiv",
        "tip": "lista",
        "items": [
          {"titlu": "Nume cauză/pas", "text": "Explicație detaliată, specifică, cu date concrete unde e posibil"},
          {"text": "Alt punct fără subtitlu dacă nu e nevoie"}
        ]
      }
    ],
    "concluzie": "O propoziție practică finală, fără clișee, care oferă un sfat concret aplicabil"
  }
]

Tip secțiune: "lista" sau "pasi". Fiecare articol: 2-3 secțiuni, 3-5 items per secțiune.`;
}

// ═══════════════════════════════════════════════════════════════
// PROGRESS TRACKING
// ═══════════════════════════════════════════════════════════════

function getProgressFile(animalSlug) {
  return resolve(dataDir, `progress-${animalSlug}.json`);
}

function loadProgress(animalSlug) {
  const file = getProgressFile(animalSlug);
  if (existsSync(file)) {
    return new Set(JSON.parse(readFileSync(file, 'utf-8')));
  }
  return new Set();
}

function saveProgress(animalSlug, doneSlugs) {
  writeFileSync(getProgressFile(animalSlug), JSON.stringify([...doneSlugs]));
}

// ═══════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════

async function processAnimal(animalSlug) {
  const file = resolve(dataDir, `intrebari-${animalSlug}.json`);
  const intrebari = JSON.parse(readFileSync(file, 'utf-8'));
  const doneSlugs = loadProgress(animalSlug);

  // Index for fast lookup
  const slugToIdx = new Map();
  intrebari.forEach((q, i) => slugToIdx.set(q.slug, i));

  // Filter out already processed
  // Skip articles that already have Gemini content (intro > 80 chars and not a template)
  const hasGeminiContent = (q) => q.intro && q.intro.length > 80 && !q.intro.includes('Mai jos găsești') && !q.intro.includes('Placeholder');
  // Mark existing Gemini content as done
  intrebari.forEach(q => { if (hasGeminiContent(q)) doneSlugs.add(q.slug); });
  const todo = intrebari.filter(q => !doneSlugs.has(q.slug));
  console.log(`\n${animalSlug}: ${todo.length} de procesat (${doneSlugs.size} deja făcute)`);

  if (todo.length === 0) return;

  // Split into batches
  const batches = [];
  for (let i = 0; i < todo.length; i += BATCH_SIZE) {
    batches.push(todo.slice(i, i + BATCH_SIZE));
  }

  let batchIdx = 0;
  let lastSaveCount = doneSlugs.size;
  const startTime = Date.now();

  // Process batches with concurrency
  async function processBatch(batch) {
    const batchWithTraits = batch.map(q => ({
      titlu: q.titlu,
      subcategorie: q.subcategorieSlug,
      rpiasaTraits: q.rasa ? BREED_TRAITS[animalSlug]?.[findBreedSlug(animalSlug, q.rasa)] : null,
    }));

    const result = await callGemini(buildPrompt(batchWithTraits));

    if (result && Array.isArray(result)) {
      const count = Math.min(result.length, batch.length);
      for (let j = 0; j < count; j++) {
        const q = batch[j];
        const content = result[j];
        if (content && content.intro && content.sectiuni) {
          const idx = slugToIdx.get(q.slug);
          if (idx !== undefined) {
            intrebari[idx].intro = content.intro;
            intrebari[idx].sectiuni = content.sectiuni;
            intrebari[idx].concluzie = content.concluzie || intrebari[idx].concluzie;
            intrebari[idx].metaDescription = content.intro.substring(0, 155).replace(/\.\s*$/, '') + '.';
          }
          doneSlugs.add(q.slug);
        }
      }
    }
  }

  // Run CONCURRENCY batches at a time
  for (let i = 0; i < batches.length; i += CONCURRENCY) {
    const chunk = batches.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(b => processBatch(b)));

    // Progress
    const done = doneSlugs.size;
    const total = intrebari.length;
    const pct = ((done / total) * 100).toFixed(1);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    const rate = ((done - lastSaveCount + (doneSlugs.size - lastSaveCount)) / Math.max(1, elapsed) * 60).toFixed(0);
    const articlesPerSec = ((done - (intrebari.length - todo.length)) / Math.max(1, elapsed)).toFixed(1);
    const remaining = ((todo.length - (done - (intrebari.length - todo.length))) / Math.max(0.1, parseFloat(articlesPerSec))).toFixed(0);
    process.stdout.write(`\r  ${animalSlug}: ${done}/${total} (${pct}%) | ${elapsed}s elapsed | ~${articlesPerSec} art/s | ~${Math.ceil(remaining/60)}min left    `);

    // Save periodically
    if (done - lastSaveCount >= SAVE_EVERY) {
      saveProgress(animalSlug, doneSlugs);
      writeFileSync(file, JSON.stringify(intrebari, null, 2));
      lastSaveCount = done;
    }
  }

  // Final save
  saveProgress(animalSlug, doneSlugs);
  writeFileSync(file, JSON.stringify(intrebari, null, 2));
  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  console.log(`\n  ${animalSlug}: DONE - ${doneSlugs.size}/${intrebari.length} articole in ${totalTime} min`);
}

function findBreedSlug(animalSlug, rasaNume) {
  const traits = BREED_TRAITS[animalSlug];
  if (!traits) return null;
  for (const [slug, data] of Object.entries(traits)) {
    if (data.nume === rasaNume) return slug;
  }
  return null;
}

async function main() {
  console.log('=== Generare conținut cu Gemini 2.5 Flash ===');
  console.log(`Batch size: ${BATCH_SIZE}, Concurrency: ${CONCURRENCY}\n`);

  // Allow processing specific animal or all
  const targetAnimal = process.argv[2];
  const animals = targetAnimal ? [targetAnimal] : ANIMALS;

  for (const animal of animals) {
    await processAnimal(animal);
  }

  // Cleanup progress files
  for (const animal of animals) {
    const pf = getProgressFile(animal);
    if (existsSync(pf)) {
      const { unlinkSync } = await import('fs');
      unlinkSync(pf);
    }
  }

  console.log('\n=== DONE ===');
}

main().catch(console.error);
