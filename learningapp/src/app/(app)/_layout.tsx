import { Redirect, Tabs } from "expo-router";
import { useAuthContext } from "@functional/Auth/AuthProvider";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  if (!isLoggedIn) {
    return <Redirect href="/LoginScreen" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#FFF" },
        headerTintColor: "#333",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerLeft: () => (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="(tabs)"
        options={{ title: "Home", headerShown: true }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Settings", headerShown: true }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  backButtonText: {
    marginLeft: 4,
    fontSize: 16,
    color: "#333",
  },
});

export default AppLayout;
