import { API } from "@core/networking/supabaseClient";
import { Result } from "./types";

type ResultInsert = Omit<Result, "id" | "created_time">;

export const setResult = async (body: ResultInsert): Promise<void> => {
  const { data, error } = await API.from("results")
    .insert([body])
    .throwOnError();
  if (error) {
    throw error;
  }
  console.log("Result saved:", data);
};

export const getResultsByProfile = async (
  profileId: string
): Promise<any[]> => {
  const { data, error } = await API.from("results")
    .select("*")
    .eq("profile_id", profileId)
    .throwOnError();
  if (error) {
    throw error;
  }
  return data;
};
