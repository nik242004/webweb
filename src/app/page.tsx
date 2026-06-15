"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Film = {
  id: number;
  name: string;
  rating: number;
  cast: string[];
  tags: string[];
  urls: string[];
};

export default function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  const [actorFilter, setActorFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  useEffect(() => {
    fetchFilms();
  }, []);

  async function fetchFilms() {
    try {
      const response = await fetch("/api/films");

      const data = await response.json();

      setFilms(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteFilm(id: number) {
    const confirmed = confirm(
      "Delete this film?"
    );

    if (!confirmed) return;

    await fetch(`/api/films/${id}`, {
      method: "DELETE",
    });

    fetchFilms();
  }

  const filteredFilms = films.filter((film) => {
    const actorMatch =
      !actorFilter ||
      film.cast.some((person) =>
        person
          .toLowerCase()
          .includes(actorFilter.toLowerCase())
      );

    const tagMatch =
      !tagFilter ||
      film.tags.some((tag) =>
        tag.toLowerCase().includes(tagFilter.toLowerCase())
      );

    return actorMatch && tagMatch;
  });

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Film Database
        </h1>

        <Link
          href="/add"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Film
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-3 rounded"
          placeholder="Filter by actor"
          value={actorFilter}
          onChange={(e) =>
            setActorFilter(e.target.value)
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Filter by tag"
          value={tagFilter}
          onChange={(e) =>
            setTagFilter(e.target.value)
          }
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredFilms.length === 0 ? (
        <p>No films found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredFilms.map((film) => (
            <div
              key={film.id}
              className="border rounded p-4"
            >
              <h2 className="text-xl font-semibold">
                {film.name}
              </h2>

              <p className="mt-1">
                Rating: {film.rating}
              </p>

              <div className="mt-3">
                <strong>Cast:</strong>
                <div>{film.cast.join(", ")}</div>
              </div>

              <div className="mt-3">
                <strong>Tags:</strong>
                <div>{film.tags.join(", ")}</div>
              </div>

              {film.urls.length > 0 && (
                <div className="mt-3">
                  <strong>Links:</strong>

                  <ul className="list-disc ml-6">
                    {film.urls.map((url, index) => (
                      <li key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4">
                <Link
                  href={`/edit/${film.id}`}
                  className="bg-blue-600 text-white px-3 py-2 rounded"
                >
                  Edit
                </Link>
              </div>
              <button
                onClick={() => deleteFilm(film.id)}
                className="bg-red-600 text-white px-3 py-2 rounded ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}