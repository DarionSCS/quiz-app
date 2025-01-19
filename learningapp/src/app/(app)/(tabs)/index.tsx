import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SubjectCard from "@design/Cards/SubjectCard";
import { getAllSubjects } from "@core/subjects/api";

export default function IndexScreen() {
  const [subjects, setSubjects] = useState<
    { created_at: string; id: string; name: string | null }[] | null
  >([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getAllSubjects();
      setSubjects(data);
    };

    fetchSubjects();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pick your subject</Text>
      {subjects && subjects.length > 0 ? (
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SubjectCard subject={item} />}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noSubjectsText}>No subjects found.</Text>
      )}
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
