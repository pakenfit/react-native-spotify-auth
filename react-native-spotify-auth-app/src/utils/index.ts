import { Track } from '../types/tracks.type';

export function uniquifyTracks(array: Track[]) {
  return array.reduce((acc: Track[], current: Track) => {
    const x = acc.find((item: Track) => item.track.id === current.track.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
}
