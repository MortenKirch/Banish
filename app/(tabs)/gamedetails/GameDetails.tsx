import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Clock, Swords, Users } from "lucide-react-native";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const gamedetails = [
  {
    id: "1",
    title: "Catan",
    description:
      "A strategy board game where players collect and trade resources to build settlements and cities.",
    image:
      "https://cf.geekdo-images.com/W3Bsga_uLP9kO91gZ7H8yw__original/img/xV7oisd3RQ8R-k18cdWAYthHXsA=/0x0/filters:format(jpeg)/pic2419375.jpg",
    players: "3-4",
    playtime: "45",
    genre: "Strategy",
    difficulty: 4,
  },
];

export default function GameDetails({
  inCollection = false,
  toggleCollection = () => {},
}) {
  const router = useRouter();
  const game = gamedetails[0];
  return (
    <ScrollView className="flex-1 rounded-lg bg-zinc-50">
      <View className="relative">
        <View className="h-[350px] overflow-hidden">
          <Image
            source={{ uri: game.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,255,255,0.5)",
              "rgb(255,255,255)",
            ]}
            locations={[0, 0.55, 1]}
            className="absolute inset-0"
          />
        </View>
      </View>

      <Pressable
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
            return;
          }

          router.replace("/(tabs)");
        }}
        className="absolute top-6 left-6 p-3 bg-white opacity-90 rounded-full"
      >
        <ArrowLeft size={20} color="#000" />
      </Pressable>

      <View className="px-6 -mt-40 relative z-10">
        <View className="bg-white rounded-3xl p-6 shadow-xl mb-6">
          <Text className="text-3xl font-bold mb-2">{game.title}</Text>
          <Text className="text-primary mb-6">{game.genre}</Text>

          <View className="flex-row gap-2 mb-6">
            <View className="flex-1 items-center justify-center gap-2">
              <View>
                <Clock size={20} color="#6b7280" />
              </View>
              <Text className="text-sm text-foreground">
                {game.playtime} mins
              </Text>
            </View>

            <View className="flex-1 items-center justify-center gap-2">
              <View>
                <Users size={20} color="#6b7280" />
              </View>
              <Text className="text-sm text-foreground">{game.players}</Text>
            </View>

            <View className="flex-1 items-center justify-center gap-2">
              <View>
                <Swords size={20} color="#6b7280" />
              </View>
              <Text className="text-sm text-foreground">
                {game.difficulty}/5
              </Text>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-semibold mb-2">Description</Text>
            <Text className="text-sm text-muted-foreground leading-6">
              {game.description}
            </Text>
          </View>

          <Pressable
            onPress={toggleCollection}
            className={`w-full px-6 py-4 rounded-xl ${
              inCollection ? "bg-muted" : "bg-primary"
            }`}
          >
            {({ pressed }) => (
              <Text
                className={`text-center font-semibold ${
                  inCollection
                    ? "text-muted-foreground"
                    : "text-primary-foreground"
                } ${pressed ? "opacity-70" : ""}`}
              >
                {inCollection ? "Remove from Collection" : "Add to Collection"}
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
