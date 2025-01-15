import { API } from "@/src/lib/networking/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@/src/lib/profiles/types";
import { getProfile } from "../profiles/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Auth } from "./types";

// authentication
export const getCurrentSession = async (): Promise<Auth | null> => {
  const {
    data: { session },
    error,
  } = await API.auth.getSession();

  if (error || !session?.user) {
    return null;
  }
  const { user } = session;
  const profile = await getProfile(user.id);
  const role = profile?.role; // role is saved in profile

  if (!profile || !role) {
    return null;
  }

  return {
    session,
    user: {
      email: user.email ?? "",
      ...profile,
      role: role,
    },
  };
};

// login
export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const { error } = await API.auth.signInWithPassword({ email, password });
  if (error) {
    return error.message;
  }
  return null;
};

type RegisterResponse = {
  error: string | null;
};

// register
export const register = async (
  email: string,
  password: string,
  profileData: Omit<Profile, "id" | "user_id" | "created_at">
): Promise<RegisterResponse> => {
  const { data, error } = await API.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await API.from("profiles").insert({
      user_id: data.user.id,
      ...profileData,
    });

    if (profileError) {
      return { error: profileError.message };
    }
  }

  return { error: null };
};
