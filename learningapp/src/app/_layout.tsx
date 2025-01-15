import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { DefaultScreenOptions, Theme, Variables } from "@style/theme";
import AuthProvider from "@functional/Auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded] = useFonts({
    [Variables.fonts
      .default]: require("@assets/fonts/SourceSansPro-Regular.ttf"),
    [Variables.fonts.bold]: require("@assets/fonts/SourceSansPro-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={Theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack screenOptions={DefaultScreenOptions}>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
};

export default RootLayout;
