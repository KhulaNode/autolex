import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 96, height: 96 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), "public/branding/Bold AL Lightning Bolt Logo.png"),
  );
  // ImageResponse uses its own image renderer rather than the browser/Next image component.
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "white",
        width: "100%",
        height: "100%",
        alignItems: "center",
        padding: 5,
      }}
    >
      <img
        src={`data:image/png;base64,${logo.toString("base64")}`}
        alt=""
        width={86}
        height={43}
      />
    </div>,
    size,
  );
}
