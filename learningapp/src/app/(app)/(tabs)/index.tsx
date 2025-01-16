import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { API } from "@core/networking/supabaseClient";
import { useRouter } from "expo-router";
import Button from "@design/Button/Button";

export default function IndexScreen() {
  const router = useRouter();

  console.log("index");

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
