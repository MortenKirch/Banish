import Card from "./Card";
import { View, Text, FlatList, Platform, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";

type Game = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
};

type Props = {
  category?: string;
  games: Game[];
};

export default function CardCarousel({ category, games }: Props) {
  return (
    <View>
      <View className="flex flex-row justify-between my-4">
        <Text className="font-bold text-3xl">{category}</Text>
        {category == "Your Collection" ? (
          <Link href={"/collection"} className="flex items-center">
            <Text className="text-red-800 font-light text-lg">View all</Text>
            <Entypo name="chevron-small-right" size={24} color="red" />
          </Link>
        ) : (
          <></>
        )}
        {category == "Quick Play" ? (
          <Text className="color-slate-400 flex items-center">
            Under 30 min
          </Text>
        ) : (
          <></>
        )}
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={Platform.OS === "web"}
        data={games}
        keyExtractor={(item) => item.bgg_id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Card
            bgg_id={item.bgg_id}
            image_path={item.image_path}
            mfg_playtime={item.mfg_playtime}
            name={item.name}
            genre={item.genre}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 16,
  },
});
