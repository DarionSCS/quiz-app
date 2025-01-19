import { API } from "@core/networking/supabaseClient";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";

type AverageResult = {
  difficulty: Difficulty;
  average_score: number | null;
};

type SubjectAverageResult = {
  difficulty_averages: AverageResult[];
  overall_average: number | null;
};

export const getUserAverageResultsForSubject = async (
  subjectId: string,
  profileId: string
): Promise<SubjectAverageResult | null> => {
  // Fetch results for the given subject and profile
  const { data, error } = await API.from("results")
    .select("difficulty, score")
    .eq("subject_id", subjectId)
    .eq("profile_id", profileId)
    .throwOnError();

  if (!data || data.length === 0) {
    console.log("No results found for the given subject and profile.");
    return { difficulty_averages: [], overall_average: null };
  }

  // Group by difficulty and calculate average scores
  const groupedResults = data.reduce(
    (acc: Record<Difficulty, { totalScore: number; count: number }>, curr) => {
      const difficulty = curr.difficulty as Difficulty;

      if (!acc[difficulty]) {
        acc[difficulty] = { totalScore: 0, count: 0 };
      }

      acc[difficulty].totalScore += curr.score || 0;
      acc[difficulty].count += 1;

      return acc;
    },
    {
      Beginner: { totalScore: 0, count: 0 },
      Intermediate: { totalScore: 0, count: 0 },
      Advanced: { totalScore: 0, count: 0 },
    }
  );

  // Calculate averages for each difficulty
  const difficulty_averages = Object.entries(groupedResults).map(
    ([difficulty, result]) => ({
      difficulty: difficulty as Difficulty,
      average_score:
        result.count > 0 ? Math.round(result.totalScore / result.count) : null,
    })
  );

  // Calculate the overall average
  const validScores = difficulty_averages
    .map((avg) => avg.average_score)
    .filter((score) => score !== null) as number[]; // Filter out null scores

  const overall_average =
    validScores.length > 0
      ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / 3) // Divide by total difficulties
      : null;

  return {
    difficulty_averages,
    overall_average,
  };
};
