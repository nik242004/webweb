import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "films.json");

export async function getFilms() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

export async function saveFilms(films: any[]) {
  await fs.writeFile(
    filePath,
    JSON.stringify(films, null, 2)
  );
}