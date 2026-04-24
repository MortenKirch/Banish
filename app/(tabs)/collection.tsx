import Card from "@/components/Card";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useGamesData } from "@/hooks/use-get-games";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState, useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { usePopup } from "@/hooks/use-popup";

export default function CollectionScreen() {
  const [sortBy, setSortBy] = useState<"name" | "mfg_playtime">("name");
  const { session } = useAuthContext();

  const toggleSort = () => {
    setSortBy((prev) => (prev === "name" ? "mfg_playtime" : "name"));
  };

  const { collection, isLoading, error, refresh } = useGamesData(
    session?.user.id ?? "",
    sortBy,
  );

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const { collectionDirty, clearCollectionDirty } = usePopup();

  useEffect(() => {
    if (!collectionDirty) return;
    refresh();
    clearCollectionDirty();
  }, [collectionDirty, refresh, clearCollectionDirty]);

  if (isLoading) {
    return (
      <ScrollView
        className="mt-16 px-2 bg-white"
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View className=" my-4 flex flex-row w-full justify-between bg-white">
          <View className=" flex gap-2">
            <Text className="text-4xl font-bold">My Collection</Text>
            <Text className="color-slate-600 text-lg">
              {collection.length} Games
            </Text>
          </View>
          <Pressable
            className="rounded-2xl bg-slate-200 flex flex-row px-4 py-2 gap-1 justify-center justify-items-center max-w-max max-h-max self-center justify-self-end"
            onPress={toggleSort}
          >
            <MaterialCommunityIcons
              name="arrow-up-down"
              size={14}
              color="grey"
              className="self-center"
            />
            <Text className="color-slate-600">
              {sortBy === "name" ? "Name" : "Playtime"}
            </Text>
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center bg-zinc-50">
          <Text className="color-slate-600 text-2xl">
            Getting Collection...
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="mt-16 px-2 bg-[#f4f1ef]"
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View className=" my-4 flex flex-row w-full justify-between">
        <View className=" flex gap-2">
          <Text className="text-4xl font-bold">My Collection</Text>
          <Text className="color-slate-600 text-lg">
            {collection.length} Games
          </Text>
        </View>
        <Pressable
          className="rounded-2xl bg-slate-200 flex flex-row px-4 py-2 gap-1 justify-center justify-items-center max-w-max max-h-max self-center justify-self-end"
          onPress={toggleSort}
        >
          <MaterialCommunityIcons
            name="arrow-up-down"
            size={14}
            color="grey"
            className="self-center"
          />
          <Text className="color-slate-600">
            {sortBy === "name" ? "Name" : "Playtime"}
          </Text>
        </Pressable>
      </View>
      {error ? <Text className="text-red-600">{error}</Text> : null}
      {collection.length > 0 ? (
        <View className="w-full flex-row flex-wrap">
          {collection.map((game) => (
            <View key={game.bgg_id} className="w-1/2 p-2">
              <Card
                bgg_id={game.bgg_id}
                image_path={game.image_path}
                mfg_playtime={game.mfg_playtime}
                name={game.name}
                genre={game.genre}
                size="tall"
                text="lg"
              />
            </View>
          ))}
        </View>
      ) : (
        <Text className="color-slate-600 text-2xl">No games in collection</Text>
      )}
    </ScrollView>
  );
}
