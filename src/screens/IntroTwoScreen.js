import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { GroupClaroSvg, GroupEscuroSvg } from "../constants/svgAssets";
import Dots from "../components/Dots";
import IntroCard from "../components/IntroCard";
import Screen from "../components/Screen";
import { BLACK, LIGHT_BG } from "../constants/theme";
import { styles } from "../styles/globalStyles";

export default function IntroTwoScreen({ theme, navigation }) {
  const isLight = theme.mode === "light";
  const groupXml = isLight ? GroupClaroSvg : GroupEscuroSvg;

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK} pad={false}>
      <View style={styles.introScreen}>
        <View
          style={[
            styles.introTop,
            { backgroundColor: isLight ? LIGHT_BG : BLACK },
          ]}
        >
          <SvgXml xml={groupXml} width={180} height={190} />
        </View>

        <View
          style={[
            styles.introBottom,
            { backgroundColor: isLight ? BLACK : "#F56F22" },
          ]}
        >
          <IntroCard
            title="Não perca nenhum evento da sua faculdade"
            transparent
          />

          <View style={styles.introFooterCustom}>
            <TouchableOpacity onPress={() => navigation.goBack("IntroOne")}>
              <Text style={styles.introFooterTextWhite}>Anterior</Text>
            </TouchableOpacity>

            <Dots active={1} theme={theme} lightDots={!isLight} />

            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.introFooterTextWhite}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}
