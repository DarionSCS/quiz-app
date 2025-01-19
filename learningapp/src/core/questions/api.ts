import { API } from "@core/networking/supabaseClient";
import { Question } from "./types";

export const getAllQuestions = async (): Promise<Question[] | null> => {
  const { data } = await API.from("questions")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
};

export const getQuestion = async (id: string): Promise<Question | null> => {
  const { data } = await API.from("questions")
    .select()
    .eq("id", id)
    .single()
    .throwOnError();
  return data;
};

export const getQuestionsBySubject = async (
  subjectId: string
): Promise<Question[] | null> => {
  const { data } = await API.from("questions")
    .select()
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
};

export const getQuestionsBySubjectAndDifficulty = async (
    subjectId: string,
    difficulty: "Beginner" | "Intermediate" | "Advanced"
  ): Promise<Question[] | null> => {
    const { data } = await API.from("questions")
      .select("*")
      .eq("subject_id", subjectId)
      .eq("difficulty", difficulty)
      .order("created_at", { ascending: false })
      .throwOnError();
    return data;
  };
  