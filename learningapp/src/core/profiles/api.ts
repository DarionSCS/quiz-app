import { API } from "@core/networking/supabaseClient";
import { Profile } from "./types";

export const getProfile = async (user_id: string): Promise<Profile | null> => {
  const { data, error } = await API.from("profiles")
    .select()
    .eq("user_id", user_id)
    .single()
    .throwOnError();

  // console.log("data: ", data);

  return Promise.resolve(data);
};

export const updateProfile = async (
  user_id: string,
  profileData: Partial<Profile>
): Promise<Profile | null> => {
  console.log("Updating profile with user_id:", user_id);

  const { data } = await API.from("profiles")
    .update(profileData)
    .eq("user_id", user_id)
    .select("*")
    .single()
    .throwOnError();

  return Promise.resolve(data);
};
