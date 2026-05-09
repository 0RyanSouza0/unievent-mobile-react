import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BottomNav from "../components/BottomNav";
import Screen from "../components/Screen";
import ThemeButton from "../components/ThemeButton";
import { BLACK, LIGHT_BG, ORANGE } from "../constants/theme";
import { useEvents } from "../context/EventContext";
import { styles } from "../styles/globalStyles";

export default function ProfileScreen({
  theme,
  route,
  navigation,
  toggleTheme,
}) {
  const isLight = theme.mode === "light";
  const [modalVisible, setModalVisible] = useState(false);
  const { events, favoriteEvents, registeredEvents } = useEvents();

  const tags = [
    "Palestras",
    "Workshop",
    "E-Sportes",
    "Música",
    "Cursos",
    "Oficina",
    "Hackathon",
    "Feiras",
  ];

  return (
    <Screen theme={theme} bg={isLight ? LIGHT_BG : BLACK}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.profileScroll}
      >
        <View style={styles.profileHeader}>
          <Text style={[styles.profileHeaderTitle, { color: theme.text }]}>
            Perfil
          </Text>

          <View style={styles.profileHeaderIcons}>
            <Ionicons
              name="settings-outline"
              color={isLight ? BLACK : "#FFFFFF"}
              size={18}
            />
            <ThemeButton theme={theme} toggleTheme={toggleTheme} />
          </View>
        </View>

        <View style={styles.profileMain}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👨🏻‍💻</Text>
          </View>

          <Text style={[styles.profileName, { color: theme.text }]}>
            Teste Teste
          </Text>

          <Text style={[styles.profileEmail, { color: theme.soft }]}>
            teste@email.com
          </Text>

          <View style={styles.profileBtns}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[
                styles.profileButton,
                { backgroundColor: isLight ? BLACK : ORANGE },
              ]}
            >
              <Text style={styles.profileButtonText}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Favorites")}
              style={[
                styles.profileButton,
                { backgroundColor: isLight ? BLACK : ORANGE },
              ]}
            >
              <Text style={styles.profileButtonText}>Eventos favoritos</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileStatsRow}>
          <StatBox
            title={String(events.length).padStart(2, "0")}
            label="Eventos"
            theme={theme}
          />
          <StatBox
            title={String(registeredEvents.length).padStart(2, "0")}
            label="Ingressos"
            theme={theme}
          />
          <StatBox
            title={String(favoriteEvents.length).padStart(2, "0")}
            label="Favoritos"
            theme={theme}
          />
        </View>

        <Text style={[styles.profileSectionTitle, { color: theme.text }]}>
          Gostos
        </Text>

        <View style={styles.profileTags}>
          {tags.map((tag) => (
            <View
              key={tag}
              style={[
                styles.profileTag,
                {
                  borderColor: isLight ? BLACK : ORANGE,
                  backgroundColor: isLight ? "transparent" : "#1A1A1A",
                },
              ]}
            >
              <Text
                style={[
                  styles.profileTagText,
                  { color: isLight ? BLACK : "#FFFFFF" },
                ]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <EditProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        theme={theme}
      />

      <BottomNav routeName={route.name} theme={theme} navigation={navigation} />
    </Screen>
  );
}

function EditProfileModal({ visible, onClose, theme }) {
  const isLight = theme.mode === "light";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.editModal,
            { backgroundColor: isLight ? "#FFFFFF" : BLACK },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Editar perfil
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={isLight ? BLACK : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>

          <ProfileInput
            label="Nome"
            icon="person"
            placeholder="Insira aqui seu nome"
            theme={theme}
          />

          <ProfileInput
            label="E-mail"
            icon="mail"
            placeholder="email@email.com.br"
            theme={theme}
          />

          <ProfileInput
            label="Senha"
            icon="lock-closed"
            placeholder="Insira aqui sua senha"
            secure
            theme={theme}
          />

          <ProfileInput
            label="Confirmação de senha"
            icon="lock-closed"
            placeholder="Confirme sua senha"
            secure
            theme={theme}
          />

          <TouchableOpacity
            style={[
              styles.modalSaveButton,
              { backgroundColor: isLight ? BLACK : ORANGE },
            ]}
            onPress={onClose}
          >
            <Text style={styles.modalSaveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function ProfileInput({ label, icon, placeholder, secure, theme }) {
  const isLight = theme.mode === "light";

  return (
    <View style={styles.profileInputGroup}>
      <Text style={[styles.profileInputLabel, { color: theme.text }]}>
        {label}
      </Text>

      <View
        style={[
          styles.profileInputBox,
          { borderColor: isLight ? BLACK : ORANGE },
        ]}
      >
        <Ionicons name={icon} size={17} color={isLight ? BLACK : "#FFFFFF"} />

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={isLight ? "#777777" : "#DADADA"}
          secureTextEntry={secure}
          style={[styles.profileInput, { color: isLight ? BLACK : "#FFFFFF" }]}
        />

        {secure && (
          <Ionicons
            name="eye-off-outline"
            size={18}
            color={isLight ? BLACK : "#FFFFFF"}
          />
        )}
      </View>
    </View>
  );
}

function StatBox({ title, label, theme }) {
  const isLight = theme.mode === "light";

  return (
    <View
      style={[
        styles.profileStatBox,
        { backgroundColor: isLight ? "#FFFFFF" : "#1F1F1F" },
      ]}
    >
      <Text
        style={[styles.profileStatNumber, { color: isLight ? BLACK : ORANGE }]}
      >
        {title}
      </Text>

      <Text style={[styles.profileStatLabel, { color: theme.soft }]}>
        {label}
      </Text>
    </View>
  );
}
