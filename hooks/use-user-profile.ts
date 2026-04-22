import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export type UserProfile = {
  id: string;
  username: string;
  image_url: string | null;
};

export function useUserProfile(userId: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error: dbError } = await supabase
        .from("users")
        .select("id, username, image_url")
        .eq("id", userId)
        .single();

      if (dbError) {
        setError(dbError.message);
        setProfile(null);
        return;
      }

      setProfile({
        id: String(data.id),
        username: data.username ?? "Unknown",
        image_url: data.image_url ?? null,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { profile, isLoading, error, refetch: fetchProfile };
}

export default useUserProfile;
