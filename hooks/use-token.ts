import { useQuery } from "@tanstack/react-query";

const clientId = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.EXPO_PUBLIC_SPOTIFY_CLIENT_SECRET!;

export function useToken() {
  return useQuery({
    queryKey: ["token"],
    queryFn: async (): Promise<string> => {
      const options = {
        method: "POST",
        headers: {
          Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      };
      const response = await fetch(
        "https://accounts.spotify.com/api/token",
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.access_token;
    },
    staleTime: 3600000, // 1 hour, matches Spotify token expiration
    gcTime: 3600000, // Cache the data for 1 hour
    retry: 1, // Retry fetching once on failure
    refetchOnWindowFocus: false,
  });
}
