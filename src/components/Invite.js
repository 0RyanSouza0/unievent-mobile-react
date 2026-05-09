import { Share, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { cardIconeSvg } from "../constants/svgAssets";
import { styles } from "../styles/globalStyles";

export default function Invite() {
  async function handleShare() {
    try {
      await Share.share({
        message: "Participe dos eventos comigo no UniEvent!",
      });
    } catch {
      return null;
    }
  }

  return (
    <View style={styles.inviteCard}>
      <View style={styles.inviteLeft}>
        <Text style={styles.inviteTitle}>Convide seus amigos</Text>

        <Text style={styles.inviteText}>
          Eventos são ainda melhores com amigos!
        </Text>

        <TouchableOpacity style={styles.inviteButton} onPress={handleShare}>
          <Text style={styles.inviteButtonText}>Compartilhe</Text>
        </TouchableOpacity>
      </View>

      <SvgXml xml={cardIconeSvg} width={70} height={70} />
    </View>
  );
}
