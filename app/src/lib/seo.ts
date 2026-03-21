import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kurtgavin.vercel.app'

export const siteConfig = {
  url: baseUrl,
  name: 'Kurt Gavin',
  title: 'Kurt Gavin — Full Stack Software Engineer & AI Engineer',
  description:
    'Full Stack Software Engineer & AI Engineer crafting digital experiences that matter. Based in the Philippines. Specializing in React, Next.js, AI/ML, and modern web technologies.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'AI Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'Node.js',
    'Python',
    'Machine Learning',
    'Web Development',
    'Philippines',
    'Freelance Developer',
    'Kurt Gavin',
  ],
  author: {
    name: 'Kurt Gavin',
    email: 'kurtgavin.design@gmail.com',
    phone: '+63 962 916 5786',
    location: 'Philippines',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/kurtgavin/',
    github: 'https://github.com/kurtgav',
  },
}

export function generatePageMetadata({
  title,
  description,
  path = '',
}: {
  title?: string
  description?: string
  path?: string
}): Metadata {
  const pageTitle = title || siteConfig.title
  const pageDescription = description || siteConfig.description
  const canonicalUrl = `${siteConfig.url}${path}`

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: 'index, follow',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary',
      title: pageTitle,
      description: pageDescription,
    },
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    jobTitle: 'Full Stack Software Engineer & AI Engineer',
    email: siteConfig.author.email,
    telephone: siteConfig.author.phone,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PH',
    },
    knowsAbout: [
      'Web Development',
      'Full Stack Development',
      'Artificial Intelligence',
      'Machine Learning',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Node.js',
    ],
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    inLanguage: 'en-US',
  }
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
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}
