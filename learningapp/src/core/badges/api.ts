import { API } from "@core/networking/supabaseClient";
import { Badge } from "./types";

export const getAllBadges = async (): Promise<Badge[] | null> => {
  const { data } = await API.from("badges").select("*").throwOnError();
  return data;
};
