import { ThemedText } from "@/components/themed-text";
import Input from "@/components/ui/input";
import { Link } from "expo-router";
import { Dices } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
export default function Login() {
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
      <Input label={"Login"} placeholder={"you@example.com"} />
      <Input
        label={"Password"}
        placeholder={"********"}
        secureTextEntry={true}
      />

      <Pressable className="w-full bg-primary py-6 px-2 flex justify-center items-center mt-10 mb-6 rounded-[18px]">
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
