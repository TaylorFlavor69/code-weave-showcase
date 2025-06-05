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
      CustomerExperience: {
        Row: {
          Age: number | null
          Customer_ID: number | null
          Feedback_Score: number | null
          Gender: string | null
          Gender_Encoded: number | null
          Location: string | null
          Location_Encoded: number | null
          Num_Interactions: number | null
          Products_Purchased: number | null
          Products_Viewed: number | null
          Retention_Status: string | null
          Retention_Status_Encoded: number | null
          Satisfaction_Score: number | null
          Time_Spent_on_Site: number | null
        }
        Insert: {
          Age?: number | null
          Customer_ID?: number | null
          Feedback_Score?: number | null
          Gender?: string | null
          Gender_Encoded?: number | null
          Location?: string | null
          Location_Encoded?: number | null
          Num_Interactions?: number | null
          Products_Purchased?: number | null
          Products_Viewed?: number | null
          Retention_Status?: string | null
          Retention_Status_Encoded?: number | null
          Satisfaction_Score?: number | null
          Time_Spent_on_Site?: number | null
        }
        Update: {
          Age?: number | null
          Customer_ID?: number | null
          Feedback_Score?: number | null
          Gender?: string | null
          Gender_Encoded?: number | null
          Location?: string | null
          Location_Encoded?: number | null
          Num_Interactions?: number | null
          Products_Purchased?: number | null
          Products_Viewed?: number | null
          Retention_Status?: string | null
          Retention_Status_Encoded?: number | null
          Satisfaction_Score?: number | null
          Time_Spent_on_Site?: number | null
        }
        Relationships: []
      }
      Pokemon_BattleTable: {
        Row: {
          First_pokemon: number | null
          Second_pokemon: number | null
          Winner: number | null
        }
        Insert: {
          First_pokemon?: number | null
          Second_pokemon?: number | null
          Winner?: number | null
        }
        Update: {
          First_pokemon?: number | null
          Second_pokemon?: number | null
          Winner?: number | null
        }
        Relationships: []
      }
      PokemonData: {
        Row: {
          Attack: number | null
          base_experience: number | null
          Defense: number | null
          Generation: number | null
          height: number | null
          HP: number | null
          id: number
          Legendary: boolean | null
          Name: string | null
          "Sp. Atk": number | null
          "Sp. Def": number | null
          Speed: number | null
          sprites: string | null
          "Type 1": string | null
          "Type 2": string | null
          weight: number | null
        }
        Insert: {
          Attack?: number | null
          base_experience?: number | null
          Defense?: number | null
          Generation?: number | null
          height?: number | null
          HP?: number | null
          id: number
          Legendary?: boolean | null
          Name?: string | null
          "Sp. Atk"?: number | null
          "Sp. Def"?: number | null
          Speed?: number | null
          sprites?: string | null
          "Type 1"?: string | null
          "Type 2"?: string | null
          weight?: number | null
        }
        Update: {
          Attack?: number | null
          base_experience?: number | null
          Defense?: number | null
          Generation?: number | null
          height?: number | null
          HP?: number | null
          id?: number
          Legendary?: boolean | null
          Name?: string | null
          "Sp. Atk"?: number | null
          "Sp. Def"?: number | null
          Speed?: number | null
          sprites?: string | null
          "Type 1"?: string | null
          "Type 2"?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      SuccessEducationBackground: {
        Row: {
          Country: string | null
          Degree: string | null
          Field: string | null
          "GPA (or Equivalent)": string | null
          "Graduation Year": string | null
          Institution: string | null
          Name: string | null
          Profession: string | null
          "Scholarship/Award": string | null
          "University Global Ranking": string | null
        }
        Insert: {
          Country?: string | null
          Degree?: string | null
          Field?: string | null
          "GPA (or Equivalent)"?: string | null
          "Graduation Year"?: string | null
          Institution?: string | null
          Name?: string | null
          Profession?: string | null
          "Scholarship/Award"?: string | null
          "University Global Ranking"?: string | null
        }
        Update: {
          Country?: string | null
          Degree?: string | null
          Field?: string | null
          "GPA (or Equivalent)"?: string | null
          "Graduation Year"?: string | null
          Institution?: string | null
          Name?: string | null
          Profession?: string | null
          "Scholarship/Award"?: string | null
          "University Global Ranking"?: string | null
        }
        Relationships: []
      }
      user_queries: {
        Row: {
          count: number
          created_at: string
          id: string
          last_query: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string
          id?: string
          last_query?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          id?: string
          last_query?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          agent_type: string
          created_at: string | null
          id: string
          last_accessed: string | null
          user_id: string
        }
        Insert: {
          agent_type?: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          user_id: string
        }
        Update: {
          agent_type?: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          user_id?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
