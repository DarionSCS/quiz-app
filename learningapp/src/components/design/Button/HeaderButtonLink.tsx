import { Variables } from "@style/theme";
import Icons from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

type Props = {
  icon: keyof typeof Icons.glyphMap;
  href: string;
  title: string;
  color?: string;
};

const HeaderButtonLink = ({ icon, color, href }: Props) => {
  return (
    <Link href={href}>
      <Icons name={icon} color={color || Variables.colors.headerText} size={Variables.sizes.xl} />
    </Link>
  );
};

export default HeaderButtonLink;
