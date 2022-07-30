import { Artist } from './artist.type';

export type recentTracksResponse = {
  items: Track[];
};

export type Track = {
  played_at: string;
  track: {
    album: {
      album_type: string;
      id: string;
      name: string;
      release_date: string;
      total_tracks: number;
      type: string;
      uri: string;
      images: { url: string; height: number; width: number }[];
    };
    artists: Artist[];
    duration_ms: number;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
};
