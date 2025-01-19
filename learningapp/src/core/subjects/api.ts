import { API } from "@core/networking/supabaseClient";
import { Subject } from "./types";

export const getSubject = async (id: string): Promise<Subject | null> => {
  const { data } = await API.from("subjects")
    .select()
    .eq("id", id)
    .single()
    .throwOnError();

  return Promise.resolve(data);
};

export const getAllSubjects = async (): Promise<Subject[] | null> => {
  const { data } = await API.from("subjects")
    .select("*")
    .order("name")
    .throwOnError();
  return data;
};
