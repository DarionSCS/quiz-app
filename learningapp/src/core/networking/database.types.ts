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
      badges: {
        Row: {
          created_at: string
          description: string | null
          id: string
          img: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          img?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          img?: string | null
          name?: string | null
        }
        Relationships: []
      }
      profile_badges: {
        Row: {
          badge_id: string | null
          created_at: string
          id: string
          profile_id: string | null
        }
        Insert: {
          badge_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
        }
        Update: {
          badge_id?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_badges_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          birth: string | null
          created_at: string
          id: string
          img: string | null
          lastname: string | null
          nickname: string | null
          role: number | null
          sound: boolean | null
          surname: string | null
          user_id: string | null
          vibration: boolean | null
        }
        Insert: {
          birth?: string | null
          created_at?: string
          id?: string
          img?: string | null
          lastname?: string | null
          nickname?: string | null
          role?: number | null
          sound?: boolean | null
          surname?: string | null
          user_id?: string | null
          vibration?: boolean | null
        }
        Update: {
          birth?: string | null
          created_at?: string
          id?: string
          img?: string | null
          lastname?: string | null
          nickname?: string | null
          role?: number | null
          sound?: boolean | null
          surname?: string | null
          user_id?: string | null
          vibration?: boolean | null
        }
        Relationships: []
      }
      question_results: {
        Row: {
          answer: boolean | null
          answer_text: string | null
          created_at: string
          id: string
          profile_id: string | null
          question_id: string | null
        }
        Insert: {
          answer?: boolean | null
          answer_text?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
        }
        Update: {
          answer?: boolean | null
          answer_text?: string | null
          created_at?: string
          id?: string
          profile_id?: string | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_results_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_results_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          answer: string | null
          created_at: string
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string
          img: string | null
          options: Json | null
          question: string | null
          question_type: Database["public"]["Enums"]["question_type"] | null
          subject_id: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          img?: string | null
          options?: Json | null
          question?: string | null
          question_type?: Database["public"]["Enums"]["question_type"] | null
          subject_id?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          img?: string | null
          options?: Json | null
          question?: string | null
          question_type?: Database["public"]["Enums"]["question_type"] | null
          subject_id?: string | null
        }
        Relationships: []
      }
      results: {
        Row: {
          created_time: string | null
          difficulty: Database["public"]["Enums"]["difficulty"] | null
          id: string
          profile_id: string | null
          progress: number | null
          score: number | null
          subject_id: string | null
        }
        Insert: {
          created_time?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          profile_id?: string | null
          progress?: number | null
          score?: number | null
          subject_id?: string | null
        }
        Update: {
          created_time?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty"] | null
          id?: string
          profile_id?: string | null
          progress?: number | null
          score?: number | null
          subject_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "results_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty: "Beginner" | "Intermediate" | "Advanced"
      question_type: "multiple-choice" | "open-ended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
