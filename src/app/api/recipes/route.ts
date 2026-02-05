import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getRecipesByFlavor, searchRecipes } from "@/lib/foodoscope";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flavor = searchParams.get('flavor');
  const query = searchParams.get('query');
  const mood = searchParams.get('mood');
  const goals = searchParams.get('goals');

  if (!flavor && !query && !mood && !goals) {
      return NextResponse.json({ error: "Flavor, Query, Mood, or Goals required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  
  // Get User Preferences
  let isLowSalt = false;
  if (session?.user?.id) {
      const pref = await prisma.preference.findUnique({
          where: { userId: session.user.id }
      });
      if (pref) isLowSalt = pref.isLowSalt;
  }

  let recipes: any[] = [];
  let searchQuery = query || "";

  // Map Mood to Queries
  if (mood) {
      const moodMap: Record<string, string> = {
          "happy": "comfort food",
          "sad": "chocolate",
          "energetic": "spicy",
          "chill": "soup",
          "romantic": "pasta",
          "focused": "nuts",
          "stressed": "tea"
      };
      const moodQuery = moodMap[mood.toLowerCase()] || "healthy";
      searchQuery = searchQuery ? `${searchQuery} ${moodQuery}` : moodQuery;
  }

  // Map Goals to Queries
  if (goals) {
      const goalList = goals.split(",");
      const goalQuery = goalList.join(" ");
      searchQuery = searchQuery ? `${searchQuery} ${goalQuery}` : goalQuery;
  }

  if (searchQuery) {
      recipes = await searchRecipes(searchQuery, isLowSalt);
  } else if (flavor) {
      recipes = await getRecipesByFlavor(flavor, isLowSalt);
  }

  return NextResponse.json({ recipes });
}
