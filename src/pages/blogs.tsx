/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"
import NotificationForm from "../components/notificationform";
import { useEffect, useState } from "react"
import fm from "front-matter"

const markdownFiles = import.meta.glob('/src/content/blogs/*.md', { query: '?raw', import: 'default' });
export type Frontmatter = {
  title: string
  date: string
  summary: string
}
export type Post = {
  frontmatter: Frontmatter
  path: string
}


export default function Blogs(){
  const [currentStep, setCurrentStep] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {

    const loadPosts = async () => {
      const entries = await Promise.all(
        Object.entries(markdownFiles).map(async ([path, load]) => {
          const rawContent = await load();
          const data = fm<Frontmatter>(rawContent as string);
          const post: Post = {
            frontmatter: {
              title: data.attributes.title,
              date: data.attributes.date,
              summary: data.attributes.summary,
            },
            path,
          };
          return post;
        })
      );

      // sort posts by date (newest first). Safely parse dates and fallback to 0 for invalid dates
      entries.sort((a, b) => {
        const ta = Date.parse(a.frontmatter.date) || 0;
        const tb = Date.parse(b.frontmatter.date) || 0;
        return tb - ta;
      });

      setPosts(entries);
    };

    loadPosts();
  }, []);

  const postIndex = posts.map((x)=>(
    <a key={x.path} className="bloglink" href={"/chatter/"+x.frontmatter.title}>
      <div className="blogtitle">{x.frontmatter.title}</div>
      <div className="listDate">{x.frontmatter.date}</div>
      <div className="summary">{x.frontmatter.summary}</div>
    </a>
  ))

  return (
    <>
    <Stars />
      <main className="big-box">
        <Navbar />
        <div className="main-box">
        <div className="subheader">/chatter/ - talk rapidly or incessantly about trivial matters.</div>
          {postIndex}
        </div>
        {currentStep === 1 && (<NotificationForm onSubmitSuccess={() => setCurrentStep(2)} />)}
        {currentStep === 2 && (<div className="greentext">submitted!</div>)}
        <Footer/>
      </main>
    </>
  )
}