import { cp } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Next's standalone build deliberately omits static/public assets. Assemble the
// same layout as the Docker image for a reliable local `npm start` experience.
const root = process.cwd();
// Standalone changes its working directory, so load local settings first.
// Node preserves existing process variables; load higher-priority files first.
for (const file of [".env.production.local", ".env.local", ".env.production", ".env"]) {
  const path = join(root, file);
  if (existsSync(path)) process.loadEnvFile(path);
}
const standalone = join(root, ".next/standalone");
await cp(join(root, "public"), join(standalone, "public"), { recursive: true });
await cp(join(root, ".next/static"), join(standalone, ".next/static"), {
  recursive: true,
});
process.env.HOSTNAME = "0.0.0.0";
process.env.PORT ||= "3000";
await import(pathToFileURL(join(standalone, "server.js")).href);
