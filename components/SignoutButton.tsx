import { supabase } from "@/utils/supabase";
import { Pressable, Text } from "react-native";
export default function SignoutButton() {
  return (
    <Pressable
      className="w-full bg-primary py-6 px-2 flex justify-center items-center mt-10 mb-6 rounded-[18px]"
      onPress={() => supabase.auth.signOut()}
    >
      <Text style={{ fontSize: 18 }} className="font-medium text-white">
        Sign out
      </Text>
    </Pressable>
  );
}
