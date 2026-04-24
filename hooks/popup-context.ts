import { createContext } from "react";

export type PopupContextValue = {
  isOpen: boolean;
  selectedGameId: number | null;
  openPopup: (gameId: number) => void;
  closePopup: () => void;
  collectionDirty: boolean;
  markCollectionDirty: () => void;
  clearCollectionDirty: () => void;
};

export const PopupContext = createContext<PopupContextValue | undefined>(
  undefined,
);
