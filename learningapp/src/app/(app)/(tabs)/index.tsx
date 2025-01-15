import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { API } from "@core/networking/supabaseClient";
import { useRouter } from "expo-router";
import Button from "@design/Button/Button";

export default function IndexScreen() {
  const router = useRouter();

  console.log("index");

  const handleLogout = async () => {
    await API.auth.signOut();
    router.replace("/LoginScreen");
  };

  const handleSettings = async () => {
    router.replace("/profile/Settings");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button onPress={handleSettings}> Settings </Button>
      <Button onPress={handleLogout}> Logout </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
