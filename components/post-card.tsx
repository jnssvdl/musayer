import React from "react";
import { View, Text, Image } from "react-native";
import { UserIcon } from "lucide-react-native";
import TrackCard from "./track-card";
import { Track } from "@/types/track";
import PostMenu from "./post-menu";

type PostCardProps = {
  track: Track | undefined;
  created_at: string;
  id: string;
  note: string;
  profile_id: string;
  track_id: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
};

export default function PostCard({ post }: { post: PostCardProps }) {
  return (
    <View className="bg-zinc-950 border-b border-zinc-800 p-3 gap-3">
      {/* Header */}
      <View className="flex-row items-center gap-4">
        {post.profiles.avatar_url ? (
          <Image
            source={{ uri: post.profiles.avatar_url }}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <View className="w-12 h-12 rounded-full bg-zinc-700 items-center justify-center">
            <UserIcon color={"#09090b"} size={24} />
          </View>
        )}
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-zinc-100 text-lg font-bold">
              {post.profiles.display_name}
            </Text>
            <Text className="text-zinc-500 text-xs mx-2">{"\u2B24"}</Text>
            <Text className="text-zinc-500 text-sm">
              {new Date(post.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text className="text-zinc-500 text-base">
            @{post.profiles.username}
          </Text>
        </View>
        <PostMenu
          track={post.track}
          note={post.note}
          postId={post.id}
          profile_id={post.profile_id}
        />
      </View>

      {/* Note */}
      {post.note && (
        <Text className="text-zinc-200 text-base">{post.note}</Text>
      )}

      {/* Track Card */}
      {post.track && (
        <View className="border rounded-lg border-zinc-800">
          <TrackCard track={post.track} />
        </View>
      )}
    </View>
  );
}
