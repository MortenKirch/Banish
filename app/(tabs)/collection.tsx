import { ScrollView, View, Text, Pressable } from "react-native";
import Card from "@/components/Card";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useGamesData } from "@/hooks/use-get-games";

export default function CollectionScreen() {
  const { session } = useAuthContext();
  const { games, isLoading, error } = useGamesData(session?.user.id ?? "");

  return (
    <ScrollView className="bg-white items-center">
      <View className="grid grid-cols-3 my-4">
        <View className="col-span-2 flex gap-2">
          <Text className="text-4xl font-bold">My Collection</Text>
          <Text className="color-slate-600 text-lg">{games.length} Games</Text>
        </View>
        <Pressable className="rounded-2xl bg-slate-200 flex flex-row px-4 py-2 gap-1 justify-center items-center max-w-max max-h-max self-center justify-self-end">
          <MaterialCommunityIcons name="arrow-up-down" size={14} color="grey" />
          <Text className="color-slate-600">Playtime</Text>
        </Pressable>
      </View>
      {error ? <Text>{error}</Text> : null}
      <View className="grid grid-cols-2">
        {games.map((game) => (
          <Card
            key={game.bgg_id}
            bgg_id={game.bgg_id}
            image_path={game.image_path}
            mfg_playtime={game.mfg_playtime}
            name={game.name}
            genre={game.genre}
            variant="small"
          />
        ))}
      </View>
    </ScrollView>
  );
}
