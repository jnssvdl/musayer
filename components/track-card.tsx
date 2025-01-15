import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Track } from "@/types/track";
import Card from "./ui/card";

type TrackCardProps = {
  track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <View>
      <Card style={styles.card}>
        {track.album.images.length > 0 && (
          <Image
            source={{ uri: track.album.images[0].url }}
            style={styles.albumCover}
          />
        )}
        <View style={styles.container}>
          <Text style={styles.trackName}>{track.name}</Text>
          <Text style={styles.artistName}>
            {track.artists.map((artist) => artist.name).join(", ")}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  trackName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  artistName: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
