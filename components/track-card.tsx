import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Track } from "@/types/track";

type TrackCardProps = {
  track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <View style={styles.container}>
      {track.album.images.length > 0 && (
        <Image
          source={{ uri: track.album.images[0].url }}
          style={styles.albumCover}
        />
      )}
      <View style={styles.info}>
        <Text numberOfLines={1}>{track.name}</Text>
        <Text numberOfLines={1}>
          {track.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 8,
    borderWidth: 0.2,
    borderColor: "#3f3f46",
    borderRadius: 10,
  },
  albumCover: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
});
