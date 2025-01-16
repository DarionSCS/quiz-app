import { API } from "@core/networking/supabaseClient";
import { Profile } from "./types";

export const getProfile = async (user_id: string): Promise<Profile | null> => {
  const { data, error } = await API.from("profiles")
    .select()
    .eq("user_id", user_id)
    .single();
  // console.log("data: ", data);
  if (error) {
    console.error("Error in getProfile:", error);
    return null;
  }
  return data;
};

export const updateProfile = async (
  user_id: string,
  profileData: Partial<Profile>
): Promise<Profile | null> => {
  console.log("Updating profile with user_id:", user_id);

  const { data, error } = await API.from("profiles")
    .update(profileData)
    .eq("user_id", user_id)
    .select("*")
    .single();

  if (error) {
    console.error("Error in updateProfile:", error);
    return null;
  }
  return data;
};
