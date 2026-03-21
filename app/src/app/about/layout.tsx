import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'About Kurt Gavin — Full Stack Software Engineer & AI Engineer',
  description:
    'Learn about Kurt Gavin, a Full Stack Software Engineer & AI Engineer based in the Philippines. Specializing in React, Next.js, TypeScript, Python, and AI-powered solutions.',
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
