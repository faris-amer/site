import { useParams } from "react-router-dom"
import Navbar from "../components/navbar"
import Project from "../components/project"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"

import data from "../data.json"

export default function ProjectPage(){
  const {projectName} = useParams()
  const allProjects = Object.values(data.projects).flat()
  const project = allProjects.find(p => p.name === projectName)

  if (!project) return <div>Project not found</div>;

  return(
    <>
    <Stars/>
    <main className="big-box">
    <Navbar/>
    <div className="main-box">
      <Project project={project}/>
    </div>
    <Footer />
    </main>
    </>
  )
}