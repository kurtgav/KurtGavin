import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Work & Projects — Kurt Gavin Portfolio',
  description:
    'Explore Kurt Gavin\'s software portfolio, including six anonymous NDA project areas: construction ERP, accounting, prediction markets, casino agent systems, GEO and AI.',
  path: '/work',
})

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
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
