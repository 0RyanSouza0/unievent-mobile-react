import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import BottomNav from "@/components/BottomNav";
import Screen from "@/components/Screen";
import { BLACK, LIGHT_BG, ORANGE } from "@/constants/theme";
import { useEvents } from "@/context/EventContext";
import { styles } from "@/styles/globalStyles";

export default function TicketQrScreen({ theme, navigation, route }) {
  const isLight = theme.mode === "light";
  const { events, getEventById } = useEvents();
  const event = getEventById(route.params?.eventId) || events[0];
  const ticketCode = `UNI-${event.id.padStart(3, "0")}`;

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK}>
      <View style={styles.qrScreen}>
        <View style={styles.qrTop}>
          <TouchableOpacity
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate("Home")
            }
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={isLight ? BLACK : ORANGE}
            />
          </TouchableOpacity>

          <Text style={[styles.qrHeaderTitle, { color: theme.text }]}>
            Validar ingresso
          </Text>

          <View style={{ width: 22 }} />
        </View>

        <View style={styles.qrCard}>
          <Text style={styles.qrEventTitle}>{event.title}</Text>

          <Text style={styles.qrInfo}>
            {event.fullDate || event.date} • {event.displayTime || event.time}
          </Text>
          <Text style={styles.qrInfo}>{event.location || event.place}</Text>

          <View style={styles.qrBox}>
            <QRCode
              value={`UNIEVENT-${event.id}-${event.title}`}
              size={210}
              backgroundColor="#FFFFFF"
              color="#000000"
            />
          </View>

          <Text style={styles.qrCodeText}>Código: {ticketCode}</Text>

          <Text style={styles.qrHelpText}>
            Apresente este QR Code na entrada do evento para validar seu
            ingresso.
          </Text>
        </View>
      </View>

      <BottomNav navigation={navigation} routeName={route.name} theme={theme} />
    </Screen>
  );
}
