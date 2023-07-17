import { readFile } from "fs/promises";
import path from "path";

export async function getServerFile(filename: string) {
  const file = await readFile(path.resolve(filename));
  return file.toString();
}
