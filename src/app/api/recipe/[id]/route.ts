import { NextRequest, NextResponse } from "next/server";
import { getRecipeById } from "@/lib/foodoscope";

export async function GET(
  request: NextRequest,
// @ts-ignore
  { params }: { params: any }
) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  return NextResponse.json(recipe);
}
