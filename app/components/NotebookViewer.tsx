import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NotebookCell {
  cell_type: "code" | "markdown" | "raw";
  source: string[];
  outputs?: NotebookOutput[];
}

interface NotebookOutput {
  output_type: "stream" | "execute_result" | "display_data" | "error";
  text?: string[];
  data?: {
    "text/plain"?: string[];
    "image/png"?: string;
    "image/jpeg"?: string;
  };
  name?: string; // stdout / stderr
}

export interface NotebookData {
  cells: NotebookCell[];
}

function CellOutput({ output }: { output: NotebookOutput }) {
  if (output.output_type === "stream") {
    const text = (output.text ?? []).join("");
    if (!text.trim()) return null;
    return (
      <pre className="mt-1 mb-2 px-3 py-2 text-[0.8em] leading-relaxed bg-neutral-50 border border-neutral-200 rounded overflow-x-auto text-neutral-600 whitespace-pre-wrap">
        {text}
      </pre>
    );
  }

  if (output.output_type === "execute_result" && output.data?.["text/plain"]) {
    const text = output.data["text/plain"].join("");
    if (!text.trim()) return null;
    return (
      <pre className="mt-1 mb-2 px-3 py-2 text-[0.8em] leading-relaxed bg-neutral-50 border border-neutral-200 rounded overflow-x-auto text-neutral-600 whitespace-pre-wrap">
        {text}
      </pre>
    );
  }

  if (output.output_type === "display_data") {
    const png = output.data?.["image/png"];
    const jpeg = output.data?.["image/jpeg"];
    const src = png
      ? `data:image/png;base64,${png}`
      : jpeg
      ? `data:image/jpeg;base64,${jpeg}`
      : null;
    if (src) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="cell output"
          className="mt-2 mb-4 max-w-full rounded border border-neutral-200"
        />
      );
    }
  }

  return null;
}

function MarkdownCell({ source }: { source: string[] }) {
  const text = source.join("").replace(/^---\n?/, "").trimStart();
  return (
    <div className="prose prose-neutral max-w-none mb-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isBlock = match || String(children).includes("\n");
            if (isBlock) {
              return (
                <SyntaxHighlighter
                  style={oneLight}
                  language={match ? match[1] : "text"}
                  PreTag="div"
                  customStyle={{ borderRadius: 6, fontSize: "0.85em", margin: "1rem 0" }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              );
            }
            return <code className={className} {...props}>{children}</code>;
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

function CodeCell({ source, outputs }: { source: string[]; outputs: NotebookOutput[] }) {
  const code = source.join("").trimEnd();
  if (!code) return null;
  return (
    <div className="mb-4">
      <SyntaxHighlighter
        style={oneLight}
        language="python"
        PreTag="div"
        customStyle={{ borderRadius: 6, fontSize: "0.85em", margin: 0 }}
      >
        {code}
      </SyntaxHighlighter>
      {outputs.map((out, i) => (
        <CellOutput key={i} output={out} />
      ))}
    </div>
  );
}

export default function NotebookViewer({ notebook }: { notebook: NotebookData }) {
  return (
    <div className="mt-4 space-y-2">
      {notebook.cells.map((cell, i) => {
        if (cell.cell_type === "markdown") {
          return <MarkdownCell key={i} source={cell.source} />;
        }
        if (cell.cell_type === "code") {
          return <CodeCell key={i} source={cell.source} outputs={cell.outputs ?? []} />;
        }
        return null;
      })}
    </div>
  );
}
