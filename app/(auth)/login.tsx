import { Link } from "expo-router";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Link href="/signup" className="text-white">
        Sign up
      </Link>
      <Link href="/" className="text-white">
        Login
      </Link>
    </View>
  );
}
