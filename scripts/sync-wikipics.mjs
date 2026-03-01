#!/usr/bin/env node
const README_URL = "https://raw.githubusercontent.com/alexhamidi/WikiPics/main/README.md";

function parseImageUrls(readme) {
  const urls = [];
  for (const line of readme.split("\n")) {
    const m = line.match(/https:\/\/(en\.wikipedia\.org|commons\.wikimedia\.org)\/wiki\/File:([^\s]+)/);
    if (m) urls.push(`https://${m[1]}/wiki/Special:FilePath/${m[2]}`);
  }
  return urls;
}

const res = await fetch(README_URL);
const urls = parseImageUrls(await res.text());
const outPath = new URL("../data/wikipics.json", import.meta.url);
await import("fs").then(({ writeFileSync }) =>
  writeFileSync(outPath, JSON.stringify(urls, null, 2))
);
console.log(`Updated ${urls.length} URLs in data/wikipics.json`);
