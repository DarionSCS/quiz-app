import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SubjectCard from "@design/Cards/SubjectCard";
import { getAllSubjects } from "@core/subjects/api";
import { getUserAverageResultsForSubject } from "@core/subjects/utils";
import { getCurrentSession } from "@core/auth/api";
import Button from "@design/Button/Button";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const [subjects, setSubjects] = useState<
    { id: string; name: string | null; overallScore: number | null }[] | null
  >([]);
  const router = useRouter();
  const handleBadgeRedirect = () => {
    router.push("/badges");
  };
  const handleLBRedirect = () => {
    router.push("/leaderboard");
  };
  const fetchSubjectsWithScores = async () => {
    try {
      const subjectsData = await getAllSubjects();
      if (!subjectsData) return;

      const session = await getCurrentSession();
      if (!session) return;

      const userProfileId = session.user.id;

      const enrichedSubjects = await Promise.all(
        subjectsData.map(async (subject) => {
          const result = await getUserAverageResultsForSubject(
            subject.id,
            userProfileId
          );

          return {
            id: subject.id,
            name: subject.name,
            overallScore: result?.overall_average ?? null, // Add the overall score
          };
        })
      );

      // Filter out undefined results
      setSubjects(enrichedSubjects.filter((s) => s !== undefined));
    } catch (error) {
      console.error("Failed to fetch subjects or scores:", error);
    }
  };

  useEffect(() => {
    fetchSubjectsWithScores();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick your subject</Text>
      {subjects && subjects.length > 0 ? (
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SubjectCard subject={item} overallScore={item.overallScore} />
          )}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noSubjectsText}>No subjects found.</Text>
      )}
      <Button style={styles.list} onPress={handleBadgeRedirect}>
        Badges
      </Button>
      <Button onPress={handleLBRedirect}>Leaderboard</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  list: { paddingBottom: 16 },
  noSubjectsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});
