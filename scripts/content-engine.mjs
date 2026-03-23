/**
 * Content engine: generates unique article content per page
 * by combining breed traits, question-specific data, context and age modifiers.
 *
 * Imported by generate-data.mjs
 */
import { BREED_TRAITS } from './breed-traits.mjs';

// ═══════════════════════════════════════════════════════════════
// CONTEXT LABELS (for context variations)
// ═══════════════════════════════════════════════════════════════
const CONTEXT_LABELS = {
  'noaptea': 'în timpul nopții',
  'la-straini': 'la persoane necunoscute',
  'cand-pleci': 'când stăpânul pleacă de acasă',
  'la-alti-caini': 'la alți câini',
  'fara-motiv': 'aparent fără motiv',
  'la-usa': 'la ușă',
  'la-pisici': 'la pisici',
  'la-masini': 'la mașini',
  'obiectele': 'obiectele din casă',
  'mainile': 'mâinile stăpânului',
  'pantofii': 'pantofii',
  'copiii': 'copiii',
  'mobila': 'mobila',
  'lesa': 'lesa',
  'cand-e-singur': 'când rămâne singur',
  'la-sirene': 'la sirene',
  'la-muzica': 'la muzică',
  'cand-doarme': 'în somn',
  'dupa-baie': 'după baie',
  'sub-pat': 'sub pat',
  'cand-tuna': 'când tună',
  'de-straini': 'de străini',
  'in-curte': 'în curte',
  'in-pat': 'în pat',
  'la-mancare': 'la mâncare',
  'pe-labe': 'pe labe',
  'pe-nas': 'pe nas',
  'pe-stapan': 'pe stăpân',
  'excesiv': 'excesiv',
  'incet': 'încet',
  'repede': 'repede',
  'de-acasa': 'de acasă',
  'de-stapan': 'de stăpân',
  'la-plimbare': 'la plimbare',
  'de-mobila': 'de mobilă',
  'de-pamant': 'de pământ',
  'de-tine': 'de tine',
  'la-urechi': 'la urechi',
  'pe-burta': 'pe burtă',
  'hrana-uscata': 'hrana uscată',
  'de-2-zile': 'de 2 zile',
  'dar-bea-apa': 'dar bea apă',
  'cand-sta': 'când stă',
  'cu-alti-caini': 'cu alți câini',
  'cu-strainii': 'cu străinii',
  'cu-copiii': 'cu copiii',
  'pe-spate': 'pe spate',
  'in-iarba': 'în iarbă',
  'in-noroi': 'în noroi',
  'cand-il-atingi': 'când îl atingi',
  'cand-o-mangai': 'când o mângâi',
  'tare': 'tare',
  'mult': 'mult',
  'si-musca': 'și mușcă',
  'la-usa': 'la ușă',
  'cand-mananca': 'când mănâncă',
  'canapeaua': 'canapeaua',
  'peretii': 'pereții',
  'picioarele': 'picioarele',
  'usor': 'ușor',
  'in-dulap': 'în dulap',
  'de-vizitatori': 'de vizitatori',
  'patura': 'pătura',
  'perna': 'perna',
  'pe-tine': 'pe tine',
  'pe-pat': 'pe pat',
  'pe-haine': 'pe haine',
  'langa-litiera': 'lângă litieră',
  'hrana-noua': 'hrana nouă',
  'la-perete': 'la perete',
  'in-gol': 'în gol',
  'la-tine': 'la tine',
  'la-alti-pisici': 'la alți pisici',
  'la-caini': 'la câini',
  'cu-alte-pisici': 'cu alte pisici',
  'cu-caini': 'cu câini',
  'cu-copii': 'cu copii',
  'cu-oameni': 'cu oameni',
  'cu-sange': 'cu sânge',
  'dupa-mancare': 'după mâncare',
  'bila-galbena': 'bilă galbenă',
  'spuma-alba': 'spumă albă',
  'dimineata': 'dimineața',
  'ca-si-cum-se-ineaca': 'ca și cum s-ar îneca',
  'dupa-apa': 'după apă',
  'pe-pete': 'pe pete',
  'fara-purici': 'fără purici',
  'la-piciorul-din-fata': 'la piciorul din față',
  'la-piciorul-din-spate': 'la piciorul din spate',
  'in-casa': 'în casă',
  'des': 'des',
  'intern': 'intern',
  'extern': 'extern',
  'de-mai-multe-zile': 'de mai multe zile',
  'cu-scurgeri': 'cu scurgeri nazale',
  'ghemotoace-de-par': 'ghemotoace de păr',
  'crude': 'crude',
  'fierte': 'fierte',
  'de-pui': 'de pui',
  'de-porc': 'de porc',
  'de-vita': 'de vită',
  'crud': 'crud',
  'fiert': 'fiert',
  'din-conserva': 'din conservă',
  'cruzi': 'cruzi',
  'fierti': 'fierți',
  'gratiile': 'gratiile',
  'tot': 'tot ce prinde',
  'lemnul': 'lemnul',
  'cand-il-ridici': 'când îl ridici',
  'in-cusca': 'în cușcă',
  'in-adapost': 'în adăpost',
  'de-cateva-zile': 'de câteva zile',
  'seminte': 'semințele',
  'fructe': 'fructele',
  'inainte-sa-se-culce': 'înainte să se culce',
  'dupa-coada': 'după coadă',
};

