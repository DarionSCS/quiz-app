import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";

export default function IndexScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
