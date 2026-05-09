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
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function hydrate() {
      try {
        const [storedFavorites, storedRegistrations] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.favorites),
          AsyncStorage.getItem(STORAGE_KEYS.registrations),
        ]);

        if (!isMounted) return;

        setFavoriteIds(readStoredIds(storedFavorites));
        setRegisteredIds(readStoredIds(storedRegistrations));
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
      getEventById,
    }),
    [
      favoriteEvents,
      favoriteIds,
      filteredEvents,
      getEventById,
      isFavorite,
      isRegistered,
      registeredEvents,
      registeredIds,
      searchTerm,
      selectedCategory,
      toggleFavorite,
      registerForEvent,
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