// ═══════════════════════════════════════════════════════════════
// MAIN CONTENT GENERATOR
// ═══════════════════════════════════════════════════════════════

/**
 * Generate unique content for an article.
 * Returns { intro, sectiuni, concluzie }
 */
export function generateUniqueContent(params) {
  const { titlu, animalSlug, subcatSlug, questionStem, rasaSlug, rasaNume, context, ageSuffix } = params;

  // Get breed/species traits
  const traits = rasaSlug ? BREED_TRAITS[animalSlug]?.[rasaSlug] : null;
  const contextLabel = context ? (CONTEXT_LABELS[context] || context.replace(/-/g, ' ')) : null;
  const subject = rasaNume || getAnimalGenericName(animalSlug);
  const isYoung = ageSuffix === 'pui';
  const isOld = ageSuffix === 'batran';

  // Generate intro
  const intro = generateIntro({ titlu, subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug });

  // Generate sections
  const sectiuni = generateSections({ subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug, rasaNume });

  // Generate conclusion
  const concluzie = generateConclusion({ subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug });

  return { intro, sectiuni, concluzie };
}

function getAnimalGenericName(slug) {
  const names = { caini: 'câinele', pisici: 'pisica', rozatoare: 'rozătoarea', pasari: 'pasărea', exotice: 'animalul' };
  return names[slug] || 'animalul';
}

// ═══════════════════════════════════════════════════════════════
// INTRO GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateIntro({ titlu, subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug }) {
  const parts = [];

  // First sentence: restate the question with breed-specific context
  if (traits) {
    const traitIntro = getTraitBasedIntro(traits, subcatSlug, questionStem, contextLabel, isYoung, isOld, animalSlug);
    if (traitIntro) {
      parts.push(traitIntro);
    } else {
      parts.push(titlu);
    }
  } else {
    parts.push(titlu);
  }

  // Second sentence: context/age specific
  if (contextLabel && !parts[0].includes(contextLabel)) {
    parts.push(getContextSentence(contextLabel, subcatSlug, subject));
  }

  if (isYoung) {
    parts.push(`La puii tineri, acest aspect e diferit față de adulți din cauza dezvoltării incomplete.`);
  } else if (isOld) {
    parts.push(`La exemplarele în vârstă, situația se poate complica din cauza îmbătrânirii naturale.`);
  }

  // Third sentence: what the article covers
  if (subcatSlug === 'comportament') {
    parts.push('Mai jos găsești cauzele cele mai frecvente și ce poți face concret.');
  } else if (subcatSlug === 'hrana') {
    parts.push('Răspunsul depinde de mai mulți factori pe care îi detaliez mai jos.');
  } else if (subcatSlug === 'sanatate') {
    parts.push('Cauzele pot varia, iar unele necesită atenție veterinară imediată.');
  } else if (subcatSlug === 'ingrijire') {
    parts.push('Procedura corectă face diferența, iar mai jos o detaliez pas cu pas.');
  } else if (subcatSlug === 'dresaj') {
    parts.push('Metoda potrivită depinde de temperament și vârstă. Iată ce funcționează.');
  }

  return parts.join(' ');
}

