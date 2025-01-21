import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { UserIcon } from "lucide-react-native";
import TrackCard from "./track-card";
import { Track } from "@/types/track";
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
            <UserIcon color={"#09090b"} size={24} />
          </View>
        )}
        <View style={styles.headerInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#f4f4f5",
              }}
            >
              {post.profiles.display_name}
            </Text>
            <Text style={{ fontSize: 8, color: "#3f3f46" }}>{"\u2B24"}</Text>
            <Text
              style={{
                fontSize: 14,
                color: "#71717a",
              }}
            >
              {new Date(post.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "#71717a",
            }}
          >
            @{post.profiles.username}
          </Text>
        </View>
        <PostMenu post={post} />
        {/* <TouchableOpacity>
          <EllipsisVertical color={"#3f3f46"} size={16} />
        </TouchableOpacity> */}
      </View>
      {post.note && (
        <Text
          style={{
            fontSize: 14,
            color: "#fafafa",
          }}
        >
          {post.note}
        </Text>
      )}
      {post.track && <TrackCard track={post.track} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#09090b",
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
    backgroundColor: "#3f3f46",
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
});
