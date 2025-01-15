import ThemedText from "@design/Typography/ThemedText";
import { Variables } from "@style/theme";
import { StyleSheet } from "react-native";

type Props = {
  children: string;
};

const Label = ({ children }: Props) => {
  return <ThemedText style={styles.label}>{children}</ThemedText>;
};

const styles = StyleSheet.create({
  label: {
    width: "100%",
    marginLeft: Variables.sizes["2xs"],
    marginBottom: Variables.sizes["2xs"],
  },
});

export default Label;
