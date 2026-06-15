import { getFilms, saveFilms } from "@/lib/films";
import { NextResponse } from "next/server";

export async function GET() {
  const films = await getFilms();

  return NextResponse.json(films);
}

export async function POST(req: Request) {
  const newFilm = await req.json();

  const films = await getFilms();

  newFilm.id = Date.now();

  films.push(newFilm);

  await saveFilms(films);

  return NextResponse.json({
    success: true
  });
}