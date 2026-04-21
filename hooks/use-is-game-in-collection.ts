import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export const useIsGameInCollection = (
  userId: string | null,
  gameId: number | null,
) => {
  const [isInCollection, setIsInCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkCollectionStatus = useCallback(async () => {
    if (!userId || gameId == null || Number.isNaN(gameId)) {
      setIsInCollection(false);
      setError(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from("user_collection")
        .select("user_id,game_id")
        .eq("user_id", userId)
        .eq("game_id", gameId)
        .single();

      if (dbError) {
        setIsInCollection(false);
        setError(dbError.message);
        return;
      }
      setIsInCollection(Boolean(data));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setIsInCollection(false);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, gameId]);
  useEffect(() => {
    checkCollectionStatus();
  }, [checkCollectionStatus]);

  return { isInCollection, isLoading, error, refresh: checkCollectionStatus };
};
