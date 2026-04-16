import { View, Pressable, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

type Props = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
};

export default function Card({
  bgg_id,
  image_path,
  mfg_playtime,
  name,
  genre,
}: Props) {
  const imageSource = image_path;
  return (
    <Link
      href={`/games/${bgg_id}`}
      className="flex flex-col w-80 h-[300px] rounded-3xl bg-white overflow-hidden"
    >
      <View style={{ width: "100%", height: "70%" }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: imageSource,
          }}
        />
        <View className="absolute top-4 right-4 rounded-2xl bg-white flex flex-row px-3 py-1 gap-2 justify-center items-center">
          <Feather name={"clock"} size={18} color="#949494" />
          <Text className="color-slate-400">{mfg_playtime} min</Text>
        </View>
      </View>
      <View className="m-4">
        <Text className="font-semibold text-2xl">{name}</Text>
        <Text className="color-slate-400">{genre}</Text>
      </View>
    </Link>
  );
}
