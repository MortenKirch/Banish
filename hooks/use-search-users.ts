import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export type UserResult = {
  id: string;
  username: string;
  image_url: string | null;
};

export function useSearchUsers(query: string) {
  const [users, setUsers] = useState<UserResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async () => {
    const trimmed = query.trim();

    if (trimmed.length < 2) {
      setUsers([]);
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
        .ilike("username", `%${trimmed}%`)
        .order("username", { ascending: true })
        .limit(30);

      if (dbError) {
        setError(dbError.message);
        setUsers([]);
        return;
      }

      setUsers(
        (data ?? []).map((u) => ({
          id: String(u.id),
          username: u.username ?? "Unknown",
          image_url: u.image_url ?? null,
        })),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    searchUsers();
  }, [searchUsers]);

  return { users, isLoading, error };
}

export default useSearchUsers;
