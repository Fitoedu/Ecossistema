import { notFound } from 'next/navigation'
import {
  getAllSlugs,
  getTopicBySlug,
  temas,
  withLockState,
} from '../_data/educacao'
import { TopicDetailClient } from './TopicDetailClient'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return {}
  return {
    title: `${topic.title} · Conteúdo Educacional`,
    description: topic.description,
  }
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { slug } = await params
  const topic = getTopicBySlug(slug)

  if (!topic) notFound()

  const related = withLockState(temas)
    .filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 3)

  return <TopicDetailClient topic={topic} related={related} />
}
