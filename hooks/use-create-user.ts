import { supabase } from "@/utils/supabase";
import { useState } from "react";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userId: string, username: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase.from("users").insert({
        id: userId,
        username,
      });

      if (dbError) {
        setError(dbError.message);
        return false;
      }

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
};