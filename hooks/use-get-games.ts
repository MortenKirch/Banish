import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export type Game = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
  game_themes?: {
    themes: {
      name: string;
    }[];
  }[];
};

export function useGamesData(userId: string) {
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState <string | null>(null);

    const getGames = useCallback(async () => {
        setIsLoading(true);
        setError(null);

    const { data, error: dbError } = await supabase
        .from("games")
        .select(`
            bgg_id,
            name,
            image_path,
            mfg_playtime,
            user_collection!inner(
            user_id
            ),
            game_themes!inner(
                theme_id,
                themes!inner(
                id,
                name
                )
            )
        `)
        .eq("user_collection.user_id", userId)
        .order("name", {ascending: true});

    if (dbError) {
      setError(dbError.message);
      setGames([]);
      setIsLoading(false);
      return;
    }

    const mappedGames: Game[] = (data ?? []).map((game) => ({
      bgg_id: String(game.bgg_id),
      image_path: game.image_path ?? "",
      mfg_playtime: String(game.mfg_playtime ?? "-"),
      name: game.name ?? "Unknown game",
      genre:
        game.game_themes
          ?.flatMap((gt) => gt.themes ?? [])
          .map((theme) => theme.name)
          .filter(Boolean)
          .join(", ") || "Board Game",
    }));
    setGames(mappedGames);
    setIsLoading(false);
  }, [userId]);


  useEffect(() => {
    getGames();
  }, [getGames]);

  return {games, isLoading, error}
}

export default useGamesData;