function getTraitBasedIntro(traits, subcatSlug, stem, contextLabel, isYoung, isOld, animalSlug) {
  const name = traits.nume;

  if (subcatSlug === 'comportament') {
    if (stem.includes('latra') || stem.includes('urla')) {
      if (traits.paza) return `${name} este un câine de pază prin natură, iar lătratul face parte din instinctul lui de protecție a teritoriului.`;
      if (traits.energie === 'ridicata') return `${name} este o rasă cu energie ridicată (${traits.temperament}), iar lipsa de activitate poate duce la lătrat excesiv.`;
      return `${name} nu este o rasă cunoscută pentru lătrat excesiv, dar anumite situații pot declanșa acest comportament.`;
    }
    if (stem.includes('musca')) {
      if (animalSlug === 'caini' && traits.dresabilitate?.includes('dificil')) return `${name} poate fi mai dificil de corectat când vine vorba de mușcături, din cauza temperamentului independent.`;
      return `${name} (${traits.temperament}) poate mușca din mai multe motive, iar înțelegerea cauzei e primul pas.`;
    }
    if (stem.includes('agresiv')) {
      if (traits.paza) return `${name} a fost selecționat pentru pază, ceea ce înseamnă că instinctul protector poate fi interpretat greșit ca agresivitate.`;
      return `${name} nu este o rasă agresivă prin definiție, dar orice câine poate deveni reactiv în anumite condiții.`;
    }
    return `${name} (${traits.temperament}) are un comportament influențat atât de genetica rasei, cât și de modul în care este crescut.`;
  }

  if (subcatSlug === 'hrana') {
    if (stem.includes('ce-mananca') || stem.includes('cat-mananca')) {
      if (traits.particularitati_hrana) return `${name} are nevoi alimentare specifice: ${traits.particularitati_hrana.split('.')[0].toLowerCase()}.`;
      return `Dieta potrivită pentru ${name} trebuie adaptată taliei (${traits.greutate || 'variabilă'}) și nivelului de energie (${traits.energie || 'normal'}).`;
    }
    if (stem.includes('poate-manca')) return `Nu toate alimentele umane sunt sigure pentru ${name}. Sensibilitățile pot varia în funcție de rasă.`;
    return `Alimentația corectă pentru ${name} (${traits.greutate || ''}) influențează direct sănătatea și longevitatea.`;
  }

  if (subcatSlug === 'sanatate') {
    const healthIssues = traits.probleme_sanatate?.slice(0, 2).join(' și ') || 'diverse afecțiuni';
    if (stem.includes('vomita') || stem.includes('diaree')) return `${name} poate prezenta acest simptom din cauze variate. Ca rasă, este predispus la ${healthIssues}, ceea ce poate fi un factor.`;
    if (stem.includes('cade-parul') || stem.includes('naparleste')) return `${name} are blana ${traits.blana || 'specifică rasei'}, cu năpârlire ${traits.naparlire || 'moderată'}. Pierderea excesivă de păr poate semnala o problemă.`;
    if (traits.particularitati_sanatate) return `${name} are predispoziții genetice specifice: ${traits.particularitati_sanatate.split('.')[0].toLowerCase()}.`;
    return `${name} trăiește în medie ${traits.durata_viata || '10-15 ani'}, iar prevenția e cheia unei vieți sănătoase.`;
  }

  if (subcatSlug === 'ingrijire') {
    if (traits.particularitati_ingrijire) return `${name} necesită o rutină de îngrijire adaptată: ${traits.particularitati_ingrijire.split('.')[0].toLowerCase()}.`;
    if (stem.includes('speli') || stem.includes('baie')) return `${name} (blana ${traits.blana || 'specifică'}) nu trebuie spălat prea des. Frecvența depinde de tipul de blană și activitatea zilnică.`;
    return `Îngrijirea corectă a rasei ${name} ține cont de blana ${traits.blana || 'specifică'} și necesarul de exercițiu de ${traits.exercitiu_zilnic || '30-60 minute'} pe zi.`;
  }

  if (subcatSlug === 'dresaj') {
    if (traits.particularitati_dresaj) return `${name} are o dresabilitate ${traits.dresabilitate || 'moderată'}. ${traits.particularitati_dresaj.split('.')[0]}.`;
    if (traits.dresabilitate === 'foarte ușor' || traits.dresabilitate === 'usor') return `${name} este o rasă ușor de dresat, receptivă la recompense și consistență.`;
    if (traits.dresabilitate === 'dificil') return `${name} este o rasă independentă care necesită răbdare și experiență în dresaj. Metodele standard nu funcționează întotdeauna.`;
    return `Dresabilitatea rasei ${name} (${traits.dresabilitate || 'moderată'}) influențează abordarea potrivită.`;
  }

  return null;
}

