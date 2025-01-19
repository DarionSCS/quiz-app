import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getSubject } from "@core/subjects/api";
import { getQuestionsBySubjectAndDifficulty } from "@core/questions/api";
import QuestionCard from "@design/Cards/QuestionCard";
import { Question } from "@core/questions/types";

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
  >(null); // Selected difficulty
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const subjectData = await getSubject(id);
          setSubject(subjectData);
        } catch (error) {
          console.error("Failed to fetch subject:", error);
        }
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (id && difficulty) {
      const fetchQuestions = async () => {
        try {
          const questionData = await getQuestionsBySubjectAndDifficulty(
            id,
            difficulty
          );
          if (questionData) setQuestions(questionData);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      };
      fetchQuestions();
    }
  }, [id, difficulty]);

  const handleAnswerSubmit = (questionId: string, answer: string) => {
    console.log(`Question ID: ${questionId}, Answer: ${answer}`);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log("Quiz completed!");
      router.push("/");
    }
  };

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
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.difficultyButton}
              onPress={() =>
                setDifficulty(level as "Beginner" | "Intermediate" | "Advanced")
              }
            >
              <Text style={styles.difficultyText}>{level}</Text>
            </TouchableOpacity>
          ))}
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
  },
  difficultyText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
