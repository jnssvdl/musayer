import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Track } from "@/types/track";
import text from "@/constants/text";

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
      <View style={styles.text}>
        <Text numberOfLines={1} style={text.large}>
          {track.name}
        </Text>
        <Text numberOfLines={1} style={text.medium}>
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
  },
  albumCover: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  text: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
});