function getContextSentence(contextLabel, subcatSlug, subject) {
  if (subcatSlug === 'comportament') return `Când acest lucru se întâmplă ${contextLabel}, cauzele se restrâng la câteva variante specifice.`;
  if (subcatSlug === 'sanatate') return `Apariția acestui simptom ${contextLabel} poate indica cauze specifice.`;
  return `Situația ${contextLabel} are particularități care merită atenție separată.`;
}

// ═══════════════════════════════════════════════════════════════
// SECTION GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateSections({ subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug, rasaNume }) {
  if (subcatSlug === 'comportament') return genComportamentSections(subject, traits, contextLabel, questionStem, isYoung, isOld, animalSlug);
  if (subcatSlug === 'hrana') return genHranaSections(subject, traits, contextLabel, questionStem, isYoung, isOld, animalSlug);
  if (subcatSlug === 'sanatate') return genSanatateSections(subject, traits, contextLabel, questionStem, isYoung, isOld, animalSlug);
  if (subcatSlug === 'ingrijire') return genIngrijireSections(subject, traits, contextLabel, questionStem, isYoung, isOld, animalSlug);
  if (subcatSlug === 'dresaj') return genDresajSections(subject, traits, contextLabel, questionStem, isYoung, isOld, animalSlug);
  return [];
}

function genComportamentSections(subject, traits, ctx, stem, isYoung, isOld, animalSlug) {
  const items1 = [];
  const items2 = [];

  // Breed-specific causes
  if (traits) {
    if (traits.energie === 'ridicata') items1.push({ titlu: 'Energie neeliberată', text: `${traits.nume} are nevoie de ${traits.exercitiu_zilnic || 'mult exercițiu'} pe zi. Fără mișcare suficientă, energia se transformă în comportamente nedorite.` });
    if (traits.energie === 'scazuta') items1.push({ titlu: 'Disconfort', text: `${traits.nume} fiind o rasă calmă (${traits.temperament}), acest comportament neobișnuit poate indica disconfort fizic sau emoțional.` });
    if (traits.paza) items1.push({ titlu: 'Instinct de pază', text: `${traits.nume} a fost selectat pentru protecția teritoriului. Acest instinct se manifestă prin reacții la stimuli pe care alte rase i-ar ignora.` });
    if (traits.apartament === false && animalSlug === 'caini') items1.push({ titlu: 'Spațiu insuficient', text: `${traits.nume} nu este o rasă ideală pentru apartament. Spațiul restrâns poate amplifica comportamentele problematice.` });
    if (traits.particularitati_comportament) items1.push({ titlu: `Specific rasei ${traits.nume}`, text: traits.particularitati_comportament });
  }

  // Context-specific causes
  if (ctx) {
    if (ctx.includes('noapte')) items1.push({ titlu: 'Zgomote nocturne', text: 'Noaptea, auzul animalului devine mai sensibil la sunete pe care le ignoră ziua. Animale mici, vânt sau trafic pot declanșa reacții.' });
    if (ctx.includes('pleacă') || ctx.includes('singur')) items1.push({ titlu: 'Anxietate de separare', text: 'Atașamentul puternic față de stăpân poate cauza panică la plecare. Se manifestă în primele 30 de minute de la separare.' });
    if (ctx.includes('străin') || ctx.includes('necunoscute')) items1.push({ titlu: 'Neîncredere față de necunoscuți', text: 'Lipsa socializării timpurii sau o experiență negativă anterioară poate cauza reacții defensive la persoane noi.' });
  }

  // Age-specific causes
  if (isYoung) items1.push({ titlu: 'Dezvoltare incompletă', text: 'La vârstă tânără, controlul impulsurilor nu este format. Multe comportamente se corectează natural cu maturizarea, dar necesită ghidare.' });
  if (isOld) items1.push({ titlu: 'Îmbătrânire', text: 'Disfuncția cognitivă legată de vârstă poate cauza confuzie, dezorientare și schimbări de comportament. Controlul veterinar exclude probleme neurologice.' });

  // Generic causes (always at least 2)
  if (items1.length < 2) items1.push({ titlu: 'Comunicare', text: 'Animalele comunică prin comportament. Fiecare gest transmite o nevoie, o emoție sau un disconfort care trebuie decodat.' });
  if (items1.length < 3) items1.push({ titlu: 'Stres sau schimbări de mediu', text: 'Mutarea, un nou membru al familiei, un animal nou sau schimbarea rutinei pot genera stres care se manifestă comportamental.' });

  // Solutions
  if (traits) {
    if (traits.exercitiu_zilnic) items2.push({ text: `Asigură-te că ${traits.nume} face cel puțin ${traits.exercitiu_zilnic} de exercițiu zilnic. O plimbare lungă dimineața reduce semnificativ problemele comportamentale.` });
    if (traits.dresabilitate === 'foarte ușor' || traits.dresabilitate === 'usor') items2.push({ text: `${traits.nume} răspunde bine la antrenament pozitiv. Folosește recompense alimentare și laudă vocală pentru a redirecționa comportamentul.` });
    if (traits.dresabilitate === 'dificil') items2.push({ text: `${traits.nume} necesită o abordare fermă dar blândă. Consistența e mai importantă decât la alte rase. Ia în calcul un specialist.` });
  }
  items2.push({ text: 'Observă tiparele: când, unde și în ce condiții apare comportamentul. Un jurnal de observații ajută la identificarea cauzei exacte.' });
  items2.push({ text: 'Nu pedepsi - pedeapsa crește stresul și agravează problema. Redirecționează energia spre activități acceptabile.' });
  if (isYoung) items2.push({ text: 'La vârstă tânără, socializarea controlată cu oameni și alte animale previne multe probleme ulterioare.' });
  if (isOld) items2.push({ text: 'La un animal în vârstă, un control veterinar complet poate identifica cauze medicale tratabile.' });

  return [
    { titlu: 'Cauze posibile', tip: 'lista', items: items1.slice(0, 5) },
    { titlu: 'Ce poți face', tip: 'pasi', items: items2.slice(0, 5) },
  ];
}

