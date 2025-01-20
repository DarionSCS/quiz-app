import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { getLeaderboard } from "@core/results/utils";

export default function LeaderboardScreen() {
  const [leaderboard, setLeaderboard] = useState<
    { profile_id: string; score: number; profile_name: string | null }[]
  >([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data || []);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        Alert.alert("Error", "Could not load leaderboard.");
      }
    };

    fetchLeaderboard();
  }, []);

  const renderLeaderboardItem = ({
    item,
    index,
  }: {
    item: { profile_id: string; score: number; profile_name: string | null };
    index: number;
  }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>{index + 1}</Text>
      <Text style={styles.name}>{item.profile_name || "Anonymous"}</Text>
      <Text style={styles.score}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => `${item.profile_id}-${item.score}`}
        renderItem={renderLeaderboardItem}
        contentContainerStyle={styles.list}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  rank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 16,
    color: "#666",
    flex: 1,
    textAlign: "center",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
});
