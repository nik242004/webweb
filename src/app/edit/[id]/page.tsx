"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditFilmPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [cast, setCast] = useState("");
  const [tags, setTags] = useState("");
  const [urls, setUrls] = useState("");

  useEffect(() => {
    loadFilm();
  }, []);

  async function loadFilm() {
    const response = await fetch(
      `/api/films/${id}`
    );

    const film = await response.json();

    setName(film.name);
    setRating(String(film.rating));

    setCast(film.cast.join(", "));
    setTags(film.tags.join(", "));
    setUrls(film.urls.join(", "));

    setLoading(false);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await fetch(`/api/films/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        rating: Number(rating),

        cast: cast
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),

        tags: tags
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),

        urls: urls
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      }),
    });

    router.push("/");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Edit Film
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          className="border p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="border p-3 rounded"
          type="number"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        />

        <textarea
          className="border p-3 rounded"
          value={cast}
          onChange={(e) =>
            setCast(e.target.value)
          }
        />

        <textarea
          className="border p-3 rounded"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
        />

        <textarea
          className="border p-3 rounded"
          value={urls}
          onChange={(e) =>
            setUrls(e.target.value)
          }
        />

        <button
          className="bg-black text-white p-3 rounded"
        >
          Update Film
        </button>
      </form>
    </main>
  );
}