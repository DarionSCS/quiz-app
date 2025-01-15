import { StyleProp, StyleSheet, View } from "react-native";
import { Variables } from "@style/theme";
import ThemedText from "@design/Typography/ThemedText";

type Props = {
  style?: StyleProp<Object>;
  children: string;
};

const TextAvatar = ({ children, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ThemedText style={styles.text}>{children}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Variables.sizes["4xl"],
    height: Variables.sizes["4xl"],
    borderRadius: Variables.sizes["4xl"] / 2,
    backgroundColor: Variables.colors.primary["100"],
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  text: {
    fontSize: Variables.textSizes.xxl,
    fontFamily: Variables.fonts.bold,
    color: Variables.colors.primary["700"],
  },
});

export default TextAvatar;
