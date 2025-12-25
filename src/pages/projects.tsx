/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from "../components/navbar"
import data from "../data.json"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"
import {useState } from "react"
import NotificationForm from "../components/notificationform";

export default function Projects(){
  const elements = []
  const [currentStep, setCurrentStep] = useState(1);

  for (const [category, projects] of Object.entries(data.projects)) {
    elements.push(
      <div className="category" key={category}>
        <h2>{category}</h2>
        <div className="hl"></div>
        <div className="projects-container">
          {projects.slice().reverse().map((project: any) => (
            <div key={project.id} className="projectEntry">
              <a href={"/projects/" + project.name}>
                <div className="project-image"><img src={project.icon}/></div>
                <div className="project-name">{project.name}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <>
    <Stars />
      <main className="big-box">
        <Navbar />
        <div className="main-box">
          {elements}
        </div>
        {currentStep === 1 && (<NotificationForm onSubmitSuccess={() => setCurrentStep(2)} />)}
        {currentStep === 2 && (<div className="greentext">submitted!</div>)}
        <Footer/>
      </main>
    </>
  )
}