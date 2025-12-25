/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Import all markdown files as raw strings
const markdownFiles = import.meta.glob("../content/projects/**/index.md", {
  as: "raw",
});

// Import all TSX components
const components = import.meta.glob<{
  default: React.ComponentType<any>;
}>("../content/projects/**/index.tsx");

export default function Project(props: any) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    if (!props.project.id) return;

    const mdPath = `../content/projects/${props.project.id}/index.md`;
    const tsxPath = `../content/projects/${props.project.id}/index.tsx`;

    if (markdownFiles[mdPath]) {
      (async () => {
        const text = await (markdownFiles[mdPath] as () => Promise<string>)();
        setMarkdown(text);
      })();
    } else if (components[tsxPath]) {
      (async () => {
        const mod = await components[tsxPath]();
        setComponent(() => mod.default);
      })();
    } else {
      setMarkdown("Could not load project.");
    }
  }, [props.project.id]);

  return (
    <div className="project-container">
      {markdown !== null ? (
        <Markdown rehypePlugins={[rehypeRaw]}>{markdown}</Markdown>
      ) : Component ? (
        <Component />
      ) : (
        <p>Loading…</p>
      )}
    </div>
  );
}
