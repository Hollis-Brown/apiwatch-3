export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string
          password: string
          subscription_plan: string
          subscription_status: string | null
          subscription_current_period_end: string | null
          notification_preferences: Json
          stripe_customer_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name: string
          password: string
          subscription_plan?: string
          subscription_status?: string | null
          subscription_current_period_end?: string | null
          notification_preferences?: Json
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string
          password?: string
          subscription_plan?: string
          subscription_status?: string | null
          subscription_current_period_end?: string | null
          notification_preferences?: Json
          stripe_customer_id?: string | null
        }
      }
      apis: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string | null
          base_url: string
          headers: Json
          auth_type: string
          auth_config: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description?: string | null
          base_url: string
          headers?: Json
          auth_type: string
          auth_config: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string | null
          base_url?: string
          headers?: Json
          auth_type?: string
          auth_config?: Json
        }
      }
      monitors: {
        Row: {
          id: string
          created_at: string
          user_id: string
          api_id: string
          name: string
          description: string | null
          endpoint: string
          method: string
          headers: Json
          body: Json | null
          expected_status: number
          check_interval: number
          last_check: string | null
          last_status: number | null
          last_response: Json | null
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          api_id: string
          name: string
          description?: string | null
          endpoint: string
          method: string
          headers?: Json
          body?: Json | null
          expected_status: number
          check_interval: number
          last_check?: string | null
          last_status?: number | null
          last_response?: Json | null
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          api_id?: string
          name?: string
          description?: string | null
          endpoint?: string
          method?: string
          headers?: Json
          body?: Json | null
          expected_status?: number
          check_interval?: number
          last_check?: string | null
          last_status?: number | null
          last_response?: Json | null
          is_active?: boolean
        }
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
  }
} 