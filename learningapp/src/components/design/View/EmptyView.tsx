import { StyleSheet } from "react-native";
import Icons from "@expo/vector-icons/Feather";
import ThemedText from "@design/Typography/ThemedText";
import { Variables } from "@style/theme";
import CenteredView from "@design/View/CenteredView";
import Button from "@design/Button/Button";

type Props = {
  title: string;
  description: string;
  icon: keyof typeof Icons.glyphMap;
  onPress?: () => void;
};

const EmptyView = ({ title, description, icon, onPress }: Props) => {
  return (
    <CenteredView>
      <Icons name={icon} size={Variables.sizes["3xl"]} color={Variables.colors.primary["400"]} />
      <ThemedText style={[styles.title, styles.text]} type="title">
        {title}
      </ThemedText>
      <ThemedText color="light" style={styles.text}>
        {description}
      </ThemedText>
      {onPress && (
        <Button onPress={onPress} style={styles.button}>
          Toevoegen
        </Button>
      )}
    </CenteredView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: Variables.sizes.xs,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: Variables.sizes.lg,
  },
  button: {
    marginTop: Variables.sizes.md,
  },
});

export default EmptyView;
