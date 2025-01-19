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

type QuestionResultInsert = Omit<Question_Results, "id" | "created_at">;
export const setQuestionResult = async (
  body: QuestionResultInsert
): Promise<Question_Results | null> => {
  const { data } = await API.from("question_results")
    .insert([body])
    .throwOnError();
  return data;
};
