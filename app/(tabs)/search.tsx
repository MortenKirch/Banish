import Card from "@/components/Card";
import Input from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const gamesFound = 6; // This is a placeholder. You would replace this with your actual search logic.
  return (
    <View className="flex-1 bg-[#f4f1ef] px-6 pt-16">
      <Text className="mb-8 text-center text-5xl font-bold text-[#1f1c1d]">
        Search Games
      </Text>

      <Input
        value={query}
        onChangeText={setQuery}
        placeholder="Search by title..."
        showSearchIcon
        rightAdornment={
          <Pressable
            className="h-12 w-12 items-center justify-center rounded-full bg-[#ece8e4]"
            accessibilityRole="button"
            accessibilityLabel="Open filters"
          >
            <SlidersHorizontal size={22} color="#000" />
          </Pressable>
        }
      />

      <Text className="mt-8 text-3xl text-[#6f6964]">
        {gamesFound} games found
      </Text>
      <Card
        bgg_id="1"
        image_path="https://cf.geekdo-images.com/original/img/1mXo9n2s8l7e5j3v0kHh6ZtqjM=/0x0/pic3289974.jpg"
        mfg_playtime="60"
        name="Catan"
        genre="Strategy"
        variant="big"
      ></Card>
    </View>
  );
}
