// Mock Data for "Spotify is on hold" scenario
const MOCK_SONGS = [
    {
        id: "mock-1",
        title: "Starboy",
        artist: "The Weeknd",
        albumImage: "https://i.scdn.co/image/ab67616d0000b2734718e28d24527d9774635ded",
        energy: 0.8,
        valence: 0.3, // High energy, low valence -> Stressed/Energetic
        songUrl: "#"
    },
    {
        id: "mock-2",
        title: "Tum Hi Ho",
        artist: "Arijit Singh",
        albumImage: "https://i.scdn.co/image/ab67616d0000b273a078d121bc5c57173b22e11e",
        energy: 0.3,
        valence: 0.2, // Low energy, low valence -> Sad
        songUrl: "#"
    },
    {
        id: "mock-3",
        title: "Levitating",
        artist: "Dua Lipa",
        albumImage: "https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49d40",
        energy: 0.9,
        valence: 0.8, // High energy, high valence -> Happy
        songUrl: "#"
    },
    {
        id: "mock-4",
        title: "Espresso",
        artist: "Sabrina Carpenter",
        albumImage: "https://i.scdn.co/image/ab67616d0000b273659cd467323091391d179618",
        energy: 0.7,
        valence: 0.9, // Happy/Chill
        songUrl: "#"
    },
    {
        id: "mock-5",
        title: "Numb",
        artist: "Linkin Park",
        albumImage: "https://i.scdn.co/image/ab67616d0000b273c09f30cd907d4b29b6732626",
        energy: 0.9,
        valence: 0.1, // Stressed
        songUrl: "#"
    }
];

export async function getMockNowPlaying() {
    // Random selection
    const randomIndex = Math.floor(Math.random() * MOCK_SONGS.length);
    const song = MOCK_SONGS[randomIndex];
    
    return {
        ...song,
        isPlaying: true
    };
}

export async function getNowPlaying(accessToken: string) {
  const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 204 || res.status > 400) {
    return null;
  }

  const song = await res.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
  const albumImage = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;
  const id = song.item.id;

  return {
    albumImage,
    artist,
    isPlaying,
    songUrl,
    title,
    id
  };
}

export async function getAudioFeatures(accessToken: string, id: string) {
     const res = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return res.json();
}
