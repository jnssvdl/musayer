import Fab from "@/components/fab";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Fab>
        <Link href={"/(track)"}>
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
