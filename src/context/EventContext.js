import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { categoryFilterMap, categoryFilters, events } from "../data/events";

const EventContext = createContext(null);

const STORAGE_KEYS = {
  favorites: "@unievent:favorites",
  registrations: "@unievent:registrations",
  attended: "@unievent:attended",
  certificates: "@unievent:certificates",
};

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function asId(eventId) {
  return String(eventId);
}

function readStoredIds(value) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(asId) : [];
  } catch {
    return [];
  }
}

export function EventProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [attendedIds, setAttendedIds] = useState([]);
  const [certificateIds, setCertificateIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [
          storedFavorites,
          storedRegistrations,
          storedAttended,
          storedCertificates,
        ] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.favorites),
          AsyncStorage.getItem(STORAGE_KEYS.registrations),
          AsyncStorage.getItem(STORAGE_KEYS.attended),
          AsyncStorage.getItem(STORAGE_KEYS.certificates),
        ]);

        if (!isMounted) return;

        setFavoriteIds(readStoredIds(storedFavorites));
        setRegisteredIds(readStoredIds(storedRegistrations));
        setAttendedIds(readStoredIds(storedAttended));
        setCertificateIds(readStoredIds(storedCertificates));
      } catch {
        return null;
      } finally {
        if (isMounted) {
          setHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(favoriteIds)
    ).catch(() => null);
  }, [favoriteIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.registrations,
      JSON.stringify(registeredIds)
    ).catch(() => null);
  }, [registeredIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.attended,
      JSON.stringify(attendedIds)
    ).catch(() => null);
  }, [attendedIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    AsyncStorage.setItem(
      STORAGE_KEYS.certificates,
      JSON.stringify(certificateIds)
    ).catch(() => null);
  }, [certificateIds, hydrated]);

  const getEventById = useCallback(
    (eventId) => events.find((event) => asId(event.id) === asId(eventId)),
    []
  );

  const isFavorite = useCallback(
    (eventId) => favoriteIds.includes(asId(eventId)),
    [favoriteIds]
  );

  const toggleFavorite = useCallback((eventId) => {
    const id = asId(eventId);

    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
    );
  }, []);

  const isRegistered = useCallback(
    (eventId) => registeredIds.includes(asId(eventId)),
    [registeredIds]
  );

  const registerForEvent = useCallback((eventId) => {
    const id = asId(eventId);

    setRegisteredIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }, []);

  const markEventAsAttended = useCallback((eventId) => {
    const id = asId(eventId);

    setAttendedIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }, []);

  const hasAttended = useCallback(
    (eventId) => attendedIds.includes(asId(eventId)),
    [attendedIds]
  );

  const hasIssuedCertificate = useCallback(
    (eventId) => certificateIds.includes(asId(eventId)),
    [certificateIds]
  );

  const issueCertificate = useCallback((eventId) => {
    const id = asId(eventId);

    setCertificateIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }, []);

  const filteredEvents = useMemo(() => {
    const term = normalizeText(searchTerm);
    const mappedCategories = categoryFilterMap[selectedCategory];

    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        event.category === selectedCategory ||
        event.filterTags?.includes(selectedCategory) ||
        mappedCategories?.includes(event.category);

      if (!matchesCategory) return false;

      if (!term) return true;

      return [
        event.title,
        event.description,
        event.category,
        event.place,
        event.location,
      ]
        .map(normalizeText)
        .some((value) => value.includes(term));
    });
  }, [searchTerm, selectedCategory]);

  const favoriteEvents = useMemo(
    () => events.filter((event) => favoriteIds.includes(asId(event.id))),
    [favoriteIds]
  );

  const registeredEvents = useMemo(
    () => events.filter((event) => registeredIds.includes(asId(event.id))),
    [registeredIds]
  );

  const attendedEvents = useMemo(
    () => events.filter((event) => attendedIds.includes(asId(event.id))),
    [attendedIds]
  );

  const value = useMemo(
    () => ({
      events,
      categoryFilters,
      selectedCategory,
      setSelectedCategory,
      searchTerm,
      setSearchTerm,
      filteredEvents,
      favoriteIds,
      favoriteEvents,
      isFavorite,
      toggleFavorite,
      registeredIds,
      registeredEvents,
      isRegistered,
      registerForEvent,
      attendedIds,
      attendedEvents,
      markEventAsAttended,
      hasAttended,
      certificateIds,
      hasIssuedCertificate,
      issueCertificate,
      getEventById,
    }),
    [
      favoriteEvents,
      favoriteIds,
      filteredEvents,
      getEventById,
      hasAttended,
      hasIssuedCertificate,
      isFavorite,
      isRegistered,
      attendedEvents,
      attendedIds,
      certificateIds,
      registeredEvents,
      registeredIds,
      searchTerm,
      selectedCategory,
      toggleFavorite,
      registerForEvent,
      markEventAsAttended,
      issueCertificate,
    ]
  );

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvents must be used inside EventProvider");
  }

  return context;
}
