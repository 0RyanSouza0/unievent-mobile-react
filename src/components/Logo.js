import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { LogoSvg } from "../constants/svgAssets";
import { styles } from "../styles/globalStyles";

export default function Logo({}) {
  return (
    <View style={styles.logoRow}>
      <SvgXml xml={LogoSvg} width={120} height={180} />
    </View>
  );
}
