import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "../styles/globalStyles";

export default function AuthInput({ icon, placeholder, secure, theme }) {
  return (
    <View style={[styles.inputBox, { borderColor: theme.border }]}>
      <Ionicons name={icon} color={theme.text} size={15} />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.muted}
        secureTextEntry={secure}
        style={[styles.input, { color: theme.text }]}
      />

      {secure && (
        <Ionicons name="eye-off-outline" color={theme.text} size={17} />
      )}
    </View>
  );
}
