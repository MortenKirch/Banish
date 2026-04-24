import { useAddCollection } from "@/hooks/use-add-collection";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useGameDetails } from "@/hooks/use-game-details";
import { useIsGameInCollection } from "@/hooks/use-is-game-in-collection";
import { useRemoveCollection } from "@/hooks/use-remove-collection";
import { X, Clock, Heart, Swords, Users } from "lucide-react-native";
import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { usePopup } from "@/hooks/use-popup";

type Props = {
  gameId: number | null;
  onClose: () => void;
};

const getGenre = (
  game: NonNullable<ReturnType<typeof useGameDetails>["game"]>,
) => {
  if (game.cat_strategy) return "Strategy";
  if (game.cat_family) return "Family";
  if (game.cat_thematic) return "Thematic";
  if (game.cat_abstract) return "Abstract";
  if (game.cat_war) return "War";
  if (game.cat_party) return "Party";
  if (game.cat_childrens) return "Children";
  return "Board Game";
};

export default function PopUpCard({ gameId, onClose }: Props) {
  const { session } = useAuthContext();
  const { markCollectionDirty } = usePopup();

  const userId = session?.user.id ?? null;

  const {
    game,
    isLoading: isLoadingGame,
    error: gameError,
    refetch: refetchGame,
  } = useGameDetails(gameId);

  const {
    isInCollection,
    isLoading: isLoadingCollectionState,
    error: collectionStateError,
    refresh: refreshCollectionState,
  } = useIsGameInCollection(userId, gameId);

  const { addGame, isLoading: isAdding, error: addError } = useAddCollection();
  const {
    removeGame,
    isLoading: isRemoving,
    error: removeError,
  } = useRemoveCollection();

  const isMutating = isAdding || isRemoving;
  const isBusy = isLoadingGame || isLoadingCollectionState || isMutating;

  const toggleCollection = async () => {
    if (!userId || gameId == null || !game) return;

    const ok = isInCollection
      ? await removeGame(userId, gameId)
      : await addGame(userId, gameId);

    if (ok) {
      await refreshCollectionState();
      markCollectionDirty();
    }
  };

  if (isLoadingGame) {
    return (
      <View className="items-center justify-center bg-zinc-50">
        <ActivityIndicator />
        <Text className="mt-3 text-slate-500">Loading game...</Text>
      </View>
    );
  }

  if (!game || gameId == null) {
    return (
      <View className="items-center justify-center bg-zinc-50 px-6">
        <Text className="text-base text-slate-700 text-center">
          {gameError ?? "Could not load this game."}
        </Text>
        <Pressable
          onPress={refetchGame}
          className="mt-4 rounded-xl bg-primary px-4 py-2"
        >
          <Text className="text-primary-foreground font-semibold">
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  const playersLabel =
    game.min_players && game.max_players
      ? `${game.min_players}-${game.max_players}`
      : game.min_players
        ? `${game.min_players}+`
        : "N/A";

  const playtimeLabel = game.mfg_playtime ? `${game.mfg_playtime} mins` : "N/A";
  const difficultyLabel =
    game.game_weight != null ? `${game.game_weight.toFixed(1)}/5` : "N/A";

  return (
    <View className="rounded-t-3xl bg-white p-4">
      <View>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="font-semibold text-xl">{game.name} </Text>
          <Pressable onPress={() => onClose()}>
            <X size={24} color="#6b7280" />
          </Pressable>
        </View>
        <Text className="text-primary mb-6">{getGenre(game)} </Text>
      </View>
      <Image
        style={{ height: 240, width: "100%" }}
        source={{ uri: game.image_path ?? undefined }}
        className="rounded-3xl"
      />
      <View className="flex-row gap-8 justify-center my-4">
        <View className="flex-row items-center justify-center gap-2">
          <Clock size={24} color="#6b7280" />
          <Text className=" text-foreground">{playtimeLabel}</Text>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <Users size={24} color="#6b7280" />
          <Text className=" text-foreground">{playersLabel}</Text>
        </View>
        <View className="flex-row items-center justify-center gap-2">
          <Swords size={24} color="#6b7280" />
          <Text className="text-foreground">{difficultyLabel}</Text>
        </View>
      </View>
      <View className="flex-row gap-2 justify-center">
        <Pressable
          onPress={toggleCollection}
          disabled={isBusy || !userId}
          className={`w-3/4 items-center justify-center rounded-xl py-3 border ${
            isInCollection
              ? "bg-muted border-black"
              : "bg-primary border-primary"
          } ${isBusy || !userId ? "opacity-60" : ""}`}
        >
          {({ pressed }) => (
            <Text
              className={`text-center font-semibold ${
                isInCollection
                  ? "text-muted-foreground"
                  : "text-primary-foreground"
              } ${pressed ? "opacity-70" : ""}`}
            >
              {!userId
                ? "Sign in to add games"
                : isInCollection
                  ? "Remove from Collection"
                  : "Add to Collection"}
            </Text>
          )}
        </Pressable>

        <Pressable className="p-2 border-primary border-2 rounded-xl">
          <Heart size={25} color="#6b7280" />
        </Pressable>
      </View>
    </View>
  );
}
