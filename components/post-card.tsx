import { StyleSheet, Text, View } from "react-native";
import TrackCard from "./track-card";
import { Track } from "@/types/track";
import text from "@/constants/text";

type Post = {
  track: Track | undefined;
  created_at: string;
  id: string;
  note: string;
  track_id: string;
  profile_id: string;
  profiles: {
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <View>
      <Text style={text.large}>{post.profiles.username}</Text>
      <Text style={text.medium}>
        {new Date(post.created_at).toLocaleDateString()}
      </Text>
      <View>{post.track && <TrackCard track={post.track} />}</View>
      <Text style={text.small}>{post.note}</Text>
    </View>
  );
}
