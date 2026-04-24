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

export function useGamesData(userId: string, sort: string) {
  const [collection, setCollection] = useState<Game[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([]);
  const [quickPlay, setQuickPlay] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //SQL fetch to get quickplay
  const getQuickPlay = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from("games")
      .select(
        `
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
        `,
      )
      .eq("user_collection.user_id", userId)
      .lt("mfg_playtime", 45)
      .order("mfg_playtime", { ascending: true });

    if (dbError) {
      setError(dbError.message);
      setQuickPlay([]);
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
    setQuickPlay(mappedGames);
    setIsLoading(false);
  }, [userId]);

  //SQL fetch to get recommended games
  const getRecommended = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data: collectionRows, error: collectionError } = await supabase
      .from("user_collection")
      .select("game_id")
      .eq("user_id", userId);

    if (collectionError) {
      setError(collectionError.message);
      setRecommendedGames([]);
      setIsLoading(false);
      return;
    }

    const collectedIds = (collectionRows ?? []).map((row) => row.game_id);

    let query = supabase
      .from("games")
      .select(
        `
      bgg_id,
      name,
      image_path,
      mfg_playtime,
      game_themes(
        theme_id,
        themes(
          id,
          name
        )
      )
    `,
      )
      .order("rank_boardgame", { ascending: true })
      .limit(20);

    if (collectedIds.length > 0) {
      query = query.not("bgg_id", "in", `(${collectedIds.join(",")})`);
    }

    const { data, error: dbError } = await query;

    if (dbError) {
      setError(dbError.message);
      setRecommendedGames([]);
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

    setRecommendedGames(mappedGames);
    setIsLoading(false);
  }, [userId]);

  //SQL fetch to get users collection
  const getCollection = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const { data, error: dbError } = await supabase
      .from("games")
      .select(
        `
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
        `,
      )
      .eq("user_collection.user_id", userId)
      .order(sort, { ascending: true });

    if (dbError) {
      setError(dbError.message);
      setCollection([]);
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
    setCollection(mappedGames);
    setIsLoading(false);
  }, [userId, sort]);

  useEffect(() => {
    getCollection();
    getRecommended();
    getQuickPlay();
  }, [getCollection, getRecommended, getQuickPlay]);

  const refreshAll = useCallback(() => {
    getCollection();
    getRecommended();
    getQuickPlay();
  }, [getCollection, getRecommended, getQuickPlay]);

  return {
    collection,
    recommendedGames,
    quickPlay,
    isLoading,
    error,
    refreshAll,
    refresh: getCollection,
  };
}

export default useGamesData;
