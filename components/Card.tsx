import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type CardVariant = "big" | "small";

type Props = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
  variant?: CardVariant;
};
const variant = {
  big: {
    container:
      "flex flex-col w-60 h-[240px] rounded-3xl bg-white overflow-hidden shadow-md my-4",
    text: "m-3",
  },
  small: {
    container:
      "flex flex-col w-48 h-[180px] rounded-3xl bg-white overflow-hidden shadow-md my-4",
    text: "my-[0.2] mx-3",
  },
  xl: {
    container:
      "flex flex-col w-72 h-[300px] rounded-3xl bg-white overflow-hidden shadow-md my-4",
    text: "m-4",
  },
};
export default function Card({
  bgg_id,
  image_path,
  mfg_playtime,
  name,
  genre,
  variant = "big",
}: Props) {
  const imageSource = image_path;
  const containerClass =
    variant === "big"
      ? "flex flex-col w-60 h-[240px] rounded-3xl bg-white overflow-hidden shadow-md my-4"
      : "flex flex-col w-48 h-[180px] rounded-3xl bg-white overflow-hidden shadow-md my-4";
  const textClass = variant === "big" ? "m-3" : "my-[0.2] mx-3";
  return (
    <Link href={`/games/${bgg_id}`} className={containerClass}>
      <View style={{ width: "100%", height: "70%" }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: imageSource,
          }}
        />
        <View className="absolute top-2 right-2 rounded-2xl bg-white flex flex-row px-2 py-1 gap-1 justify-center items-center">
          <Feather name={"clock"} size={12} color="#949494" />
          <Text className="color-slate-500">{mfg_playtime} min</Text>
        </View>
      </View>
      <View className={textClass}>
        <Text className="font-semibold text-xl">{name}</Text>
        <Text className="color-slate-500">{genre}</Text>
      </View>
    </Link>
  );
}
