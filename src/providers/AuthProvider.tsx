'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  // Recarrega o estado atual do usuario
  const refreshUser = useCallback(async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      setUser(currentUser ?? null)
      setSession(currentSession ?? null)
    } catch {
      setUser(null)
      setSession(null)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    refreshUser()

    // Ouve mudancas de autenticacao (Login, Logout, Token Refreshed)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setUser(currentSession?.user ?? null)
      setSession(currentSession ?? null)
      setLoading(false)

      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        // Revalida Server Components no Next.js App Router
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router, refreshUser])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (!error) {
      await refreshUser()
      router.refresh()
    }
    return { error }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: name ? { name: name.trim() } : undefined,
      },
    })
    if (!error) {
      await refreshUser()
      router.refresh()
    }
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    router.push('/login')
    router.refresh()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)