import { Link } from "@/.expo/types/router";
import { ThemedText } from "@/components/themed-text";
import { View } from "react-native";

export default function Login() {
  return (
    <View>
      <ThemedText type="link">
        <Link href="/signup">Sign up</Link>
      </ThemedText>
      <ThemedText type="link">
        <Link href="/">Login</Link>
      </ThemedText>
    </View>
  );
}
