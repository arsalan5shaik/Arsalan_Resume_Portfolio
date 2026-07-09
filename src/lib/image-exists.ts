import fs from "node:fs";
import path from "node:path";

// Lets section components skip rendering an <Image> for content where you
// haven't dropped a picture into public/images yet, instead of showing a
// broken-image icon. Runs at build time in server components only.
export function imageExists(publicPath?: string): boolean {
  if (!publicPath) return false;
  const fullPath = path.join(process.cwd(), "public", publicPath);
  return fs.existsSync(fullPath);
}
