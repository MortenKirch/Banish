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

type UseSearchGamesOptions = {
  query?: string;
};

export function useSearchGames({ query = "" }: UseSearchGamesOptions = {}) {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const minQueryLength = 2;

  const searchGames = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const trimmedQuery = query.trim();

    let dbQuery = supabase
      .from("games")
      .select(
        "bgg_id, name, image_path, mfg_playtime, game_themes(themes(name)) ",
      )
      .order("name", { ascending: true });

    if (trimmedQuery.length < minQueryLength) {
      setGames([]);
      /* setError("Please enter at least 2 characters to search."); */
      setError(null);
      setIsLoading(false);
      return;
    } else {
      dbQuery = dbQuery.ilike("name", `%${trimmedQuery}%`);
    }

    const { data, error: dbError } = await dbQuery;

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
  }, [query]);

  useEffect(() => {
    searchGames();
  }, [searchGames]);

  return { games, isLoading, error, refetch: searchGames };
}

export default useSearchGames;