function genHranaSections(subject, traits, ctx, stem, isYoung, isOld, animalSlug) {
  const isPoate = stem.includes('poate');

  if (isPoate) {
    const items1 = [];
    const items2 = [];

    if (traits?.particularitati_hrana) items1.push({ text: `Specific pentru ${traits.nume}: ${traits.particularitati_hrana}` });
    else items1.push({ text: `Înainte de a introduce orice aliment nou, verifică dacă este sigur pentru specia ta.` });

    if (traits?.probleme_sanatate?.some(p => p.includes('obezitate') || p.includes('digestiv'))) {
      items1.push({ text: `${traits.nume} are predispoziție la probleme digestive, deci orice aliment nou trebuie introdus gradual, în cantitate mică.` });
    } else {
      items1.push({ text: 'Introdu orice aliment nou treptat, în cantități mici, și observă reacția timp de 24-48 de ore.' });
    }

    if (isYoung) items1.push({ text: 'Sistemul digestiv al puilor este mai sensibil. Alimentele noi se introduc în cantități și mai mici decât la adulți.' });
    if (isOld) items1.push({ text: 'Un animal în vârstă poate avea intoleranțe care nu existau anterior. Monitorizează reacția cu atenție sporită.' });

    items2.push({ text: 'Vărsături sau diaree la scurt timp după consum indică intoleranță și necesită oprirea imediată.' });
    items2.push({ text: 'Mâncărime, roșeață sau umflături la față sau urechi pot indica alergie alimentară.' });
    items2.push({ text: 'Dacă apar simptome severe (convulsii, dificultăți de respirație), sună la urgențe veterinare imediat.' });

    return [
      { titlu: 'Ce trebuie să știi', tip: 'lista', items: items1 },
      { titlu: 'Semne de intoleranță', tip: 'lista', items: items2 },
    ];
  }

  // ce-mananca, cat-mananca, etc.
  const items1 = [];
  const items2 = [];

  if (traits?.particularitati_hrana) items1.push({ text: `${traits.nume}: ${traits.particularitati_hrana}` });
  if (traits?.greutate) items1.push({ text: `La o greutate de ${traits.greutate}, porția zilnică se calculează ca 2-3% din greutatea corporală pentru hrană umedă, sau conform indicațiilor producătorului pentru hrană uscată.` });
  if (traits?.energie === 'ridicata') items1.push({ text: `${traits.nume} are energie ${traits.energie}, deci are nevoie de hrană bogată în proteine și grăsimi sănătoase pentru a susține activitatea zilnică.` });
  if (traits?.energie === 'scazuta') items1.push({ text: `${traits.nume} are un nivel de energie scăzut și predispoziție la supraponderalitate. Controlul porțiilor este esențial.` });

  if (isYoung) {
    items1.push({ text: 'Puii au nevoie de hrană specială cu conținut crescut de proteine, calciu și fosfor pentru dezvoltarea oaselor și mușchilor.' });
    items1.push({ text: 'Masa se împarte în 3-4 porții pe zi la puii mici, scăzând treptat la 2 pe zi spre vârsta adultă.' });
  } else if (isOld) {
    items1.push({ text: 'Metabolismul scade cu vârsta. Reduce cantitatea cu 10-20% și alege hrană formulată pentru seniori, cu proteine ușor digerabile.' });
    items1.push({ text: 'Suplimentele pentru articulații (glucozamină, condroitină) pot fi recomandate de veterinar.' });
  } else {
    items1.push({ text: 'Adulții mănâncă de 2 ori pe zi, dimineața și seara, la ore fixe.' });
  }

  if (items1.length < 3) items1.push({ text: 'Apa proaspătă trebuie disponibilă permanent. Schimbă apa cel puțin o dată pe zi.' });

  items2.push({ text: 'Ciocolata, ceapa, usturoiul, strugurile și dulciurile cu xilitol sunt toxice.' });
  if (animalSlug === 'caini') items2.push({ text: 'Oasele gătite se pot sparge și perfora tractul digestiv. Oasele crude sunt mai sigure, dar sub supraveghere.' });
  if (animalSlug === 'pisici') items2.push({ text: 'Pisicile sunt carnivore obligatorii. Dieta vegetariană le cauzează deficiențe grave.' });
  items2.push({ text: 'Alimentele procesate, condimentate sau cu sare adăugată nu au ce căuta în dieta animalelor.' });

  return [
    { titlu: 'Alimentație recomandată', tip: 'lista', items: items1.slice(0, 5) },
    { titlu: 'Alimente de evitat', tip: 'lista', items: items2.slice(0, 4) },
  ];
}

