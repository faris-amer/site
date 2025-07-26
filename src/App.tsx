
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./pages/landing"
import Projects from "./pages/projects"
import ProjectPage from "./pages/projectpage"
import Contact from "./pages/contact"

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/:projectName" element={<ProjectPage/>} />
      </Routes>
    </Router>
  )
}