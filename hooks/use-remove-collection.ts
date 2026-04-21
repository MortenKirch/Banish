import { supabase } from "@/utils/supabase";
import { useState } from "react";

export const useRemoveCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeGame = async (userId: string, gameId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const { error: dbError } = await supabase
        .from("user_collection")
        .delete()
        .eq("user_id", userId)
        .eq("game_id", gameId);
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

  return { removeGame, isLoading, error };
};
