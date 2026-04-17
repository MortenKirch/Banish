import { ThemedText } from "@/components/themed-text";
import Input from "@/components/ui/input";
import { supabase } from "@/utils/supabase";
import { Link, useRouter } from "expo-router";
import { Dices } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const signUpWithEmail = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) Alert.alert(error.message);
      else {
        router.replace("/(tabs)");
      }
    } catch {
      Alert.alert(
        "Error signing up",
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="m-4 flex align-center justify-center h-full">
      <View className="flex items-center mb-10">
        <View className="bg-primary rounded-[32px] p-8">
          <Dices size={60} color="#fff" />
        </View>

        <ThemedText className=" font-bold pt-16" style={{ fontSize: 48 }}>
          Create Account
        </ThemedText>
        <Text style={{ fontSize: 18 }} className="pt-4 text-gray-500">
          Start tracking your board games
        </Text>
      </View>
      <Input
        label={"Username"}
        placeholder={"your username"}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label={"Email"}
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
        onPress={signUpWithEmail}
      >
        <Text style={{ fontSize: 18 }} className="font-medium text-white">
          Create account
        </Text>
      </Pressable>
      <View className="flex-row mt-4 align-center justify-center">
        <Text className="pr-1"> Already have an account?</Text>
        <Link href="/login" className="text-primary font-medium">
          Log in
        </Link>
        <View />
      </View>
    </View>
  );
}