function genSanatateSections(subject, traits, ctx, stem, isYoung, isOld, animalSlug) {
  const items1 = [];
  const items2 = [];

  if (traits?.particularitati_sanatate) items1.push({ titlu: `Predispoziții ale rasei ${traits.nume}`, text: traits.particularitati_sanatate });
  if (traits?.probleme_sanatate?.length) {
    const issues = traits.probleme_sanatate.slice(0, 3).join(', ');
    items1.push({ titlu: 'Afecțiuni frecvente la rasă', text: `${traits.nume} este predispus la: ${issues}. Aceste condiții pot contribui la simptomele observate.` });
  }

  if (isYoung) {
    items1.push({ titlu: 'Vulnerabilitate la vârstă tânără', text: 'Sistemul imunitar nu este complet dezvoltat. Infecțiile virale și parazitare sunt mai frecvente și mai periculoase la pui.' });
  }
  if (isOld) {
    items1.push({ titlu: 'Probleme legate de vârstă', text: 'Funcția renală, hepatică și articulară se deteriorează natural. Simptomele pot masca boli cronice care necesită management pe termen lung.' });
  }

  if (ctx?.includes('sânge')) items1.push({ titlu: 'Prezența sângelui', text: 'Sângele în scaun, urină sau vărsătură este întotdeauna un motiv de vizită veterinară urgentă. Nu aștepta să treacă de la sine.' });

  if (items1.length < 2) items1.push({ titlu: 'Infecții', text: 'Bacteriene, virale sau fungice - necesită diagnostic și tratament veterinar specific.' });
  if (items1.length < 3) items1.push({ titlu: 'Paraziți', text: 'Viermii intestinali, giardia, puricii și căpușele pot cauza simptome variate. Deparazitarea regulată previne majoritatea cazurilor.' });

  items2.push({ text: 'Simptomele persistă mai mult de 24-48 de ore fără ameliorare.' });
  items2.push({ text: 'Animalul refuză complet mâncarea și apa.' });
  items2.push({ text: 'Observi letargie accentuată, gâfâit excesiv sau dificultăți de respirație.' });
  if (traits?.durata_viata) items2.push({ text: `${traits.nume} trăiește în medie ${traits.durata_viata}. Controalele veterinare anuale (bianuale pentru seniori) depistează problemele devreme.` });

  return [
    { titlu: 'Cauze posibile', tip: 'lista', items: items1.slice(0, 5) },
    { titlu: 'Când mergi la veterinar', tip: 'lista', items: items2.slice(0, 4) },
  ];
}

