import { ScrollView, View, Text, Pressable } from "react-native";
import Card from "@/components/Card";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


type Game = {
  bgg_id: string;
  image_path: string;
  mfg_playtime: string;
  name: string;
  genre: string;
};

// placeholder data
const games: Game[] = [
  {
    bgg_id: "1",
    image_path:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIF3Z9nTfduAtXffsvWNu5ZC1UjjAErzpag&s",
    mfg_playtime: "60",
    name: "Catan",
    genre: "Strategy",
  },
  {
    bgg_id: "2",
    image_path:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsz8tahsfdcAqkBL1mDPS3Pgo1HkNlE9jmA&s",
    mfg_playtime: "30",
    name: "Ticket to Ride",
    genre: "Family",
  },
  {
    bgg_id: "3",
    image_path:
      "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__itemrep/img/6oRLPDvy4zz3gOZM6e6NzIk8Seg=/fit-in/246x300/filters:strip_icc()/pic6973671.png",
    mfg_playtime: "45",
    name: "Azul",
    genre: "Abstract",
  },
  {
    bgg_id: "4",
    image_path:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIF3Z9nTfduAtXffsvWNu5ZC1UjjAErzpag&s",
    mfg_playtime: "60",
    name: "Catan",
    genre: "Strategy",
  },
  {
    bgg_id: "5",
    image_path:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsz8tahsfdcAqkBL1mDPS3Pgo1HkNlE9jmA&s",
    mfg_playtime: "30",
    name: "Ticket to Ride",
    genre: "Family",
  },
  {
    bgg_id: "6",
    image_path:
      "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__itemrep/img/6oRLPDvy4zz3gOZM6e6NzIk8Seg=/fit-in/246x300/filters:strip_icc()/pic6973671.png",
    mfg_playtime: "45",
    name: "Azul",
    genre: "Abstract",
  },
];

export default function CollectionScreen() {
  return (
    <ScrollView className="bg-white">
      <View className="grid grid-cols-3 my-4">
        <View className="col-span-2 flex gap-2">
          <Text className="text-4xl font-bold">My Collection</Text>
          <Text className="color-slate-600 text-lg">{games.length} Games</Text>
        </View>
        <Pressable className="rounded-2xl bg-slate-200 flex flex-row px-6 py-2 gap-1 justify-center items-center max-w-max max-h-max self-center">
          <MaterialCommunityIcons name="arrow-up-down" size={14} color="grey" />
          <Text className="color-slate-600">Playtime</Text>
        </Pressable>
      </View>
      <View className="grid grid-cols-2">
      {games.map((game) => (
        <Card
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