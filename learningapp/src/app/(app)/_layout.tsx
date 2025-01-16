import { Redirect, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthContext } from "@functional/Auth/AuthProvider";
import { DefaultScreenOptions } from "@style/theme";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const AppLayout = () => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Redirect href="/LoginScreen" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: "#FFF" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        }}
      >
        <Tabs.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        />
        <Tabs.Screen
          name="profile"
          options={{ title: "Settings", headerShown: false }}
        />
      </Tabs>
    </>
  );
};

export default AppLayout;
