import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Question } from "@core/questions/types";
import * as Speech from "expo-speech";

type QuestionCardProps = {
  question: Question;
  onSubmit: (answer: string) => void;
  timerDuration: number;
};

export default function QuestionCard({
  question,
  onSubmit,
  timerDuration,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
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

  const handleSpeak = () => {
    if (question.question) {
      Speech.speak(question.question, {
        language: "en",
        pitch: 1,
        rate: 1,
        onDone: () => console.log("Speech completed"),
        onError: (error) => {
          console.error("Speech error:", error);
          Alert.alert(
            "Error",
            "Unable to play the question aloud. Please check your sound settings."
          );
        },
      });
    } else {
      console.warn("No question to speak.");
      Alert.alert("Notice", "No question text available to read aloud.");
    }
  };

  const options: string[] = Array.isArray(question.options)
    ? (question.options as string[])
    : typeof question.options === "string"
    ? JSON.parse(question.options)
    : [];

  return (
    <View style={styles.card}>
      {question.img && (
        <Image
          source={{ uri: question.img }}
          style={styles.questionImage}
          resizeMode="contain"
        />
      )}
      <Text style={styles.questionText}>
        {question.question || "No Question Available"}
      </Text>
      <TouchableOpacity style={styles.speakButton} onPress={handleSpeak}>
        <Text style={styles.speakButtonText}>🔊 Read Aloud</Text>
      </TouchableOpacity>
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
  questionImage: {
    width: "100%",
    height: 200,
    marginBottom: 12,
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
  speakButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
  },
  speakButtonText: {
    color: "#fff",
    fontSize: 16,
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
