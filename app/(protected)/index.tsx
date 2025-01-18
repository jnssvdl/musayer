import React from "react";
import { Redirect } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/supabase";
import useUser from "@/hooks/use-user";

export default function Index() {
  const user = useUser();

  const { data: profile } = useQuery({
    queryKey: ["profile", user.id],
    queryFn: () => {
      if (!user) return;
      return getProfile(user);
    },
  });

  if (!profile?.display_name || profile.username) {
    return <Redirect href={"/(protected)/onboarding"} />;
  }

  return <Redirect href={"/(protected)/(tabs)"} />;
}
