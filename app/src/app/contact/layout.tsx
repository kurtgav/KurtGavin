import { generatePageMetadata, generateBreadcrumbSchema } from '@/lib/seo'

export const metadata = generatePageMetadata({
  title: 'Contact Kurt Gavin — Let\'s Work Together',
  description:
    'Get in touch with Kurt Gavin for freelance projects, collaborations, or inquiries. Available for full-stack development, AI engineering, and web application projects.',
  path: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
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
