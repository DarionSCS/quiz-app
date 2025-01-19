import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

type SubjectCardProps = {
  subject: { id: string; name: string | null };
  overallScore: number | null;
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, overallScore }) => {
  return (
    <Link href={`/subject/${subject.id}`} style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>
          {subject.name || "Unnamed Subject"}
        </Text>
        {overallScore !== null ? (
          <Text style={styles.cardScore}>Overall Score: {overallScore}%</Text>
        ) : (
          <Text style={styles.cardScore}>No score available</Text>
        )}
      </View>
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
  cardScore: {
    fontSize: 16,
    color: "#007BFF",
    marginTop: 8,
  },
});

export default SubjectCard;
