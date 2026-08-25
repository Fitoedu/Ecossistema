/**
 * Tipos gerados a partir do schema do Supabase.
 * Atualize sempre que alterar as tabelas no banco.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          avatar_url: string | null
          role: 'user' | 'admin'
          notif_push: boolean
          notif_email: boolean
          text_size: string
          high_contrast: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          notif_push?: boolean
          notif_email?: boolean
          text_size?: string
          high_contrast?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin'
          notif_push?: boolean
          notif_email?: boolean
          text_size?: string
          high_contrast?: boolean
          updated_at?: string
        }
      }
      topics: {
        Row: {
          id: string
          slug: string
          title: string
          description: string | null
          level: 'Basico' | 'Intermediario' | 'Avancado'
          category: string
          icon: string | null
          color: string | null
          duration: string | null
          lessons_count: number
          order_index: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description?: string | null
          level: 'Basico' | 'Intermediario' | 'Avancado'
          category: string
          icon?: string | null
          color?: string | null
          duration?: string | null
          lessons_count?: number
          order_index?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          description?: string | null
          level?: 'Basico' | 'Intermediario' | 'Avancado'
          category?: string
          icon?: string | null
          color?: string | null
          duration?: string | null
          lessons_count?: number
          order_index?: number
          published?: boolean
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          topic_id: string
          title: string
          duration: string | null
          content: string | null
          order_index: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          topic_id: string
          title: string
          duration?: string | null
          content?: string | null
          order_index?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          topic_id?: string
          title?: string
          duration?: string | null
          content?: string | null
          order_index?: number
          published?: boolean
          updated_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          topic_id: string
          completed_lessons: number
          progress_pct: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          topic_id: string
          completed_lessons?: number
          progress_pct?: number
          updated_at?: string
        }
        Update: {
          completed_lessons?: number
          progress_pct?: number
          updated_at?: string
        }
      }
      quiz_questions: {
        Row: {
          id: string
          category: string
          question: string
          explanation: string | null
          difficulty: 'facil' | 'medio' | 'dificil'
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category: string
          question: string
          explanation?: string | null
          difficulty?: 'facil' | 'medio' | 'dificil'
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          category?: string
          question?: string
          explanation?: string | null
          difficulty?: 'facil' | 'medio' | 'dificil'
          published?: boolean
          updated_at?: string
        }
      }
      quiz_options: {
        Row: {
          id: string
          question_id: string
          text: string
          is_correct: boolean
          order_index: number
        }
        Insert: {
          id?: string
          question_id: string
          text: string
          is_correct?: boolean
          order_index?: number
        }
        Update: {
          text?: string
          is_correct?: boolean
          order_index?: number
        }
      }
      quiz_sessions: {
        Row: {
          id: string
          user_id: string
          category: string
          score: number
          total_questions: number
          correct_answers: number
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          score?: number
          total_questions?: number
          correct_answers?: number
          completed_at?: string
        }
        Update: never
      }
      publicacoes: {
        Row: {
          id: string
          slug: string
          source: string
          date: string
          title: string
          description: string | null
          image: string | null
          href: string | null
          category: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          source: string
          date: string
          title: string
          description?: string | null
          image?: string | null
          href?: string | null
          category?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          source?: string
          date?: string
          title?: string
          description?: string | null
          image?: string | null
          href?: string | null
          category?: string | null
          published?: boolean
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          href: string
          title: string | null
          description: string | null
          order_index: number
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          href: string
          title?: string | null
          description?: string | null
          order_index?: number
          published?: boolean
          created_at?: string
        }
        Update: {
          href?: string
          title?: string | null
          description?: string | null
          order_index?: number
          published?: boolean
        }
      }
      app_logs: {
        Row: {
          id: string
          level: 'debug' | 'info' | 'warn' | 'error'
          module: 'auth' | 'educacao' | 'quiz' | 'midia' | 'perfil' | 'admin' | 'system'
          action: string
          message: string
          metadata: Json
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          level: 'debug' | 'info' | 'warn' | 'error'
          module: 'auth' | 'educacao' | 'quiz' | 'midia' | 'perfil' | 'admin' | 'system'
          action: string
          message: string
          metadata?: Json
          user_id?: string | null
          created_at?: string
        }
        Update: {
          level?: 'debug' | 'info' | 'warn' | 'error'
          module?: 'auth' | 'educacao' | 'quiz' | 'midia' | 'perfil' | 'admin' | 'system'
          action?: string
          message?: string
          metadata?: Json
          user_id?: string | null
        }
      }
    }
  }
}

// Aliases de conveniencia
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export type Topic = Database['public']['Tables']['topics']['Row']
export type TopicInsert = Database['public']['Tables']['topics']['Insert']
export type TopicUpdate = Database['public']['Tables']['topics']['Update']

export type Lesson = Database['public']['Tables']['lessons']['Row']
export type LessonInsert = Database['public']['Tables']['lessons']['Insert']
export type LessonUpdate = Database['public']['Tables']['lessons']['Update']

export type UserProgress = Database['public']['Tables']['user_progress']['Row']
export type UserProgressInsert = Database['public']['Tables']['user_progress']['Insert']
export type UserProgressUpdate = Database['public']['Tables']['user_progress']['Update']

export type QuizQuestion = Database['public']['Tables']['quiz_questions']['Row']
export type QuizQuestionInsert = Database['public']['Tables']['quiz_questions']['Insert']
export type QuizQuestionUpdate = Database['public']['Tables']['quiz_questions']['Update']

export type QuizOption = Database['public']['Tables']['quiz_options']['Row']
export type QuizOptionInsert = Database['public']['Tables']['quiz_options']['Insert']
export type QuizOptionUpdate = Database['public']['Tables']['quiz_options']['Update']

export type QuizSession = Database['public']['Tables']['quiz_sessions']['Row']
export type QuizSessionInsert = Database['public']['Tables']['quiz_sessions']['Insert']

export type Publicacao = Database['public']['Tables']['publicacoes']['Row']
export type PublicacaoInsert = Database['public']['Tables']['publicacoes']['Insert']
export type PublicacaoUpdate = Database['public']['Tables']['publicacoes']['Update']

export type Video = Database['public']['Tables']['videos']['Row']
export type VideoInsert = Database['public']['Tables']['videos']['Insert']
export type VideoUpdate = Database['public']['Tables']['videos']['Update']

export type AppLog = Database['public']['Tables']['app_logs']['Row']
export type AppLogInsert = Database['public']['Tables']['app_logs']['Insert']
export type AppLogUpdate = Database['public']['Tables']['app_logs']['Update']

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
export type LogModule = 'auth' | 'educacao' | 'quiz' | 'midia' | 'perfil' | 'admin' | 'system'

export type QuizQuestionWithOptions = QuizQuestion & {
  quiz_options: QuizOption[]
}

export type TopicWithProgress = Topic & {
  user_progress: UserProgress | null
}

