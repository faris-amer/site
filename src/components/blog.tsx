/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import frontMatter from 'front-matter';

export default function Blog(props: any) {
  const [markdown, setMarkdown] = useState("");
  const [meta, setMeta] = useState<any>({});

  if (!props.blog?.path) return;
  fetch(props.blog.path)
    .then((res) => res.text())
    .then((text) => {
      const parsed = frontMatter(text);
      setMarkdown(parsed.body);
      setMeta(parsed.attributes); 
    })
    .catch(() => setMarkdown("Could not load markdown file."));

  return(
    <div className="blog-container">
      <div className="blogdate">{meta.date}</div>
    <Markdown rehypePlugins={[rehypeRaw]}>{markdown}</Markdown>
    </div>
  )
}