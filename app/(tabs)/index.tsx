import Fab from "@/components/ui/fab";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>No posts yet</Text>
      <Text style={styles.subText}>Posts you create will appear here</Text>

      <Fab style={styles.fab}>
        <Link href={"/(track)"}>
          <View style={styles.fabContent}>
            <Ionicons name="add" size={32} color="#14171A" />
          </View>
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
    backgroundColor: "#14171A",
    padding: 16,
  },
  placeholderText: {
    color: "#F5F8FA",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    color: "#E1E8ED",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#E1E8ED",
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
