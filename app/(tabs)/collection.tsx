import { View } from "react-native";
import Card from "@/components/Card";

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
    <View className="grid grid-cols-2">
      {games.map((game) => (
        <Card
          bgg_id={game.bgg_id}
          image_path={game.image_path}
          mfg_playtime={game.mfg_playtime}
          name={game.name}
          genre={game.genre}
          variant="big"
        />
      ))}
    </View>
  );
}
