import Card from "@/components/Card";
import Input from "@/components/ui/input";
import useSearchGames from "@/hooks/use-search-games";
import { SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text } from "react-native";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { games, isLoading, error } = useSearchGames({ query });
  const hasQuery = query.trim().length > 1;

  return (
    <ScrollView className="flex-1 bg-[#f4f1ef] px-6 pt-16">
      <Text className="mb-8 text-3xl font-bold text-[#1f1c1d]">
        Search Games
      </Text>

      <Input
        value={query}
        onChangeText={setQuery}
        placeholder="Search by title..."
        showSearchIcon
        rightAdornment={
          <Pressable
            className="h-12 w-12 items-center justify-center rounded-full bg-[#ece8e4]"
            accessibilityRole="button"
            accessibilityLabel="Open filters"
          >
            <SlidersHorizontal size={22} color="#000" />
          </Pressable>
        }
      />

      {hasQuery ? (
        <Text className="mt-2 mb-4 text-2xl text-[#6f6964]">
          {isLoading ? "Loading games..." : `${games.length} games found`}
        </Text>
      ) : null}
      {error ? <Text className="mb-4 text-red-500">{error}</Text> : null}
      {hasQuery ? (
        games.map((game) => (
          <Card
            key={game.bgg_id}
            bgg_id={game.bgg_id}
            image_path={game.image_path}
            mfg_playtime={game.mfg_playtime}
            name={game.name}
            genre={game.genre}
            variant="big"
          />
        ))
      ) : (
        <Text className="text-lg text-[#6f6964]">
          Start typing to search for games...
        </Text>
      )}
    </ScrollView>
  );
}
