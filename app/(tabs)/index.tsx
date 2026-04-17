import { Text, View, ScrollView } from "react-native";
import CardCarousel from "@/components/CardCarousel";

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
  image_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIF3Z9nTfduAtXffsvWNu5ZC1UjjAErzpag&s",
  mfg_playtime: "60",
  name: "Catan",
  genre: "Strategy",
}, 
{
  bgg_id: "2",
  image_path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZsz8tahsfdcAqkBL1mDPS3Pgo1HkNlE9jmA&s",
  mfg_playtime: "30",
  name: "Ticket to Ride",
  genre: "Family",
},
{
  bgg_id: "3",
  image_path: "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__itemrep/img/6oRLPDvy4zz3gOZM6e6NzIk8Seg=/fit-in/246x300/filters:strip_icc()/pic6973671.png",
  mfg_playtime: "45",
  name: "Azul",
  genre: "Abstract",
}
]

export default function HomeScreen() {
  return (
    <ScrollView className="bg-white px-4">
    <View className="my-4">
      <Text className="text-4xl font-bold ">Welcome back</Text>
      <Text className="my-2 color-slate-600 text-xl">Ready to play?</Text>
    </View>
    <CardCarousel category="Quick Play" games={games}/>
    <CardCarousel category="Recommmended for You" games={games}/>
    <CardCarousel category="Your Collection" games={games}/>
    </ScrollView>
  );
}