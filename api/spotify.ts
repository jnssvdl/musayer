import { Track } from "@/types/track";

export const getSeveralTracks = async (
  ids: string[],
  token: string | undefined
): Promise<Track[]> => {
  const url = `https://api.spotify.com/v1/tracks?ids=${ids.join(",")}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.tracks;
};
