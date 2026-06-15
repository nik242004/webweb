"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFilmPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [cast, setCast] = useState("");
  const [tags, setTags] = useState("");
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const film = {
        name,
        rating: Number(rating),
        cast: cast
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        tags: tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        urls: urls
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch("/api/films", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(film),
      });

      if (!response.ok) {
        throw new Error("Failed to save film");
      }

      alert("Film added successfully!");

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Add Film
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          className="border p-3 rounded"
          placeholder="Film Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-3 rounded"
          placeholder="Rating"
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <textarea
          className="border p-3 rounded"
          placeholder="Cast (comma separated)"
          value={cast}
          onChange={(e) => setCast(e.target.value)}
          rows={3}
        />

        <textarea
          className="border p-3 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          rows={3}
        />

        <textarea
          className="border p-3 rounded"
          placeholder="URLs (comma separated)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-3 rounded"
        >
          {loading ? "Saving..." : "Save Film"}
        </button>
      </form>
    </main>
  );
}