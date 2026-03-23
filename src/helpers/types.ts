export interface Animal {
  id: string;
  slug: string;
  nume: string;
  numePlural: string;
  emoji: string;
  descriere: string;
  continutPillar: string[];
  subcategorii: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Subcategorie {
  id: string;
  slug: string;
  nume: string;
  animalSlug: string;
  animalNume: string;
  descriere: string;
  continut: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Sectiune {
  titlu: string;
  tip: 'lista' | 'pasi' | 'text';
  items: Array<{ titlu?: string; text: string }>;
}

export interface Intrebare {
  slug: string;
  titlu: string;
  animalSlug: string;
  subcategorieSlug: string;
  rasa?: string;
  intro: string;
  sectiuni: Sectiune[];
  concluzie: string;
  relate: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface FAQItem {
  intrebare: string;
  raspuns: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface InternalLink {
  href: string;
  text: string;
  title?: string;
}
