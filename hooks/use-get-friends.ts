import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export type Friend = {
  id: string;
  username: string;
  image_url?: string | null;
};

export const useGetFriends = (userId: string | null) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFriends = useCallback(async () => {
    if (!userId) {
      setFriends([]);
      setFollowersCount(0);
      setFollowingCount(0);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [outgoingRes, incomingRes] = await Promise.all([
        supabase
          .from("follows")
          .select("following_id")
          .eq("follower_id", userId),
        supabase
          .from("follows")
          .select("follower_id")
          .eq("following_id", userId),
      ]);

      if (outgoingRes.error || incomingRes.error) {
        setError(
          outgoingRes.error?.message ??
            incomingRes.error?.message ??
            "Failed to load follows",
        );
        setFriends([]);
        setFollowersCount(0);
        setFollowingCount(0);
        return;
      }

      const outgoingIds = (outgoingRes.data ?? []).map(
        (row) => row.following_id,
      );
      const incomingIds = (incomingRes.data ?? []).map(
        (row) => row.follower_id,
      );

      setFollowingCount(outgoingIds.length);
      setFollowersCount(incomingIds.length);

      const incomingSet = new Set(incomingIds);
      const mutualIds = outgoingIds.filter((id) => incomingSet.has(id));

      if (mutualIds.length === 0) {
        setFriends([]);
        return;
      }

      const { data: users, error: usersError } = await supabase
        .from("users")
        .select("id, username, image_url")
        .in("id", mutualIds)
        .order("username", { ascending: true });

      if (usersError) {
        setError(usersError.message);
        setFriends([]);
        return;
      }

      setFriends(
        (users ?? []).map((u) => ({
          id: String(u.id),
          username: u.username ?? "Unknown",
          image_url: u.image_url ?? null,
        })),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setFriends([]);
      setFollowersCount(0);
      setFollowingCount(0);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    followersCount,
    followingCount,
    isLoading,
    error,
    refresh: fetchFriends,
  };
};

export default useGetFriends;
