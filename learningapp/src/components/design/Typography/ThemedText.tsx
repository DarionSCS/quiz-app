import { Variables } from "@style/theme";
import { Text, type TextProps, StyleSheet, TextStyle, StyleProp } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "default" | "title" | "subtitle" | "link";
  color?: "default" | "light";
  weight?: "normal" | "bold";
  style?: StyleProp<TextStyle>;
};

const ThemedText = ({
  style,
  type = "default",
  color = "default",
  weight = "normal",
  ...rest
}: ThemedTextProps) => {
  return (
    <Text
      style={[
        styles.default,
        type === "title" && styles.title,
        style,
        weight === "bold" && styles.bold,
        color === "light" && styles.light,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: Variables.textSizes.default,
    fontFamily: Variables.fonts.default,
    color: Variables.colors.text,
  },
  title: {
    fontSize: Variables.textSizes.xl,
  },
  bold: {
    fontFamily: Variables.fonts.bold,
  },
  light: {
    color: Variables.colors.gray["600"],
  },
});

export default ThemedText;
