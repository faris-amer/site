/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function Project(props: any) {

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    if (props.project.id) {
      fetch("/projects/"+props.project.id+"/index.md")
        .then((res) => res.text())
        .then(setMarkdown)
        .catch(() => setMarkdown("Could not load markdown file."));
    }
  }, [props.project.id]);

  console.log(markdown)
  return(
    <div className="project-container">
    <Markdown rehypePlugins={[rehypeRaw]}>{markdown}</Markdown>
    </div>
  )
}