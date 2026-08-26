import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Se o param "next" foi fornecido, usa-o para o redirect, senao vai para /home
  const next = searchParams.get('next') ?? '/home'

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // host original
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // Redirecionamento local simples
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Se houver erro ou nao tiver codigo, redireciona para a tela de login com erro
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}

