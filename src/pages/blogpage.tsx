import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Stars from "../components/backgrounds";
import Blog from "../components/blog";
import { useMemo } from "react";
import fm from "front-matter";
import { useParams } from "react-router-dom";
import type { Post, Frontmatter } from "./blogs";

// Load markdown at build time
const markdownFiles = import.meta.glob(
  "../content/blogs/*.md",
  { as: "raw", eager: true }
) as Record<string, string>;

export default function BlogPage() {
  const { blogName } = useParams();

  // Parse posts once
  const posts: Post[] = useMemo(() => {
    return Object.entries(markdownFiles).map(([path, raw]) => {
      const parsed = fm<Frontmatter>(raw);

      return {
        slug: path.split("/").pop()!.replace(".md", ""),
        content: parsed.body,
        frontmatter: {
          title: parsed.attributes.title,
          date: parsed.attributes.date,
          summary: parsed.attributes.summary,
        },
      };
    });
  }, []);

  const blog = posts.find((p) => p.slug === blogName);

  return (
    <main className="big-box">
      <Stars />
      <Navbar />
      <div className="main-box">
        {blog ? <Blog blog={blog} /> : <p>Post not found.</p>}
      </div>
      <Footer />
    </main>
  );
}
