import ParallaxScrollView from "@/components/parallax-scroll-view";
import SignoutButton from "@/components/SignoutButton";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <Link href="/signup" className=" underline text-lg">
        Go to signup
      </Link>
      <Link href="/login" className=" underline text-lg">
        Go to login
      </Link>
      <SignoutButton />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
