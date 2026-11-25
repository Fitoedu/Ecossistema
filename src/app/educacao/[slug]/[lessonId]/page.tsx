import { notFound } from 'next/navigation'
import { getTopicBySlug, getAllSlugs, buildLessons } from '@/features/educacao/data/educacao'
import { LessonPlayerClient } from './LessonPlayerClient'

interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>
}

export function generateStaticParams() {
  const slugs = getAllSlugs()
  const paramsList: { slug: string; lessonId: string }[] = []

  for (const slug of slugs) {
    const topic = getTopicBySlug(slug)
    if (topic) {
      const lessons = buildLessons(topic)
      for (const lesson of lessons) {
        paramsList.push({ slug, lessonId: lesson.id })
      }
    }
  }

  return paramsList
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, lessonId } = await params
  const topic = getTopicBySlug(slug)
  if (!topic) return {}

  const lessons = buildLessons(topic)
  const lesson = lessons.find((l) => l.id === lessonId)

  return {
    title: lesson ? `${lesson.title} · ${topic.title}` : `Aula · ${topic.title}`,
    description: lesson?.summary ?? topic.description,
  }
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonId } = await params
  const topic = getTopicBySlug(slug)

  if (!topic) {
    notFound()
  }

  return <LessonPlayerClient topic={topic} initialLessonId={lessonId} />
}

