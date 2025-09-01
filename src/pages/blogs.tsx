/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"
import { useEffect, useState } from "react"
import fm from "front-matter"

const markdownFiles = import.meta.glob('/src/blogs/*.md', { query: '?raw', import: 'default' });

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
  const [forminput, setForminput] = useState({email: ''});

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

  const postIndex = posts.map((x)=>(
    <a key={x.path} className="bloglink" href={"/chatter/"+x.frontmatter.title}>
      <div className="blogtitle">{x.frontmatter.title}</div>
      <div className="date">{x.frontmatter.date}</div>
      <div className="summary">{x.frontmatter.summary}</div>
    </a>
  ))
  const handleChange = (event: any) => {
    const { name, value } = event.target;
      setForminput(prev => ({
        ...prev,
        [name]: value,
      }));
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCurrentStep(currentStep+1)
    console.log(forminput)
    sendInfo()
  };

  const sendInfo = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxJuJ22vboON9uwByOqXOolTQMCDzmDnGZSRKmMMO-BppoEiXAP5tedBAy-xrvRM5ZeiQ/exec", {
      method: "POST",
      mode: "no-cors", // required for no-cors Google Script
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        ...forminput,
        sheetName: "Sheet2"
      }).toString(),
    });
    console.log(response)
  } catch (err) {
    console.error("Submission error", err);
  }
  }

  return (
    <>
    <Stars />
      <main className="big-box">
        <Navbar />
        <div className="main-box">
        <div className="subheader">/chatter/ - talk rapidly or incessantly about trivial matters.</div>
          {postIndex}
        </div>
        {currentStep ==1 &&
        <form onSubmit={handleSubmit}> 
          <div className="formItem">
            <label htmlFor="email">get notifications when I post stuff:</label>
            <input className ="mailinglist" type="email" id="email" name="email"  value={forminput.email} onChange={handleChange} placeholder="Your email"/>
          </div>
        </form>
        }{currentStep ==2 &&
          <div className="greentext">submitted!</div>
        }
        <Footer/>
      </main>
    </>
  )
}