function genIngrijireSections(subject, traits, ctx, stem, isYoung, isOld, animalSlug) {
  const items1 = [];
  const items2 = [];

  if (traits?.particularitati_ingrijire) items1.push({ text: `${traits.nume}: ${traits.particularitati_ingrijire}` });
  if (traits?.blana) items1.push({ text: `Blana ${traits.nume} este ${traits.blana}. Frecvența periajului și tipul de perie se aleg în funcție de acest tip de păr.` });
  if (traits?.naparlire === 'abundentă') items1.push({ text: `Năpârlirea la ${traits.nume} este abundentă, mai ales în perioadele de tranziție (primăvara și toamna). Periajul zilnic în aceste perioade reduce părul din casă.` });
  if (traits?.naparlire === 'minimă' || traits?.naparlire === 'minima') items1.push({ text: `${traits.nume} năpârlește minim, ceea ce simplifică îngrijirea blănii. Periajul săptămânal este suficient.` });
  if (traits?.exercitiu_zilnic) items1.push({ text: `Necesarul de exercițiu pentru ${traits.nume} este de ${traits.exercitiu_zilnic}. Plimbările regulate mențin greutatea optimă și sănătatea articulară.` });

  if (isYoung) items1.push({ text: 'La pui, obișnuirea cu rutina de îngrijire (periaj, tăiatul unghiilor, curățarea urechilor) trebuie începută cât mai devreme, cu sesiuni scurte și recompense.' });
  if (isOld) items1.push({ text: 'La animalele în vârstă, îngrijirea devine mai delicată. Articulațiile rigide fac poziționarea dificilă, iar pielea poate fi mai sensibilă.' });

  if (items1.length < 3) items1.push({ text: 'Folosește doar produse specifice speciei. Șampoanele și produsele umane au pH nepotrivit și pot irita pielea.' });
  if (items1.length < 4) items1.push({ text: 'Recompensează cooperarea cu gustări mici. Transformarea îngrijirii într-o experiență pozitivă face totul mai ușor pe termen lung.' });

  items2.push({ text: `Periajul: ${traits?.naparlire === 'abundentă' ? 'zilnic în perioadele de năpârlire, de 2-3 ori pe săptămână în rest' : 'de 1-2 ori pe săptămână, mai des la blănuri lungi'}.` });
  items2.push({ text: 'Baia: doar când e necesar (miros, noroi). Prea frecvent usucă pielea.' });
  items2.push({ text: 'Unghiile: la 2-4 săptămâni. Dacă le auzi pe podea, e momentul.' });
  items2.push({ text: 'Urechile și ochii: verificare săptămânală, curățare cu produse specifice.' });

  return [
    { titlu: 'Ce trebuie să știi', tip: 'lista', items: items1.slice(0, 5) },
    { titlu: 'Frecvență recomandată', tip: 'lista', items: items2.slice(0, 4) },
  ];
}

