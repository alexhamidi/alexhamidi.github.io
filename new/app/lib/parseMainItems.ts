import fs from 'fs';
import path from 'path';

export type MainItemType = 'song' | 'image' | 'video' | 'quote' | 'embed' | 'component';

export interface MainItem {
  name: string;
  type: MainItemType;
  src?: string;           // path to media file
  url?: string;           // external link
  text?: string;          // quote text
  author?: string;        // quote author
  componentName?: string; // registered component name
}

const MEDIA_EXTENSIONS: Record<string, MainItemType> = {
  '.mp3': 'song',
  '.wav': 'song',
  '.mp4': 'video',
  '.webm': 'video',
  '.png': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.webp': 'image',
};

export function parseMainItems(): MainItem[] {
  const mainDir = path.join(process.cwd(), 'public', 'main');
  if (!fs.existsSync(mainDir)) return [];

  const entries = fs.readdirSync(mainDir, { withFileTypes: true });
  const items: MainItem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const dirPath = path.join(mainDir, entry.name);
    const files = fs.readdirSync(dirPath);

    let mediaFile: string | null = null;
    let mediaType: MainItemType | null = null;
    let urlContent: string | null = null;
    let txtContent: string | null = null;
    let componentName: string | null = null;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (MEDIA_EXTENSIONS[ext]) {
        mediaFile = `/main/${entry.name}/${file}`;
        mediaType = MEDIA_EXTENSIONS[ext];
      } else if (file === 'url') {
        const content = fs.readFileSync(path.join(dirPath, file), 'utf-8').trim();
        if (content) urlContent = content;
      } else if (file === 'component') {
        const content = fs.readFileSync(path.join(dirPath, file), 'utf-8').trim();
        componentName = content || entry.name;
      } else if (ext === '.txt') {
        txtContent = fs.readFileSync(path.join(dirPath, file), 'utf-8').trim();
      }
    }

    if (componentName) {
      items.push({
        name: entry.name,
        type: 'component',
        componentName,
      });
    } else if (mediaFile && mediaType) {
      items.push({
        name: entry.name,
        type: mediaType,
        src: mediaFile,
        url: urlContent || undefined,
      });
    } else if (txtContent && !mediaFile) {
      const lines = txtContent.split('\n').filter(l => l.trim());
      const text = lines[0]?.replace(/^[""]|[""]$/g, '');
      const author = lines[1] || undefined;
      items.push({
        name: entry.name,
        type: 'quote',
        text,
        author,
      });
    } else if (urlContent && !mediaFile) {
      items.push({
        name: entry.name,
        type: 'embed',
        url: urlContent,
      });
    }
  }

  return items;
}

export function selectItems(items: MainItem[], max = 20): MainItem[] {
  if (items.length <= max) return shuffleArray(items);
  const shuffled = shuffleArray([...items]);
  return shuffled.slice(0, max);
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type SpanSize = { colSpan: number; rowSpan: number };

export function assignSizes(items: MainItem[]): (MainItem & { span: SpanSize })[] {
  const sizeOptions: Record<MainItemType, SpanSize[]> = {
    image: [
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 1, rowSpan: 2 },
      { colSpan: 2, rowSpan: 1 },
      { colSpan: 1, rowSpan: 1 },
    ],
    video: [
      { colSpan: 2, rowSpan: 2 },
      { colSpan: 2, rowSpan: 1 },
    ],
    song: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 1 },
    ],
    quote: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 1 },
    ],
    embed: [
      { colSpan: 1, rowSpan: 1 },
    ],
    component: [
      { colSpan: 1, rowSpan: 1 },
      { colSpan: 2, rowSpan: 1 },
    ],
  };

  // Greedy assignment: track total area, pick sizes that balance the grid
  let totalCols = 0;
  const result = items.map((item, i) => {
    const options = sizeOptions[item.type];
    // Alternate between larger and smaller to create variety
    const pick = options[i % options.length];
    totalCols += pick.colSpan;
    return { ...item, span: pick };
  });

  return result;
}
