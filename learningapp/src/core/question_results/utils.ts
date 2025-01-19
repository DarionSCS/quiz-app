import { API } from "@core/networking/supabaseClient";

export const getHighScoreForQuiz = async (
  profileId: string,
  subjectId: string,
  difficulty: "Beginner" | "Intermediate" | "Advanced"
): Promise<number> => {
  try {
    const { data, error } = await API.from("question_results")
      .select(
        `
          id,
          question_id!inner(subject_id, difficulty),
          answer
        `
      )
      .eq("profile_id", profileId)
      .eq("question_id.subject_id", subjectId)
      .eq("question_id.difficulty", difficulty)
      .eq("answer", true);

    if (error) {
      console.error("Error fetching high score:", error);
      return 0;
    }

    // the count of correct answers
    return data?.length || 0;
  } catch (error) {
    console.error("Error calculating high score:", error);
    return 0;
  }
};
