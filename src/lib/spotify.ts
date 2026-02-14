import { NextResponse } from "next/server";

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

// RapidAPI Configuration
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "spotify81.p.rapidapi.com";

export async function searchTracks(query: string) {
    if (!RAPIDAPI_KEY) return null;

    try {
        const res = await fetch(`https://${RAPIDAPI_HOST}/search?q=${encodeURIComponent(query)}&type=tracks&limit=1`, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });

        if (!res.ok) {
            console.error("RapidAPI Error:", await res.text());
            return null;
        }

        const data = await res.json();
        // Adapt RapidAPI response to our format
        // Note: Response structure depends on the specific RapidAPI wrapper. 
        // Assuming it returns standard Spotify-like object or similar.
        // If it's spotify81, it usually returns { tracks: { items: [...] } }
        
        const track = data.tracks?.items?.[0] || data[0]; // Fallback for different API structures
        
        if (!track) return null;

        return {
            id: track.id,
            title: track.name,
            artist: track.artists?.[0]?.name || "Unknown",
            albumImage: track.album?.images?.[0]?.url || "",
            songUrl: track.external_urls?.spotify || "",
            previewUrl: track.preview_url || "", // Add Preview URL
            isPlaying: false 
        };

    } catch (error) {
        console.error("RapidAPI Search Error:", error);
        return null;
    }
}

export async function getAudioFeatures(id: string) {
    if (!RAPIDAPI_KEY) return null;

    try {
        // Fetch Audio Features
        const res = await fetch(`https://${RAPIDAPI_HOST}/audio_features?ids=${id}`, {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            }
        });

        if (!res.ok) return null;

        const data = await res.json();
        const features = data.audio_features?.[0];

        if (!features) return null;

        // Scientific Mood Logic
        const { energy, valence, tempo } = features;
        let mood = "Chill"; // Default

        if (energy > 0.6 && valence > 0.6) mood = "Energetic";
        else if (energy < 0.4 && valence < 0.4) mood = "Melancholic";
        else if (energy > 0.6 && valence < 0.4) mood = "Stressed";
        else if (energy < 0.5 && valence > 0.6) mood = "Happy";
        else if (energy < 0.5) mood = "Relaxed";

        return {
            bpm: Math.round(tempo),
            energy,
            valence,
            mood
        };

    } catch (error) {
        console.error("RapidAPI Audio Features Error:", error);
        return null;
    }
}
