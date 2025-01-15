import { Pressable, StyleProp, StyleSheet } from "react-native";
import { Variables } from "@style/theme";
import ThemedText from "@design/Typography/ThemedText";

type Props = {
  onPress: () => void;
  children: string;
  color?: string;
  style?: StyleProp<Object>;
  disabled?: boolean;
};

const TextButton = ({ onPress, children, color, style, disabled = false }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={children}
      onPress={onPress}
      style={style}
      android_ripple={{ color: Variables.colors.ripple }}
    >
      <ThemedText style={[styles.title, color && { color }]}>{children}</ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: Variables.colors.primary["500"],
    fontFamily: Variables.fonts.bold,
    fontSize: Variables.textSizes.default,
    paddingHorizontal: Variables.sizes.lg,
    paddingVertical: Variables.sizes.md,
  },
});

export default TextButton;
