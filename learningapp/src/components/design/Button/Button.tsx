import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Variables } from "@style/theme";
import ThemedText from "@design/Typography/ThemedText";

type Props = {
  onPress: () => void;
  children: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const Button = ({ onPress, children, style, disabled = false }: Props) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityLabel={children}
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
    >
      <View style={[styles.background, disabled && styles.backgroundDisabled]}>
        <ThemedText style={[styles.text, disabled && styles.textDisabled]}>{children}</ThemedText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Variables.colors.primary["700"],
    paddingHorizontal: Variables.sizes.md,
    paddingVertical: Variables.sizes.sm,
    borderRadius: Variables.sizes.xs,
  },
  backgroundDisabled: {
    backgroundColor: Variables.colors.gray["300"],
  },
  text: {
    textAlign: "center",
    color: Variables.colors.white,
    fontSize: Variables.textSizes.default,
  },
  textDisabled: {
    opacity: 0.3,
    color: Variables.colors.text,
  },
  pressed: {
    opacity: 0.9,
  },
});

export default Button;
