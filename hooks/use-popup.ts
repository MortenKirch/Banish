import { useContext } from "react";
import { PopupContext } from "./popup-context";

export const usePopup = () => {
  const context = useContext(PopupContext);

  if (!context) {
    throw new Error("usePopup must be used within PopupProvider");
  }

  return context;
};
