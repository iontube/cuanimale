import type { Animal, Subcategorie, Intrebare, InternalLink } from './types';
import { animale, subcategorii, getIntrebariForSubcategorie, getIntrebariForAnimal, getSubcategoriiForAnimal } from './data';

/** Links from a pillar page to its subcategories */
export function getAnimalSiloLinks(animalSlug: string): InternalLink[] {
  return getSubcategoriiForAnimal(animalSlug).map(s => ({
    href: `/${animalSlug}/${s.slug}/`,
    text: s.nume,
    title: `${s.nume} - ${animale.find(a => a.slug === animalSlug)?.numePlural || animalSlug}`,
  }));
}

/** Links from a subcategory page to its FAQ pages (paginated) */
export function getSubcategorieFAQLinks(animalSlug: string, subcatSlug: string, limit = 20): InternalLink[] {
  return getIntrebariForSubcategorie(animalSlug, subcatSlug)
    .slice(0, limit)
    .map(q => ({
      href: `/${animalSlug}/${subcatSlug}/${q.slug}/`,
      text: q.titlu,
      title: q.metaTitle,
    }));
}

/** Cross-links to other animals' same subcategory */
export function getCrossAnimalLinks(currentAnimalSlug: string, subcatSlug: string): InternalLink[] {
  return animale
    .filter(a => a.slug !== currentAnimalSlug)
    .map(a => {
      const subcat = subcategorii.find(s => s.animalSlug === a.slug && s.slug === subcatSlug);
      if (!subcat) return null;
      return {
        href: `/${a.slug}/${subcatSlug}/`,
        text: `${subcat.nume} - ${a.numePlural}`,
        title: `${subcat.nume} pentru ${a.numePlural.toLowerCase()}`,
      };
    })
    .filter((l): l is InternalLink => l !== null);
}

/** Related FAQ links for an intrebare page */
export function getRelatedIntrebariLinks(intrebare: Intrebare): InternalLink[] {
  const related: InternalLink[] = [];

  // 1. Related questions from same subcategory (from relate array)
  for (const slug of intrebare.relate) {
    related.push({
      href: `/${intrebare.animalSlug}/${intrebare.subcategorieSlug}/${slug}/`,
      text: slug.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
      title: `${intrebare.animalSlug} - ${slug}`,
    });
  }

  return related.slice(0, 5);
}

/** Popular questions across all animals for footer/homepage */
export function getPopularIntrebari(limit = 8): InternalLink[] {
  const popular: InternalLink[] = [];
  for (const animal of animale) {
    const intrebari = getIntrebariForAnimal(animal.slug);
    for (const q of intrebari.slice(0, Math.ceil(limit / animale.length))) {
      popular.push({
        href: `/${q.animalSlug}/${q.subcategorieSlug}/${q.slug}/`,
        text: q.titlu,
        title: q.metaTitle,
      });
    }
  }
  return popular.slice(0, limit);
}

/** Other subcategories for same animal (sidebar navigation) */
export function getSiblingSubcategorii(animalSlug: string, currentSubcatSlug: string): InternalLink[] {
  return getSubcategoriiForAnimal(animalSlug)
    .filter(s => s.slug !== currentSubcatSlug)
    .map(s => ({
      href: `/${animalSlug}/${s.slug}/`,
      text: s.nume,
      title: `${s.nume} - ${animale.find(a => a.slug === animalSlug)?.numePlural || ''}`,
    }));
}

/** Other animals for navigation */
export function getOtherAnimals(currentSlug: string): InternalLink[] {
  return animale
    .filter(a => a.slug !== currentSlug)
    .map(a => ({
      href: `/${a.slug}/`,
      text: a.numePlural,
      title: `Tot despre ${a.numePlural.toLowerCase()}`,
    }));
}

// ── CONTEXTUAL INTERLINKING ──
// Simple, relevant "Citește și" links with full article title as anchor text.

/**
 * Returns 3 relevant article links for a given intrebare.
 * Priority: 1) same subcategory related, 2) same animal other subcategory, 3) cross-animal
 * Each link uses the full article title as anchor text.
 */
export function getCitesteLinks(intrebare: Intrebare): InternalLink[] {
  const links: InternalLink[] = [];
  const currentSlug = intrebare.slug;

  // Hash for deterministic variation per page
  let hash = 0;
  for (let i = 0; i < intrebare.slug.length; i++) {
    hash = ((hash << 5) - hash + intrebare.slug.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash);

  // 1. Same subcategory - most relevant (related by topic)
  const sameSubcat = getIntrebariForSubcategorie(intrebare.animalSlug, intrebare.subcategorieSlug)
    .filter(q => q.slug !== currentSlug);

  // Pick from relate array first
  for (const relSlug of intrebare.relate) {
    const found = sameSubcat.find(q => q.slug === relSlug);
    if (found && links.length < 2) {
      links.push({
        href: `/${found.animalSlug}/${found.subcategorieSlug}/${found.slug}/`,
        text: found.titlu,
      });
    }
  }

  // Fill with deterministic picks from same subcategory
  if (links.length < 2 && sameSubcat.length > 0) {
    const idx = hash % sameSubcat.length;
    const pick = sameSubcat[idx];
    if (!links.some(l => l.text === pick.titlu)) {
      links.push({
        href: `/${pick.animalSlug}/${pick.subcategorieSlug}/${pick.slug}/`,
        text: pick.titlu,
      });
    }
  }

  // 2. Different subcategory, same animal - adds depth
  const otherSubcats = ['comportament', 'hrana', 'sanatate', 'ingrijire', 'dresaj']
    .filter(s => s !== intrebare.subcategorieSlug);
  const pickedSubcat = otherSubcats[hash % otherSubcats.length];
  const otherQuestions = getIntrebariForSubcategorie(intrebare.animalSlug, pickedSubcat);

  if (otherQuestions.length > 0 && links.length < 3) {
    // Try to find same breed if applicable
    let pick = intrebare.rasa
      ? otherQuestions.find(q => q.rasa === intrebare.rasa)
      : null;

    if (!pick) {
      pick = otherQuestions[(hash >> 3) % otherQuestions.length];
    }

    if (pick && !links.some(l => l.text === pick!.titlu)) {
      links.push({
        href: `/${pick.animalSlug}/${pick.subcategorieSlug}/${pick.slug}/`,
        text: pick.titlu,
      });
    }
  }

  return links.slice(0, 3);
}
