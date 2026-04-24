import PopUpCard from "@/components/PopUpCard";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Easing, Modal, Pressable, View } from "react-native";
import { PopupContext } from "@/hooks/popup-context";

export default function PopupProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

  const SHEET_START = 420;
  const translateY = useRef(new Animated.Value(SHEET_START)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const isClosingRef = useRef(false);

  const openPopup = useCallback(
    (gameId: number) => {
      setSelectedGameId(gameId);
      translateY.setValue(SHEET_START);
      cardOpacity.setValue(0);
      setIsOpen(true);
    },
    [cardOpacity, translateY],
  );

  const closePopup = useCallback(() => {
    if (!isOpen || isClosingRef.current) return;
    isClosingRef.current = true;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SHEET_START,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
      setSelectedGameId(null);
      isClosingRef.current = false;
    });
  }, [cardOpacity, isOpen, translateY]);

  useEffect(() => {
    if (!isOpen) return;

    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        damping: 18,
        stiffness: 180,
        mass: 0.8,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cardOpacity, isOpen, translateY]);

  const [collectionDirty, setCollectionDirty] = useState(false);

  const markCollectionDirty = useCallback(() => {
    setCollectionDirty(true);
  }, []);

  const clearCollectionDirty = useCallback(() => {
    setCollectionDirty(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      selectedGameId,
      openPopup,
      closePopup,
      collectionDirty,
      markCollectionDirty,
      clearCollectionDirty,
    }),
    [
      isOpen,
      selectedGameId,
      openPopup,
      closePopup,
      collectionDirty,
      markCollectionDirty,
      clearCollectionDirty,
    ],
  );

  return (
    <PopupContext.Provider value={value}>
      {children}

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={closePopup}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <Pressable className="absolute inset-0" onPress={closePopup} />

          <Animated.View
            style={{
              transform: [{ translateY }],
              opacity: cardOpacity,
              width: "100%",
              maxHeight: "65%",
              marginTop: "auto",
              overflow: "hidden",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}
          >
            <PopUpCard gameId={selectedGameId} onClose={closePopup} />
          </Animated.View>
        </View>
      </Modal>
    </PopupContext.Provider>
  );
}
