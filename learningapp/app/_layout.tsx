import React from "react";
import { Slot } from "expo-router";
import { useAuth } from "@/lib/auth/api";

export default function RootLayout() {
  const { loading } = useAuth();

  if (loading) {
    return null; //loading spinner here
  }

  return <Slot />;
}
