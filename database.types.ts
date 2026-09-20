export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];


export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string | null;
          country: string | null;
          created_at: string;
          details: Json | null;
          device: string;
          id: string;
          path: string;
          user_identifier: string | null;
        };
        Insert: {
          browser?: string | null;
          country?: string | null;
          created_at?: string;
          details?: Json | null;
          device: string;
          id?: string;
          path: string;
          user_identifier?: string | null;
        };
        Update: {
          browser?: string | null;
          country?: string | null;
          created_at?: string;
          details?: Json | null;
          device?: string;
          id?: string;
          path?: string;
          user_identifier?: string | null;
        };
        Relationships: [];
      };
      contact_queries: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          message: string;
          origin: string;
          SenderName: string;
          status: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: string;
          message: string;
          origin?: string;
          SenderName: string;
          status?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          message?: string;
          origin?: string;
          SenderName?: string;
          status?: string | null;
        };
        Relationships: [];
      };
      personal_blogs: {
        Row: {
          banner: string | null;
          content: string;
          id: string;
          published: string | null;
          shortDescription: string;
          title: string;
          updated: string | null;
        };
        Insert: {
          banner?: string | null;
          content?: string;
          id?: string;
          published?: string | null;
          shortDescription?: string;
          title?: string;
          updated?: string | null;
        };
        Update: {
          banner?: string | null;
          content?: string;
          id?: string;
          published?: string | null;
          shortDescription?: string;
          title?: string;
          updated?: string | null;
        };
        Relationships: [];
      };
      personal_blogs_drafts: {
        Row: {
          AdditionalDescription: string | null;
          content: string | null;
          created_at: string;
          DemoVideo: string | null;
          Description: string | null;
          ended: string | null;
          id: string;
          image: string | null;
          isdraft: boolean | null;
          Link: string | null;
          links: Json | null;
          orderIndex: number;
          started: string | null;
          tags: Json | null;
          title: string | null;
        };
        Insert: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          isdraft?: boolean | null;
          Link?: string | null;
          links?: Json | null;
          orderIndex?: number;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Update: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          isdraft?: boolean | null;
          Link?: string | null;
          links?: Json | null;
          orderIndex?: number;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Relationships: [];
      };
      personal_projects: {
        Row: {
          AdditionalDescription: string | null;
          content: string | null;
          created_at: string;
          DemoVideo: string | null;
          Description: string | null;
          ended: string | null;
          id: string;
          image: string | null;
          Link: string | null;
          links: Json | null;
          orderIndex: number;
          started: string | null;
          tags: Json | null;
          title: string | null;
        };
        Insert: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          Link?: string | null;
          links?: Json | null;
          orderIndex?: number;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Update: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          Link?: string | null;
          links?: Json | null;
          orderIndex?: number;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Relationships: [];
      };
      personal_projects_drafts: {
        Row: {
          AdditionalDescription: string | null;
          content: string | null;
          created_at: string;
          DemoVideo: string | null;
          Description: string | null;
          ended: string | null;
          id: string;
          image: string | null;
          isdraft: boolean | null;
          Link: string | null;
          links: Json | null;
          started: string | null;
          tags: Json | null;
          title: string | null;
        };
        Insert: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          isdraft?: boolean | null;
          Link?: string | null;
          links?: Json | null;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Update: {
          AdditionalDescription?: string | null;
          content?: string | null;
          created_at?: string;
          DemoVideo?: string | null;
          Description?: string | null;
          ended?: string | null;
          id?: string;
          image?: string | null;
          isdraft?: boolean | null;
          Link?: string | null;
          links?: Json | null;
          started?: string | null;
          tags?: Json | null;
          title?: string | null;
        };
        Relationships: [];
      };
      update_logs: {
        Row: {
          id: string;
          last_update: string;
          log: string | null;
        };
        Insert: {
          id?: string;
          last_update?: string;
          log?: string | null;
        };
        Update: {
          id?: string;
          last_update?: string;
          log?: string | null;
        };
        Relationships: [];
      };
      update_logs_testing: {
        Row: {
          id: string;
          last_update: string;
          log: string | null;
        };
        Insert: {
          id?: string;
          last_update?: string;
          log?: string | null;
        };
        Update: {
          id?: string;
          last_update?: string;
          log?: string | null;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          full_name: string | null;
          id: string;
          role: string | null;
        };
        Insert: {
          created_at?: string | null;
          full_name?: string | null;
          id: string;
          role?: string | null;
        };
        Update: {
          created_at?: string | null;
          full_name?: string | null;
          id?: string;
          role?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
