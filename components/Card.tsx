import Feather from "@expo/vector-icons/Feather";
import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

type CardVariantProps = VariantProps<typeof cardVariants>;

type Props = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
} & CardVariantProps;

const cardVariants = cva("", {
  variants: {
    size: {
      sm: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-48 h-[180px]",
      lg: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-60 h-[240px]",
      tall: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-11/12 h-[240px] justify-self-center",
      wide: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-full h-[240px]",
    },
    text: {
      sm: "my-[0.2] mx-3 truncate",
      lg: "m-3 truncate",
    },
  },
});

export default function Card({
  bgg_id,
  image_path,
  mfg_playtime,
  name,
  genre,
  size = "lg",
  text = "lg",
}: Props) {
  const imageSource = image_path;
  return (
    <Link href={`/games/${bgg_id}`} className={cardVariants({ size })}>
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
      <View className={cardVariants({ text })}>
        <Text className="font-semibold text-xl">{name}</Text>
        <Text className="color-slate-500">{genre}</Text>
      </View>
    </Link>
  );
}
