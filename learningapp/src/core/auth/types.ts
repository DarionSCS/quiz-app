import { Session } from "@supabase/supabase-js";
import { Profile } from "@/src/lib/profiles/types";
export type Auth = {
  session: Session;
  user: User;
};

export type User = {
  id: string;
  email: string;
  role: number;
} & Profile;
