import fs from "fs";
import path from "path";
import ImagesFeed from "./ImagesFeed";

const IMAGE_WIDTH = 672;

function thumbUrl(url: string): string {
  return `${url}${url.includes("?") ? "&" : "?"}width=${IMAGE_WIDTH}`;
}

export default function ImagesPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), "data", "wikipics.json"),
    "utf-8"
  );
  const imageUrls: string[] = JSON.parse(raw);

  return (
    <div
      className="h-screen overflow-y-auto bg-neutral-950"
      style={{ overscrollBehavior: "none" }}
    >
      <ImagesFeed urls={imageUrls.map(thumbUrl)} />
    </div>
  );
}
