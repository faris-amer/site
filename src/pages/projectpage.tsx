import { useParams } from "react-router-dom"
import Navbar from "../components/navbar"
import Project from "../components/project"
import Footer from "../components/footer"

import data from "../data.json"

export default function ProjectPage(){
  const {projectName} = useParams()
  const allProjects = Object.values(data.projects).flat()
  //console.log(allProjects)

  const project = allProjects.find(p => p.name === projectName)

  if (!project) return <div>Project not found</div>;

  return(
    <>
    <main className="big-box">
    <Navbar/>
    <div className="main-box">
      <Project project={project}/>
    </div>
    </main>
    <Footer />
    </>
  )
}