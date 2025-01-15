import { Image, StyleProp, StyleSheet, View } from "react-native";
import { Variables } from "@style/theme";

type Props = {
  style?: StyleProp<Object>;
  uri: string;
};

const ImageAvatar = ({ uri, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <Image style={styles.image} source={{ uri }} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Variables.sizes["4xl"],
    height: Variables.sizes["4xl"],
    borderRadius: Variables.sizes["4xl"] / 2,
    backgroundColor: Variables.colors.primary["100"],
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImageAvatar;
