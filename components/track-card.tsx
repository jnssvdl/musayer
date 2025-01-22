import { View, Text, Image } from "react-native";
import React from "react";
import { Track } from "@/types/track";

type TrackCardProps = {
  track: Track;
};

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <View className="flex-row items-center gap-3 p-2 rounded-lg">
      {track.album.images.length > 0 && (
        <Image
          source={{ uri: track.album.images[0].url }}
          className="w-12 h-12 rounded-md"
        />
      )}
      <View className="flex-1 justify-center gap-1">
        <Text numberOfLines={1} className="text-zinc-100 font-bold">
          {track.name}
        </Text>
        <Text numberOfLines={1} className="text-zinc-500">
          {track.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
    </View>
  );
}
