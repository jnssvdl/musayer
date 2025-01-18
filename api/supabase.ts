import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";
import { User } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { ImagePickerAsset } from "expo-image-picker";

export const getPosts = async () => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*, profiles (username, display_name, avatar_url )")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;

  if (!posts || posts.length === 0) return [];

  return posts;
};

export const getProfileWithPosts = async (user: User | null) => {
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*, posts( * )")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
};

export const createPost = async ({
  profile_id,
  track_id,
  note,
}: Database["public"]["Tables"]["posts"]["Insert"]) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({ profile_id, track_id, note })
    .select();

  if (error) throw error;

  return data;
};

export const getProfile = async (user: User) => {
  if (!user) return;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
};

export const updateProfile = async ({
  user,
  avatar,
  displayName,
  username,
}: {
  user: User;
  avatar: ImagePickerAsset | null;
  displayName: string;
  username: string;
}) => {
  let avatarUrl = null;

  if (avatar) {
    const extension = avatar.uri.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${extension}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, decode(avatar.base64 || ""), {
        contentType: "image/jpeg",
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(path);

    avatarUrl = publicUrl;
  }

  // Update the profile in the database
  return await supabase
    .from("profiles")
    .update({
      avatar_url: avatarUrl,
      display_name: displayName,
      username: username,
    })
    .eq("id", user.id)
    .select();
};
