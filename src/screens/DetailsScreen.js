import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import BottomNav from "../components/BottomNav";
import EventImage from "../components/EventImage";
import Screen from "../components/Screen";
import ThemeButton from "../components/ThemeButton";
import { BLACK, LIGHT_BG, ORANGE } from "../constants/theme";
import { useEvents } from "../context/EventContext";
import { styles } from "../styles/globalStyles";

export default function DetailsScreen({
  theme,
  navigation,
  route,
  toggleTheme,
}) {
  const isLight = theme.mode === "light";
  const {
    events,
    getEventById,
    isFavorite,
    toggleFavorite,
    isRegistered,
    registerForEvent,
  } = useEvents();
  const event = getEventById(route.params?.eventId) || events[0];
  const favorite = isFavorite(event.id);
  const registered = isRegistered(event.id);

  function handleTicketPress() {
    registerForEvent(event.id);
    navigation.navigate("TicketQr", { eventId: event.id });
  }

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailsScroll}
      >
        <View style={styles.detailsTop}>
          <TouchableOpacity
            onPress={() =>
              navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Home")
            }
          >
            <Ionicons
              name="arrow-back"
              color={isLight ? BLACK : ORANGE}
              size={20}
            />
          </TouchableOpacity>

          <View style={styles.headIcons}>
            <ThemeButton theme={theme} toggleTheme={toggleTheme} />
            <TouchableOpacity onPress={() => toggleFavorite(event.id)}>
              <Ionicons
                name={favorite ? "heart" : "heart-outline"}
                color={ORANGE}
                size={18}
              />
            </TouchableOpacity>
          </View>
        </View>

        <EventImage e={event} big />

        <Text style={[styles.detailsTitle, { color: theme.text }]}>
          {event.title}
        </Text>

        <View style={styles.detailsInfoRow}>
          <Info
            icon="calendar-outline"
            text={event.fullDate || event.date}
            isLight={isLight}
          />

          <Info
            icon="time-outline"
            text={event.displayTime || event.time}
            isLight={isLight}
          />
        </View>

        <Info icon="bookmark" text={event.category} isLight={isLight} />

        <Text style={[styles.organizerLabel, { color: theme.text }]}>
          Organizador
        </Text>

        <View style={styles.organizerRow}>
          <View style={styles.organizerAvatar}>
            <Text style={styles.organizerAvatarText}>F</Text>
          </View>

          <Text style={[styles.organizerName, { color: theme.text }]}>
            {event.organizer || event.place}
          </Text>
        </View>

        <Text style={[styles.aboutTitle, { color: theme.text }]}>
          Sobre o evento
        </Text>

        <Text style={[styles.aboutText, { color: theme.soft }]}>
          {event.description}
        </Text>

        <TouchableOpacity
          style={[
            styles.garantedButton,
            { backgroundColor: isLight ? BLACK : ORANGE },
          ]}
          onPress={handleTicketPress}
        >
          <Text style={styles.garantedText}>
            {registered ? "Ingresso garantido" : "Garantir ingresso"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav navigation={navigation} routeName={route.name} theme={theme} />
    </Screen>
  );
}

function Info({ icon, text, isLight }) {
  return (
    <View style={styles.detailsInfo}>
      <Ionicons name={icon} color={isLight ? BLACK : ORANGE} size={14} />

      <Text
        style={[styles.detailsInfoText, { color: isLight ? BLACK : "#DADADA" }]}
      >
        {text}
      </Text>
    </View>
  );
}
