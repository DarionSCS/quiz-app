import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Variables } from "@style/theme";

type Props = {
  timeout?: number;
};

// loading indicator that only shows if it takes longer than 1 second
const LoadingIndicator = ({ timeout = 1000 }: Props) => {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(true);
    }, timeout);
    return () => clearTimeout(id);
  }, []);

  if (!isVisible) {
    return null;
  }

  return <ActivityIndicator color={Variables.colors.primary["600"]} />;
};

export default LoadingIndicator;
