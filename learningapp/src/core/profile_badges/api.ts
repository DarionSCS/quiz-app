import { API } from "@core/networking/supabaseClient";
import { Profile_Badge } from "./types";

export const getProfileBadges = async (
  profileId: string
): Promise<Profile_Badge[] | null> => {
  const { data } = await API.from("profile_badges")
    .select()
    .eq("profile_id", profileId)
    .throwOnError();
  return data;
};

export const setProfileBadge = async (
  profileId: string,
  badgeId: string
): Promise<Profile_Badge | null> => {
  const { data } = await API.from("profile_badges")
    .upsert({ profile_id: profileId, badge_id: badgeId })
    .throwOnError();
  return data;
};
