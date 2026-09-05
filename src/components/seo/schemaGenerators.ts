import { BranchItem, ServiceItem, ServiceFAQ, BlogPost, SalonSettings } from '../../types';

export function generateHairSalonSchema(
  branch: BranchItem,
  settings?: SalonSettings
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `https://lelixir-atelier.com/subeler/${branch.slug}#salon`,
    name: `${settings?.salonName || "L'ÉLIXIR Atelier Hair Studio"} — ${branch.name}`,
    description: `İstanbul ve Ankara'da lüks saç tasarımı, artisanal balayage, couture saç kesimi ve saç bakım ritüelleri sunan ${branch.name}.`,
    url: `https://lelixir-atelier.com/#/subeler/${branch.slug}`,
    telephone: branch.phone,
    image: [branch.image],
    priceRange: '₺₺₺₺',
    address: {
      '@type': 'PostalAddress',
      streetAddress: branch.address,
      addressLocality: branch.district,
      addressRegion: branch.city,
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: branch.city === 'İstanbul' ? 41.0483 : 39.8856,
      longitude: branch.city === 'İstanbul' ? 28.9934 : 32.6847,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:30',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '184',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateServiceSchema(
  service: ServiceItem,
  settings?: SalonSettings
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://lelixir-atelier.com/hizmetler/${service.slug}#service`,
    name: service.name,
    serviceType: service.categoryName,
    description: service.description,
    provider: {
      '@type': 'HairSalon',
      name: settings?.salonName || "L'ÉLIXIR Atelier Hair Studio",
      url: 'https://lelixir-atelier.com',
      telephone: settings?.phone || '+90 (212) 234 50 60',
    },
    offers: {
      '@type': 'Offer',
      price: service.priceStartingFrom,
      priceCurrency: service.currency || 'TRY',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `https://lelixir-atelier.com/#/hizmetler/${service.slug}`,
    },
  };
}

export function generateFaqSchema(faqs?: ServiceFAQ[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://lelixir-atelier.com${item.url}`,
    })),
  };
}

export function generateArticleSchema(
  post: BlogPost,
  settings?: SalonSettings
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `https://lelixir-atelier.com/dergi/${post.slug}#article`,
    headline: post.title,
    description: post.summary,
    image: [post.coverImage],
    datePublished: '2026-09-01T08:00:00+03:00',
    dateModified: '2026-09-05T10:00:00+03:00',
    author: {
      '@type': 'Person',
      name: post.authorName,
      jobTitle: post.authorRole,
      url: `https://lelixir-atelier.com/#/ekibimiz/${post.authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: settings?.salonName || "L'ÉLIXIR Atelier Hair & Beauty Studio",
      url: 'https://lelixir-atelier.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lelixir-atelier.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://lelixir-atelier.com/#/dergi/${post.slug}`,
    },
  };
}

