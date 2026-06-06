import { StyleSheet } from "react-native";
import { ORANGE } from "../constants/theme";

const LARGE_TEXT_MULTIPLIER = 1.18;
let largeTextEnabled = false;
const scaledStyleCache = new Map();

export function setLargeTextEnabled(enabled) {
  largeTextEnabled = Boolean(enabled);
}

function getScaledStyle(styleName, style) {
  const flatStyle = StyleSheet.flatten(style);

  if (!flatStyle || typeof flatStyle !== "object") {
    return style;
  }

  if (!flatStyle.fontSize || typeof flatStyle.fontSize !== "number") {
    return style;
  }

  if (!scaledStyleCache.has(styleName)) {
    scaledStyleCache.set(styleName, {
      ...flatStyle,
      fontSize: Math.round(flatStyle.fontSize * LARGE_TEXT_MULTIPLIER),
    });
  }

  return scaledStyleCache.get(styleName);
}

const baseStyles = StyleSheet.create({
  // BASE
  safe: {
    flex: 1,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  scroll: {
    paddingBottom: 92,
  },

  headIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  // INTRO
  introScreen: {
    flex: 1,
  },

  introTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 35,
  },

  introBottom: {
    height: 240,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 18,
    paddingTop: 34,
    paddingBottom: 22,
  },

  introCard: {
    borderRadius: 15,
    padding: 0,
    marginBottom: 24,
  },

  introCardTransparent: {
    backgroundColor: "transparent",
  },

  introTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },

  introText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 18,
    fontWeight: "500",
  },

  introFooterCustom: {
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    marginBottom: 100,
  },

  introFooterTextWhite: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  dots: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
  },

  // AUTH
  authScreen: {
    flex: 1,
  },

  authTop: {
    height: 230,
    alignItems: "center",
    justifyContent: "center",
  },

  authTopSignup: {
    height: 165,
    alignItems: "center",
    justifyContent: "center",
  },

  authBottom: {
    flex: 1,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 28,
  },

  authBottomSignup: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 0,
  },
  signUpButton: {
    height: 55,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  signUpButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },

  signInButton: {
    height: 55,
    borderColor: "#FFFFFF",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  signInButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 8,
  },

  authTitleWhite: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
  },

  authLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },

  inputBox: {
    height: 52,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
  },

  authRememberRow: {
    marginTop: -2,
    marginBottom: 18,
  },

  authMiniWhite: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },

  authLinksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  authLinkWhite: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    justifyContent: "center",
  },

  termsBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    backgroundColor: "#242424",
    marginRight: 10,
  },

  // BUTTON
  mainButton: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  // HOME
  homeScroll: {
    paddingTop: 42,
    paddingBottom: 125,
  },

  homeHeader: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  homeIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  notificationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: ORANGE,
    position: "absolute",
    right: -1,
    top: 1,
  },

  homeHello: {
    fontSize: 21,
    fontWeight: "900",
    marginBottom: 12,
  },

  homeSubtitle: {
    fontSize: 13,
    marginBottom: 22,
    lineHeight: 18,
  },

  homeChips: {
    gap: 9,
    paddingRight: 22,
    marginBottom: 24,
  },

  homeChip: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  homeChipText: {
    fontSize: 13,
    fontWeight: "600",
  },

  homeSection: {
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  homeSectionTitle: {
    fontSize: 20,
    fontWeight: "900",
  },

  homeSectionAction: {
    fontSize: 13,
    fontWeight: "500",
    textDecorationLine: "underline",
  },

  nextEventsList: {
    gap: 22,
    paddingRight: 22,
  },

  inviteSpacing: {
    marginTop: 26,
    marginBottom: 26,
    paddingHorizontal: 28,
  },

  allEventsList: {
    gap: 22,
  },

  // MINI EVENT CARD
  miniCard: {
    width: 230,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    backgroundColor: "#1F1F1F",
  },

  miniImageWrapper: {
    height: 120,
    position: "relative",
  },

  miniImage: {
    width: "100%",
    height: "100%",
  },

  miniOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  miniHeart: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  miniContent: {
    padding: 12,
  },

  miniOrganizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  miniBadge: {
    width: 18,
    height: 18,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  miniBadgeText: {
    fontSize: 12,
    fontWeight: "900",
    color: ORANGE,
  },

  miniOrganizerText: {
    fontSize: 10,
    color: "#DADADA",
  },

  miniTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  miniInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  miniInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  miniInfoText: {
    fontSize: 10,
    color: "#DADADA",
  },

  // EVENT ROW CARD
  rowCard: {
    flexDirection: "row",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#1F1F1F",
  },

  rowImageWrapper: {
    width: 130,
    height: 90,
    position: "relative",
  },

  rowImage: {
    width: "100%",
    height: "100%",
  },

  rowHeart: {
    position: "absolute",
    top: 6,
    left: 6,
  },

  rowContent: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },

  rowTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8,
  },

  rowInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  rowInfoText: {
    color: "#DADADA",
    fontSize: 10,
    marginLeft: 6,
  },

  // INVITE CARD
  inviteCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1F1F1F",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },

  inviteLeft: {
    flex: 1,
    marginRight: 10,
  },

  inviteTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
  },

  inviteText: {
    color: "#CFCFCF",
    fontSize: 12,
    marginBottom: 12,
  },

  inviteButton: {
    backgroundColor: ORANGE,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  inviteButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  // DETAILS
  detailsScroll: {
    paddingTop: 34,
    paddingBottom: 118,
  },

  detailsTop: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  eventBig: {
    width: "100%",
    height: 235,
    borderRadius: 12,
    marginBottom: 14,
  },

  detailsTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 18,
    marginBottom: 14,
  },

  detailsInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },

  detailsInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  detailsInfoText: {
    fontSize: 10,
    marginLeft: 7,
    fontWeight: "500",
  },

  organizerLabel: {
    fontSize: 9,
    fontWeight: "500",
    marginTop: 6,
    marginBottom: 8,
  },

  organizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  organizerAvatar: {
    width: 27,
    height: 27,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  organizerAvatarText: {
    color: ORANGE,
    fontSize: 17,
    fontWeight: "900",
  },

  organizerName: {
    flex: 1,
    fontSize: 10,
    fontWeight: "600",
  },

  followButton: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 3,
  },

  followButtonText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "800",
  },
  garantedButton: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  garantedText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  aboutTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 10,
  },

  aboutText: {
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 24,
  },

  // TICKET / FAVORITES
  ticketScreenScroll: {
    paddingTop: 58,
    paddingBottom: 110,
  },

  ticketHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  ticketHeaderTitle: {
    fontSize: 15,
    fontWeight: "900",
  },

  ticketFilter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 34,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  ticketFilterText: {
    fontSize: 8,
    fontWeight: "600",
  },

  ticketFilterActive: {
    backgroundColor: "rgba(245,111,34,0.12)",
  },

  ticketFilterOptions: {
    gap: 8,
    paddingBottom: 14,
  },

  ticketFilterChip: {
    minHeight: 32,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  ticketFilterChipText: {
    fontSize: 10,
    fontWeight: "800",
  },

  ticketList: {
    gap: 20,
  },

  ticketEmptyState: {
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },

  ticketEmptyTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },

  ticketEmptyText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
  },

  ticketCardCustom: {
    height: 90,
    borderRadius: 12,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  ticketCardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },

  ticketCardContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  ticketCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  ticketCardTitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
    flex: 1,
    marginRight: 6,
  },

  ticketCardInfo: {
    color: "#DADADA",
    fontSize: 10,
    marginBottom: 2,
  },

  // PROFILE
  profileScroll: {
    paddingTop: 42,
    paddingBottom: 120,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 46,
  },

  profileHeaderTitle: {
    fontSize: 17,
    fontWeight: "900",
  },

  profileHeaderIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  profileMain: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatarCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#00BFA6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#242424",
  },

  avatarEmoji: {
    fontSize: 52,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 12,
  },

  profileEmail: {
    fontSize: 11,
    marginTop: 4,
  },

  profileBtns: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 18,
  },

  profileButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 5,
  },

  profileButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  profileStatsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },

  profileStatBox: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
  },

  profileStatNumber: {
    fontSize: 18,
    fontWeight: "900",
  },

  profileStatLabel: {
    fontSize: 9,
    marginTop: 3,
  },

  profileSectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 12,
  },

  profileTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  profileTag: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  profileTagText: {
    fontSize: 10,
    fontWeight: "600",
  },

  // SETTINGS
  settingsScroll: {
    paddingTop: 34,
    paddingBottom: 130,
  },

  settingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  settingsBackButton: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  settingsTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  settingsHero: {
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },

  settingsHeroIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },

  settingsHeroText: {
    flex: 1,
  },

  settingsHeroTitle: {
    fontSize: 15,
    fontWeight: "900",
    marginBottom: 4,
  },

  settingsHeroSubtitle: {
    fontSize: 11,
    lineHeight: 16,
  },

  settingsSection: {
    marginBottom: 18,
  },

  settingsSectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 9,
  },

  settingsSectionBody: {
    borderRadius: 8,
    overflow: "hidden",
  },

  settingsRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(150,150,150,0.18)",
  },

  settingsRowIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  settingsRowText: {
    flex: 1,
  },

  settingsRowTitle: {
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 3,
  },

  settingsRowDescription: {
    fontSize: 10,
    lineHeight: 14,
  },

  // MY EVENTS
  myEventsScroll: {
    paddingTop: 34,
    paddingBottom: 130,
  },

  myEventsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  myEventsTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  myEventsList: {
    gap: 14,
  },

  myEventsEmpty: {
    borderRadius: 8,
    padding: 22,
    alignItems: "center",
  },

  myEventsEmptyTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: 12,
    marginBottom: 6,
  },

  myEventsEmptyText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },

  myEventCard: {
    borderRadius: 8,
    overflow: "hidden",
  },

  myEventImage: {
    width: "100%",
    height: 128,
  },

  myEventContent: {
    padding: 14,
  },

  myEventTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 8,
  },

  myEventTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "900",
    lineHeight: 19,
  },

  myEventValidatedBadge: {
    borderRadius: 8,
    backgroundColor: "#2B231F",
    borderWidth: 1,
    borderColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  myEventValidatedText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
  },

  myEventMeta: {
    fontSize: 11,
    lineHeight: 16,
  },

  myEventCertificateButton: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    marginTop: 14,
  },

  myEventCertificateText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  myEventNoCertificate: {
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: "#393939",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 12,
    marginTop: 14,
  },

  myEventNoCertificateText: {
    color: "#DADADA",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },

  editModal: {
    width: "100%",
    borderRadius: 18,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
  },

  profileInputGroup: {
    marginBottom: 13,
  },

  profileInputLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },

  profileInputBox: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  profileInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
  },

  modalSaveButton: {
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  modalSaveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  // QR CODE
  qrScreen: {
    flex: 1,
    paddingTop: 34,
    paddingBottom: 100,
  },

  qrTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },

  qrHeaderTitle: {
    fontSize: 18,
    fontWeight: "900",
  },

  qrCard: {
    backgroundColor: "#1F1F1F",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },

  qrEventTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  qrInfo: {
    color: "#DADADA",
    fontSize: 12,
    marginBottom: 4,
  },

  qrBox: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginTop: 28,
    marginBottom: 18,
  },

  qrCodeText: {
    color: ORANGE,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 12,
  },

  qrHelpText: {
    color: "#DADADA",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },

  qrActions: {
    width: "100%",
    marginTop: 22,
    gap: 12,
  },

  qrReadButton: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
  },

  qrReadButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },

  qrReadBadge: {
    minHeight: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#2B231F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
  },

  qrReadText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  certificateButton: {
    minHeight: 50,
    borderRadius: 8,
    backgroundColor: ORANGE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 14,
  },

  certificateButtonDisabled: {
    backgroundColor: "#696969",
  },

  certificateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },

  certificateUnavailableBadge: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: "#393939",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 12,
  },

  certificateUnavailableText: {
    color: "#DADADA",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  // BOTTOM NAV
  nav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    width: 45,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const styles = new Proxy(baseStyles, {
  get(target, styleName) {
    const style = target[styleName];
    return largeTextEnabled ? getScaledStyle(styleName, style) : style;
  },
});
