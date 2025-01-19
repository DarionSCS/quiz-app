import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

type SubjectCardProps = {
  subject: { id: string; name: string | null };
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  return (
    <Link href={`/subject/${subject.id}`} style={styles.card}>
      <Text style={styles.cardTitle}>{subject.name || "Unnamed Subject"}</Text>
      <Text style={styles.cardId}>ID: {subject.id}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardId: { fontSize: 14, color: "#666", marginTop: 4 },
});

export default SubjectCard;
