import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "@/hooks/use-user";
import { deletePost } from "@/api/supabase";
import { useTrack } from "@/hooks/use-track";
import { Track } from "@/types/track";
import { router } from "expo-router";

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

export default function PostMenu({ post }: { post: PostCardProps }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const { setTrack, setNote, setId } = useTrack();

  const user = useUser();

  const queryClient = useQueryClient();

  const isOwner = user.id === post.profile_id;

  const deleter = useMutation({
    mutationFn: async (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["profile-posts"],
      });
      setMenuVisible(false);
    },
  });

  const handleDelete = () => {
    Alert.alert("Delete Post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleter.mutateAsync(post.id),
      },
    ]);
  };

  if (!isOwner) {
    return (
      <TouchableOpacity>
        <EllipsisVertical color="#3f3f46" size={16} />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <EllipsisVertical color="#3f3f46" size={16} />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-zinc-950/50 justify-end"
          onPress={() => setMenuVisible(false)}
        >
          <View className="bg-zinc-950 rounded-t-xl p-4">
            {/* Edit Post */}
            <TouchableOpacity
              className="flex-row items-center py-2"
              onPress={() => {
                setId(post.id);
                setTrack(post.track || null);
                setNote(post.note || "");
                setMenuVisible(false);
                router.push("/(protected)/compose");
              }}
            >
              <Pencil color={"white"} size={16} />
              <Text className="text-zinc-300 ml-3">Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row items-center border-t border-zinc-800 pt-4 py-2"
              onPress={handleDelete}
            >
              <Trash2 color="#991b1b" size={16} />
              <Text className="text-red-800 ml-3">Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
