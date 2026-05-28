import type { BreadcrumbItem, FAQItem, Intrebare } from './types';

const SITE_URL = 'https://cuanimale.ro';
const SITE_NAME = 'Cu Animale';

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: SITE_URL + item.href } : {}),
    })),
  };
  return JSON.stringify(schema);
}

export function buildFAQSchema(faqItems: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(faq => ({
      '@type': 'Question',
      name: faq.intrebare,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.raspuns,
      },
    })),
  };
  return JSON.stringify(schema);
}

export function buildArticleSchema(intrebare: Intrebare, url: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: intrebare.titlu,
    description: intrebare.metaDescription,
    url: SITE_URL + url,
    inLanguage: 'ro',
    dateModified: new Date().toISOString().split('T')[0],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
  return JSON.stringify(schema);
}

export function buildWebPageSchema(title: string, description: string, url: string): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: SITE_URL + url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: 'ro',
    dateModified: new Date().toISOString().split('T')[0],
  };
  return JSON.stringify(schema);
}

export function buildWebSiteSchema(): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Informații practice despre îngrijirea, hrănirea și sănătatea animalelor de companie.',
    inLanguage: 'ro',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
  return JSON.stringify(schema);
}

interface NewsArticleInput {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  publishedAt: Date;
  updatedAt?: Date;
  authorName?: string;
}

export function buildNewsArticleSchema(input: NewsArticleInput): string {
  const {
    title,
    description,
    url,
    imageUrl,
    imageAlt,
    imageWidth = 1200,
    imageHeight = 630,
    publishedAt,
    updatedAt,
    authorName = SITE_NAME,
  } = input;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url: SITE_URL + url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_URL + url,
    },
    image: {
      '@type': 'ImageObject',
      url: imageUrl.startsWith('http') ? imageUrl : SITE_URL + imageUrl,
      width: imageWidth,
      height: imageHeight,
      caption: imageAlt,
    },
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt || publishedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: SITE_URL + '/favicon-32.png',
        width: 32,
        height: 32,
      },
    },
    inLanguage: 'ro-RO',
    isAccessibleForFree: true,
  };
  return JSON.stringify(schema);
}

export function buildItemListSchema(items: Array<{ name: string; url: string }>): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: item.name,
        url: SITE_URL + item.url,
      },
    })),
  };
  return JSON.stringify(schema);
}
