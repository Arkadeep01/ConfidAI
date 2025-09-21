export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          preferred_language: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          preferred_language?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      journals: {
        Row: {
          id: number
          user_id: string | null
          title: string | null
          content: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          user_id?: string | null
          title?: string | null
          content?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string | null
          title?: string | null
          content?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      moods: {
        Row: {
          id: number
          user_id: string | null
          mood: string | null
          sentiment: Json | null
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id?: string | null
          mood?: string | null
          sentiment?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string | null
          mood?: string | null
          sentiment?: Json | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "moods_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      relax_logs: {
        Row: {
          id: number
          user_id: string | null
          tool: string | null
          duration: number | null
          created_at: string | null
        }
        Insert: {
          id?: number
          user_id?: string | null
          tool?: string | null
          duration?: number | null
          created_at?: string | null
        }
        Update: {
          id?: number
          user_id?: string | null
          tool?: string | null
          duration?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "relax_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
