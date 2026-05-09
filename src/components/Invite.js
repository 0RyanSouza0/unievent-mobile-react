import { Share, Text, TouchableOpacity, View } from "react-native";
import TicketSvg from "../../assets/cardIcone.svg"; // ajuste o nome se for diferente
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

      <TicketSvg width={70} height={70} />
    </View>
  );
}
