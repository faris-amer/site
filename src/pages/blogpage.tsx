import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"
import Blog from "../components/blog"
import { useEffect, useState } from "react"
import fm from "front-matter"
import { useParams } from "react-router-dom"
import type {Post, Frontmatter} from "./blogs"

const markdownFiles = import.meta.glob('/src/blogs/*.md', { query: '?raw', import: 'default' });


export default function BlogPage(){

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
      setPosts(entries);
    };

    loadPosts();
  }, []);
  const {blogName} = useParams()
  const blog = posts.find(p => p.frontmatter.title === blogName)
  return(
    <main className="big-box">
    <Stars />
    <Navbar/>
    <div className="main-box">
      <Blog blog={blog}/>
    </div>
    <Footer />
    </main>
  )
}