function genDresajSections(subject, traits, ctx, stem, isYoung, isOld, animalSlug) {
  const items1 = [];
  const items2 = [];

  if (traits?.particularitati_dresaj) items1.push({ text: `${traits.nume}: ${traits.particularitati_dresaj}` });

  if (traits?.dresabilitate === 'foarte ușor' || traits?.dresabilitate === 'usor') {
    items1.push({ text: `${traits.nume} învață rapid și e motivat să coopereze. Sesiunile scurte de 5-10 minute, de 2-3 ori pe zi, dau rezultate vizibile în câteva zile.` });
  } else if (traits?.dresabilitate === 'dificil') {
    items1.push({ text: `${traits.nume} este independent și se plictisește repede de repetiție. Sesiunile trebuie să fie scurte (3-5 minute), variate și cu recompense de valoare mare.` });
  } else if (traits?.dresabilitate === 'moderat') {
    items1.push({ text: `${traits.nume} necesită consecvență și răbdare. Motivația variază - descoperă ce recompensă funcționează cel mai bine (mâncare, jucării sau laudă).` });
  }

  if (traits?.energie === 'ridicata') items1.push({ text: `Cu energia ${traits.energie} a rasei ${traits.nume}, dresajul merge mai bine după o sesiune de exercițiu fizic care consumă surplusul de energie.` });

  if (isYoung) {
    items1.push({ text: 'La pui, atenția e scurtă. Sesiuni de 2-3 minute sunt suficiente. Concentrează-te pe un singur exercițiu pe sesiune.' });
    items1.push({ text: 'Socializarea este prioritatea numărul 1 la vârstă tânără. Expunerea controlată la oameni, animale și medii variate previne problemele ulterioare.' });
  }
  if (isOld) {
    items1.push({ text: 'Un animal în vârstă poate învăța lucruri noi, dar mai lent. Răbdarea și sesiunile scurte sunt cheia. Nu forța dacă observi oboseală.' });
  }

  if (items1.length < 3) items1.push({ text: 'Folosește metoda recompenselor pozitive. Fiecare comportament corect e urmat imediat de o recompensă (gustare mică sau laudă vocală).' });
  if (items1.length < 4) items1.push({ text: 'Fii consistent: toți membrii familiei folosesc aceleași comenzi, aceleași reguli. Inconsistența confuzionează animalul.' });

  items2.push({ text: 'Sesiuni prea lungi care duc la oboseală și frustrare - mai bine 3 sesiuni de 5 minute decât una de 15.' });
  items2.push({ text: 'Pedeapsa fizică sau verbală distruge încrederea și face animalul fie fricos, fie agresiv.' });
  items2.push({ text: 'Schimbarea regulilor de la o zi la alta - permisiunea de azi devine interdicția de mâine.' });
  if (traits?.energie === 'ridicata') items2.push({ text: `Dresajul fără exercițiu fizic prealabil la o rasă energică precum ${traits.nume} e aproape garantat ineficient.` });

  return [
    { titlu: 'Metoda pas cu pas', tip: 'pasi', items: items1.slice(0, 5) },
    { titlu: 'Greșeli de evitat', tip: 'lista', items: items2.slice(0, 4) },
  ];
}

// ═══════════════════════════════════════════════════════════════
// CONCLUSION GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateConclusion({ subject, traits, contextLabel, subcatSlug, questionStem, isYoung, isOld, animalSlug }) {
  const parts = [];

  if (traits) {
    if (subcatSlug === 'comportament') {
      parts.push(`Majoritatea problemelor comportamentale la ${traits.nume} se rezolvă prin consecvență, exercițiu adecvat și răbdare.`);
    } else if (subcatSlug === 'hrana') {
      parts.push(`Fiecare ${traits.nume} poate avea sensibilități individuale. Observă reacțiile animalului tău și ajustează dieta în consecință.`);
    } else if (subcatSlug === 'sanatate') {
      if (traits.durata_viata) parts.push(`${traits.nume} trăiește în medie ${traits.durata_viata}. Controalele regulate la veterinar și prevenția sunt cele mai eficiente instrumente.`);
      else parts.push(`Un control veterinar regulat depistează problemele devreme, când tratamentul e mai simplu și mai ieftin.`);
    } else if (subcatSlug === 'ingrijire') {
      parts.push(`Rutina de îngrijire pentru ${traits.nume} se construiește treptat. Odată stabilită, menținerea e simplă și face o diferență mare în sănătatea animalului.`);
    } else if (subcatSlug === 'dresaj') {
      parts.push(`Dresajul ${traits.nume} (dresabilitate ${traits.dresabilitate || 'moderată'}) dă cele mai bune rezultate cu sesiuni scurte zilnice și recompense imediate.`);
    }
  } else {
    if (subcatSlug === 'sanatate') parts.push('Nu amâna vizita la veterinar dacă simptomele persistă sau se agravează.');
    else if (subcatSlug === 'comportament') parts.push('Răbdarea și observația atentă rezolvă cele mai multe probleme comportamentale.');
    else if (subcatSlug === 'hrana') parts.push('O dietă echilibrată și constantă e baza sănătății. Evită schimbările bruște.');
    else if (subcatSlug === 'ingrijire') parts.push('Rutina de îngrijire se construiește treptat. Fiecare minut investit se vede în sănătatea animalului.');
    else parts.push('Consistența e cheia. Sesiuni scurte zilnice bat antrenamentele lungi ocazionale.');
  }

  if (isYoung) parts.push('La pui, investiția de timp în primele luni are efecte pe toată durata vieții.');
  if (isOld) parts.push('La un animal în vârstă, adaptarea la ritmul lui și controlul medical regulat fac diferența.');

  if (contextLabel && subcatSlug === 'comportament') {
    parts.push(`Dacă situația ${contextLabel} nu se ameliorează în 2-3 săptămâni de practică constantă, un specialist în comportament poate oferi o evaluare personalizată.`);
  }

  return parts.join(' ');
}
