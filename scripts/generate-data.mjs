/**
 * Generates all JSON data for cuanimale.ro
 * Output: src/data/animale.json, subcategorii.json, intrebari-{animal}.json
 */
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
mkdirSync(dataDir, { recursive: true });

// ═══════════════════════════════════════════════════════════════
// ANIMAL DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const ANIMALE = [
  {
    id: 'caini',
    slug: 'caini',
    nume: 'Câine',
    numePlural: 'Câini',
    emoji: '🐶',
    descriere: 'Tot ce trebuie să știi despre câini: comportament, hrană, sănătate, îngrijire și dresaj.',
    subcategorii: ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj'],
    metaTitle: 'Câini - Comportament, Hrană, Sănătate și Dresaj',
    metaDescription: 'Informații practice despre câini: de ce latră, ce mănâncă, boli frecvente, îngrijire zilnică și metode de dresaj.',
    continutPillar: [
      'Câinele este cel mai popular animal de companie din România. Fie că ai un cățel de rasă sau unul adoptat, îngrijirea corectă face diferența între un animal fericit și unul cu probleme de comportament sau sănătate.',
      'Câinii au nevoie de hrană echilibrată, mișcare zilnică, control veterinar regulat și socializare. Fiecare rasă vine cu particularități: un Labrador are alte nevoi decât un Chihuahua, iar un câine de talie mare se dezvoltă diferit față de unul mic.',
      'Pe această pagină găsești articole practice despre comportamentul câinilor, alimentație corectă pe vârste și rase, probleme de sănătate frecvente, îngrijire zilnică și metode de dresaj testate.',
      'Alege subcategoria care te interesează și citește răspunsuri directe la cele mai căutate întrebări despre câini.',
    ],
  },
  {
    id: 'pisici',
    slug: 'pisici',
    nume: 'Pisică',
    numePlural: 'Pisici',
    emoji: '🐱',
    descriere: 'Îngrijirea pisicilor: comportament, alimentație, sănătate, toaletare și antrenament.',
    subcategorii: ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj'],
    metaTitle: 'Pisici - Comportament, Hrană, Sănătate și Îngrijire',
    metaDescription: 'Informații despre pisici: de ce torc, ce mănâncă, boli frecvente, îngrijire și cum le antrenezi.',
    continutPillar: [
      'Pisicile sunt animalele de companie preferate pentru apartamente. Independente dar afectuoase, au nevoie de atenție specifică pentru a trăi sănătos și echilibrat.',
      'O pisică de interior are alte nevoi decât una cu acces la curte. Alimentația, jocul, controlul veterinar și igiena litierei sunt pilonii unei îngrijiri corecte.',
      'Aici găsești articole structurate pe teme: de la comportament și semne de boală, la rețete de hrană și metode de antrenament.',
      'Fiecare rasă are particularități. O Persană necesită periaj zilnic, o Siameză este foarte vocală, iar o British Shorthair este mai calmă. Alege subcategoria potrivită și citește mai departe.',
    ],
  },
  {
    id: 'rozatoare',
    slug: 'rozatoare',
    nume: 'Rozătoare',
    numePlural: 'Rozătoare',
    emoji: '🐹',
    descriere: 'Hamsteri, iepuri, cobai și chinchilla: hrană, cușcă, sănătate și comportament.',
    subcategorii: ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj'],
    metaTitle: 'Rozătoare - Hamsteri, Iepuri, Cobai, Chinchilla',
    metaDescription: 'Informații despre rozătoare: hamsteri, iepuri, cobai, chinchilla. Hrană, cușcă, sănătate și comportament.',
    continutPillar: [
      'Rozătoarele sunt animale de companie accesibile și potrivite pentru familii cu copii. Hamsterii, iepurii, cobaiii și chinchillele au nevoi diferite, dar toate necesită spațiu adecvat, hrană specifică și atenție zilnică.',
      'Un hamster trăiește 2-3 ani și are nevoie de o cușcă spațioasă cu roată. Un iepure poate trăi peste 8 ani și are nevoie de mișcare liberă zilnic. Cobaiii sunt animale sociale care preferă compania altor cobai.',
      'Pe această pagină găsești informații practice despre toate tipurile de rozătoare populare în România, organizate pe subcategorii clare.',
      'Alege specia care te interesează din articolele de mai jos și citește sfaturi concrete despre îngrijire, hrană și sănătate.',
    ],
  },
  {
    id: 'pasari',
    slug: 'pasari',
    nume: 'Pasăre',
    numePlural: 'Păsări',
    emoji: '🐦',
    descriere: 'Papagali, canari, peruși și nimfe: hrană, colivie, sănătate și antrenament.',
    subcategorii: ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj'],
    metaTitle: 'Păsări de Companie - Papagali, Canari, Peruși',
    metaDescription: 'Informații despre păsări de companie: papagali, canari, peruși, nimfe. Hrană, colivie, sănătate și dresaj.',
    continutPillar: [
      'Păsările de companie aduc culoare și sunet în casă. Papagalii, canarii, perușii și nimfele sunt cele mai populare specii din România, fiecare cu nevoi distincte.',
      'Un peruș poate trăi 10-15 ani cu îngrijire corectă. Papagalii mari precum Ara sau Cacadu depășesc 50 de ani. Canarii sunt apreciați pentru cânt, iar nimfele pentru personalitatea lor sociabilă.',
      'Colivia potrivită, hrana variată, lumina naturală și interacțiunea zilnică sunt esențiale pentru sănătatea unei păsări de companie.',
      'Navighează prin subcategoriile de mai jos pentru articole detaliate despre fiecare aspect al îngrijirii păsărilor.',
    ],
  },
  {
    id: 'exotice',
    slug: 'exotice',
    nume: 'Exotic',
    numePlural: 'Animale exotice',
    emoji: '🦎',
    descriere: 'Broaște țestoase, iguane, șerpi, gecko și axolotl: terariu, hrană și îngrijire.',
    subcategorii: ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj'],
    metaTitle: 'Animale Exotice - Reptile, Amfibieni, Nevertebrate',
    metaDescription: 'Informații despre animale exotice: broaște țestoase, iguane, șerpi, gecko, axolotl. Terariu, hrană și îngrijire.',
    continutPillar: [
      'Animalele exotice necesită condiții precise de mediu: temperatură, umiditate și iluminare controlate. Broaștele țestoase, iguanele, geckoii și axolotlii au devenit populari în România în ultimii ani.',
      'Spre deosebire de câini sau pisici, animalele exotice nu pot comunica disconfortul la fel de clar. Un terariu greșit configurat sau o dietă inadecvată pot cauza probleme grave în câteva săptămâni.',
      'Pe această pagină găsești articole despre cele mai populare animale exotice de companie din România, cu informații practice despre habitat, hrană și sănătate.',
      'Alege specia care te interesează și citește sfaturi specifice, verificate de experiența crescătorilor.',
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
// SUBCATEGORY DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const SUBCATEGORII_TEMPLATE = {
  comportament: {
    nume: 'Comportament',
    descriereTemplate: (animal) => `De ce face ${animal} anumite lucruri? Află semnificația comportamentelor frecvente.`,
    continutTemplate: (animalNume, animalPlural) => [
      `Comportamentul ${animalPlural.toLowerCase()} transmite informații despre starea lor fizică și emoțională. Fiecare gest, sunet sau postură are o semnificație.`,
      `Înțelegerea comportamentului ajută la prevenirea problemelor și la construirea unei relații solide cu animalul tău.`,
      `Mai jos găsești răspunsuri la cele mai căutate întrebări despre comportamentul ${animalPlural.toLowerCase()}.`,
    ],
  },
  hrana: {
    nume: 'Hrană',
    descriereTemplate: (animal) => `Ce mănâncă și ce nu are voie să mănânce ${animal}. Diete, cantități și alimente recomandate.`,
    continutTemplate: (animalNume, animalPlural) => [
      `Alimentația corectă este baza sănătății ${animalPlural.toLowerCase()}. O dietă echilibrată previne bolile, menține greutatea optimă și asigură energie pentru activitățile zilnice.`,
      `Fiecare specie și rasă are cerințe nutriționale diferite. Vârsta, dimensiunea și nivelul de activitate influențează cantitatea și tipul de hrană necesară.`,
      `Citește articolele de mai jos pentru informații concrete despre alimentația ${animalPlural.toLowerCase()}.`,
    ],
  },
  sanatate: {
    nume: 'Sănătate',
    descriereTemplate: (animal) => `Boli frecvente, simptome de alarmă și când mergi la veterinar cu ${animal}.`,
    continutTemplate: (animalNume, animalPlural) => [
      `Sănătatea ${animalPlural.toLowerCase()} depinde de prevenție: vaccinuri, deparazitare, control veterinar regulat și observarea schimbărilor de comportament.`,
      `Multe boli pot fi tratate eficient dacă sunt depistate devreme. Cunoașterea simptomelor te ajută să reacționezi la timp.`,
      `Mai jos găsești informații despre cele mai frecvente probleme de sănătate ale ${animalPlural.toLowerCase()}.`,
    ],
  },
  ingrijire: {
    nume: 'Îngrijire',
    descriereTemplate: (animal) => `Îngrijire zilnică pentru ${animal}: igienă, toaletare, mediu și accesorii necesare.`,
    continutTemplate: (animalNume, animalPlural) => [
      `Îngrijirea zilnică a ${animalPlural.toLowerCase()} include igiena, toaletarea, amenajarea spațiului de locuit și asigurarea condițiilor optime de confort.`,
      `Un animal bine îngrijit trăiește mai mult, este mai sănătos și dezvoltă o legătură mai puternică cu stăpânul.`,
      `Citește articolele de mai jos pentru sfaturi practice de îngrijire zilnică.`,
    ],
  },
  dresaj: {
    nume: 'Dresaj',
    descriereTemplate: (animal) => `Cum antrenezi ${animal}: comenzi de bază, obiceiuri și rezolvarea problemelor de comportament.`,
    continutTemplate: (animalNume, animalPlural) => [
      `Dresajul ${animalPlural.toLowerCase()} se bazează pe răbdare, consistență și recompense pozitive. Nu există scurtături - rezultatele vin cu repetiție zilnică.`,
      `Indiferent de vârstă, orice animal poate învăța comportamente noi dacă metoda este adaptată speciei și temperamentului.`,
      `Mai jos găsești metode practice de dresaj și antrenament pentru ${animalPlural.toLowerCase()}.`,
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// BREED/SPECIES DEFINITIONS
// ═══════════════════════════════════════════════════════════════

const RASE = {
  caini: [
    { slug: 'labrador', nume: 'Labrador', talie: 'mare' },
    { slug: 'golden-retriever', nume: 'Golden Retriever', talie: 'mare' },
    { slug: 'ciobanesc-german', nume: 'Ciobănesc German', talie: 'mare' },
    { slug: 'husky', nume: 'Husky', talie: 'mare' },
    { slug: 'bichon', nume: 'Bichon', talie: 'mica' },
    { slug: 'beagle', nume: 'Beagle', talie: 'medie' },
    { slug: 'bulldog-francez', nume: 'Bulldog Francez', talie: 'mica' },
    { slug: 'rottweiler', nume: 'Rottweiler', talie: 'mare' },
    { slug: 'doberman', nume: 'Doberman', talie: 'mare' },
    { slug: 'boxer', nume: 'Boxer', talie: 'mare' },
    { slug: 'pomeranian', nume: 'Pomeranian', talie: 'mica' },
    { slug: 'chihuahua', nume: 'Chihuahua', talie: 'mica' },
    { slug: 'yorkshire-terrier', nume: 'Yorkshire Terrier', talie: 'mica' },
    { slug: 'pug', nume: 'Pug', talie: 'mica' },
    { slug: 'shih-tzu', nume: 'Shih Tzu', talie: 'mica' },
    { slug: 'cocker-spaniel', nume: 'Cocker Spaniel', talie: 'medie' },
    { slug: 'dalmatin', nume: 'Dalmațian', talie: 'mare' },
    { slug: 'akita', nume: 'Akita', talie: 'mare' },
    { slug: 'border-collie', nume: 'Border Collie', talie: 'medie' },
    { slug: 'pitbull', nume: 'Pitbull', talie: 'medie' },
    { slug: 'amstaff', nume: 'Amstaff', talie: 'medie' },
    { slug: 'cane-corso', nume: 'Cane Corso', talie: 'mare' },
    { slug: 'ciobanesc-carpatin', nume: 'Ciobănesc Carpatin', talie: 'mare' },
    { slug: 'ciobanesc-mioritic', nume: 'Ciobănesc Mioritic', talie: 'mare' },
    { slug: 'jack-russell', nume: 'Jack Russell', talie: 'mica' },
    { slug: 'maltez', nume: 'Maltez', talie: 'mica' },
    { slug: 'bernese', nume: 'Bernese', talie: 'mare' },
    { slug: 'shar-pei', nume: 'Shar Pei', talie: 'medie' },
    { slug: 'shiba-inu', nume: 'Shiba Inu', talie: 'medie' },
    { slug: 'teckel', nume: 'Teckel', talie: 'mica' },
    { slug: 'schnauzer', nume: 'Schnauzer', talie: 'medie' },
    { slug: 'samoyed', nume: 'Samoyed', talie: 'mare' },
    { slug: 'malinois', nume: 'Malinois', talie: 'mare' },
    { slug: 'cavalier-king-charles', nume: 'Cavalier King Charles', talie: 'mica' },
    { slug: 'kangal', nume: 'Kangal', talie: 'mare' },
    { slug: 'west-highland', nume: 'West Highland Terrier', talie: 'mica' },
    { slug: 'saint-bernard', nume: 'Saint Bernard', talie: 'mare' },
    { slug: 'collie', nume: 'Collie', talie: 'mare' },
    { slug: 'greyhound', nume: 'Greyhound', talie: 'mare' },
    { slug: 'weimaraner', nume: 'Weimaraner', talie: 'mare' },
    { slug: 'vizsla', nume: 'Vizsla', talie: 'medie' },
    { slug: 'newfoundland', nume: 'Newfoundland', talie: 'mare' },
    { slug: 'lhasa-apso', nume: 'Lhasa Apso', talie: 'mica' },
    { slug: 'basenji', nume: 'Basenji', talie: 'medie' },
    { slug: 'springer-spaniel', nume: 'Springer Spaniel', talie: 'medie' },
    { slug: 'staffordshire', nume: 'Staffordshire', talie: 'medie' },
    { slug: 'ciobanesc-belgian', nume: 'Ciobănesc Belgian', talie: 'mare' },
    { slug: 'brac-german', nume: 'Brac German', talie: 'mare' },
    { slug: 'papillon', nume: 'Papillon', talie: 'mica' },
    { slug: 'scottish-terrier', nume: 'Scottish Terrier', talie: 'mica' },
    { slug: 'bull-terrier', nume: 'Bull Terrier', talie: 'medie' },
    { slug: 'australian-shepherd', nume: 'Australian Shepherd', talie: 'medie' },
    { slug: 'corgi', nume: 'Corgi', talie: 'mica' },
    { slug: 'mops', nume: 'Mops', talie: 'mica' },
    { slug: 'terrier-negru-rusesc', nume: 'Terrier Negru Rusesc', talie: 'mare' },
    { slug: 'ciobanesc-de-asia-centrala', nume: 'Ciobănesc de Asia Centrală', talie: 'mare' },
    { slug: 'whippet', nume: 'Whippet', talie: 'medie' },
    { slug: 'chow-chow', nume: 'Chow Chow', talie: 'medie' },
    { slug: 'rhodesian-ridgeback', nume: 'Rhodesian Ridgeback', talie: 'mare' },
  ],
  pisici: [
    { slug: 'persana', nume: 'Persană' },
    { slug: 'siameza', nume: 'Siameză' },
    { slug: 'british-shorthair', nume: 'British Shorthair' },
    { slug: 'maine-coon', nume: 'Maine Coon' },
    { slug: 'ragdoll', nume: 'Ragdoll' },
    { slug: 'bengaleza', nume: 'Bengaleză' },
    { slug: 'sfinx', nume: 'Sfinx' },
    { slug: 'scottish-fold', nume: 'Scottish Fold' },
    { slug: 'norvegiana', nume: 'Norvegiană' },
    { slug: 'birmaneza', nume: 'Birmaneză' },
    { slug: 'russian-blue', nume: 'Russian Blue' },
    { slug: 'devon-rex', nume: 'Devon Rex' },
    { slug: 'turkish-angora', nume: 'Turkish Angora' },
    { slug: 'european', nume: 'Europeană' },
    { slug: 'munchkin', nume: 'Munchkin' },
    { slug: 'abisiniană', nume: 'Abisiniană' },
    { slug: 'oriental-shorthair', nume: 'Oriental Shorthair' },
    { slug: 'chartreux', nume: 'Chartreux' },
    { slug: 'savannah', nume: 'Savannah' },
    { slug: 'cornish-rex', nume: 'Cornish Rex' },
    { slug: 'himalayan', nume: 'Himalayan' },
    { slug: 'tonkineza', nume: 'Tonkineză' },
    { slug: 'burmeza', nume: 'Burmeză' },
    { slug: 'balineza', nume: 'Balineză' },
    { slug: 'somali', nume: 'Somali' },
    { slug: 'ocicat', nume: 'Ocicat' },
    { slug: 'manx', nume: 'Manx' },
    { slug: 'korat', nume: 'Korat' },
    { slug: 'singapura', nume: 'Singapura' },
    { slug: 'egyptian-mau', nume: 'Egyptian Mau' },
    { slug: 'bombay', nume: 'Bombay' },
    { slug: 'nebelung', nume: 'Nebelung' },
    { slug: 'snowshoe', nume: 'Snowshoe' },
    { slug: 'pixie-bob', nume: 'Pixie-bob' },
  ],
  rozatoare: [
    { slug: 'hamster', nume: 'Hamster' },
    { slug: 'iepure', nume: 'Iepure' },
    { slug: 'cobai', nume: 'Cobai' },
    { slug: 'chinchilla', nume: 'Chinchilla' },
    { slug: 'degu', nume: 'Degu' },
    { slug: 'gerbil', nume: 'Gerbil' },
    { slug: 'soricei', nume: 'Șoricei' },
    { slug: 'rat-de-companie', nume: 'Rat de companie' },
    { slug: 'sugar-glider', nume: 'Sugar Glider' },
    { slug: 'veverita', nume: 'Veveriță' },
  ],
  pasari: [
    { slug: 'papagal', nume: 'Papagal' },
    { slug: 'perus', nume: 'Peruș' },
    { slug: 'nimfa', nume: 'Nimfă' },
    { slug: 'canar', nume: 'Canar' },
    { slug: 'agapornis', nume: 'Agapornis' },
    { slug: 'cacadu', nume: 'Cacadu' },
    { slug: 'ara', nume: 'Ara' },
    { slug: 'porumbel', nume: 'Porumbel' },
    { slug: 'prepelita', nume: 'Prepeliță' },
    { slug: 'gaina', nume: 'Găină' },
    { slug: 'rata', nume: 'Rață' },
    { slug: 'curcan', nume: 'Curcan' },
  ],
  exotice: [
    { slug: 'broasca-testoasa', nume: 'Broască țestoasă' },
    { slug: 'iguana', nume: 'Iguană' },
    { slug: 'sarpe', nume: 'Șarpe' },
    { slug: 'cameleon', nume: 'Cameleon' },
    { slug: 'gecko', nume: 'Gecko' },
    { slug: 'axolotl', nume: 'Axolotl' },
    { slug: 'pesti-acvariu', nume: 'Pești de acvariu' },
    { slug: 'tarantula', nume: 'Tarantulă' },
    { slug: 'hermit-crab', nume: 'Hermit Crab' },
    { slug: 'scorpion', nume: 'Scorpion' },
  ],
};

// ═══════════════════════════════════════════════════════════════
// QUESTION TEMPLATES PER SUBCATEGORY
// ═══════════════════════════════════════════════════════════════

// Generic question stems that work for all animals
// {A} = animal singular, {a} = animal lowercase, {R} = rasa/specie
const Q_COMPORTAMENT = {
  caini: [
    { stem: 'de-ce-latra', titlu: 'De ce latră câinele?', contexts: ['noaptea', 'la-straini', 'cand-pleci', 'la-alti-caini', 'fara-motiv', 'la-usa', 'la-pisici', 'la-masini'] },
    { stem: 'de-ce-musca', titlu: 'De ce mușcă câinele?', contexts: ['obiectele', 'mainile', 'pantofii', 'copiii', 'mobila', 'lesa'] },
    { stem: 'de-ce-urla', titlu: 'De ce urlă câinele?', contexts: ['noaptea', 'cand-e-singur', 'la-sirene', 'la-muzica'] },
    { stem: 'de-ce-tremura', titlu: 'De ce tremură câinele?', contexts: ['noaptea', 'cand-doarme', 'fara-motiv', 'dupa-baie'] },
    { stem: 'de-ce-se-ascunde', titlu: 'De ce se ascunde câinele?', contexts: ['sub-pat', 'cand-tuna', 'de-straini'] },
    { stem: 'de-ce-sapa', titlu: 'De ce sapă câinele?', contexts: ['in-curte', 'in-pat', 'la-usa'] },
    { stem: 'de-ce-se-linge', titlu: 'De ce se linge câinele?', contexts: ['pe-labe', 'pe-nas', 'pe-stapan', 'excesiv'] },
    { stem: 'de-ce-maraie', titlu: 'De ce mârâie câinele?', contexts: ['la-mancare', 'la-straini', 'la-alti-caini', 'cand-il-atingi'] },
    { stem: 'de-ce-da-din-coada', titlu: 'De ce dă din coadă câinele?', contexts: ['cand-doarme', 'incet', 'repede'] },
    { stem: 'de-ce-mananca-iarba', titlu: 'De ce mănâncă iarbă câinele?', contexts: [] },
    { stem: 'de-ce-se-invarte-in-cerc', titlu: 'De ce se învârte în cerc câinele?', contexts: ['inainte-sa-se-culce', 'dupa-coada'] },
    { stem: 'de-ce-fuge', titlu: 'De ce fuge câinele?', contexts: ['de-acasa', 'de-stapan', 'la-plimbare'] },
    { stem: 'de-ce-se-freaca', titlu: 'De ce se freacă câinele?', contexts: ['de-mobila', 'de-pamant', 'de-tine'] },
    { stem: 'de-ce-schelalaie', titlu: 'De ce schelălăie câinele?', contexts: ['noaptea', 'fara-motiv', 'cand-il-atingi'] },
    { stem: 'de-ce-se-scarpina', titlu: 'De ce se scarpină câinele?', contexts: ['la-urechi', 'excesiv', 'pe-burta'] },
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă câinele?', contexts: ['hrana-uscata', 'de-2-zile', 'dar-bea-apa'] },
    { stem: 'de-ce-gafaie', titlu: 'De ce gâfâie câinele?', contexts: ['noaptea', 'cand-sta', 'excesiv'] },
    { stem: 'de-ce-plange', titlu: 'De ce plânge câinele?', contexts: ['noaptea', 'cand-pleci', 'fara-motiv'] },
    { stem: 'de-ce-trage-de-lesa', titlu: 'De ce trage de lesă câinele?', contexts: [] },
    { stem: 'de-ce-se-gudura', titlu: 'De ce se gudură câinele?', contexts: [] },
    { stem: 'de-ce-sta-lipit-de-tine', titlu: 'De ce stă lipit de tine câinele?', contexts: [] },
    { stem: 'de-ce-isi-musca-coada', titlu: 'De ce își mușcă coada câinele?', contexts: [] },
    { stem: 'de-ce-nu-doarme-noaptea', titlu: 'De ce nu doarme noaptea câinele?', contexts: [] },
    { stem: 'de-ce-isi-pune-capul-pe-tine', titlu: 'De ce își pune capul pe tine câinele?', contexts: [] },
    { stem: 'de-ce-aduce-jucarii', titlu: 'De ce aduce jucării câinele?', contexts: [] },
    { stem: 'de-ce-este-agresiv', titlu: 'De ce este agresiv câinele?', contexts: ['cu-alti-caini', 'cu-strainii', 'cu-copiii'] },
    { stem: 'de-ce-mananca-excremente', titlu: 'De ce mănâncă excremente câinele?', contexts: [] },
    { stem: 'de-ce-se-rostogoleste', titlu: 'De ce se rostogolește câinele?', contexts: ['pe-spate', 'in-iarba', 'in-noroi'] },
  ],
  pisici: [
    { stem: 'de-ce-toarce', titlu: 'De ce toarce pisica?', contexts: ['cand-o-mangai', 'cand-doarme', 'tare', 'si-musca'] },
    { stem: 'de-ce-miauna', titlu: 'De ce miaună pisica?', contexts: ['noaptea', 'la-usa', 'cand-mananca', 'fara-motiv', 'tare', 'mult'] },
    { stem: 'de-ce-zgarie', titlu: 'De ce zgârie pisica?', contexts: ['mobila', 'canapeaua', 'peretii', 'mainile'] },
    { stem: 'de-ce-musca', titlu: 'De ce mușcă pisica?', contexts: ['cand-o-mangai', 'mainile', 'picioarele', 'usor'] },
    { stem: 'de-ce-se-ascunde', titlu: 'De ce se ascunde pisica?', contexts: ['sub-pat', 'in-dulap', 'de-vizitatori'] },
    { stem: 'de-ce-aduce-prada', titlu: 'De ce aduce pradă pisica?', contexts: [] },
    { stem: 'de-ce-framanta', titlu: 'De ce frământă pisica?', contexts: ['patura', 'perna', 'pe-tine'] },
    { stem: 'de-ce-face-pipi-in-casa', titlu: 'De ce face pipi în casă pisica?', contexts: ['pe-pat', 'pe-haine', 'langa-litiera'] },
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă pisica?', contexts: ['hrana-uscata', 'hrana-noua', 'de-2-zile'] },
    { stem: 'de-ce-se-linge', titlu: 'De ce se linge pisica?', contexts: ['excesiv', 'pe-burta', 'pe-labe', 'pe-tine'] },
    { stem: 'de-ce-doarme-mult', titlu: 'De ce doarme mult pisica?', contexts: [] },
    { stem: 'de-ce-isi-misca-coada', titlu: 'De ce își mișcă coada pisica?', contexts: [] },
    { stem: 'de-ce-sta-pe-lucrurile-tale', titlu: 'De ce stă pe lucrurile tale pisica?', contexts: [] },
    { stem: 'de-ce-se-freaca-de-tine', titlu: 'De ce se freacă de tine pisica?', contexts: [] },
    { stem: 'de-ce-sufla', titlu: 'De ce suflă pisica?', contexts: ['la-alti-pisici', 'la-caini', 'la-tine'] },
    { stem: 'de-ce-mananca-iarba', titlu: 'De ce mănâncă iarbă pisica?', contexts: [] },
    { stem: 'de-ce-fuge-de-apa', titlu: 'De ce fuge de apă pisica?', contexts: [] },
    { stem: 'de-ce-se-uita-fix', titlu: 'De ce se uită fix pisica?', contexts: ['la-tine', 'in-gol', 'la-perete'] },
    { stem: 'de-ce-alearga-noaptea', titlu: 'De ce aleargă noaptea pisica?', contexts: [] },
    { stem: 'de-ce-sta-in-cutii', titlu: 'De ce stă în cutii pisica?', contexts: [] },
    { stem: 'de-ce-tremura', titlu: 'De ce tremură pisica?', contexts: ['cand-doarme', 'fara-motiv'] },
    { stem: 'de-ce-bea-multa-apa', titlu: 'De ce bea multă apă pisica?', contexts: [] },
    { stem: 'de-ce-isi-arata-burta', titlu: 'De ce își arată burta pisica?', contexts: [] },
    { stem: 'de-ce-rastoarna-lucrurile', titlu: 'De ce răstoarnă lucrurile pisica?', contexts: [] },
  ],
  rozatoare: [
    { stem: 'de-ce-roade', titlu: 'De ce roade {R}?', contexts: ['gratiile', 'tot', 'lemnul'] },
    { stem: 'de-ce-musca', titlu: 'De ce mușcă {R}?', contexts: ['mainile', 'cand-il-ridici'] },
    { stem: 'de-ce-e-agitat', titlu: 'De ce e agitat {R}?', contexts: ['noaptea', 'in-cusca'] },
    { stem: 'de-ce-se-ascunde', titlu: 'De ce se ascunde {R}?', contexts: ['in-cusca', 'de-tine'] },
    { stem: 'de-ce-bate-din-picior', titlu: 'De ce bate din picior {R}?', contexts: [] },
    { stem: 'de-ce-face-zgomot', titlu: 'De ce face zgomot {R}?', contexts: ['noaptea', 'cand-mananca'] },
    { stem: 'de-ce-nu-iese-din-cusca', titlu: 'De ce nu iese din cușcă {R}?', contexts: [] },
    { stem: 'de-ce-se-linge', titlu: 'De ce se linge {R}?', contexts: ['pe-labe', 'pe-tine'] },
    { stem: 'de-ce-nu-se-misca', titlu: 'De ce nu se mișcă {R}?', contexts: [] },
    { stem: 'de-ce-strange-mancare', titlu: 'De ce strânge mâncare {R}?', contexts: ['in-obraji', 'in-cusca'] },
  ],
  pasari: [
    { stem: 'de-ce-canta', titlu: 'De ce cântă {R}?', contexts: ['dimineata', 'noaptea', 'tare'] },
    { stem: 'de-ce-tipa', titlu: 'De ce țipă {R}?', contexts: ['dimineata', 'cand-pleci', 'mult'] },
    { stem: 'de-ce-isi-smulge-penele', titlu: 'De ce își smulge penele {R}?', contexts: [] },
    { stem: 'de-ce-musca', titlu: 'De ce mușcă {R}?', contexts: ['mainile', 'cand-il-atingi'] },
    { stem: 'de-ce-nu-canta', titlu: 'De ce nu cântă {R}?', contexts: [] },
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă {R}?', contexts: ['seminte', 'fructe'] },
    { stem: 'de-ce-sta-pe-un-picior', titlu: 'De ce stă pe un picior {R}?', contexts: [] },
    { stem: 'de-ce-isi-gonfloeaza-penele', titlu: 'De ce își umflă penele {R}?', contexts: [] },
    { stem: 'de-ce-se-balansa', titlu: 'De ce se balansează {R}?', contexts: [] },
    { stem: 'de-ce-vorbeste', titlu: 'De ce vorbește {R}?', contexts: [] },
  ],
  exotice: [
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă {R}?', contexts: ['de-cateva-zile'] },
    { stem: 'de-ce-sta-ascuns', titlu: 'De ce stă ascuns {R}?', contexts: ['tot-timpul', 'in-adapost'] },
    { stem: 'de-ce-isi-schimba-culoarea', titlu: 'De ce își schimbă culoarea {R}?', contexts: [] },
    { stem: 'de-ce-nu-se-misca', titlu: 'De ce nu se mișcă {R}?', contexts: [] },
    { stem: 'de-ce-e-agresiv', titlu: 'De ce e agresiv {R}?', contexts: [] },
    { stem: 'de-ce-se-baloneaza', titlu: 'De ce se balonează {R}?', contexts: [] },
    { stem: 'de-ce-refuza-apa', titlu: 'De ce refuză apa {R}?', contexts: [] },
    { stem: 'de-ce-sta-la-soare', titlu: 'De ce stă la soare {R}?', contexts: [] },
  ],
};

const Q_HRANA = {
  caini: [
    { stem: 'ce-mananca', titlu: 'Ce mănâncă câinele?', contexts: [] },
    { stem: 'ce-nu-are-voie-sa-manance', titlu: 'Ce nu are voie să mănânce câinele?', contexts: [] },
    { stem: 'cat-mananca-pe-zi', titlu: 'Cât mănâncă pe zi câinele?', contexts: [] },
    { stem: 'poate-manca-oase', titlu: 'Poate mânca oase câinele?', contexts: ['de-pui', 'de-porc', 'de-vita'] },
    { stem: 'poate-manca-branza', titlu: 'Poate mânca brânză câinele?', contexts: [] },
    { stem: 'poate-manca-oua', titlu: 'Poate mânca ouă câinele?', contexts: ['crude', 'fierte'] },
    { stem: 'poate-manca-ciocolata', titlu: 'Poate mânca ciocolată câinele?', contexts: [] },
    { stem: 'poate-manca-rosii', titlu: 'Poate mânca roșii câinele?', contexts: [] },
    { stem: 'poate-manca-cartofi', titlu: 'Poate mânca cartofi câinele?', contexts: ['cruzi', 'fierti'] },
    { stem: 'poate-manca-mere', titlu: 'Poate mânca mere câinele?', contexts: [] },
    { stem: 'poate-manca-banane', titlu: 'Poate mânca banane câinele?', contexts: [] },
    { stem: 'poate-manca-pepene', titlu: 'Poate mânca pepene câinele?', contexts: [] },
    { stem: 'poate-manca-paine', titlu: 'Poate mânca pâine câinele?', contexts: [] },
    { stem: 'poate-manca-orez', titlu: 'Poate mânca orez câinele?', contexts: [] },
    { stem: 'poate-manca-peste', titlu: 'Poate mânca pește câinele?', contexts: ['crud', 'fiert'] },
    { stem: 'poate-manca-carne-cruda', titlu: 'Poate mânca carne crudă câinele?', contexts: [] },
    { stem: 'poate-manca-morcovi', titlu: 'Poate mânca morcovi câinele?', contexts: [] },
    { stem: 'poate-manca-iaurt', titlu: 'Poate mânca iaurt câinele?', contexts: [] },
    { stem: 'poate-manca-castraveti', titlu: 'Poate mânca castraveți câinele?', contexts: [] },
    { stem: 'poate-manca-struguri', titlu: 'Poate mânca struguri câinele?', contexts: [] },
    { stem: 'poate-manca-ceapa', titlu: 'Poate mânca ceapă câinele?', contexts: [] },
    { stem: 'poate-manca-usturoi', titlu: 'Poate mânca usturoi câinele?', contexts: [] },
    { stem: 'poate-manca-capsuni', titlu: 'Poate mânca căpșuni câinele?', contexts: [] },
    { stem: 'ce-hrana-uscata-e-buna', titlu: 'Ce hrană uscată e bună pentru câini?', contexts: [] },
    { stem: 'hrana-uscata-vs-umeda', titlu: 'Hrană uscată sau umedă pentru câini?', contexts: [] },
    { stem: 'ce-mananca-puii-de-caine', titlu: 'Ce mănâncă puii de câine?', contexts: [] },
    { stem: 'ce-mananca-cainele-batran', titlu: 'Ce mănâncă câinele bătrân?', contexts: [] },
    { stem: 'cat-mananca-un-pui-de-caine', titlu: 'Cât mănâncă un pui de câine?', contexts: [] },
    { stem: 'de-cate-ori-pe-zi-mananca', titlu: 'De câte ori pe zi mănâncă câinele?', contexts: [] },
    { stem: 'poate-bea-lapte', titlu: 'Poate bea lapte câinele?', contexts: [] },
  ],
  pisici: [
    { stem: 'ce-mananca', titlu: 'Ce mănâncă pisica?', contexts: [] },
    { stem: 'ce-nu-are-voie-sa-manance', titlu: 'Ce nu are voie să mănânce pisica?', contexts: [] },
    { stem: 'cat-mananca-pe-zi', titlu: 'Cât mănâncă pe zi pisica?', contexts: [] },
    { stem: 'poate-manca-branza', titlu: 'Poate mânca brânză pisica?', contexts: [] },
    { stem: 'poate-manca-oua', titlu: 'Poate mânca ouă pisica?', contexts: ['crude', 'fierte'] },
    { stem: 'poate-manca-peste', titlu: 'Poate mânca pește pisica?', contexts: ['crud', 'fiert'] },
    { stem: 'poate-manca-orez', titlu: 'Poate mânca orez pisica?', contexts: [] },
    { stem: 'poate-manca-rosii', titlu: 'Poate mânca roșii pisica?', contexts: [] },
    { stem: 'poate-manca-mere', titlu: 'Poate mânca mere pisica?', contexts: [] },
    { stem: 'poate-manca-banane', titlu: 'Poate mânca banane pisica?', contexts: [] },
    { stem: 'poate-manca-paine', titlu: 'Poate mânca pâine pisica?', contexts: [] },
    { stem: 'poate-manca-carne-cruda', titlu: 'Poate mânca carne crudă pisica?', contexts: [] },
    { stem: 'poate-manca-iaurt', titlu: 'Poate mânca iaurt pisica?', contexts: [] },
    { stem: 'poate-manca-ciocolata', titlu: 'Poate mânca ciocolată pisica?', contexts: [] },
    { stem: 'poate-bea-lapte', titlu: 'Poate bea lapte pisica?', contexts: [] },
    { stem: 'ce-hrana-uscata-e-buna', titlu: 'Ce hrană uscată e bună pentru pisici?', contexts: [] },
    { stem: 'hrana-uscata-vs-umeda', titlu: 'Hrană uscată sau umedă pentru pisici?', contexts: [] },
    { stem: 'ce-mananca-puii-de-pisica', titlu: 'Ce mănâncă puii de pisică?', contexts: [] },
    { stem: 'ce-mananca-pisica-batrana', titlu: 'Ce mănâncă pisica bătrână?', contexts: [] },
    { stem: 'de-cate-ori-pe-zi-mananca', titlu: 'De câte ori pe zi mănâncă pisica?', contexts: [] },
    { stem: 'poate-manca-ton', titlu: 'Poate mânca ton pisica?', contexts: ['din-conserva'] },
    { stem: 'poate-manca-capsuni', titlu: 'Poate mânca căpșuni pisica?', contexts: [] },
    { stem: 'poate-manca-pepene', titlu: 'Poate mânca pepene pisica?', contexts: [] },
  ],
  rozatoare: [
    { stem: 'ce-mananca', titlu: 'Ce mănâncă {R}?', contexts: [] },
    { stem: 'ce-nu-are-voie-sa-manance', titlu: 'Ce nu are voie să mănânce {R}?', contexts: [] },
    { stem: 'cat-mananca-pe-zi', titlu: 'Cât mănâncă pe zi {R}?', contexts: [] },
    { stem: 'poate-manca-morcovi', titlu: 'Poate mânca morcovi {R}?', contexts: [] },
    { stem: 'poate-manca-mere', titlu: 'Poate mânca mere {R}?', contexts: [] },
    { stem: 'poate-manca-banane', titlu: 'Poate mânca banane {R}?', contexts: [] },
    { stem: 'poate-manca-castraveti', titlu: 'Poate mânca castraveți {R}?', contexts: [] },
    { stem: 'poate-manca-paine', titlu: 'Poate mânca pâine {R}?', contexts: [] },
    { stem: 'poate-manca-branza', titlu: 'Poate mânca brânză {R}?', contexts: [] },
    { stem: 'ce-fan-e-bun', titlu: 'Ce fân e bun pentru {R}?', contexts: [] },
    { stem: 'ce-legume-mananca', titlu: 'Ce legume mănâncă {R}?', contexts: [] },
    { stem: 'ce-fructe-mananca', titlu: 'Ce fructe mănâncă {R}?', contexts: [] },
  ],
  pasari: [
    { stem: 'ce-mananca', titlu: 'Ce mănâncă {R}?', contexts: [] },
    { stem: 'ce-nu-are-voie-sa-manance', titlu: 'Ce nu are voie să mănânce {R}?', contexts: [] },
    { stem: 'ce-seminte-mananca', titlu: 'Ce semințe mănâncă {R}?', contexts: [] },
    { stem: 'poate-manca-fructe', titlu: 'Poate mânca fructe {R}?', contexts: [] },
    { stem: 'poate-manca-legume', titlu: 'Poate mânca legume {R}?', contexts: [] },
    { stem: 'poate-manca-paine', titlu: 'Poate mânca pâine {R}?', contexts: [] },
    { stem: 'poate-manca-oua', titlu: 'Poate mânca ouă {R}?', contexts: [] },
    { stem: 'cat-mananca-pe-zi', titlu: 'Cât mănâncă pe zi {R}?', contexts: [] },
    { stem: 'ce-mananca-puii', titlu: 'Ce mănâncă puii de {R}?', contexts: [] },
  ],
  exotice: [
    { stem: 'ce-mananca', titlu: 'Ce mănâncă {R}?', contexts: [] },
    { stem: 'ce-nu-are-voie-sa-manance', titlu: 'Ce nu are voie să mănânce {R}?', contexts: [] },
    { stem: 'cat-mananca-pe-zi', titlu: 'Cât mănâncă pe zi {R}?', contexts: [] },
    { stem: 'ce-insecte-mananca', titlu: 'Ce insecte mănâncă {R}?', contexts: [] },
    { stem: 'poate-manca-fructe', titlu: 'Poate mânca fructe {R}?', contexts: [] },
    { stem: 'poate-manca-legume', titlu: 'Poate mânca legume {R}?', contexts: [] },
    { stem: 'de-cate-ori-pe-saptamana', titlu: 'De câte ori pe săptămână mănâncă {R}?', contexts: [] },
  ],
};

const Q_SANATATE = {
  caini: [
    { stem: 'de-ce-vomita', titlu: 'De ce vomită câinele?', contexts: ['dupa-mancare', 'bila-galbena', 'spuma-alba', 'dimineata'] },
    { stem: 'de-ce-are-diaree', titlu: 'De ce are diaree câinele?', contexts: ['cu-sange', 'dupa-mancare', 'de-mai-multe-zile'] },
    { stem: 'de-ce-tuseste', titlu: 'De ce tușește câinele?', contexts: ['noaptea', 'ca-si-cum-se-ineaca', 'dupa-apa'] },
    { stem: 'de-ce-ii-cade-parul', titlu: 'De ce îi cade părul câinelui?', contexts: ['excesiv', 'pe-pete'] },
    { stem: 'de-ce-se-scarpina', titlu: 'De ce se scarpină câinele mult?', contexts: ['la-urechi', 'pe-burta', 'fara-purici'] },
    { stem: 'de-ce-ii-lasa-ochii', titlu: 'De ce îi lăcrimează ochii câinelui?', contexts: [] },
    { stem: 'de-ce-are-nasul-uscat', titlu: 'De ce are nasul uscat câinele?', contexts: [] },
    { stem: 'de-ce-schiopateaza', titlu: 'De ce șchiopătează câinele?', contexts: ['la-piciorul-din-fata', 'la-piciorul-din-spate'] },
    { stem: 'de-ce-bea-multa-apa', titlu: 'De ce bea multă apă câinele?', contexts: [] },
    { stem: 'de-ce-urineaza-mult', titlu: 'De ce urinează mult câinele?', contexts: ['in-casa', 'des'] },
    { stem: 'cand-se-vaccineaza', titlu: 'Când se vaccinează câinele?', contexts: [] },
    { stem: 'cand-se-deparaziteaza', titlu: 'Când se deparazitează câinele?', contexts: ['intern', 'extern'] },
    { stem: 'cand-se-sterilizeaza', titlu: 'Când se sterilizează câinele?', contexts: [] },
    { stem: 'cum-scoti-capusa', titlu: 'Cum scoți căpușa de pe câine?', contexts: [] },
    { stem: 'de-ce-are-purici', titlu: 'De ce are purici câinele?', contexts: [] },
    { stem: 'de-ce-ii-miroase-gura', titlu: 'De ce îi miroase gura câinelui?', contexts: [] },
    { stem: 'ce-faci-cand-e-racit', titlu: 'Ce faci când câinele e răcit?', contexts: [] },
    { stem: 'de-ce-stranuta', titlu: 'De ce strănută câinele?', contexts: ['des', 'cu-sange'] },
    { stem: 'semne-ca-e-bolnav', titlu: 'Ce semne arată că e bolnav câinele?', contexts: [] },
    { stem: 'de-ce-are-ochi-rosii', titlu: 'De ce are ochi roșii câinele?', contexts: [] },
    { stem: 'de-ce-e-balonat', titlu: 'De ce e balonat câinele?', contexts: [] },
    { stem: 'de-ce-tremura-si-gafaie', titlu: 'De ce tremură și gâfâie câinele?', contexts: [] },
  ],
  pisici: [
    { stem: 'de-ce-vomita', titlu: 'De ce vomită pisica?', contexts: ['dupa-mancare', 'bila-galbena', 'ghemotoace-de-par'] },
    { stem: 'de-ce-are-diaree', titlu: 'De ce are diaree pisica?', contexts: ['cu-sange', 'de-mai-multe-zile'] },
    { stem: 'de-ce-stranuta', titlu: 'De ce strănută pisica?', contexts: ['des', 'cu-scurgeri'] },
    { stem: 'de-ce-ii-cade-parul', titlu: 'De ce îi cade părul pisicii?', contexts: ['excesiv', 'pe-pete'] },
    { stem: 'de-ce-ii-lasa-ochii', titlu: 'De ce îi lăcrimează ochii pisicii?', contexts: [] },
    { stem: 'de-ce-schiopateaza', titlu: 'De ce șchiopătează pisica?', contexts: [] },
    { stem: 'de-ce-bea-multa-apa', titlu: 'De ce bea multă apă pisica?', contexts: [] },
    { stem: 'de-ce-nu-face-pipi', titlu: 'De ce nu face pipi pisica?', contexts: [] },
    { stem: 'de-ce-are-purici', titlu: 'De ce are purici pisica?', contexts: [] },
    { stem: 'cand-se-vaccineaza', titlu: 'Când se vaccinează pisica?', contexts: [] },
    { stem: 'cand-se-sterilizeaza', titlu: 'Când se sterilizează pisica?', contexts: [] },
    { stem: 'cand-se-deparaziteaza', titlu: 'Când se deparazitează pisica?', contexts: [] },
    { stem: 'cum-scoti-capusa', titlu: 'Cum scoți căpușa de pe pisică?', contexts: [] },
    { stem: 'de-ce-ii-miroase-gura', titlu: 'De ce îi miroase gura pisicii?', contexts: [] },
    { stem: 'semne-ca-e-bolnava', titlu: 'Ce semne arată că e bolnavă pisica?', contexts: [] },
    { stem: 'de-ce-tuseste', titlu: 'De ce tușește pisica?', contexts: [] },
    { stem: 'de-ce-are-ochi-rosii', titlu: 'De ce are ochi roșii pisica?', contexts: [] },
    { stem: 'de-ce-slabeste', titlu: 'De ce slăbește pisica?', contexts: [] },
  ],
  rozatoare: [
    { stem: 'de-ce-stranuta', titlu: 'De ce strănută {R}?', contexts: [] },
    { stem: 'de-ce-ii-cade-parul', titlu: 'De ce îi cade părul la {R}?', contexts: [] },
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă {R}?', contexts: [] },
    { stem: 'de-ce-e-apatic', titlu: 'De ce e apatic {R}?', contexts: [] },
    { stem: 'de-ce-are-ochi-umezi', titlu: 'De ce are ochi umezi {R}?', contexts: [] },
    { stem: 'semne-ca-e-bolnav', titlu: 'Ce semne arată că e bolnav {R}?', contexts: [] },
    { stem: 'cat-traieste', titlu: 'Cât trăiește {R}?', contexts: [] },
    { stem: 'de-ce-are-dinti-lungi', titlu: 'De ce are dinți lungi {R}?', contexts: [] },
  ],
  pasari: [
    { stem: 'de-ce-ii-cad-penele', titlu: 'De ce îi cad penele la {R}?', contexts: [] },
    { stem: 'de-ce-nu-mai-canta', titlu: 'De ce nu mai cântă {R}?', contexts: [] },
    { stem: 'de-ce-stranuta', titlu: 'De ce strănută {R}?', contexts: [] },
    { stem: 'semne-ca-e-bolnav', titlu: 'Ce semne arată că e bolnav {R}?', contexts: [] },
    { stem: 'de-ce-sta-gonflat', titlu: 'De ce stă umflat {R}?', contexts: [] },
    { stem: 'de-ce-are-diaree', titlu: 'De ce are diaree {R}?', contexts: [] },
    { stem: 'cat-traieste', titlu: 'Cât trăiește {R}?', contexts: [] },
  ],
  exotice: [
    { stem: 'semne-ca-e-bolnav', titlu: 'Ce semne arată că e bolnav {R}?', contexts: [] },
    { stem: 'cat-traieste', titlu: 'Cât trăiește {R}?', contexts: [] },
    { stem: 'de-ce-nu-mananca', titlu: 'De ce nu mănâncă {R}?', contexts: [] },
    { stem: 'de-ce-e-apatic', titlu: 'De ce e apatic {R}?', contexts: [] },
    { stem: 'ce-boli-are', titlu: 'Ce boli frecvente are {R}?', contexts: [] },
    { stem: 'de-ce-naparleste', titlu: 'De ce năpârlește {R}?', contexts: [] },
  ],
};

const Q_INGRIJIRE = {
  caini: [
    { stem: 'cum-il-speli', titlu: 'Cum speli câinele?', contexts: [] },
    { stem: 'cat-de-des-se-spala', titlu: 'Cât de des se spală câinele?', contexts: [] },
    { stem: 'cum-ii-tai-unghiile', titlu: 'Cum tai unghiile la câine?', contexts: [] },
    { stem: 'cum-ii-cureti-urechile', titlu: 'Cum cureți urechile câinelui?', contexts: [] },
    { stem: 'cum-ii-cureti-dintii', titlu: 'Cum cureți dinții câinelui?', contexts: [] },
    { stem: 'cum-il-periezi', titlu: 'Cum periezi câinele?', contexts: [] },
    { stem: 'ce-cusca-ii-trebuie', titlu: 'Ce cușcă îi trebuie câinelui?', contexts: [] },
    { stem: 'cum-il-protejezi-de-cald', titlu: 'Cum protejezi câinele de căldură?', contexts: [] },
    { stem: 'cum-il-protejezi-de-frig', titlu: 'Cum protejezi câinele de frig?', contexts: [] },
    { stem: 'ce-accesorii-ii-trebuie', titlu: 'Ce accesorii îi trebuie câinelui?', contexts: [] },
    { stem: 'cum-amenajezi-locul-de-dormit', titlu: 'Cum amenajezi locul de dormit al câinelui?', contexts: [] },
    { stem: 'cum-il-transporti-cu-masina', titlu: 'Cum transporti câinele cu mașina?', contexts: [] },
    { stem: 'cand-se-tunde', titlu: 'Când se tunde câinele?', contexts: [] },
    { stem: 'cum-il-ingrijesti-vara', titlu: 'Cum îngrijești câinele vara?', contexts: [] },
    { stem: 'cum-il-ingrijesti-iarna', titlu: 'Cum îngrijești câinele iarna?', contexts: [] },
    { stem: 'cat-exercitiu-are-nevoie', titlu: 'Cât exercițiu are nevoie câinele?', contexts: [] },
    { stem: 'cat-de-des-il-plimbi', titlu: 'Cât de des plimbi câinele?', contexts: [] },
  ],
  pisici: [
    { stem: 'cum-o-speli', titlu: 'Cum speli pisica?', contexts: [] },
    { stem: 'cum-ii-tai-unghiile', titlu: 'Cum tai unghiile la pisică?', contexts: [] },
    { stem: 'cum-o-periezi', titlu: 'Cum periezi pisica?', contexts: [] },
    { stem: 'cum-ii-cureti-urechile', titlu: 'Cum cureți urechile pisicii?', contexts: [] },
    { stem: 'cum-ii-cureti-ochii', titlu: 'Cum cureți ochii pisicii?', contexts: [] },
    { stem: 'ce-litiera-e-buna', titlu: 'Ce litieră e bună pentru pisici?', contexts: [] },
    { stem: 'ce-nisip-e-bun', titlu: 'Ce nisip de litieră e bun?', contexts: [] },
    { stem: 'cum-schimbi-nisipul', titlu: 'Cum schimbi nisipul la litieră?', contexts: [] },
    { stem: 'ce-stalpuri-de-zgariat', titlu: 'Ce stâlpi de zgâriat să alegi?', contexts: [] },
    { stem: 'cum-amenajezi-spatiul', titlu: 'Cum amenajezi spațiul pentru pisică?', contexts: [] },
    { stem: 'cum-o-transporti', titlu: 'Cum transporti pisica la veterinar?', contexts: [] },
    { stem: 'cum-o-ingrijesti-vara', titlu: 'Cum îngrijești pisica vara?', contexts: [] },
    { stem: 'cum-o-ingrijesti-iarna', titlu: 'Cum îngrijești pisica iarna?', contexts: [] },
    { stem: 'de-ce-naparleste', titlu: 'De ce năpârlește pisica?', contexts: [] },
    { stem: 'cum-reduci-naparlirea', titlu: 'Cum reduci năpârlirea la pisici?', contexts: [] },
  ],
  rozatoare: [
    { stem: 'cum-ingrijesti', titlu: 'Cum îngrijești {R}?', contexts: [] },
    { stem: 'ce-cusca-ii-trebuie', titlu: 'Ce cușcă îi trebuie la {R}?', contexts: [] },
    { stem: 'cat-de-mare-sa-fie-cusca', titlu: 'Cât de mare să fie cușca la {R}?', contexts: [] },
    { stem: 'ce-asternut-e-bun', titlu: 'Ce așternut e bun pentru {R}?', contexts: [] },
    { stem: 'cum-cureti-cusca', titlu: 'Cum cureți cușca la {R}?', contexts: [] },
    { stem: 'ce-jucarii-ii-trebuie', titlu: 'Ce jucării îi trebuie la {R}?', contexts: [] },
    { stem: 'poate-fi-liber-in-casa', titlu: 'Poate fi liber în casă {R}?', contexts: [] },
    { stem: 'ce-temperatura-ii-trebuie', titlu: 'Ce temperatură îi trebuie la {R}?', contexts: [] },
    { stem: 'cum-il-speli', titlu: 'Cum speli {R}?', contexts: [] },
    { stem: 'cum-ii-tai-unghiile', titlu: 'Cum tai unghiile la {R}?', contexts: [] },
  ],
  pasari: [
    { stem: 'ce-colivie-ii-trebuie', titlu: 'Ce colivie îi trebuie la {R}?', contexts: [] },
    { stem: 'cat-de-mare-sa-fie-colivia', titlu: 'Cât de mare să fie colivia la {R}?', contexts: [] },
    { stem: 'cum-cureti-colivia', titlu: 'Cum cureți colivia la {R}?', contexts: [] },
    { stem: 'ce-jucarii-ii-trebuie', titlu: 'Ce jucării îi trebuie la {R}?', contexts: [] },
    { stem: 'ce-temperatura-ii-trebuie', titlu: 'Ce temperatură îi trebuie la {R}?', contexts: [] },
    { stem: 'cum-il-speli', titlu: 'Cum speli {R}?', contexts: [] },
    { stem: 'poate-fi-liber-in-casa', titlu: 'Poate fi liber în casă {R}?', contexts: [] },
    { stem: 'cum-ii-tai-unghiile', titlu: 'Cum tai unghiile la {R}?', contexts: [] },
  ],
  exotice: [
    { stem: 'ce-terariu-ii-trebuie', titlu: 'Ce terariu îi trebuie la {R}?', contexts: [] },
    { stem: 'ce-temperatura-ii-trebuie', titlu: 'Ce temperatură îi trebuie la {R}?', contexts: [] },
    { stem: 'ce-umiditate-ii-trebuie', titlu: 'Ce umiditate îi trebuie la {R}?', contexts: [] },
    { stem: 'ce-substrat-e-bun', titlu: 'Ce substrat e bun pentru {R}?', contexts: [] },
    { stem: 'cum-cureti-terariuul', titlu: 'Cum cureți terariuul la {R}?', contexts: [] },
    { stem: 'ce-iluminare-ii-trebuie', titlu: 'Ce iluminare îi trebuie la {R}?', contexts: [] },
    { stem: 'cum-il-mangai', titlu: 'Cum mângâi {R}?', contexts: [] },
  ],
};

const Q_DRESAJ = {
  caini: [
    { stem: 'cum-il-inveti-sa-stea', titlu: 'Cum înveți câinele să stea?', contexts: [] },
    { stem: 'cum-il-inveti-sa-vina', titlu: 'Cum înveți câinele să vină la chemare?', contexts: [] },
    { stem: 'cum-il-inveti-sa-dea-laba', titlu: 'Cum înveți câinele să dea laba?', contexts: [] },
    { stem: 'cum-il-inveti-sa-nu-traga-de-lesa', titlu: 'Cum înveți câinele să nu tragă de lesă?', contexts: [] },
    { stem: 'cum-il-inveti-sa-faca-afara', titlu: 'Cum înveți câinele să facă afară?', contexts: [] },
    { stem: 'cum-il-inveti-sa-nu-sara', titlu: 'Cum înveți câinele să nu sară pe oameni?', contexts: [] },
    { stem: 'cum-il-inveti-sa-nu-latre', titlu: 'Cum înveți câinele să nu latre?', contexts: [] },
    { stem: 'cum-il-inveti-sa-nu-muste', titlu: 'Cum înveți câinele să nu muste?', contexts: [] },
    { stem: 'cum-il-socializezi', titlu: 'Cum socializezi câinele?', contexts: ['cu-alti-caini', 'cu-oameni', 'cu-pisici'] },
    { stem: 'cum-rezolvi-anxietatea-de-separare', titlu: 'Cum rezolvi anxietatea de separare la câini?', contexts: [] },
    { stem: 'cum-il-inveti-sa-mearga-in-cusca', titlu: 'Cum înveți câinele să meargă în cușcă?', contexts: [] },
    { stem: 'cum-il-inveti-culcat', titlu: 'Cum înveți câinele comanda culcat?', contexts: [] },
    { stem: 'la-ce-varsta-incepi-dresajul', titlu: 'La ce vârstă începi dresajul câinelui?', contexts: [] },
    { stem: 'cum-il-inveti-sa-nu-sara-pe-canapeaua', titlu: 'Cum înveți câinele să nu urce pe canapea?', contexts: [] },
    { stem: 'cum-il-inveti-sa-astepte', titlu: 'Cum înveți câinele să aștepte?', contexts: [] },
    { stem: 'dresaj-cu-clicker', titlu: 'Cum funcționează dresajul cu clicker?', contexts: [] },
    { stem: 'cum-il-inveti-sa-se-plimbe-fara-lesa', titlu: 'Cum înveți câinele să se plimbe fără lesă?', contexts: [] },
  ],
  pisici: [
    { stem: 'cum-o-inveti-sa-foloseasca-litiera', titlu: 'Cum înveți pisica să folosească litiera?', contexts: [] },
    { stem: 'cum-o-inveti-sa-nu-zgarie', titlu: 'Cum înveți pisica să nu zgârie mobila?', contexts: [] },
    { stem: 'cum-o-inveti-sa-vina', titlu: 'Cum înveți pisica să vină la chemare?', contexts: [] },
    { stem: 'cum-o-inveti-sa-nu-urce-pe-masa', titlu: 'Cum înveți pisica să nu urce pe masă?', contexts: [] },
    { stem: 'cum-o-inveti-sa-nu-muste', titlu: 'Cum înveți pisica să nu muste?', contexts: [] },
    { stem: 'cum-o-socializezi', titlu: 'Cum socializezi pisica?', contexts: ['cu-alte-pisici', 'cu-caini', 'cu-copii'] },
    { stem: 'cum-o-inveti-trucuri', titlu: 'Cum înveți pisica trucuri?', contexts: [] },
    { stem: 'cum-o-inveti-sa-mearga-cu-lesa', titlu: 'Cum înveți pisica să meargă cu lesa?', contexts: [] },
    { stem: 'cum-o-obisnuiesti-cu-casa-noua', titlu: 'Cum obișnuiești pisica cu casa nouă?', contexts: [] },
    { stem: 'la-ce-varsta-incepi-dresajul', titlu: 'La ce vârstă începi dresajul pisicii?', contexts: [] },
    { stem: 'cum-rezolvi-agresivitatea', titlu: 'Cum rezolvi agresivitatea la pisici?', contexts: [] },
    { stem: 'cum-o-inveti-sa-nu-sara-pe-tejghea', titlu: 'Cum înveți pisica să nu sară pe tejghea?', contexts: [] },
  ],
  rozatoare: [
    { stem: 'cum-il-imblanzesti', titlu: 'Cum îmblânzești {R}?', contexts: [] },
    { stem: 'cum-il-inveti-sa-vina', titlu: 'Cum înveți {R} să vină la chemare?', contexts: [] },
    { stem: 'cum-il-obisnuiesti-cu-tine', titlu: 'Cum obișnuiești {R} cu tine?', contexts: [] },
    { stem: 'cum-il-inveti-trucuri', titlu: 'Cum înveți {R} trucuri?', contexts: [] },
    { stem: 'poate-fi-dresat', titlu: 'Poate fi dresat {R}?', contexts: [] },
    { stem: 'cum-il-ridici-corect', titlu: 'Cum ridici corect {R}?', contexts: [] },
  ],
  pasari: [
    { stem: 'cum-il-imblanzesti', titlu: 'Cum îmblânzești {R}?', contexts: [] },
    { stem: 'cum-il-inveti-sa-vorbeasca', titlu: 'Cum înveți {R} să vorbească?', contexts: [] },
    { stem: 'cum-il-inveti-sa-urce-pe-mana', titlu: 'Cum înveți {R} să urce pe mână?', contexts: [] },
    { stem: 'cum-il-inveti-trucuri', titlu: 'Cum înveți {R} trucuri?', contexts: [] },
    { stem: 'cum-il-socializezi', titlu: 'Cum socializezi {R}?', contexts: [] },
    { stem: 'cum-il-obisnuiesti-cu-casa', titlu: 'Cum obișnuiești {R} cu casa?', contexts: [] },
  ],
  exotice: [
    { stem: 'cum-il-imblanzesti', titlu: 'Cum îmblânzești {R}?', contexts: [] },
    { stem: 'cum-il-obisnuiesti-cu-tine', titlu: 'Cum obișnuiești {R} cu tine?', contexts: [] },
    { stem: 'poate-fi-dresat', titlu: 'Poate fi dresat {R}?', contexts: [] },
    { stem: 'cum-il-ridici-corect', titlu: 'Cum ridici corect {R}?', contexts: [] },
  ],
};

// Extra info questions for breed pages (general knowledge)
const Q_INFO_CAINI = [
  { stem: 'cat-traieste', titlu: 'Cât trăiește câinele?', contexts: [] },
  { stem: 'cati-ani-traieste', titlu: 'Câți ani trăiește câinele?', contexts: [] },
  { stem: 'cat-cantareste', titlu: 'Cât cântărește câinele?', contexts: [] },
  { stem: 'cat-creste', titlu: 'Cât crește câinele?', contexts: [] },
  { stem: 'cat-de-mare-devine', titlu: 'Cât de mare devine câinele?', contexts: [] },
  { stem: 'cate-ore-doarme', titlu: 'Câte ore doarme câinele?', contexts: [] },
  { stem: 'e-potrivit-pentru-apartament', titlu: 'Este câinele potrivit pentru apartament?', contexts: [] },
  { stem: 'e-potrivit-pentru-copii', titlu: 'Este câinele potrivit pentru copii?', contexts: [] },
  { stem: 'naparleste-mult', titlu: 'Năpârlește mult câinele?', contexts: [] },
  { stem: 'cat-costa', titlu: 'Cât costă câinele?', contexts: [] },
  { stem: 'de-cat-spatiu-are-nevoie', titlu: 'De cât spațiu are nevoie câinele?', contexts: [] },
  { stem: 'ce-temperament-are', titlu: 'Ce temperament are câinele?', contexts: [] },
  { stem: 'e-usor-de-dresat', titlu: 'Este ușor de dresat câinele?', contexts: [] },
  { stem: 'poate-sta-singur-acasa', titlu: 'Poate sta singur acasă câinele?', contexts: [] },
  { stem: 'se-intelege-cu-pisicile', titlu: 'Se înțelege cu pisicile câinele?', contexts: [] },
  { stem: 'e-bun-de-paza', titlu: 'Este bun de pază câinele?', contexts: [] },
];

const Q_INFO_PISICI = [
  { stem: 'cat-traieste', titlu: 'Cât trăiește pisica?', contexts: [] },
  { stem: 'cati-ani-traieste', titlu: 'Câți ani trăiește pisica?', contexts: [] },
  { stem: 'cat-cantareste', titlu: 'Cât cântărește pisica?', contexts: [] },
  { stem: 'cat-creste', titlu: 'Cât crește pisica?', contexts: [] },
  { stem: 'cate-ore-doarme', titlu: 'Câte ore doarme pisica?', contexts: [] },
  { stem: 'e-potrivita-pentru-apartament', titlu: 'Este pisica potrivită pentru apartament?', contexts: [] },
  { stem: 'e-potrivita-pentru-copii', titlu: 'Este pisica potrivită pentru copii?', contexts: [] },
  { stem: 'naparleste-mult', titlu: 'Năpârlește mult pisica?', contexts: [] },
  { stem: 'cat-costa', titlu: 'Cât costă pisica?', contexts: [] },
  { stem: 'ce-temperament-are', titlu: 'Ce temperament are pisica?', contexts: [] },
  { stem: 'poate-sta-singura-acasa', titlu: 'Poate sta singură acasă pisica?', contexts: [] },
  { stem: 'se-intelege-cu-cainii', titlu: 'Se înțelege cu câinii pisica?', contexts: [] },
  { stem: 'e-pretentioasa', titlu: 'Este pretențioasă pisica?', contexts: [] },
];

// Add info questions as a 6th subcategory mapped to ingrijire for page routing
// Actually add them to existing subcategories to maintain structure
Q_INGRIJIRE.caini.push(...Q_INFO_CAINI);
Q_INGRIJIRE.pisici.push(...Q_INFO_PISICI);

const ALL_Q = {
  comportament: Q_COMPORTAMENT,
  hrana: Q_HRANA,
  sanatate: Q_SANATATE,
  ingrijire: Q_INGRIJIRE,
  dresaj: Q_DRESAJ,
};

import { generateUniqueContent } from './content-engine.mjs';

// ═══════════════════════════════════════════════════════════════
// SLUG GENERATOR - derives URL slug from title
// ═══════════════════════════════════════════════════════════════

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\?/g, '')
    .replace(/[ăâ]/g, 'a')
    .replace(/[î]/g, 'i')
    .replace(/[ș]/g, 's')
    .replace(/[ț]/g, 't')
    .replace(/[é]/g, 'e')
    .replace(/[ó]/g, 'o')
    .replace(/[ú]/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

// ═══════════════════════════════════════════════════════════════
// CONTENT GENERATORS (now delegated to content-engine.mjs)
// ═══════════════════════════════════════════════════════════════

// Legacy CONTENT_DATA kept for specific high-priority topics
const CONTENT_DATA = {
  // ── COMPORTAMENT ──
  'caini-comportament-latra': {
    cauze: [
      { titlu: 'Apărare teritorială', text: 'Câinele avertizează că cineva sau ceva se apropie de spațiul lui.' },
      { titlu: 'Anxietate sau frică', text: 'Stresul, zgomotele puternice sau situațiile noi pot declanșa lătratul.' },
      { titlu: 'Plictiseală', text: 'Lipsa stimulării fizice și mentale duce la lătrat excesiv.' },
      { titlu: 'Comunicare', text: 'Câinele încearcă să îți transmită o nevoie: foame, sete, nevoia de a ieși afară.' },
      { titlu: 'Atenție', text: 'A învățat că lătratul îi aduce reacție din partea ta.' },
    ],
    solutii: [
      'Identifică declanșatorul și elimină-l sau atenuează-l treptat.',
      'Nu răspunde lătratului cu strigăte - câinele interpretează asta ca pe o confirmare.',
      'Folosește comanda "liniște" cu recompensă imediat ce se oprește.',
      'Asigură exercițiu fizic suficient - un câine obosit latră mai puțin.',
      'Dacă persistă, consultă un specialist în comportament canin.',
    ],
  },
  'caini-comportament-musca': {
    cauze: [
      { titlu: 'Joc și explorare', text: 'Puii de câine explorează lumea cu gura. La adulți, poate fi un mod de joacă necorectat.' },
      { titlu: 'Dentiție', text: 'Puii care își schimbă dinții au nevoie să roadă ceva pentru a-și calma gingiile.' },
      { titlu: 'Frică sau durere', text: 'Un câine care mușcă defensiv poate fi speriat sau are o problemă medicală.' },
      { titlu: 'Frustrare', text: 'Energie neeliberată sau stimulare insuficientă pot duce la mușcături de frustrare.' },
    ],
    solutii: [
      'Oferă jucării de ros potrivite vârstei și taliei.',
      'Oprește jocul imediat când mușcă - învață că mușcătura oprește distracția.',
      'Nu folosi mâinile ca jucării niciodată.',
      'La puii de câine, redirecționează mușcătura spre o jucărie.',
      'Dacă mușcă din agresivitate, consultă un veterinar pentru a exclude durerea.',
    ],
  },
};

// Fallback content generator when specific topic data doesn't exist
function generateContentForTopic(animalSlug, subcatSlug, questionStem, animalNume, rasaNume) {
  const subject = rasaNume || animalNume;
  const subcatNume = SUBCATEGORII_TEMPLATE[subcatSlug]?.nume || subcatSlug;

  // Generate contextual content based on subcategory type
  if (subcatSlug === 'comportament') {
    return generateComportamentContent(subject, questionStem, animalSlug, rasaNume);
  } else if (subcatSlug === 'hrana') {
    return generateHranaContent(subject, questionStem, animalSlug, rasaNume);
  } else if (subcatSlug === 'sanatate') {
    return generateSanatateContent(subject, questionStem, animalSlug, rasaNume);
  } else if (subcatSlug === 'ingrijire') {
    return generateIngrijireContent(subject, questionStem, animalSlug, rasaNume);
  } else if (subcatSlug === 'dresaj') {
    return generateDresajContent(subject, questionStem, animalSlug, rasaNume);
  }

  // Default
  return {
    sectiuni: [
      {
        titlu: 'Ce trebuie să știi',
        tip: 'lista',
        items: [
          { text: `Aceasta este o întrebare frecventă despre ${subject.toLowerCase()}.` },
          { text: 'Răspunsul depinde de mai mulți factori specifici fiecărui animal.' },
          { text: 'Consultă un specialist pentru sfaturi personalizate.' },
        ],
      },
    ],
  };
}

function generateComportamentContent(subject, stem, animalSlug, rasaNume) {
  const stemClean = stem.replace(/-/g, ' ');
  const isBreed = !!rasaNume;
  const breedNote = isBreed ? ` Rasa ${rasaNume} poate avea predispoziții specifice legate de acest comportament.` : '';

  return {
    sectiuni: [
      {
        titlu: 'Cauze posibile',
        tip: 'lista',
        items: [
          { titlu: 'Instinct natural', text: `Multe comportamente sunt moștenite genetic și au rolul de a comunica sau proteja.${breedNote}` },
          { titlu: 'Stres sau anxietate', text: 'Schimbările din mediu, zgomotele sau absența stăpânului pot modifica comportamentul.' },
          { titlu: 'Probleme medicale', text: 'Uneori un comportament neobișnuit semnalează durere sau disconfort fizic.' },
          { titlu: 'Lipsa stimulării', text: 'Un animal plictisit sau fără activitate suficientă poate dezvolta comportamente nedorite.' },
        ],
      },
      {
        titlu: 'Ce poți face',
        tip: 'pasi',
        items: [
          { text: 'Observă în ce momente apare comportamentul și ce îl declanșează.' },
          { text: 'Asigură un program regulat de activitate fizică și stimulare mentală.' },
          { text: 'Nu pedepsi comportamentul - redirecționează-l spre o alternativă acceptabilă.' },
          { text: 'Dacă comportamentul apare brusc sau se intensifică, programează un control veterinar.' },
        ],
      },
    ],
  };
}

function generateHranaContent(subject, stem, animalSlug, rasaNume) {
  const isPoate = stem.includes('poate');
  const isCe = stem.startsWith('ce-');
  const isCat = stem.startsWith('cat-');
  const breedNote = rasaNume ? ` ${rasaNume} poate avea sensibilități alimentare specifice rasei.` : '';

  if (isPoate) {
    return {
      sectiuni: [
        {
          titlu: 'Răspuns scurt',
          tip: 'text',
          items: [
            { text: `Verifică întotdeauna cu veterinarul înainte de a introduce un aliment nou în dieta animalului tău.${breedNote}` },
          ],
        },
        {
          titlu: 'Cantitate și frecvență',
          tip: 'lista',
          items: [
            { text: 'Introdu orice aliment nou treptat, în cantități mici.' },
            { text: 'Observă reacția timp de 24-48 de ore.' },
            { text: 'Unele alimente sunt sigure ca gustare ocazională dar nu ca bază a dietei.' },
          ],
        },
        {
          titlu: 'Semne de intoleranță',
          tip: 'lista',
          items: [
            { text: 'Vărsături sau diaree după consum.' },
            { text: 'Mâncărime sau iritații ale pielii.' },
            { text: 'Letargie sau refuzul mâncării ulterioare.' },
          ],
        },
      ],
    };
  }

  return {
    sectiuni: [
      {
        titlu: 'Alimentație recomandată',
        tip: 'lista',
        items: [
          { text: `Dieta trebuie adaptată vârstei, greutății și nivelului de activitate.${breedNote}` },
          { text: 'Hrană de calitate cu proteine ca ingredient principal.' },
          { text: 'Apă proaspătă disponibilă permanent.' },
          { text: 'Gustări sănătoase - maxim 10% din aportul caloric zilnic.' },
        ],
      },
      {
        titlu: 'Alimente de evitat',
        tip: 'lista',
        items: [
          { text: 'Ciocolată, cafea, ceapă, usturoi - toxice pentru majoritatea animalelor.' },
          { text: 'Alimente procesate, condimentate sau cu zahăr adăugat.' },
          { text: 'Oase mici care se pot sparge și cauza blocaje sau perforații.' },
        ],
      },
    ],
  };
}

function generateSanatateContent(subject, stem, animalSlug, rasaNume) {
  const breedNote = rasaNume ? ` ${rasaNume} poate fi predispus la anumite afecțiuni genetice.` : '';

  return {
    sectiuni: [
      {
        titlu: 'Cauze frecvente',
        tip: 'lista',
        items: [
          { titlu: 'Infecții', text: 'Bacteriene, virale sau fungice - necesită diagnostic veterinar.' },
          { titlu: 'Paraziți', text: 'Interni (viermi) sau externi (purici, căpușe) pot cauza simptome variate.' },
          { titlu: 'Alimentație necorespunzătoare', text: `O dietă dezechilibrată poate cauza probleme pe termen lung.${breedNote}` },
          { titlu: 'Stres', text: 'Schimbările de mediu sau rutină afectează sistemul imunitar.' },
        ],
      },
      {
        titlu: 'Când mergi la veterinar',
        tip: 'lista',
        items: [
          { text: 'Simptomele persistă mai mult de 24-48 de ore.' },
          { text: 'Animalul refuză mâncarea și apa.' },
          { text: 'Observi sânge în scaun, urină sau vărsătură.' },
          { text: 'Comportament brusc schimbat: letargie, agitație sau agresivitate.' },
        ],
      },
    ],
  };
}

function generateIngrijireContent(subject, stem, animalSlug, rasaNume) {
  const breedNote = rasaNume ? ` Cerințele pot varia pentru ${rasaNume}.` : '';

  return {
    sectiuni: [
      {
        titlu: 'Pași practici',
        tip: 'pasi',
        items: [
          { text: `Stabilește o rutină zilnică de îngrijire adaptată nevoilor animalului.${breedNote}` },
          { text: 'Folosește produse specifice speciei - nu folosi produse umane.' },
          { text: 'Începe cu sesiuni scurte și crește treptat durata.' },
          { text: 'Recompensează cooperarea pentru a transforma îngrijirea într-o experiență pozitivă.' },
        ],
      },
      {
        titlu: 'Frecvență recomandată',
        tip: 'lista',
        items: [
          { text: 'Periajul - zilnic pentru blănuri lungi, săptămânal pentru cele scurte.' },
          { text: 'Baia - doar când e necesar, nu prea frecvent.' },
          { text: 'Unghiile - la 2-4 săptămâni sau când se aud pe podea.' },
          { text: 'Controlul urechilor și ochilor - săptămânal.' },
        ],
      },
    ],
  };
}

function generateDresajContent(subject, stem, animalSlug, rasaNume) {
  const breedNote = rasaNume ? ` ${rasaNume} are un temperament specific care influențează viteza de învățare.` : '';

  return {
    sectiuni: [
      {
        titlu: 'Metoda pas cu pas',
        tip: 'pasi',
        items: [
          { text: `Alege un moment în care animalul e calm și atent.${breedNote}` },
          { text: 'Folosește recompense mici (gustări sau laudă vocală) imediat după comportamentul corect.' },
          { text: 'Repetă sesiuni scurte de 5-10 minute, de 2-3 ori pe zi.' },
          { text: 'Nu pedepsi greșelile - ignoră și recompensează alternativa corectă.' },
          { text: 'Fii consistent - toți membrii familiei trebuie să folosească aceleași comenzi.' },
        ],
      },
      {
        titlu: 'Greșeli de evitat',
        tip: 'lista',
        items: [
          { text: 'Sesiuni prea lungi care duc la oboseală și frustrare.' },
          { text: 'Pedepse fizice care distrug încrederea animalului.' },
          { text: 'Inconsistență în comenzi sau reguli.' },
          { text: 'Așteptări nerealiste - fiecare animal învață în ritmul lui.' },
        ],
      },
    ],
  };
}

// ═══════════════════════════════════════════════════════════════
// INTRO & CONCLUSION GENERATORS
// ═══════════════════════════════════════════════════════════════

const INTRO_TEMPLATES = {
  comportament: [
    (s, t) => `${t} Dacă te întrebi de ce se întâmplă asta, cauzele pot fi multiple - de la instinct la probleme de sănătate.`,
    (s, t) => `${t} Este o întrebare pe care și-o pun mulți proprietari. Răspunsul ține de context, vârstă și temperament.`,
    (s, t) => `${t} Acest comportament are explicații clare, iar în cele mai multe cazuri poate fi gestionat.`,
  ],
  hrana: [
    (s, t) => `${t} Alimentația corectă face diferența între un animal sănătos și unul cu probleme. Citește mai departe pentru un răspuns concret.`,
    (s, t) => `${t} Nu toate alimentele sunt sigure pentru animale. Verifică lista de mai jos.`,
    (s, t) => `${t} Dieta influențează energia, blana, digestia și longevitatea animalului tău.`,
  ],
  sanatate: [
    (s, t) => `${t} Cauzele pot fi variate, de la probleme minore la afecțiuni care necesită intervenție veterinară.`,
    (s, t) => `${t} Acest simptom apare frecvent și are mai multe explicații posibile.`,
    (s, t) => `${t} Nu ignora semnele - o depistare timpurie face tratamentul mult mai eficient.`,
  ],
  ingrijire: [
    (s, t) => `${t} O îngrijire corectă previne problemele de sănătate și menține animalul confortabil.`,
    (s, t) => `${t} Procedura e simplă dacă o faci regulat și cu răbdare.`,
    (s, t) => `${t} Cu câteva minute pe zi, poți face o diferență mare în viața animalului tău.`,
  ],
  dresaj: [
    (s, t) => `${t} Dresajul eficient se bazează pe recompense pozitive și consistență, nu pe pedepse.`,
    (s, t) => `${t} Cu metoda potrivită, rezultatele apar în câteva săptămâni de practică zilnică.`,
    (s, t) => `${t} Orice animal poate învăța dacă metoda e adaptată temperamentului și vârstei lui.`,
  ],
};

const CONCLUZIE_TEMPLATES = {
  comportament: [
    (s) => `Dacă comportamentul persistă sau se agravează, un medic veterinar poate exclude cauzele medicale.`,
    (s) => `Răbdarea și observația atentă rezolvă cele mai multe probleme comportamentale. Caută ajutor profesional dacă situația nu se îmbunătățește.`,
  ],
  hrana: [
    (s) => `Alimentația trebuie adaptată individual. Veterinarul poate recomanda o dietă specifică dacă apar probleme.`,
    (s) => `O dietă echilibrată și constantă e baza sănătății. Evită schimbările bruște de hrană.`,
  ],
  sanatate: [
    (s) => `Nu amâna vizita la veterinar dacă simptomele persistă mai mult de 24-48 de ore sau dacă se agravează brusc.`,
    (s) => `Prevenția prin vaccinuri, deparazitare și controale regulate costă mai puțin decât tratamentul.`,
  ],
  ingrijire: [
    (s) => `Rutina de îngrijire se construiește treptat. Începe cu sesiuni scurte și crește durata pe măsură ce animalul se obișnuiește.`,
    (s) => `Un animal bine îngrijit e un animal sănătos. Investiția de timp se vede în calitatea vieții lui.`,
  ],
  dresaj: [
    (s) => `Consistența e cheia. Sesiuni scurte zilnice dau rezultate mai bune decât antrenamente lungi ocazionale.`,
    (s) => `Dacă nu observi progres după câteva săptămâni de practică constantă, un specialist în comportament poate ajuta.`,
  ],
};

// ═══════════════════════════════════════════════════════════════
// QUESTION GENERATION ENGINE
// ═══════════════════════════════════════════════════════════════

function generateIntrebari(animalSlug) {
  const animal = ANIMALE.find(a => a.slug === animalSlug);
  const rase = RASE[animalSlug] || [];
  const intrebari = [];
  const slugSet = new Set();

  for (const subcatSlug of animal.subcategorii) {
    const questions = ALL_Q[subcatSlug]?.[animalSlug] || [];
    const needsSpecies = ['rozatoare', 'pasari', 'exotice'].includes(animalSlug);

    for (const q of questions) {
      // For caini/pisici: base question + breed variations
      // For rozatoare/pasari/exotice: species-specific questions only
      if (needsSpecies && q.titlu.includes('{R}')) {
        for (const rasa of rase) {
          const titlu = q.titlu.replace(/\{R\}/g, rasa.nume);
          const slug = slugify(titlu);
          if (slugSet.has(slug)) continue;
          slugSet.add(slug);
          intrebari.push(buildIntrebare(slug, titlu, animalSlug, subcatSlug, rasa.nume, q, rase, slugSet));

          for (const ctx of q.contexts) {
            const ctxLabel = ctx.replace(/-/g, ' ');
            const ctxTitlu = titlu.replace('?', ` ${ctxLabel}?`);
            const ctxSlug = slugify(ctxTitlu);
            if (slugSet.has(ctxSlug)) continue;
            slugSet.add(ctxSlug);
            intrebari.push(buildIntrebare(ctxSlug, ctxTitlu, animalSlug, subcatSlug, rasa.nume, q, rase, slugSet));
          }
        }
      } else {
        // Base question
        const baseSlug = slugify(q.titlu);
        if (!slugSet.has(baseSlug)) {
          slugSet.add(baseSlug);
          intrebari.push(buildIntrebare(baseSlug, q.titlu, animalSlug, subcatSlug, null, q, rase, slugSet));
        }

        // Context variations
        for (const ctx of q.contexts) {
          const ctxLabel = ctx.replace(/-/g, ' ');
          const ctxTitlu = q.titlu.replace('?', ` ${ctxLabel}?`);
          const ctxSlug = slugify(ctxTitlu);
          if (slugSet.has(ctxSlug)) continue;
          slugSet.add(ctxSlug);
          intrebari.push(buildIntrebare(ctxSlug, ctxTitlu, animalSlug, subcatSlug, null, q, rase, slugSet));
        }

        // Breed variations for caini/pisici
        if (['caini', 'pisici'].includes(animalSlug)) {
          const breedQuestionStems = getBreedApplicableStems(subcatSlug, animalSlug);
          if (breedQuestionStems.includes(q.stem)) {
            for (const rasa of rase) {
              const rasaTitlu = animalSlug === 'pisici'
                ? q.titlu
                    .replace('pisica', `o ${rasa.nume}`)
                    .replace('pisicii', `unei ${rasa.nume}`)
                : q.titlu
                    .replace('câinele', `un ${rasa.nume}`)
                    .replace('câinelui', `unui ${rasa.nume}`);
              const rasaSlug = slugify(rasaTitlu);
              if (slugSet.has(rasaSlug)) continue;
              slugSet.add(rasaSlug);
              intrebari.push(buildIntrebare(rasaSlug, rasaTitlu, animalSlug, subcatSlug, rasa.nume, q, rase, slugSet));
            }
          }

          // Age-specific breed variations
          const ageStems = getAgeApplicableStems(subcatSlug);
          if (ageStems.includes(q.stem)) {
            for (const rasa of rase) {
              // Pui
              const puiTitlu = q.titlu
                .replace('câinele', `un pui de ${rasa.nume}`)
                .replace('pisica', `un pui de ${rasa.nume}`)
                .replace('câinelui', `puiului de ${rasa.nume}`)
                .replace('pisicii', `puiului de ${rasa.nume}`);
              const puiSlug = slugify(puiTitlu);
              if (!slugSet.has(puiSlug)) {
                slugSet.add(puiSlug);
                intrebari.push(buildIntrebare(puiSlug, puiTitlu, animalSlug, subcatSlug, rasa.nume, q, rase, slugSet));
              }

              // Batran
              const batranTitlu = q.titlu
                .replace('câinele', `un ${rasa.nume} bătrân`)
                .replace('pisica', `o ${rasa.nume} bătrână`)
                .replace('câinelui', `la un ${rasa.nume} bătrân`)
                .replace('pisicii', `la o ${rasa.nume} bătrână`);
              const batranSlug = slugify(batranTitlu);
              if (!slugSet.has(batranSlug)) {
                slugSet.add(batranSlug);
                intrebari.push(buildIntrebare(batranSlug, batranTitlu, animalSlug, subcatSlug, rasa.nume, q, rase, slugSet));
              }
            }
          }
        }
      }
    }
  }

  return intrebari;
}

function getAgeApplicableStems(subcatSlug) {
  // Questions that make sense with age variants (pui/batran)
  const map = {
    comportament: ['de-ce-latra', 'de-ce-musca', 'de-ce-tremura', 'de-ce-nu-mananca', 'de-ce-plange',
      'de-ce-toarce', 'de-ce-miauna', 'de-ce-doarme-mult', 'de-ce-nu-doarme-noaptea'],
    hrana: ['ce-mananca', 'cat-mananca-pe-zi', 'ce-nu-are-voie-sa-manance', 'de-cate-ori-pe-zi-mananca',
      'ce-hrana-uscata-e-buna', 'poate-bea-lapte'],
    sanatate: ['de-ce-vomita', 'de-ce-are-diaree', 'semne-ca-e-bolnav', 'semne-ca-e-bolnava',
      'cand-se-vaccineaza', 'de-ce-tuseste', 'de-ce-tremura-si-gafaie'],
    ingrijire: ['cum-il-speli', 'cum-o-speli', 'cat-exercitiu-are-nevoie', 'cum-il-periezi', 'cum-o-periezi',
      'cat-de-des-il-plimbi', 'cate-ore-doarme'],
    dresaj: ['cum-il-inveti-sa-stea', 'cum-il-inveti-sa-vina', 'cum-il-inveti-sa-faca-afara',
      'cum-il-socializezi', 'cum-o-inveti-sa-foloseasca-litiera', 'cum-o-socializezi'],
  };
  return map[subcatSlug] || [];
}

function getBreedApplicableStems(subcatSlug, animalSlug) {
  // ALL question stems get breed variations for dogs and cats
  // This is the main volume multiplier
  const questions = ALL_Q[subcatSlug]?.[animalSlug] || [];
  return questions.map(q => q.stem);
}

function buildIntrebare(slug, titlu, animalSlug, subcatSlug, rasaNume, questionDef, allRase, slugSet) {
  const animal = ANIMALE.find(a => a.slug === animalSlug);
  const seed = `${animalSlug}-${subcatSlug}-${slug}`;

  // Determine breed slug and age/context from the slug
  let rasaSlug = null;
  let context = null;
  let ageSuffix = null;

  if (rasaNume) {
    // Find the breed slug from RASE
    const raseList = RASE[animalSlug] || [];
    const rasa = raseList.find(r => r.nume === rasaNume);
    rasaSlug = rasa?.slug || null;
  }

  // Detect context by comparing title to base question title
  if (questionDef.contexts?.length) {
    const baseTitluLower = questionDef.titlu.toLowerCase().replace('?', '');
    const titluLower = titlu.toLowerCase().replace('?', '');
    if (titluLower !== baseTitluLower && !titluLower.includes('{r}')) {
      // Title has extra words compared to base = context variation
      for (const ctx of questionDef.contexts) {
        const ctxLabel = ctx.replace(/-/g, ' ');
        if (titluLower.includes(ctxLabel)) {
          context = ctx;
          break;
        }
      }
    }
  }

  // Detect age from title
  if (titlu.toLowerCase().includes('pui de') || titlu.toLowerCase().includes('puiului')) ageSuffix = 'pui';
  else if (titlu.toLowerCase().includes('bătrân') || titlu.toLowerCase().includes('bătrână')) ageSuffix = 'batran';

  // Generate unique content using the content engine
  const { intro, sectiuni, concluzie } = generateUniqueContent({
    titlu,
    animalSlug,
    subcatSlug,
    questionStem: questionDef.stem,
    rasaSlug,
    rasaNume,
    context,
    ageSuffix,
  });

  // Related questions - use slugified titles for proper linking
  const relate = [];
  // Add context variations of the same question
  for (const ctx of (questionDef.contexts || []).slice(0, 3)) {
    const ctxLabel = ctx.replace(/-/g, ' ');
    const relTitlu = questionDef.titlu.replace('?', ` ${ctxLabel}?`);
    const relSlug = slugify(relTitlu);
    if (relSlug !== slug) relate.push(relSlug);
  }
  // Add other questions from same subcategory
  const subcatQuestions = ALL_Q[subcatSlug]?.[animalSlug] || [];
  const hash = Math.abs(hashString(seed));
  for (let i = 0; i < 3; i++) {
    const idx = (hash + i) % subcatQuestions.length;
    const relQ = subcatQuestions[idx];
    if (!relQ) continue;
    const relSlug = slugify(relQ.titlu);
    if (relSlug !== slug && !relate.includes(relSlug)) {
      relate.push(relSlug);
    }
  }

  // Meta
  const metaTitle = titlu.length > 55
    ? titlu
    : `${titlu.replace('?', '')} - ${animal.numePlural}`;
  const metaDescription = intro.substring(0, 155).replace(/\.\s*$/, '') + '.';

  return {
    slug,
    titlu,
    animalSlug,
    subcategorieSlug: subcatSlug,
    ...(rasaNume ? { rasa: rasaNume } : {}),
    intro,
    sectiuni,
    concluzie,
    relate: relate.slice(0, 5),
    metaTitle,
    metaDescription,
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}

// ═══════════════════════════════════════════════════════════════
// SUBCATEGORY GENERATION
// ═══════════════════════════════════════════════════════════════

function generateSubcategorii() {
  const subcategorii = [];
  for (const animal of ANIMALE) {
    for (const subcatSlug of animal.subcategorii) {
      const template = SUBCATEGORII_TEMPLATE[subcatSlug];
      subcategorii.push({
        id: `${animal.slug}-${subcatSlug}`,
        slug: subcatSlug,
        nume: template.nume,
        animalSlug: animal.slug,
        animalNume: animal.numePlural,
        descriere: template.descriereTemplate(animal.numePlural.toLowerCase()),
        continut: template.continutTemplate(animal.nume, animal.numePlural),
        metaTitle: `${template.nume} ${animal.numePlural} - Întrebări și Răspunsuri`,
        metaDescription: template.descriereTemplate(animal.numePlural.toLowerCase()),
      });
    }
  }
  return subcategorii;
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════

console.log('Generating cuanimale.ro data...\n');

// 1. Animale
writeFileSync(resolve(dataDir, 'animale.json'), JSON.stringify(ANIMALE, null, 2));
console.log(`animale.json: ${ANIMALE.length} animale`);

// 2. Subcategorii
const subcategorii = generateSubcategorii();
writeFileSync(resolve(dataDir, 'subcategorii.json'), JSON.stringify(subcategorii, null, 2));
console.log(`subcategorii.json: ${subcategorii.length} subcategorii`);

// 3. Intrebari per animal
let totalIntrebari = 0;
for (const animal of ANIMALE) {
  const intrebari = generateIntrebari(animal.slug);
  const filename = `intrebari-${animal.slug}.json`;
  writeFileSync(resolve(dataDir, filename), JSON.stringify(intrebari, null, 2));
  console.log(`${filename}: ${intrebari.length} întrebări`);
  totalIntrebari += intrebari.length;
}

console.log(`\nTotal: ${totalIntrebari} pagini FAQ`);
console.log(`Total pagini estimate: ${totalIntrebari + ANIMALE.length + subcategorii.length + 10} (FAQ + pillar + subcategorii + static)`);
console.log('\nDone!');
