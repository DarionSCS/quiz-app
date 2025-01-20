import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { getAllBadges } from "@core/badges/api";
import { getProfileBadges, setProfileBadge } from "@core/profile_badges/api";
import { getCurrentSession } from "@core/auth/api";
import { getAllCorrectAnswers } from "@core/question_results/utils";

type BadgeProps = {
  id: string;
  name: string;
  description: string;
  img: string | null;
  question_amount: number;
};

type ProfileBadge = {
  profile_id: string;
  badge_id: string;
};

export default function BadgesScreen() {
  const [badges, setBadges] = useState<BadgeProps[]>([]);
  const [profileBadges, setProfileBadges] = useState<ProfileBadge[]>([]);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getCurrentSession();
        if (!session) {
          Alert.alert("Error", "You need to be logged in to view badges.");
          return;
        }

        const userProfileId = session.user.id;
        setProfileId(userProfileId);

        const [allBadges, userBadges, correctAnswersCount] = await Promise.all([
          getAllBadges(),
          getProfileBadges(userProfileId),
          getAllCorrectAnswers(userProfileId),
        ]);

        setBadges(
          (allBadges || []).map((badge) => ({
            id: badge.id,
            name: badge.name || "Unnamed Badge",
            description: badge.description || "",
            img: badge.img,
            question_amount: badge.question_amount || 0,
          }))
        );

        setProfileBadges(
          (userBadges || []).map((profileBadge) => ({
            profile_id: profileBadge.profile_id || "",
            badge_id: profileBadge.badge_id || "",
          }))
        );

        setCorrectAnswers(correctAnswersCount || 0);
      } catch (error) {
        console.error("Error fetching badges or profile information:", error);
        Alert.alert("Error", "Could not load badges.");
      }
    };

    fetchData();
  }, []);

  const handleClaimBadge = async (badge: BadgeProps) => {
    if (correctAnswers >= badge.question_amount) {
      try {
        await setProfileBadge(profileId as string, badge.id);
        Alert.alert("Success", `You claimed the ${badge.name} badge!`);
        setProfileBadges((prev) => [
          ...prev,
          { profile_id: profileId!, badge_id: badge.id },
        ]);
      } catch (error) {
        console.error("Error claiming badge:", error);
        Alert.alert("Error", "Could not claim the badge.");
      }
    } else {
      Alert.alert(
        "Ineligible",
        `You need ${badge.question_amount} correct answers to claim this badge.`
      );
    }
  };

  const isBadgeUnlocked = (badgeId: string) => {
    return profileBadges.some((b) => b.badge_id === badgeId);
  };

  const renderBadge = ({ item }: { item: BadgeProps }) => {
    const unlocked = isBadgeUnlocked(item.id);

    return (
      <View
        style={[
          styles.badgeCard,
          unlocked ? styles.unlockedBadge : styles.lockedBadge,
        ]}
      >
        {item.img && (
          <Image source={{ uri: item.img }} style={styles.badgeImage} />
        )}
        <Text style={styles.badgeName}>{item.name}</Text>
        <Text style={styles.badgeDescription}>{item.description}</Text>
        <Text style={styles.badgeRequirement}>
          Requirement: {item.question_amount} correct answers
        </Text>
        {unlocked ? (
          <Text style={styles.unlockedText}>Unlocked</Text>
        ) : (
          <TouchableOpacity
            style={styles.claimButton}
            onPress={() => handleClaimBadge(item)}
          >
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Badges</Text>
      <FlatList
        data={badges}
        keyExtractor={(item) => item.id}
        renderItem={renderBadge}
        contentContainerStyle={styles.badgeList}
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
  badgeList: {
    paddingBottom: 16,
  },
  badgeCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  unlockedBadge: {
    borderColor: "#4CAF50",
    borderWidth: 2,
  },
  lockedBadge: {
    borderColor: "#F44336",
    borderWidth: 2,
  },
  badgeImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 40,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  badgeRequirement: {
    fontSize: 12,
    color: "#999",
    marginBottom: 8,
  },
  unlockedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  claimButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  claimButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
