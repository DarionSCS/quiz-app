import { API } from "@core/networking/supabaseClient";
import { Question_Results } from "./types";

export const getAllQuestionResults = async (): Promise<
  Question_Results[] | null
> => {
  const { data } = await API.from("question_results")
    .select("*")
    .throwOnError();
  return data;
};

export const getQuestionResult = async (
  id: string
): Promise<Question_Results | null> => {
  const { data } = await API.from("question_results")
    .select()
    .eq("id", id)
    .single()
    .throwOnError();
  return data;
};

export const setQuestionResult = async (
  body: Question_Results
): Promise<Question_Results | null> => {
  const { data } = await API.from("question_results")
    .insert([body])
    .throwOnError();
  return data;
};
