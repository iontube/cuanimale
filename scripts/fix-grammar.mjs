#!/usr/bin/env node
/**
 * Fix grammatical errors in rozatoare/pasari/exotice titles.
 * Adds proper Romanian articles (un/o) before species names
 * and lowercases them where appropriate.
 * Updates both titlu and slug, preserving all content.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');

// Species with their grammatical gender and singular form
const speciesInfo = {
  // rozatoare
  'Hamster':           { gen: 'm', singular: 'hamster' },
  'Iepure':            { gen: 'm', singular: 'iepure' },
  'Cobai':             { gen: 'm', singular: 'cobai' },
  'Chinchilla':        { gen: 'f', singular: 'chinchilla' },
  'Degu':              { gen: 'm', singular: 'degu' },
  'Gerbil':            { gen: 'm', singular: 'gerbil' },
  'Șoricei':           { gen: 'm', singular: 'șoricel' },
  'Rat de companie':   { gen: 'm', singular: 'rat de companie' },
  'Sugar Glider':      { gen: 'm', singular: 'sugar glider' },
  'Veveriță':          { gen: 'f', singular: 'veveriță' },
  // pasari
  'Papagal':           { gen: 'm', singular: 'papagal' },
  'Peruș':             { gen: 'm', singular: 'peruș' },
  'Nimfă':             { gen: 'f', singular: 'nimfă' },
  'Canar':             { gen: 'm', singular: 'canar' },
  'Agapornis':         { gen: 'm', singular: 'agapornis' },
  'Cacadu':            { gen: 'm', singular: 'cacadu' },
  'Ara':               { gen: 'm', singular: 'ara' },
  'Porumbel':          { gen: 'm', singular: 'porumbel' },
  'Prepeliță':         { gen: 'f', singular: 'prepeliță' },
  'Găină':             { gen: 'f', singular: 'găină' },
  'Rață':              { gen: 'f', singular: 'rață' },
  'Curcan':            { gen: 'm', singular: 'curcan' },
  // exotice
  'Broască țestoasă':  { gen: 'f', singular: 'broască țestoasă' },
  'Iguană':            { gen: 'f', singular: 'iguană' },
  'Șarpe':             { gen: 'm', singular: 'șarpe' },
  'Cameleon':          { gen: 'm', singular: 'cameleon' },
  'Gecko':             { gen: 'm', singular: 'gecko' },
  'Axolotl':           { gen: 'm', singular: 'axolotl' },
  'Pești de acvariu':  { gen: 'm', singular: 'pește de acvariu' },
  'Tarantulă':         { gen: 'f', singular: 'tarantulă' },
  'Hermit Crab':       { gen: 'm', singular: 'hermit crab' },
  'Scorpion':          { gen: 'm', singular: 'scorpion' },
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ț/g, 't').replace(/Ț/g, 't')
    .replace(/ș/g, 's').replace(/Ș/g, 's')
    .replace(/ă/g, 'a').replace(/Ă/g, 'a')
    .replace(/â/g, 'a').replace(/Â/g, 'a')
    .replace(/î/g, 'i').replace(/Î/g, 'i')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/--+/g, '-');
}

function fixTitle(titlu, rasa) {
  const info = speciesInfo[rasa];
  if (!info) return { titlu, changed: false };

  const articol = info.gen === 'f' ? 'o' : 'un';
  const numeArticulat = `${articol} ${info.singular}`;

  // Replace the bare species name with the articulated form
  // The species name appears in the title without an article
  let newTitlu = titlu;

  // Direct replacement: species name as-is in the title
  if (titlu.includes(rasa)) {
    newTitlu = titlu.replace(rasa, numeArticulat);
  }

  if (newTitlu === titlu) return { titlu, changed: false };
  return { titlu: newTitlu, changed: true };
}

const files = ['intrebari-rozatoare.json', 'intrebari-pasari.json', 'intrebari-exotice.json'];

let totalFixed = 0;

for (const file of files) {
  const filePath = join(dataDir, file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  let fileFixed = 0;
  const slugMap = new Set(data.map(d => d.slug));

  for (const item of data) {
    if (!item.rasa) continue;

    const result = fixTitle(item.titlu, item.rasa);
    if (result.changed) {
      const newSlug = slugify(result.titlu);

      item.titlu = result.titlu;
      item.slug = newSlug;
      fileFixed++;
    }
  }

  // Check for duplicate slugs after fix
  const newSlugs = new Map();
  for (const item of data) {
    if (newSlugs.has(item.slug)) {
      console.warn(`  DUPLICATE SLUG: ${item.slug} in ${file}`);
    }
    newSlugs.set(item.slug, true);
  }

  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`${file}: fixed ${fileFixed} titles`);
  totalFixed += fileFixed;
}

console.log(`\nTotal fixed: ${totalFixed} titles`);

// Show some examples
for (const file of files) {
  const filePath = join(dataDir, file);
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));
  console.log(`\nSample from ${file}:`);
  for (const item of data.slice(0, 3)) {
    console.log(`  ${item.titlu} → /${item.animalSlug}/${item.subcategorieSlug}/${item.slug}/`);
  }
}
