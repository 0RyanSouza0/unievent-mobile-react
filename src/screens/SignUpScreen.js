import { Text, TouchableOpacity, View } from "react-native";
import AuthInput from "@/components/AuthInput";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";
import { BLACK, ORANGE } from "@/constants/theme";
import { styles } from "@/styles/globalStyles";

export default function SignUpScreen({ theme, navigation, toggleTheme }) {
  const isLight = theme.mode === "light";

  return (
    <Screen theme={theme} bg={isLight ? BLACK : ORANGE} pad={false}>
      <View
        style={[
          styles.authScreen,
          { backgroundColor: isLight ? BLACK : ORANGE },
        ]}
      >
        <View
          style={[
            styles.authTopSignup,
            { backgroundColor: isLight ? BLACK : ORANGE },
          ]}
        >
          <Logo small color="#fff" />
        </View>

        <View
          style={[
            styles.authBottomSignup,
            { backgroundColor: isLight ? BLACK : ORANGE },
          ]}
        >
          <View style={styles.row}>
            <Text style={styles.authTitleWhite}>Cadastro</Text>
          </View>

          <Text style={styles.authLabel}>Nome</Text>
          <AuthInput
            icon="person"
            placeholder="Insira aqui seu nome"
            theme={signupInputTheme}
          />

          <Text style={styles.authLabel}>E-mail</Text>
          <AuthInput
            icon="mail"
            placeholder="email@gmail.com.br"
            theme={signupInputTheme}
          />

          <Text style={styles.authLabel}>Senha</Text>
          <AuthInput
            icon="lock-closed"
            placeholder="Insira aqui sua senha"
            secure
            theme={signupInputTheme}
          />

          <Text style={styles.authLabel}>Confirmação de Senha</Text>
          <AuthInput
            icon="lock-closed"
            placeholder="Insira aqui sua senha"
            secure
            theme={signupInputTheme}
          />

          <TouchableOpacity
            style={[
              styles.signUpButton,
              {
                backgroundColor: BLACK,
                borderWidth: isLight ? 1 : 0,
                borderColor: isLight ? "#FFFFFF" : "transparent",
              },
            ]}
            onPress={() => navigation.replace("SignIn")}
          >
            <Text style={styles.signUpButtonText}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.termsRow}>
            <View style={styles.termsBox} />
            <Text style={styles.authMiniWhite}>
              Concordo com os Termos de Uso e Privacidade
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const signupInputTheme = {
  text: "#FFFFFF",
  muted: "#FFFFFF",
  border: "#FFFFFF",
};
