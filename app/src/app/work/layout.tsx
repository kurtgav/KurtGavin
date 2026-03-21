import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Work & Projects — Kurt Gavin Portfolio',
  description:
    'Explore Kurt Gavin\'s portfolio of full-stack web applications, AI-powered solutions, and digital products. Featured projects include Ascend AI, face recognition systems, and more.',
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
