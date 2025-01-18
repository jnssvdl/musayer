import { supabase } from "@/lib/supabase";

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
