export function getFileName(name: string) {
  return name.replaceAll("'", "-").replaceAll(" ", "_").toLowerCase();
}
