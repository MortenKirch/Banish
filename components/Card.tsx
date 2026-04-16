import { StyleSheet, View, Pressable, Text, Image } from "react-native";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  imgSrc: string;
  time: string;
  titel: string;
  genre: string;
};

export default function Card({ imgSrc, time, titel, genre }: Props) {
  const imageSource = imgSrc.toString();
  return (
    <Pressable className="flex w-full h-[320px] rounded-3xl bg-white overflow-hidden">
      <View style={{ width: "100%", height: "70%" }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={{
            uri: imageSource,
          }}
        />
        <View className="absolute top-4 right-4 rounded-2xl bg-white flex flex-row px-3 py-1 gap-2 justify-center items-center">
          <Feather name={"clock"} size={18} color="#949494" />
          <Text className="color-slate-400">{time} min</Text>
        </View>
      </View>
      <View className="m-4">
        <Text className="font-semibold text-2xl">{titel}</Text>
        <Text className="color-slate-400">{genre}</Text>
      </View>
    </Pressable>
  );
}
