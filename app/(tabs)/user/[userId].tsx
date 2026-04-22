import Card from "@/components/Card";
import useGetFriends from "@/hooks/use-get-friends";
import { useGamesData } from "@/hooks/use-get-games";
import useUserProfile from "@/hooks/use-user-profile";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, User } from "lucide-react-native";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function UserProfileScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const router = useRouter();

  const { profile, isLoading: profileLoading } = useUserProfile(userId ?? null);
  const {
    collection,
    isLoading: collectionLoading,
    error: collectionError,
  } = useGamesData(userId ?? "", "name");
  const { friends } = useGetFriends(userId ?? null);

  if (profileLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-50">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-zinc-50"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View className="p-6 pt-10">
        {/* Back button */}
        <Pressable onPress={() => router.back()} className="mb-6 self-start">
          <ArrowLeft size={24} color="#1f1c1d" />
        </Pressable>

        {/* Avatar + username */}
        <View className="mb-8 flex-row items-center gap-4">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-violet-500 shadow overflow-hidden">
            {profile?.image_url ? (
              <Image
                source={{ uri: profile.image_url }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <User size={40} color="white" />
            )}
          </View>
          <View>
            <Text className="mb-1 text-2xl font-bold text-zinc-900">
              {profile?.username ?? "Unknown"}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="mb-8 flex-row gap-4">
          <View className="flex-1 rounded-2xl bg-white p-4 shadow">
            <Text className="mb-1 text-3xl font-bold text-violet-600">
              {collectionLoading ? "..." : collection.length}
            </Text>
            <Text className="text-sm text-zinc-500">Games Owned</Text>
          </View>
          <View className="flex-1 rounded-2xl bg-white p-4 shadow">
            <Text className="mb-1 text-3xl font-bold text-pink-500">
              {friends.length}
            </Text>
            <Text className="text-sm text-zinc-500">Friends</Text>
          </View>
        </View>

        {/* Collection */}
        <Text className="mb-4 text-xl font-semibold text-zinc-900">
          Collection
        </Text>
        {collectionLoading ? (
          <ActivityIndicator />
        ) : collectionError ? (
          <Text className="text-red-600">{collectionError}</Text>
        ) : collection.length === 0 ? (
          <Text className="text-zinc-500">No games in collection</Text>
        ) : (
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
        )}
      </View>
    </ScrollView>
  );
}
