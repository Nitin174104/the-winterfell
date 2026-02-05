import { NextResponse } from "next/server";

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
    {
        song: {
            title: "Tum Hi Ho",
            artist: "Arijit Singh",
            cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2670&auto=format&fit=crop" // Romantic/Rain Vibe
        },
        vibe: "Romantic",
        query: "Italian Pasta"
    },
    {
        song: {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            cover: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2670&auto=format&fit=crop" // Coffee/Chill Vibe
        },
        vibe: "Chill",
        query: "Iced Coffee"
    },
     {
        song: {
            title: "Flowers",
            artist: "Miley Cyrus",
            cover: "https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=2670&auto=format&fit=crop" // Flowers/Happy Vibe
        },
        vibe: "Happy",
        query: "Fresh Salad"
    }
];

export async function GET() {
    // Randomly select a scenario to simulate "live" listening
    const scenario = MOCK_SCENARIOS[Math.floor(Math.random() * MOCK_SCENARIOS.length)];
    return NextResponse.json(scenario);
}
