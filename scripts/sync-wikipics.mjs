#!/usr/bin/env node
const README_URL = "https://raw.githubusercontent.com/alexhamidi/WikiPics/main/README.md";
const IMAGE_WIDTH = 672;

function parseImageUrls(readme) {
  const urls = [];
  for (const line of readme.split("\n")) {
    const m = line.match(/https:\/\/(en\.wikipedia\.org|commons\.wikimedia\.org)\/wiki\/File:([^\s]+)/);
    if (m) urls.push(`https://${m[1]}/wiki/Special:FilePath/${m[2]}`);
  }
  return urls;
}

async function resolveToUploadUrl(specialUrl) {
  const url = `${specialUrl}${specialUrl.includes("?") ? "&" : "?"}width=${IMAGE_WIDTH}`;
  const res = await fetch(url, { redirect: "follow" });
  return res.url;
}

const res = await fetch(README_URL);
const specialUrls = parseImageUrls(await res.text());
const directUrls = [];
for (let i = 0; i < specialUrls.length; i++) {
  try {
    const direct = await resolveToUploadUrl(specialUrls[i]);
    directUrls.push(direct);
  } catch (e) {
    directUrls.push(specialUrls[i]);
  }
  if (i < specialUrls.length - 1) await new Promise((r) => setTimeout(r, 150));
}
const outPath = new URL("../data/wikipics.json", import.meta.url);
await import("fs").then(({ writeFileSync }) =>
  writeFileSync(outPath, JSON.stringify(directUrls, null, 2))
);
console.log(`Updated ${directUrls.length} URLs in data/wikipics.json (direct upload.wikimedia.org)`);
