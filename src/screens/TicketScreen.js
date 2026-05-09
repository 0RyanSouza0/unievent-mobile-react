import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import BottomNav from "@/components/BottomNav";
import Screen from "@/components/Screen";
import TicketCard from "@/components/TicketCard";
import { BLACK, LIGHT_BG, ORANGE } from "@/constants/theme";
import { useEvents } from "@/context/EventContext";
import { styles } from "@/styles/globalStyles";

export default function TicketScreen({ theme, navigation, route }) {
  const isLight = theme.mode === "light";
  const { registeredEvents } = useEvents();

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ticketScreenScroll}
      >
        <View style={styles.ticketHeader}>
          <Text style={[styles.ticketHeaderTitle, { color: theme.text }]}>
            Meus Ingressos
          </Text>

          <View style={styles.ticketFilter}>
            <Text style={[styles.ticketFilterText, { color: theme.soft }]}>
              Filtrar
            </Text>
            <Ionicons name="filter" size={18} color={ORANGE} />
          </View>
        </View>

        <View style={styles.ticketList}>
          {registeredEvents.map((event) => (
            <TicketCard key={event.id} e={event} navigation={navigation} ticket />
          ))}
        </View>
      </ScrollView>

      <BottomNav routeName={route.name} theme={theme} navigation={navigation} />
    </Screen>
  );
}
