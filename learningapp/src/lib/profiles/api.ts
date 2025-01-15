import { API } from "@/src/lib/networking/supabaseClient";
import { Profile } from "./types";

export const getProfile = async (id: string): Promise<Profile | null> => {
  const { data } = await API.from("profiles")
    .select()
    .eq("id", id)
    .single()
    .throwOnError();
  return Promise.resolve(data);
};
