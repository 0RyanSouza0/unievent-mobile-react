import { View } from "react-native";
import { SvgXml } from "react-native-svg";
import { IntroClaroSvg, IntroEscuroSvg } from "../constants/svgAssets";
import IntroCard from "../components/IntroCard";
import IntroFooter from "../components/IntroFooter";
import Screen from "../components/Screen";
import { BLACK, LIGHT_BG } from "../constants/theme";
import { styles } from "../styles/globalStyles";

export default function IntroOneScreen({ theme, navigation }) {
  const isLight = theme.mode === "light";
  const introXml = isLight ? IntroClaroSvg : IntroEscuroSvg;

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK} pad={false}>
      <View style={styles.introScreen}>
        <View
          style={[
            styles.introTop,
            { backgroundColor: isLight ? LIGHT_BG : BLACK },
          ]}
        >
          <SvgXml xml={introXml} width={250} height={220} />
        </View>

        <View
          style={[
            styles.introBottom,
            { backgroundColor: isLight ? BLACK : "#F56F22" },
          ]}
        >
          <IntroCard
            title="Descubra os próximos eventos da sua faculdade"
            transparent
          />

          <IntroFooter
            theme={theme}
            active={0}
            onNext={() => navigation.navigate("IntroTwo")}
            lightDots={!isLight}
          />
        </View>
      </View>
    </Screen>
  );
}
