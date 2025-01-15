import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { register } from "@/lib/auth/api";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [sound, setSound] = useState<boolean | null>(true);
  const [vibration, setVibration] = useState<boolean | null>(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const profileData = {
      surname,
      lastname,
      nickname,
      birth,
      img: null,
      sound,
      vibration,
      role: 1,
    };

    const { error: registerError } = await register(
      email,
      password,
      profileData
    );

    if (registerError) {
      setError(registerError);
    } else {
      router.replace("/auth/LoginScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Surname"
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        placeholder="Lastname"
        style={styles.input}
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        placeholder="Nickname"
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        style={styles.input}
        value={birth}
        onChangeText={setBirth}
      />
      <View style={styles.switchContainer}>
        <Text>Enable Sound</Text>
        <Switch value={sound || false} onValueChange={(val) => setSound(val)} />
      </View>
      <View style={styles.switchContainer}>
        <Text>Enable Vibration</Text>
        <Switch
          value={vibration || false}
          onValueChange={(val) => setVibration(val)}
        />
      </View>
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Already have an account? Login"
        onPress={() => router.push("/auth/LoginScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  error: { color: "red", marginBottom: 10 },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
