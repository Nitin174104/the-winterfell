"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./recipe-card";
import { motion } from "framer-motion";

interface RecipeGridProps {
    mood: string;
    flavor: string;
    query?: string;
}

export default function RecipeGrid({ mood, flavor, query }: RecipeGridProps) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if ((!mood || mood === "default") && !query) {
            setRecipes([]);
            return;
        }

        async function fetchRecipes() {
            setLoading(true);
            try {
                let url = `/api/recipes?flavor=${flavor}`;
                if (query) {
                    url = `/api/recipes?query=${query}`;
                }
                const res = await fetch(url);
                const data = await res.json();
                setRecipes(data.recipes || []);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, [mood, flavor, query]);

    if (!mood || mood === "default") return null;

    return (
        <section className="mt-12">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span className="capitalize">{mood}</span> Vibes Detected 
                <span className="text-sm font-normal text-gray-500 bg-black/30 px-3 py-1 rounded-full">Recommended for you</span>
            </h2>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-96 glass-card rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {recipes.map((recipe: any) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </section>
    );
}
