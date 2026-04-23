import Card from "@/components/Card";
import Input from "@/components/ui/input";
import useSearchGames from "@/hooks/use-search-games";
import useSearchUsers from "@/hooks/use-search-users";
import { useRouter } from "expo-router";
import { SlidersHorizontal, User } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type Tab = "games" | "people";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("games");

  const {
    games,
    isLoading: gamesLoading,
    error: gamesError,
  } = useSearchGames({ query });
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useSearchUsers(query);

  const hasQuery = query.trim().length > 1;
  const isLoading = activeTab === "games" ? gamesLoading : usersLoading;
  const error = activeTab === "games" ? gamesError : usersError;

  return (
    <ScrollView className="flex-1 bg-[#f4f1ef] px-6 pt-16">
      <Text className="mb-8 text-3xl font-bold text-[#1f1c1d]">Search</Text>

      <Input
        value={query}
        onChangeText={setQuery}
        placeholder={
          activeTab === "games" ? "Search by title..." : "Search by username..."
        }
        showSearchIcon
        rightAdornment={
          activeTab === "games" ? (
            <Pressable
              className="h-12 w-12 items-center justify-center rounded-full bg-[#ece8e4]"
              accessibilityRole="button"
              accessibilityLabel="Open filters"
            >
              <SlidersHorizontal size={22} color="#000" />
            </Pressable>
          ) : null
        }
      />

      {/* Tab toggle */}
      <View className="flex-row mt-4 mb-2 gap-2">
        <Pressable
          onPress={() => setActiveTab("games")}
          className={`flex-1 py-2 rounded-xl items-center ${
            activeTab === "games" ? "bg-[#1f1c1d]" : "bg-[#ece8e4]"
          }`}
        >
          <Text
            className={
              activeTab === "games"
                ? "text-white font-semibold"
                : "text-[#6f6964]"
            }
          >
            Games
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setActiveTab("people")}
          className={`flex-1 py-2 rounded-xl items-center ${
            activeTab === "people" ? "bg-[#1f1c1d]" : "bg-[#ece8e4]"
          }`}
        >
          <Text
            className={
              activeTab === "people"
                ? "text-white font-semibold"
                : "text-[#6f6964]"
            }
          >
            People
          </Text>
        </Pressable>
      </View>

      {hasQuery ? (
        <Text className="mt-2 mb-4 text-2xl text-[#6f6964]">
          {isLoading
            ? `Loading ${activeTab}...`
            : activeTab === "games"
              ? `${games.length} games found`
              : `${users.length} people found`}
        </Text>
      ) : null}

      {error ? <Text className="mb-4 text-red-500">{error}</Text> : null}

      {!hasQuery ? (
        <Text className="text-lg text-[#6f6964]">
          Start typing to search for {activeTab}...
        </Text>
      ) : activeTab === "games" ? (
        games.map((game) => (
          <Card
            key={game.bgg_id}
            bgg_id={game.bgg_id}
            image_path={game.image_path}
            mfg_playtime={game.mfg_playtime}
            name={game.name}
            genre={game.genre}
            size="wide"
            text="lg"
          />
        ))
      ) : (
        users.map((user) => (
          <Pressable
            key={user.id}
            onPress={() => router.push(`/(tabs)/user/${user.id}`)}
            className="flex-row items-center gap-4 bg-white rounded-2xl px-4 py-3 mb-3"
          >
            <View className="h-12 w-12 rounded-full overflow-hidden bg-violet-200 items-center justify-center">
              {user.image_url ? (
                <Image
                  source={{ uri: user.image_url }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              ) : (
                <User size={24} color="#7c3aed" />
              )}
            </View>
            <Text className="text-base font-semibold text-[#1f1c1d]">
              {user.username}
            </Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}
