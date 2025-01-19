import React, { useState } from "react";
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
};

export default function QuestionCard({
  question,
  onSubmit,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(answer);
    setAnswer("");
  };

  // Safely handle options
  const options: string[] = Array.isArray(question.options)
    ? (question.options as string[])
    : typeof question.options === "string"
    ? JSON.parse(question.options)
    : [];

  return (
    <View style={styles.card}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.question_type === "multiple-choice" && options.length > 0 ? (
        <View>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => onSubmit(String.fromCharCode(65 + index))} // Send "A", "B", "C", "D"
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
        <Button title="Submit" onPress={handleSubmit} />
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
});
