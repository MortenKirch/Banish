import { Session } from "@supabase/auth-js";

import { createContext, useContext } from "react";

export type AuthData = {
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};
export const AuthContext = createContext<AuthData>({
  session: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
