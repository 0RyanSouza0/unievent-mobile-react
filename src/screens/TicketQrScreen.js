import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useEffect, useState } from "react";

import BottomNav from "../components/BottomNav";
import Screen from "../components/Screen";
import { BLACK, LIGHT_BG, ORANGE } from "../constants/theme";
import { useEvents } from "../context/EventContext";
import { styles } from "../styles/globalStyles";

export default function TicketQrScreen({ theme, navigation, route }) {
  const isLight = theme.mode === "light";
  const {
    events,
    getEventById,
    markEventAsAttended,
    hasAttended,
    hasIssuedCertificate,
    issueCertificate,
  } = useEvents();
  const event = getEventById(route.params?.eventId) || events[0];
  const ticketCode = `UNI-${event.id.padStart(3, "0")}`;
  const [qrReadConfirmed, setQrReadConfirmed] = useState(
    Boolean(route.params?.qrRead)
  );
  const qrRead = qrReadConfirmed || hasAttended(event.id);
  const certificateIssued = hasIssuedCertificate(event.id);

  useEffect(() => {
    if (qrRead) {
      markEventAsAttended(event.id);
    }
  }, [event.id, markEventAsAttended, qrRead]);

  function handleQrRead() {
    setQrReadConfirmed(true);
  }

  function handleCertificatePress() {
    issueCertificate(event.id);
    Alert.alert(
      "Certificado emitido",
      `O certificado de participação em ${event.title} foi gerado com sucesso.`
    );
  }

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

          <View style={styles.qrActions}>
            {qrRead ? (
              <>
                <View style={styles.qrReadBadge}>
                  <Ionicons name="checkmark-circle" size={18} color={ORANGE} />
                  <Text style={styles.qrReadText}>QR Code lido</Text>
                </View>

                {event.hasCertificate ? (
                  <TouchableOpacity
                    activeOpacity={0.85}
                    disabled={certificateIssued}
                    onPress={handleCertificatePress}
                    style={[
                      styles.certificateButton,
                      certificateIssued && styles.certificateButtonDisabled,
                    ]}
                  >
                    <Ionicons
                      name={
                        certificateIssued
                          ? "checkmark-done"
                          : "document-text-outline"
                      }
                      size={18}
                      color="#FFFFFF"
                    />
                    <Text style={styles.certificateButtonText}>
                      {certificateIssued
                        ? "Certificado emitido"
                        : "Emitir certificado"}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.certificateUnavailableBadge}>
                    <Ionicons
                      name="information-circle-outline"
                      size={17}
                      color="#DADADA"
                    />
                    <Text style={styles.certificateUnavailableText}>
                      Este evento não emite certificado
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleQrRead}
                style={styles.qrReadButton}
              >
                <Ionicons name="scan-outline" size={18} color="#FFFFFF" />
                <Text style={styles.qrReadButtonText}>
                  Confirmar leitura do QR Code
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <BottomNav navigation={navigation} routeName={route.name} theme={theme} />
    </Screen>
  );
}
