import { useAuthContext } from "@/hooks/use-auth-context";
import useGetFriends from "@/hooks/use-get-friends";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { LogOut, Settings, User } from "lucide-react-native";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const { session } = useAuthContext();
  const userId = session?.user.id ?? null;

  const { friends, isLoading, error } = useGetFriends(userId);

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push("/");
  };

  return (
    <ScrollView
      className="flex-1 bg-[#f4f1ef] mt-16"
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View className="p-6">
        <View className="mb-8 flex-row items-start justify-between">
          <View className="flex-row items-center gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-violet-500 shadow">
              <User size={40} color="white" />
            </View>

            <View>
              <Text className="mb-1 text-2xl font-bold text-zinc-900">
                BoardGameMaster
              </Text>
              <Text className="text-sm text-zinc-500">
                Collector since 2024
              </Text>
            </View>
          </View>
        </View>

        <View className="mb-8 flex-row gap-4">
          <View className="flex-1 rounded-2xl bg-white p-4 shadow">
            <Text className="mb-1 text-3xl font-bold text-violet-600">24</Text>
            <Text className="text-sm text-zinc-500">Games Owned</Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white p-4 shadow">
            <Text className="mb-1 text-3xl font-bold text-pink-500">
              {isLoading ? "..." : friends.length}
            </Text>
            <Text className="text-sm text-zinc-500">Friends</Text>
          </View>
        </View>

        <View className="mb-8">
          <Text className="mb-4 text-xl font-semibold text-zinc-900">
            Friends
          </Text>

          {error ? (
            <Text className="mb-3 text-sm text-red-600">{error}</Text>
          ) : null}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            <View className="flex-row gap-3">
              {friends.map((friend) => (
                <Pressable
                  key={friend.id}
                  onPress={() => router.push(`/(tabs)/user/${friend.id}`)}
                  className="items-center"
                >
                  <View className="h-16 w-16 overflow-hidden rounded-full border-2 border-violet-200">
                    <Image
                      source={{
                        uri:
                          friend.image_url ??
                          "https://i.pravatar.cc/150?u=" + friend.id,
                      }}
                      className="h-full w-full"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="mt-2 text-xs text-zinc-500">
                    {friend.username}
                  </Text>
                </Pressable>
              ))}

              <Pressable className="items-center">
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-zinc-300 bg-zinc-100">
                  <Text className="text-2xl text-zinc-500">+</Text>
                </View>
                <Text className="mt-2 text-xs text-zinc-500">Add</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>

        <View className="gap-3">
          <Pressable className="flex-row items-center gap-3 rounded-xl bg-white px-4 py-4 shadow">
            <Settings size={20} color="#71717a" />
            <Text className="text-sm text-zinc-900">Edit Profile</Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            className="flex-row items-center gap-3 rounded-xl bg-white px-4 py-4 shadow"
          >
            <LogOut size={20} color="#dc2626" />
            <Text className="text-sm text-red-600">Log Out</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
