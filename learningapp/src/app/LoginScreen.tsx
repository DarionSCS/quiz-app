import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import Logo from "@design/Logo/Logo";
import ThemedText from "@design/Typography/ThemedText";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ErrorMessage from "@design/Alert/ErrorMessage";
import { useAuthContext } from "@functional/Auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledTextField from "@functional/Form/ControlledTextField";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // file refactored to React-Query (useMutation) compared to class recording
  const { mutate, error, isPending } = useMutation({
    mutationFn: ({ email, password }: FieldValues) => login(email, password),
    onSuccess: () => {
      console.log("Login successful, navigating to settings"); // Add this log
      router.push("/(app)/(tabs)");
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    mutate(data);
  };

  const handleRegisterPush = () => {
    router.push("/RegisterScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView keyboardShouldPersistTaps="always">
        <DefaultView>
          <Logo style={styles.logo} />
          <ThemedText type="title" style={styles.title}>
            Login met je account
          </ThemedText>

          {!!error && <ErrorMessage error={error} />}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                label="Email"
                name="email"
                placeholder="john@doe.com"
                autoComplete="email"
                keyboardType="email-address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                disabled={isPending}
                error={errors.email?.message}
              />
            )}
          />

          <ControlledTextField
            control={control}
            label="Password"
            name="password"
            secureTextEntry={true}
            disabled={isPending}
          />

          <Button
            style={styles.button}
            onPress={handleSubmit(handleOnSubmit)}
            disabled={isPending}
          >
            Login
          </Button>
          <Button style={styles.registerButton} onPress={handleRegisterPush}>
            Register here!
          </Button>
        </DefaultView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    marginBottom: Variables.sizes["2xl"],
  },
  button: {
    marginTop: Variables.sizes.sm,
  },
  logo: {
    marginHorizontal: "auto",
    marginTop: Variables.sizes["5xl"],
    marginBottom: Variables.sizes["2xl"],
  },
  registerButton: {
    marginTop: Variables.sizes.sm,
  },
});

export default Login;
