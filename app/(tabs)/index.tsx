import Fab from "@/components/fab";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Fab onPress={() => console.log("hello")}>
        <Link href={"/search"}>
          <Ionicons name="add" size={32} />
        </Link>
      </Fab>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
