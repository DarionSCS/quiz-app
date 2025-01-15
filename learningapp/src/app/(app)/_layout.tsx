import { Redirect, Stack } from "expo-router";
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
      <Stack screenOptions={DefaultScreenOptions}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
};

export default AppLayout;
