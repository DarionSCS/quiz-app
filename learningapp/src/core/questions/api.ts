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

// questions that haven't been solved yet by the user
export const getPendingQuestionsBySubjectAndDifficulty = async (
  subjectId: string,
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  profileId: string
): Promise<Question[] | null> => {
  const { data, error } = await API.from("questions")
    .select("*, question_results(profile_id)") // Ensure the relationship is fetched
    .eq("subject_id", subjectId)
    .eq("difficulty", difficulty)
    .order("created_at", { ascending: false })
    .throwOnError();

  if (error) {
    console.error("Failed to fetch pending questions:", error);
    return null;
  }

  // Filter out completed questions
  const pendingQuestions = data.filter((question) => {
    const results = question.question_results || [];
    return !results.some((result) => result.profile_id === profileId);
  });

  return pendingQuestions;
};
