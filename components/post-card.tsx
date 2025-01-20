import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { EllipsisVertical, UserIcon } from "lucide-react-native";
import TrackCard from "./track-card";
import { Track } from "@/types/track";
import text from "@/constants/text";
import color from "@/constants/color";
import useUser from "@/hooks/use-user";
import PostMenu from "./post-menu";

type PostCardProps = {
  track: Track | undefined;
  created_at: string;
  id: string;
  note: string | null;
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
    <View style={styles.card}>
      <View style={styles.header}>
        {post.profiles.avatar_url ? (
          <Image
            source={{ uri: post.profiles.avatar_url }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.placeholderAvatar}>
            <UserIcon color={color.primary} size={24} />
          </View>
        )}
        <View style={styles.headerInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={text.large}>{post.profiles.display_name}</Text>
            <Text style={{ fontSize: 8, color: "#3f3f46" }}>{"\u2B24"}</Text>
            <Text style={[text.medium, { fontSize: 12 }]}>
              {new Date(post.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text style={text.medium}>@{post.profiles.username}</Text>
        </View>
        <PostMenu post={post} />
        {/* <TouchableOpacity>
          <EllipsisVertical color={"#3f3f46"} size={16} />
        </TouchableOpacity> */}
      </View>
      {post.note && <Text style={text.small}>{post.note}</Text>}
      {post.track && <TrackCard track={post.track} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.primary,
    borderBottomWidth: 0.5,
    borderColor: "#27272a",
    padding: 12,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
});
