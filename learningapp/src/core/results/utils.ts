import { API } from "@core/networking/supabaseClient";

export const calculateQuizScore = async (
  profileId: string,
  subjectId: string,
  difficulty: "Beginner" | "Intermediate" | "Advanced"
): Promise<{ score: number; progress: number }> => {
  const { data: questionResults, error } = await API.from("question_results")
    .select(
      "answer, multiplier, question:questions(subject_id, difficulty)"
    )
    .eq("profile_id", profileId)
    .eq("question.subject_id", subjectId)
    .eq("question.difficulty", difficulty);

  if (error) {
    console.error("Error fetching question results:", error);
    throw error;
  }

  if (!questionResults) {
    return { score: 0, progress: 0 };
  }

  const totalQuestions = questionResults.length;

  // weight for multiplier
  const weightedCorrectAnswers = questionResults.reduce((total, result) => {
    if (result.answer === true) {
      const boost = result.multiplier ? 1.1 : 1;
      return total + boost;
    }
    return total;
  }, 0);

  // Calculate score and progress
  const score = (weightedCorrectAnswers / totalQuestions) * 100;
  const progress = (totalQuestions / totalQuestions) * 100;

  return { score: Math.round(score), progress: Math.round(progress) };
};
