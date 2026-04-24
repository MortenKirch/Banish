import Feather from "@expo/vector-icons/Feather";
import { cva, type VariantProps } from "class-variance-authority";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { usePopup } from "@/hooks/use-popup";

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
      tall: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-full h-[240px] justify-self-center",
      wide: "flex flex-col rounded-3xl bg-white overflow-hidden shadow-md my-4 w-full h-[240px]",
    },
    text: {
      sm: "my-[0.2] mx-3",
      lg: "m-3",
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
  const router = useRouter();
  const longPressTriggered = useRef(false);
  const { openPopup } = usePopup();
  return (
    <Pressable
      className={cardVariants({ size })}
      onPress={() => {
        if (longPressTriggered.current) {
          longPressTriggered.current = false;
          return;
        }
        router.push(`/games/${bgg_id}`);
      }}
      onLongPress={async () => {
        longPressTriggered.current = true;
        await Haptics.performAndroidHapticsAsync(
          Haptics.AndroidHaptics.Long_Press,
        );

        const numericId = Number(bgg_id);
        if (Number.isFinite(numericId)) {
          openPopup(numericId);
        }
      }}
      delayLongPress={350}
    >
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
        <Text
          className="font-semibold text-xl"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text
          className="color-slate-500"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {genre}
        </Text>
      </View>
    </Pressable>
  );
}
