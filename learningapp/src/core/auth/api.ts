import { API } from "@core/networking/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Profile } from "@core/profiles/types";
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
    console.error("Error in getCurrentSession:", error); // Add detailed error log
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
export type LoginBody = {
  email: string;
  password: string;
};

export const login = async ({ email, password }: LoginBody) => {
  const { data, error } = await API.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(data.user);
};

// register
export type RegisterResponse = {
  error: string | null;
};

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

// logout
export const logout = async () => {
  await API.auth.signOut();
};
