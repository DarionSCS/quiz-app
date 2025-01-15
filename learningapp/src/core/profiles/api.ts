import { API } from "@core/networking/supabaseClient";
import { Profile } from "./types";

export const getProfile = async (user_id: string): Promise<Profile | null> => {
  console.log("Fetching profile with user_id:", user_id); // Add this log

  const { data, error } = await API.from("profiles")
    .select()
    .eq("user_id", user_id)
    .single(); // This ensures only a single row is returned

  if (error) {
    console.error("Error in getProfile:", error); // Add detailed error log
    return null;
  }
  return data;
};
