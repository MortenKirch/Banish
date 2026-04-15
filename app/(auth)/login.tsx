import { Link } from "expo-router";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <View>
      <Link href="/register" className="text-white">
        Register
      </Link>
      <Link href="/" className="text-white">
        Login
      </Link>
    </View>
  );
}
