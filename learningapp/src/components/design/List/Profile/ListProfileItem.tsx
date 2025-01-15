import { Pressable, StyleSheet, View } from "react-native";
import { Variables } from "@style/theme";
import isEmptyText from "@core/utils/isEmptyText";
import ThemedText from "@design/Typography/ThemedText";
import TextAvatar from "@design/Avatar/TextAvatar";
import ImageAvatar from "@design/Avatar/ImageAvatar";

type Props = {
  title: string;
  description?: string;
  avatarText: string;
  avatarUrl?: string | null;
  onPress: () => void;
};

const ListProfileItem = ({ title, avatarText, avatarUrl, description, onPress }: Props) => {
  return (
    <Pressable
      style={styles.pressable}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
      onPress={onPress}
    >
      <View style={styles.container}>
        {avatarUrl && <ImageAvatar uri={avatarUrl} />}
        {!avatarUrl && avatarText && <TextAvatar>{avatarText}</TextAvatar>}
        <View style={styles.containerText}>
          <ThemedText type="title">{title}</ThemedText>
          {!isEmptyText(description) && <ThemedText color="light">{description}</ThemedText>}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    marginBottom: Variables.sizes["2xl"],
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Variables.colors.white,
    paddingHorizontal: Variables.sizes.horizontalPadding,
    paddingVertical: Variables.sizes.md,
  },
  containerText: {
    flex: 1,
    marginStart: Variables.sizes.md,
  },
});

export default ListProfileItem;
