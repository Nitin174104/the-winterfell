import { NextResponse } from "next/server";
import { searchTracks, getAudioFeatures } from "@/lib/spotify";

const MOCK_SCENARIOS = [
    {
        song: {
            title: "Starboy",
            artist: "The Weeknd",
            cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2670&auto=format&fit=crop" // Cyberpunk/Neon Vibe
        },
        vibe: "Energetic",
        query: "Spicy Chicken"
    },
    // ... (Keep mocks as fallback)
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q'); // Allow testing with ?q=SongName

    if (query) {
        // Step 1: Search Track
        const track = await searchTracks(query);
        
        if (track) {
            // Step 2: Get Audio Features (Scientific Mood)
            const audioFeatures = await getAudioFeatures(track.id);
            const mood = audioFeatures?.mood || "Chill"; // Default fallback if features fail
            
            return NextResponse.json({
                song: {
                    title: track.title,
                    artist: track.artist,
                    cover: track.albumImage || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
                    previewUrl: track.previewUrl
                },
                vibe: mood,
                query: `${mood} Food`,
                // Transparency Data
                scientific_analysis: {
                    bpm: audioFeatures?.bpm,
                    energy: audioFeatures?.energy,
                    valence: audioFeatures?.valence,
                    trigger: `${mood} (BPM: ${audioFeatures?.bpm})`
                }
            });
        }
    }

    // Default to mock if no query or search fails
    const scenario = MOCK_SCENARIOS[Math.floor(Math.random() * MOCK_SCENARIOS.length)];
    return NextResponse.json(scenario);
}
