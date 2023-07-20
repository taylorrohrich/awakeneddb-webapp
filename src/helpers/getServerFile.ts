import { readFile } from "fs/promises";
import path from "path";

export async function getServerFile(filename: string) {
  const documentDirectory = path.join(process.cwd(), "document");
  const file = await readFile(documentDirectory + filename);
  return file.toString();
}
