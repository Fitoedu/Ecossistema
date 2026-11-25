import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Avoid using supabase.auth.getSession() in server code.
  // Always use supabase.auth.getUser() to revalidate and refresh the token securely.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 1. Rotas Protegidas que exigem login obrigatorio
  const isProtectedPath =
    pathname.startsWith('/perfil') ||
    pathname.startsWith('/admin')

  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // 2. Rotas de Auth (Login / Registro): se ja estiver logado, redireciona para /home
  const isAuthPath =
    pathname === '/login' ||
    pathname === '/registro'

  if (user && isAuthPath) {
    const url = request.nextUrl.clone()
    const redirectParam = request.nextUrl.searchParams.get('redirect')
    url.pathname = redirectParam && redirectParam.startsWith('/') ? redirectParam : '/home'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

