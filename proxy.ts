import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// A função proxy intercepta requisições HTTP antes que elas atinjam as páginas
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Inicializa o cliente Supabase para ler os cookies de sessão do servidor
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
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Verifica as informações do usuário atual no Supabase
  const { data: { user } } = await supabase.auth.getUser()
/** 
  // Regra de Proteção: Se não houver usuário autenticado e a rota for /perfil
  if (!user && request.nextUrl.pathname.startsWith('/perfil')) {
    // Redireciona imediatamente para a tela de login
    return NextResponse.redirect(new URL('/login', request.url))
  }
*/
  return response
}

// Configuração que define quais rotas devem passar pela verificação do proxy
export const config = {
  matcher: ['/abra/:path*'],
}