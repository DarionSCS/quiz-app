import { ColorValue, Pressable, StyleSheet, View } from "react-native";
import { Variables } from "@style/theme";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import isVoid from "@core/utils/isVoid";
import ThemedText from "@design/Typography/ThemedText";

type Props = {
  onPress: () => void;
  title: string;
  description?: string;
  icon?: any;
  iconColor?: ColorValue;
  color?: ColorValue;
  right?: string;
};

const ListItem = ({
  onPress,
  title,
  description,
  icon,
  iconColor = Variables.colors.text,
  color,
  right,
}: Props) => {
  let textContent: React.ReactNode;
  if (!isVoid(description)) {
    textContent = (
      <View style={styles.containerText}>
        <ThemedText style={[styles.title, color && { color }]}>{title}</ThemedText>
        <ThemedText style={[styles.description]}>{description}</ThemedText>
      </View>
    );
  } else {
    textContent = <ThemedText style={[styles.titleFlex, color && { color }]}>{title}</ThemedText>;
  }

  return (
    <Pressable onPress={onPress} android_ripple={{ color: Variables.colors.ripple, foreground: true }}>
      <View style={styles.container}>
        {icon && <Icons style={styles.icon} name={icon} color={iconColor} size={Variables.sizes.xl} />}
        {textContent}
        {right && <ThemedText style={[styles.right, color && { color }]}>{right}</ThemedText>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.md,
    backgroundColor: Variables.colors.white,
  },
  containerText: {
    flex: 1,
  },
  title: {},
  titleFlex: {
    flex: 1,
  },
  description: {
    color: Variables.colors.gray["500"],
  },
  right: {
    marginLeft: "auto",
  },
  icon: {
    marginLeft: Variables.sizes.xs,
    marginRight: Variables.sizes.md,
  },
});

export default ListItem;
