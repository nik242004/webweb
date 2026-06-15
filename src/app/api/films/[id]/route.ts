import { NextResponse } from "next/server";
import { getFilms, saveFilms } from "@/lib/films";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const films = await getFilms();

  const film = films.find(
    (f: any) => f.id === Number(id)
  );

  if (!film) {
    return NextResponse.json(
      { error: "Film not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(film);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const updatedFilm = await request.json();

  const films = await getFilms();

  const index = films.findIndex(
    (f: any) => f.id === Number(id)
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "Film not found" },
      { status: 404 }
    );
  }

  films[index] = {
    ...films[index],
    ...updatedFilm,
    id: Number(id),
  };

  await saveFilms(films);

  return NextResponse.json({
    success: true,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const films = await getFilms();

  const filtered = films.filter(
    (f: any) => f.id !== Number(id)
  );

  await saveFilms(filtered);

  return NextResponse.json({
    success: true,
  });
}