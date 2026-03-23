import type { Animal, Subcategorie, Intrebare } from './types';
import animaleData from '../data/animale.json';
import subcategoriiData from '../data/subcategorii.json';
import intrebariCaini from '../data/intrebari-caini.json';
import intrebariPisici from '../data/intrebari-pisici.json';
import intrebariRozatoare from '../data/intrebari-rozatoare.json';
import intrebariPasari from '../data/intrebari-pasari.json';
import intrebariExotice from '../data/intrebari-exotice.json';

export const animale: Animal[] = animaleData as Animal[];
export const subcategorii: Subcategorie[] = subcategoriiData as Subcategorie[];

const allIntrebari: Intrebare[] = [
  ...(intrebariCaini as Intrebare[]),
  ...(intrebariPisici as Intrebare[]),
  ...(intrebariRozatoare as Intrebare[]),
  ...(intrebariPasari as Intrebare[]),
  ...(intrebariExotice as Intrebare[]),
];

// Indexes for fast lookup
const intrebariByAnimal = new Map<string, Intrebare[]>();
const intrebariBySubcat = new Map<string, Intrebare[]>();
const intrebariByKey = new Map<string, Intrebare>();

for (const q of allIntrebari) {
  const animalKey = q.animalSlug;
  if (!intrebariByAnimal.has(animalKey)) intrebariByAnimal.set(animalKey, []);
  intrebariByAnimal.get(animalKey)!.push(q);

  const subcatKey = `${q.animalSlug}/${q.subcategorieSlug}`;
  if (!intrebariBySubcat.has(subcatKey)) intrebariBySubcat.set(subcatKey, []);
  intrebariBySubcat.get(subcatKey)!.push(q);

  const fullKey = `${q.animalSlug}/${q.subcategorieSlug}/${q.slug}`;
  intrebariByKey.set(fullKey, q);
}

export function getAnimalBySlug(slug: string): Animal | undefined {
  return animale.find(a => a.slug === slug);
}

export function getSubcategoriiForAnimal(animalSlug: string): Subcategorie[] {
  return subcategorii.filter(s => s.animalSlug === animalSlug);
}

export function getSubcategorieBySlug(animalSlug: string, subcatSlug: string): Subcategorie | undefined {
  return subcategorii.find(s => s.animalSlug === animalSlug && s.slug === subcatSlug);
}

export function getIntrebariForSubcategorie(animalSlug: string, subcatSlug: string): Intrebare[] {
  return intrebariBySubcat.get(`${animalSlug}/${subcatSlug}`) || [];
}

export function getIntrebariForAnimal(animalSlug: string): Intrebare[] {
  return intrebariByAnimal.get(animalSlug) || [];
}

export function getIntrebare(animalSlug: string, subcatSlug: string, intrebareSlug: string): Intrebare | undefined {
  return intrebariByKey.get(`${animalSlug}/${subcatSlug}/${intrebareSlug}`);
}

export function getAllIntrebari(): Intrebare[] {
  return allIntrebari;
}

export function getIntrebariCountForAnimal(animalSlug: string): number {
  return (intrebariByAnimal.get(animalSlug) || []).length;
}

export function getIntrebariRelate(intrebare: Intrebare): Intrebare[] {
  return intrebare.relate
    .map(slug => {
      const key = `${intrebare.animalSlug}/${intrebare.subcategorieSlug}/${slug}`;
      return intrebariByKey.get(key);
    })
    .filter((q): q is Intrebare => q !== undefined)
    .slice(0, 5);
}

export function getAnimalNume(slug: string): string {
  return animale.find(a => a.slug === slug)?.numePlural || slug;
}

export function getSubcategorieNume(animalSlug: string, subcatSlug: string): string {
  return subcategorii.find(s => s.animalSlug === animalSlug && s.slug === subcatSlug)?.nume || subcatSlug;
}
