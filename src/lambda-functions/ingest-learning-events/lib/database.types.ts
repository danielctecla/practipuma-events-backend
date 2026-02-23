export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      answers: {
        Row: {
          content: string
          is_correct: boolean
          option_id: number
          question_id: number
          type: string
        }
        Insert: {
          content: string
          is_correct: boolean
          option_id?: number
          question_id: number
          type?: string
        }
        Update: {
          content?: string
          is_correct?: boolean
          option_id?: number
          question_id?: number
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "randomized_questions"
            referencedColumns: ["question_id"]
          },
        ]
      }
      areas: {
        Row: {
          area_id: number
          description: string
          name: string
        }
        Insert: {
          area_id?: number
          description: string
          name: string
        }
        Update: {
          area_id?: number
          description?: string
          name?: string
        }
        Relationships: []
      }
      modes_practice: {
        Row: {
          description: string
          mode_id: number
          name: string
        }
        Insert: {
          description: string
          mode_id?: number
          name: string
        }
        Update: {
          description?: string
          mode_id?: number
          name?: string
        }
        Relationships: []
      }
      priority_levels: {
        Row: {
          description: string | null
          level: number
          name: string
          priority_id: number
        }
        Insert: {
          description?: string | null
          level: number
          name: string
          priority_id?: number
        }
        Update: {
          description?: string | null
          level?: number
          name?: string
          priority_id?: number
        }
        Relationships: []
      }
      question_area: {
        Row: {
          area_id: number
          question_id: number
        }
        Insert: {
          area_id: number
          question_id: number
        }
        Update: {
          area_id?: number
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_area_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "areas"
            referencedColumns: ["area_id"]
          },
          {
            foreignKeyName: "question_area_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["question_id"]
          },
          {
            foreignKeyName: "question_area_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "randomized_questions"
            referencedColumns: ["question_id"]
          },
        ]
      }
      questions: {
        Row: {
          active: boolean
          explanation: string | null
          question_id: number
          statement: string
          subtopic_id: number
          type: string
          year: number | null
        }
        Insert: {
          active: boolean
          explanation?: string | null
          question_id?: number
          statement: string
          subtopic_id: number
          type?: string
          year?: number | null
        }
        Update: {
          active?: boolean
          explanation?: string | null
          question_id?: number
          statement?: string
          subtopic_id?: number
          type?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["subtopic_id"]
          },
        ]
      }
      recommendation_status: {
        Row: {
          description: string | null
          name: string
          status_id: number
        }
        Insert: {
          description?: string | null
          name: string
          status_id?: number
        }
        Update: {
          description?: string | null
          name?: string
          status_id?: number
        }
        Relationships: []
      }
      recommendation_types: {
        Row: {
          description: string | null
          name: string
          type_id: number
        }
        Insert: {
          description?: string | null
          name: string
          type_id?: number
        }
        Update: {
          description?: string | null
          name?: string
          type_id?: number
        }
        Relationships: []
      }
      subjects: {
        Row: {
          description: string
          name: string
          subject_id: number
        }
        Insert: {
          description: string
          name: string
          subject_id?: number
        }
        Update: {
          description?: string
          name?: string
          subject_id?: number
        }
        Relationships: []
      }
      subscription_mode: {
        Row: {
          mode_id: number
          subscription_id: number
        }
        Insert: {
          mode_id: number
          subscription_id: number
        }
        Update: {
          mode_id?: number
          subscription_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscription_mode_mode_id_fkey"
            columns: ["mode_id"]
            isOneToOne: false
            referencedRelation: "modes_practice"
            referencedColumns: ["mode_id"]
          },
          {
            foreignKeyName: "subscription_mode_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["subscription_id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          currency: string
          description: string | null
          interval: string
          name: string
          price: number
          price_id: string
          production_product: boolean
          stripe_product_id: string
        }
        Insert: {
          currency: string
          description?: string | null
          interval: string
          name: string
          price: number
          price_id: string
          production_product?: boolean
          stripe_product_id: string
        }
        Update: {
          currency?: string
          description?: string | null
          interval?: string
          name?: string
          price?: number
          price_id?: string
          production_product?: boolean
          stripe_product_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          name: string
          subscription_id: number
        }
        Insert: {
          name: string
          subscription_id?: number
        }
        Update: {
          name?: string
          subscription_id?: number
        }
        Relationships: []
      }
      subtopics: {
        Row: {
          base_difficulty: number | null
          name: string
          subject_id: number
          subtopic_id: number
        }
        Insert: {
          base_difficulty?: number | null
          name: string
          subject_id: number
          subtopic_id?: number
        }
        Update: {
          base_difficulty?: number | null
          name?: string
          subject_id?: number
          subtopic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "subtopics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      system_logs: {
        Row: {
          component: string | null
          context: Json | null
          id: number
          log_level: string | null
          log_timestamp: string | null
          message: string | null
        }
        Insert: {
          component?: string | null
          context?: Json | null
          id?: number
          log_level?: string | null
          log_timestamp?: string | null
          message?: string | null
        }
        Update: {
          component?: string | null
          context?: Json | null
          id?: number
          log_level?: string | null
          log_timestamp?: string | null
          message?: string | null
        }
        Relationships: []
      }
      user_events: {
        Row: {
          device_info: Json | null
          event_timestamp: string
          event_type: string
          id: number
          is_production: boolean
          metadata: Json
          session_id: string | null
          user_id: string
        }
        Insert: {
          device_info?: Json | null
          event_timestamp?: string
          event_type: string
          id?: number
          is_production: boolean
          metadata?: Json
          session_id?: string | null
          user_id: string
        }
        Update: {
          device_info?: Json | null
          event_timestamp?: string
          event_type?: string
          id?: number
          is_production?: boolean
          metadata?: Json
          session_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_recommendations: {
        Row: {
          assigned_at: string
          completed_at: string | null
          id: number
          priority_id: number
          status_id: number
          subject_id: number
          subtopic_id: number | null
          type_id: number
          user_id: string
        }
        Insert: {
          assigned_at?: string
          completed_at?: string | null
          id?: number
          priority_id: number
          status_id: number
          subject_id: number
          subtopic_id?: number | null
          type_id: number
          user_id: string
        }
        Update: {
          assigned_at?: string
          completed_at?: string | null
          id?: number
          priority_id?: number
          status_id?: number
          subject_id?: number
          subtopic_id?: number | null
          type_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_recommendations_priority_id_fkey"
            columns: ["priority_id"]
            isOneToOne: false
            referencedRelation: "priority_levels"
            referencedColumns: ["priority_id"]
          },
          {
            foreignKeyName: "user_recommendations_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "recommendation_status"
            referencedColumns: ["status_id"]
          },
          {
            foreignKeyName: "user_recommendations_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
          {
            foreignKeyName: "user_recommendations_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["subtopic_id"]
          },
          {
            foreignKeyName: "user_recommendations_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "recommendation_types"
            referencedColumns: ["type_id"]
          },
        ]
      }
      user_subscription: {
        Row: {
          cancel_at_period_end: boolean
          customer_id: string
          end_date: string | null
          is_active: boolean | null
          modified_at: string | null
          next_payment_date: string | null
          plan_snapshot: Json | null
          price_id: string | null
          production: boolean
          start_date: string | null
          stripe_subscription_id: string | null
          user_id: string
          user_subscription_id: number
        }
        Insert: {
          cancel_at_period_end?: boolean
          customer_id: string
          end_date?: string | null
          is_active?: boolean | null
          modified_at?: string | null
          next_payment_date?: string | null
          plan_snapshot?: Json | null
          price_id?: string | null
          production?: boolean
          start_date?: string | null
          stripe_subscription_id?: string | null
          user_id: string
          user_subscription_id?: number
        }
        Update: {
          cancel_at_period_end?: boolean
          customer_id?: string
          end_date?: string | null
          is_active?: boolean | null
          modified_at?: string | null
          next_payment_date?: string | null
          plan_snapshot?: Json | null
          price_id?: string | null
          production?: boolean
          start_date?: string | null
          stripe_subscription_id?: string | null
          user_id?: string
          user_subscription_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_subscription_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["price_id"]
          },
        ]
      }
    }
    Views: {
      randomized_questions: {
        Row: {
          active: boolean | null
          explanation: string | null
          question_id: number | null
          statement: string | null
          subject_id: number | null
          subject_name: string | null
          subtopic_id: number | null
          subtopic_name: string | null
          type: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_subtopic_id_fkey"
            columns: ["subtopic_id"]
            isOneToOne: false
            referencedRelation: "subtopics"
            referencedColumns: ["subtopic_id"]
          },
          {
            foreignKeyName: "subtopics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
    }
    Functions: {
      get_practice_questions: {
        Args: {
          p_limit?: number
          p_mode?: string
          p_subject_id?: number
          p_subtopic_id?: number
        }
        Returns: {
          answers: Json
          explanation: string
          question_id: number
          statement: string
          subject_name: string
          subtopic_name: string
          type: string
          year: number
        }[]
      }
      get_user_subscription: { Args: { user_id: string }; Returns: string }
    }
    Enums: {
      answer_type: "text" | "latex" | "img"
      question_type: "text" | "latex" | "img"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      answer_type: ["text", "latex", "img"],
      question_type: ["text", "latex", "img"],
    },
  },
} as const
