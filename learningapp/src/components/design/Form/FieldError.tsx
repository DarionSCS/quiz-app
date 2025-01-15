import { StyleSheet } from "react-native";
import ThemedText from "@design/Typography/ThemedText";
import { Variables } from "@style/theme";

type Props = {
  children: string;
};

const FieldError = ({ children }: Props) => {
  return <ThemedText style={styles.error}>{children}</ThemedText>;
};

const styles = StyleSheet.create({
  error: {
    color: Variables.colors.error["500"],
    fontSize: Variables.textSizes.sm,
    marginTop: Variables.sizes["2xs"],
    marginLeft: Variables.sizes.xs,
    textAlign: "left",
    width: "100%",
  },
});

export default FieldError;
