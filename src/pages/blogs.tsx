/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Stars from "../components/backgrounds";
import NotificationForm from "../components/notificationform";
import { useMemo, useState } from "react";
import fm from "front-matter";

// ✅ Correct glob
const markdownFiles = import.meta.glob(
  "../content/blogs/*.md",
  { as: "raw", eager: true }
) as Record<string, string>;

export type Frontmatter = {
  title: string;
  date: string;
  summary: string;
  order?: number | string;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: Frontmatter;
};

export default function Blogs() {
  const [currentStep, setCurrentStep] = useState(1);

  // ✅ Build posts once
  const posts: Post[] = useMemo(() => {
    const entries = Object.entries(markdownFiles).map(([path, raw]) => {
      const parsed = fm<Frontmatter>(raw);

      return {
        slug: path.split("/").pop()!.replace(".md", ""),
        content: parsed.body,
        frontmatter: parsed.attributes,
      };
    });

    // sort by YAML order, highest first; fall back to date for missing values
    entries.sort((a, b) => {
      const orderA = Number(a.frontmatter.order ?? 0) || 0;
      const orderB = Number(b.frontmatter.order ?? 0) || 0;

      if (orderA !== orderB) {
        return orderB - orderA;
      }

      const ta = Date.parse(a.frontmatter.date) || 0;
      const tb = Date.parse(b.frontmatter.date) || 0;
      return tb - ta;
    });

    return entries;
  }, []);

  return (
    <>
      <Stars />
      <main className="big-box">
        <Navbar />
        <div className="main-box">
          <div className="subheader">
            /chatter/ - talk rapidly or incessantly about trivial matters.
          </div>

          {posts.map((post) => (
            <a
              key={post.slug}
              className="bloglink"
              href={`/chatter/${post.slug}`}
            >
              <div className="blogtitle">{post.frontmatter.title}</div>
              <div className="listDate">{post.frontmatter.date}</div>
              <div className="summary">{post.frontmatter.summary}</div>
            </a>
          ))}
        </div>

        {currentStep === 1 && (
          <NotificationForm onSubmitSuccess={() => setCurrentStep(2)} />
        )}
        {currentStep === 2 && (
          <div className="greentext">submitted!</div>
        )}

        <Footer />
      </main>
    </>
  );
}
