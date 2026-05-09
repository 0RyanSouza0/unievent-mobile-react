import { View } from "react-native";
import LogoSvg from "../../assets/Logo.svg";
import { styles } from "@/styles/globalStyles";

export default function Logo() {
  return (
    <View style={styles.logoRow}>
      <LogoSvg width={120} height={180} />
    </View>
  );
}
