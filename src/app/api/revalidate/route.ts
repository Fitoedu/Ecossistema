import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Validação básica: apenas requisições autenticadas ou com secret header podem revalidar
    const authHeader = request.headers.get('x-revalidate-secret')
    const isValidSecret =
      process.env.REVALIDATE_SECRET && authHeader === process.env.REVALIDATE_SECRET

    if (!user && !isValidSecret) {
      return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
    }

    const body = await request.json()
    const { path, tag } = body

    if (path) {
      revalidatePath(path)
      return NextResponse.json({
        revalidated: true,
        type: 'path',
        target: path,
        timestamp: Date.now(),
      })
    }

    if (tag) {
      revalidateTag(tag, 'max')
      return NextResponse.json({
        revalidated: true,
        type: 'tag',
        target: tag,
        timestamp: Date.now(),
      })
    }

    return NextResponse.json(
      { message: 'Parâmetro "path" ou "tag" é obrigatório.' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro ao revalidar cache', error: (error as Error).message },
      { status: 500 }
    )
  }
}

