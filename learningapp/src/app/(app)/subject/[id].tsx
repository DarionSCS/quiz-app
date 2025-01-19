import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getSubject } from "@core/subjects/api";
import { getPendingQuestionsBySubjectAndDifficulty } from "@core/questions/api";
import { setQuestionResult } from "@core/question_results/api";
import { calculateQuizScore } from "@core/results/utils";
import { setResult } from "@core/results/api";
import { getCurrentSession } from "@core/auth/api";
import QuestionCard from "@design/Cards/QuestionCard";
import { Question } from "@core/questions/types";
import { getHighScoreForQuiz } from "@core/question_results/utils";

export default function SubjectScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [subject, setSubject] = useState<{
    id: string;
    name: string | null;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<
    "Beginner" | "Intermediate" | "Advanced" | null
  >(null);
  const router = useRouter();
  const [sessionProfileId, setSessionProfileId] = useState<string | null>(null);
  const [highScores, setHighScores] = useState<
    { difficulty: string; score: number | null }[]
  >([]);
  const [startTime, setStartTime] = useState<number | null>(null);

  // get session, subject, and high scores
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const session = await getCurrentSession();
          if (!session) {
            router.push("/LoginScreen");
            return;
          }
          setSessionProfileId(session.user.id);

          const subjectData = await getSubject(id);
          setSubject(subjectData);

          if (session.user.id) {
            const scores = await Promise.all(
              ["Beginner", "Intermediate", "Advanced"].map(async (level) => {
                const score = await getHighScoreForQuiz(
                  session.user.id,
                  id,
                  level as "Beginner" | "Intermediate" | "Advanced"
                );
                return { difficulty: level, score };
              })
            );
            setHighScores(scores);
          }
        } catch (error) {
          console.error(
            "Failed to fetch subject, session, or high scores:",
            error
          );
        }
      };
      fetchData();
    }
  }, [id]);

  // get questions based on difficulty and id
  useEffect(() => {
    if (id && difficulty && sessionProfileId) {
      const fetchQuestions = async () => {
        try {
          const questionData = await getPendingQuestionsBySubjectAndDifficulty(
            id,
            difficulty,
            sessionProfileId
          );
          if (questionData) setQuestions(questionData);
          setStartTime(Date.now());
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      };
      fetchQuestions();
    }
  }, [id, difficulty, sessionProfileId]);

  const handleAnswerSubmit = async (questionId: string, answer: string) => {
    try {
      const correctAnswer = questions[currentIndex].answer;
      const isCorrect = correctAnswer === answer;

      // Calculate time elapsed since the question was displayed
      const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : null;

      // Determine if a multiplier should be applied
      const multiplier = timeElapsed !== null && timeElapsed <= 10;

      // Save the question result
      await setQuestionResult({
        profile_id: sessionProfileId,
        question_id: questionId,
        answer: isCorrect,
        answer_text: answer,
        multiplier,
      });

      // Move to the next question or finish the quiz
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setStartTime(Date.now()); // Reset the start time for the next question
      } else {
        // Calculate final score and progress
        const { score, progress } = await calculateQuizScore(
          sessionProfileId as string,
          id as string,
          difficulty as "Beginner" | "Intermediate" | "Advanced"
        );

        // Save the final result
        await setResult({
          profile_id: sessionProfileId as string,
          subject_id: id as string,
          difficulty: difficulty as "Beginner" | "Intermediate" | "Advanced",
          score,
          progress,
        });

        console.log("Quiz completed and result saved!");
        router.push("/");
        setDifficulty(null);
      }
    } catch (error) {
      console.error("Error submitting the answer or saving the result:", error);
    }
  };

  if (!sessionProfileId) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading session...</Text>
      </View>
    );
  }

  if (!subject) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading subject...</Text>
      </View>
    );
  }

  if (!difficulty) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select Difficulty for {subject.name}</Text>
        <View style={styles.difficultyContainer}>
          {["Beginner", "Intermediate", "Advanced"].map((level) => {
            const score = highScores.find(
              (hs) => hs.difficulty === level
            )?.score;
            return (
              <TouchableOpacity
                key={level}
                style={styles.difficultyButton}
                onPress={() =>
                  setDifficulty(
                    level as "Beginner" | "Intermediate" | "Advanced"
                  )
                }
              >
                <Text style={styles.difficultyText}>{level}</Text>
                <Text style={styles.highScoreText}>
                  High Score: {score !== null ? score : "N/A"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          No questions available for {difficulty} difficulty.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subject: {subject.name}</Text>
      <Text style={styles.subtitle}>
        Difficulty: {difficulty} - Question {currentIndex + 1} of{" "}
        {questions.length}
      </Text>
      <QuestionCard
        question={questions[currentIndex]}
        onSubmit={(answer) =>
          handleAnswerSubmit(questions[currentIndex].id, answer)
        }
        timerDuration={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  subtitle: { fontSize: 18, color: "#666", marginBottom: 8 },
  loadingText: { fontSize: 16, color: "#999", textAlign: "center" },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  difficultyButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  difficultyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  highScoreText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
  },
});
