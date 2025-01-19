import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Question } from "@core/questions/types";

type QuestionCardProps = {
  question: Question;
  onSubmit: (answer: string) => void;
  timerDuration: number; // Timer duration in seconds
};

export default function QuestionCard({
  question,
  onSubmit,
  timerDuration,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<string>(""); // User's selected answer
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  ); // Feedback state
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(""); // Submit an empty answer when timer runs out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (selectedAnswer: string) => {
    const isCorrect = question.answer === selectedAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");
    setAnswer(selectedAnswer);
    onSubmit(selectedAnswer);
    setAnswer("");
    setTimeLeft(timerDuration);
  };

  // handle options
  const options: string[] = Array.isArray(question.options)
    ? (question.options as string[])
    : typeof question.options === "string"
    ? JSON.parse(question.options)
    : [];

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.question}</Text>
      <Text style={styles.timerText}>Time Left: {timeLeft}s</Text>
      {question.question_type === "multiple-choice" && options.length > 0 ? (
        <View>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleSubmit(String.fromCharCode(65 + index))} // A, B, C, D
            >
              <Text style={styles.optionText}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <TextInput
          style={styles.input}
          value={answer}
          onChangeText={setAnswer}
          placeholder="Type your answer here..."
        />
      )}
      {question.question_type === "open-ended" && (
        <Button title="Submit" onPress={() => handleSubmit(answer)} />
      )}
      {feedback && (
        <Text
          style={[
            styles.feedback,
            feedback === "correct"
              ? styles.correctFeedback
              : styles.incorrectFeedback,
          ]}
        >
          {feedback === "correct" ? "Correct!" : "Incorrect, try again!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: "100%",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  timerText: {
    fontSize: 14,
    color: "red",
    marginBottom: 8,
  },
  optionButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  feedback: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  correctFeedback: {
    color: "green",
  },
  incorrectFeedback: {
    color: "red",
  },
});
