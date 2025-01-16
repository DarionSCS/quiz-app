import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Variables } from "@style/theme";
import Button from "@design/Button/Button";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { register } from "@core/auth/api";

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
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
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
      role: 1, // Change 2 for admin
    };

    const { error: registerError } = await register(
      email,
      password,
      profileData
    );

    if (registerError) {
      setError(registerError);
    } else {
      router.replace("/LoginScreen");
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setDatePickerVisible(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setBirth(formattedDate);
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

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={() => setDatePickerVisible(true)}
      >
        <Text style={styles.datePickerText}>
          {birth || "Select Date of Birth"}
        </Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={birth ? new Date(birth) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()} // Prevent future dates
        />
      )}

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
      <Button onPress={handleRegister}> Register </Button>
      <Button
        style={styles.loginButton}
        onPress={() => router.push("/LoginScreen")}
      >
        Login here!
      </Button>
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
  datePickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  datePickerText: {
    color: "#333",
  },
  loginButton: {
    marginTop: Variables.sizes.sm,
  },
});
