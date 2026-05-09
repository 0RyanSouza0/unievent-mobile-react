import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { LogoPretaSvg, LogoSvg } from "../constants/svgAssets";
import AuthInput from "../components/AuthInput";
import Screen from "../components/Screen";
import ThemeButton from "../components/ThemeButton";
import { BLACK, LIGHT_BG, ORANGE } from "../constants/theme";
import { styles } from "../styles/globalStyles";

export default function SignInScreen({ theme, navigation, toggleTheme }) {
  const isLight = theme.mode === "light";
  const logoXml = isLight ? LogoPretaSvg : LogoSvg;

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK} pad={false}>
      <View style={styles.authScreen}>
        <View
          style={[
            styles.authTop,
            { backgroundColor: isLight ? LIGHT_BG : BLACK },
          ]}
        >
          <SvgXml xml={logoXml} width={120} height={180} />
        </View>

        <View
          style={[
            styles.authBottom,
            { backgroundColor: isLight ? BLACK : ORANGE },
          ]}
        >
          <View style={styles.row}>
            <Text style={styles.authTitleWhite}>Login</Text>
            <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          </View>

          <Text style={styles.authLabel}>E-mail</Text>
          <AuthInput
            icon="mail-outline"
            placeholder="email@gmail.com.br"
            theme={isLight ? darkInputTheme : orangeInputTheme}
          />

          <Text style={styles.authLabel}>Senha</Text>
          <AuthInput
            icon="lock-closed-outline"
            placeholder="Insira aqui sua senha"
            secure
            theme={isLight ? darkInputTheme : orangeInputTheme}
          />

          <View style={styles.authRememberRow}>
            <Text style={styles.authMiniWhite}>□ Lembrar senha</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.signInButton,
              {
                backgroundColor: BLACK,
                borderWidth: isLight ? 1 : 0,
                borderColor: isLight ? "#FFFFFF" : "transparent",
              },
            ]}
            onPress={() => navigation.replace("Home")}
          >
            <Text style={styles.signInButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.authLinksRow}>
            <TouchableOpacity>
              <Text style={styles.authLinkWhite}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.authLinkWhite}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const orangeInputTheme = {
  text: "#FFFFFF",
  muted: "#FFFFFF",
  border: "#FFFFFF",
};

const darkInputTheme = {
  text: "#FFFFFF",
  muted: "#FFFFFF",
  border: "#FFFFFF",
};
