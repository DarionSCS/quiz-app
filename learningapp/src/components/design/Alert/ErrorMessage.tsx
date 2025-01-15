import { StyleSheet } from "react-native";
import { Variables } from "@style/theme";
import ThemedText from "@design/Typography/ThemedText";

type Props = {
  error: unknown;
};

const ErrorMessage = ({ error }: Props) => {
  if (error) {
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return <ThemedText style={styles.text}>{message}</ThemedText>;
  }
  return null;
};

const styles = StyleSheet.create({
  text: {
    width: "100%",
    textAlign: "center",
    backgroundColor: Variables.colors.error["100"],
    color: Variables.colors.error["400"],
    padding: Variables.sizes.sm,
    borderRadius: Variables.sizes.xs,
    marginBottom: Variables.sizes.md,
  },
});

export default ErrorMessage;
