// Foodoscope API Integration
const API_KEY = process.env.FOODOSCOPE_API_KEY || "";
const BASE_URL = "https://api.foodoscope.com/recipe2-api";

if (!API_KEY) {
    console.error("CRITICAL: FOODOSCOPE_API_KEY is not set in environment variables.");
}


async function fetchFromApi(endpoint: string, params: Record<string, string> = {}) {
    // Construct Query String
    // Force fresh fetch by adding a random timestamp
    const q = { ...params, _: String(Date.now()) };
    const query = new URLSearchParams(q).toString();
    const url = `${BASE_URL}${endpoint}?${query}`;

    try {
        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            cache: 'no-store', // Next.js specific: disable data cache
            next: { revalidate: 0 } // Next.js 13+ specific
        });

        if (!res.ok) {
            console.error(`API Error ${res.status}: ${await res.text()}`);
            return null;
        }

        return await res.json();
    } catch (e) {
        console.error("Fetch failed:", e);
        return null;
    }
}



// Helper to get diverse images based on keywords
function getFallbackImage(title: string) {
    const t = title.toLowerCase();
    
    // Expanded Context Categories
    if (t.includes("soup") || t.includes("stew") || t.includes("chili")) return "https://images.unsplash.com/photo-1547592166-23acbe3a624b";
    if (t.includes("salad") || t.includes("green") || t.includes("bowl")) return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd";
    if (t.includes("chicken") || t.includes("poultry") || t.includes("turkey")) return "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b";
    if (t.includes("beef") || t.includes("steak") || t.includes("lamb") || t.includes("meat")) return "https://images.unsplash.com/photo-1600891964092-4316c288032e";
    if (t.includes("pasta") || t.includes("spaghetti") || t.includes("noodle") || t.includes("macaroni")) return "https://images.unsplash.com/photo-1551183053-bf91a1d81141";
    if (t.includes("cake") || t.includes("dessert") || t.includes("chocolate") || t.includes("sweet")) return "https://images.unsplash.com/photo-1578985545062-69928b1d9587";
    if (t.includes("fish") || t.includes("seafood") || t.includes("shrimp") || t.includes("salmon")) return "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2";
    if (t.includes("burger") || t.includes("sandwich") || t.includes("wrap")) return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd";
    if (t.includes("pizza") || t.includes("flatbread")) return "https://images.unsplash.com/photo-1513104890138-7c749659a591";
    if (t.includes("breakfast") || t.includes("egg") || t.includes("pancake")) return "https://images.unsplash.com/photo-1533089862017-ec326aa0d533";
    
    // Vastly Expanded Default Rotation
    const defaults = [
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", // Salad
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836", // Steak
        "https://images.unsplash.com/photo-1493770348161-369560ae357d", // Toast
        "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a", // Soup
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929", // French Toast
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601", // Green Pasta
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061", // Sushi/Bowl
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38", // Pizza slice
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445", // Pancakes
        "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe", // Stir Fry
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187", // Cake
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543"  // Sandwich
    ];
    // Create a hash that distributes more evenly
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = (hash << 5) - hash + title.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return defaults[Math.abs(hash) % defaults.length];
}

export async function getRecipesByFlavor(flavor: string, isLowSalt: boolean = false) {
    const randomPage = Math.floor(Math.random() * 20) + 1;
    const data = await fetchFromApi("/recipe-nutri/nutritioninfo", { page: String(randomPage), limit: "50" });
    
    if (!data || !data.payload || !data.payload.data) return [];

    let rawRecipes = data.payload.data;
    
    // Step 0: Deduplicate Raw Data (API often has duplicates)
    const seenIds = new Set();
    const uniqueRaw: any[] = [];
    for (const r of rawRecipes) {
        const id = r.Recipe_id || r._id;
        const title = r.recipeTitle || r.title;
        // Dedupe key: ID + Title (some IDs might be missing/generic)
        const key = `${id}-${title}`;
        if (!seenIds.has(key)) {
            seenIds.add(key);
            uniqueRaw.push(r);
        }
    }
    rawRecipes = uniqueRaw;

    // Step 1: Client-side Filter by Flavor/Vibe
    if (flavor && flavor !== "savory" && flavor !== "healthy") {
        const lowerFlavor = flavor.toLowerCase();
        const matched = rawRecipes.filter((r: any) => {
            const t = (r.recipeTitle || r.title || "").toLowerCase();
            if (lowerFlavor === "sweet") return t.includes("cake") || t.includes("cookie") || t.includes("dessert") || t.includes("sweet");
            if (lowerFlavor === "spicy") return t.includes("spicy") || t.includes("chili") || t.includes("curry") || t.includes("hot");
            if (lowerFlavor === "comfort food") return t.includes("soup") || t.includes("stew") || t.includes("pasta") || t.includes("cheese");
            if (lowerFlavor === "healthy") return true; 
            return t.includes(lowerFlavor);
        });
        if (matched.length >= 2) rawRecipes = matched;
    }

    // Step 2: Map to App format
    let recipes = rawRecipes.map((r: any) => {
        const title = r.recipeTitle || r.title || "Unknown Recipe";
        return {
            id: r.Recipe_id || r._id,
            title: title,
            image: r.img_url || getFallbackImage(title),
            time: "30 min",
            calories: Math.round(parseFloat(r["Energy (kcal)"] || 0)),
            rating: 4.5,
            sodium: parseFloat(r["Sodium, Na (mg)"] || 0)
        };
    });

    // Apply Low Salt Filter
    if (isLowSalt) {
        recipes = recipes.filter((r: any) => r.sodium < 500);
    }
    
    return recipes.slice(0, 12);
}



export async function searchRecipes(query: string, isLowSalt: boolean = false) {
    return getRecipesByFlavor(query, isLowSalt);
}


export async function getRecipeById(id: string) {
    console.log(`[Foodoscope] Fetching details for ID: ${id}`);
    
    // Attempt 1: Try filtering by Recipe_id directly
    // Note: The API might ignore unknown params, so we check the result carefully.
    const data = await fetchFromApi("/recipe-nutri/nutritioninfo", { 
        "Recipe_id": id,
        "limit": "5" // Fetch a few just in case
    });

    if (data && data.payload && data.payload.data) {
        // Find the specific item in the returned list
        const found = data.payload.data.find((r: any) => 
            String(r.Recipe_id) === String(id) || String(r._id) === String(id)
        );

        if (found) {
             console.log(`[Foodoscope] Found recipe: ${found.recipeTitle}`);
             const title = found.recipeTitle || found.title || "Unknown Recipe";
             return {
                title: title,
                image: found.img_url || getFallbackImage(title),
                time: "30 min",
                calories: Math.round(parseFloat(found["Energy (kcal)"] || 0)),
                description: found.instructions || "Instructions retrieved from Foodoscope API.",
                ingredients: found.ingredients ? found.ingredients.split(",") : ["Ingredients not listed in summary."]
            };
        }
    }
    
    console.warn(`[Foodoscope] ID ${id} not found in API search.`);
    return null;
}



