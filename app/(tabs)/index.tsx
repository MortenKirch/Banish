import CardCarousel from "@/components/CardCarousel";
import { ScrollView, Text, View } from "react-native";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useEffect } from "react";
import { usePopup } from "@/hooks/use-popup";
import { useGamesData } from "@/hooks/use-get-games";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function HomeScreen() {
  const { session } = useAuthContext();
  const {
    collection,
    recommendedGames,
    quickPlay,
    isLoading,
    error,
    refreshAll,
  } = useGamesData(session?.user.id ?? "", "name");

  const { collectionDirty, clearCollectionDirty } = usePopup();

  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    if (!collectionDirty) return;
    refreshAll();
    clearCollectionDirty();
  }, [collectionDirty, refreshAll, clearCollectionDirty]);

  return (
    <ScrollView
      className="bg-[#f4f1ef] px-4 pt-16"
      contentContainerStyle={{ paddingBottom: tabBarHeight - 20 }}
    >
      <View className="my-4">
        <Text className="text-4xl font-bold ">Welcome back</Text>
        <Text className="my-2 color-slate-600 text-xl">Ready to play?</Text>
      </View>
      {error ? <Text className="text-red-600">{error}</Text> : null}
      <CardCarousel category="Quick Play" games={quickPlay} />
      <CardCarousel category="Recommmended for You" games={recommendedGames} />
      <CardCarousel category="Your Collection" games={collection} />
    </ScrollView>
  );
}
