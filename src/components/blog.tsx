/* eslint-disable @typescript-eslint/no-explicit-any */
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Blog({ blog }: { blog: any }) {
  if (!blog) return <p>Loading…</p>;

  return (
    <div className="blog-container">
      <div className="blogdate">{blog.frontmatter.date}</div>
      <Markdown rehypePlugins={[rehypeRaw]}>
        {blog.content}
      </Markdown>
    </div>
  );
}