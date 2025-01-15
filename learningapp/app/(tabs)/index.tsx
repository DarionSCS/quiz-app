import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { API } from "@/lib/networking/supabaseClient";
import { useRouter } from "expo-router";
import Button from "@/components/design/Button";

export default function IndexScreen() {
  const router = useRouter();

  console.log("index");

  const handleLogout = async () => {
    await API.auth.signOut();
    router.replace("/auth/LoginScreen");
  };

  const handleSettings = async () => {
    router.replace("/profile/Settings");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Settings" onPress={handleLogout} />
      <Button title="Logout" onPress={handleSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
