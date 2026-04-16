import { ThemedText } from "@/components/themed-text";
import Input from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { Link, useRouter } from "expo-router";
import { Dices } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert("Error signing in", error.message);
      } else {
        router.replace("/(tabs)");
      }
    } catch {
      Alert.alert("Error signing in", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="m-4 flex align-center justify-center h-full">
      <View className="flex items-center mb-10">
        <View className="bg-primary rounded-[32px] p-8">
          <Dices size={60} color="#fff" />
        </View>

        <ThemedText className=" font-bold pt-16" style={{ fontSize: 48 }}>
          Banish
        </ThemedText>
        <Text style={{ fontSize: 18 }} className="pt-4 text-gray-500">
          You're boardgame manager
        </Text>
      </View>
      <Input
        label={"Login"}
        placeholder={"you@example.com"}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label={"Password"}
        placeholder={"********"}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        className="w-full bg-primary py-6 px-2 flex justify-center items-center mt-10 mb-6 rounded-[18px]"
        onPress={signInWithEmail}
        disabled={loading}
      >
        <Text style={{ fontSize: 18 }} className="font-medium text-white">
          Log in
        </Text>
      </Pressable>
      <View className="flex-row mt-4 align-center justify-center">
        <Text className="pr-1"> Dont have an account?</Text>
        <Link href="/signup" className="text-primary font-medium">
          Sign up
        </Link>
        <View />
      </View>
    </View>
  );
}
