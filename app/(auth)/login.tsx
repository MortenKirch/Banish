import ImageViewer from "@/components/ImageViewer";
import { ThemedText } from "@/components/themed-text";
import Input from "@/components/ui/input";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
const image_url = require("@/assets/images/cat.jpg");
export default function Login() {
  return (
    <View className="m-4 flex align-center justify-center h-full">
      <View className="flex items-center mb-10">
        <ImageViewer
          imgSource={image_url}
          width={100}
          height={100}
          rounded={true}
          shadow={true}
        />
        <ThemedText className=" font-bold pt-16" style={{ fontSize: 48 }}>
          Banish
        </ThemedText>
        <Text style={{ fontSize: 18 }} className="pt-4 color-gray-500">
          You're boardgame manager
        </Text>
      </View>
      <Input label={"Login"} placeholder={"you@example.com"} />
      <Input
        label={"Password"}
        placeholder={"********"}
        secureTextEntry={true}
      />

      <Pressable className="w-full bg-primary color py-6 px-2 flex justify-center items-center mt-10 mb-6 rounded-[18px]">
        <Text style={{ fontSize: 18 }} className="font-medium color-white">
          login
        </Text>
      </Pressable>
      <View className="flex-row mt-4 align-center justify-center">
        <Text className="pr-2"> Dont have an account?</Text>
        <Link href="/signup" className="color-primary font-medium">
          Sign up
        </Link>
        <View />
      </View>
    </View>
  );
}
