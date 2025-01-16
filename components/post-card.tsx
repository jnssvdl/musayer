import { StyleSheet, Text, View } from "react-native";
import TrackCard from "./track-card";
import { Track } from "@/types/track";

type Post = {
  track: Track | undefined;
  created_at: string;
  id: string;
  note: string;
  track_id: string;
  user_id: string;
  profiles: {
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      {post.track && <TrackCard track={post.track} />}
      <Text>{post.note}</Text>
      <Text>{new Date(post.created_at).toLocaleDateString()}</Text>
      <Text>{post.profiles.username}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({});
