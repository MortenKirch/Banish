import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

type GameDetails = {
  bgg_id: number;
  name: string;
  description: string | null;
  image_path: string | null;
  min_players: number | null;
  max_players: number | null;
  mfg_playtime: number | null;
  game_weight: number | null;
  avg_rating: number | null;
  cat_strategy: boolean | null;
  cat_family: boolean | null;
  cat_thematic: boolean | null;
  cat_abstract: boolean | null;
  cat_war: boolean | null;
  cat_party: boolean | null;
  cat_childrens: boolean | null;
};

export const useGameDetails = (gameId: number | null) => {
  const [game, setGame] = useState<GameDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGameDetails = useCallback(async () => {
    if (gameId == null || Number.isNaN(gameId)) {
      setGame(null);
      setError("Invalid game ID");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from("games")
        .select(
          "bgg_id, name, description, image_path, min_players, max_players, mfg_playtime, game_weight, avg_rating, cat_strategy, cat_family, cat_thematic, cat_abstract, cat_war, cat_party, cat_childrens",
        )
        .eq("bgg_id", gameId)
        .single();
      if (dbError) {
        setGame(null);
        setError(dbError.message);
        return;
      }
      setGame(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setGame(null);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGameDetails();
  }, [fetchGameDetails]);

  return {
    game,
    isLoading,
    error,
    refetch: fetchGameDetails,
  };
};
