import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
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
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setId(post.id);
                setTrack(post.track || null);
                setNote(post.note || "");
                setMenuVisible(false);
                router.push("/(protected)/compose");
              }}
            >
              <Pencil color={"white"} size={16} />
              <Text style={styles.menuText}>Edit Post</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.deleteItem]}
              onPress={handleDelete}
            >
              <Trash2 color="#ef4444" size={16} />
              <Text style={[styles.menuText, styles.deleteText]}>
                Delete Post
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#09090b",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 8,
  },
  deleteItem: {
    borderTopWidth: 0.5,
    borderColor: "#27272a",
    paddingTop: 16,
  },
  menuText: {
    fontSize: 14,
    color: "#71717a",
  },
  deleteText: {
    color: "#ef4444",
  },
  editModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 16,
  },
  editModalContent: {
    backgroundColor: "#09090b",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  editModalTitle: {
    textAlign: "center",
  },
  input: {
    backgroundColor: "#3f3f46",
    borderRadius: 8,
    padding: 12,
    color: "white",
    minHeight: 100,
    textAlignVertical: "top",
  },
  editModalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#3f3f46",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    fontSize: 14,
    color: "#71717a",
  },
  saveButtonText: {
    color: "#ffffff",
  },
});
