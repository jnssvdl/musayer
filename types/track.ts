export type Track = {
  album: {
    album_type: "album" | "single" | "compilation";
    total_tracks: number;
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      url: string;
      height: number | null;
      width: number | null;
    }[];
    name: string;
    release_date: string;
    release_date_precision: "year" | "month" | "day";
    restrictions?: {
      reason: string;
    };
    type: "album";
    uri: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: "artist";
      uri: string;
    }[];
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: "artist";
    uri: string;
  }[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    uri: string;
  };
  restrictions?: {
    reason: "market" | "product" | "explicit" | string;
  };
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
};
