
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from "./pages/landing"
import Projects from "./pages/projects"
import ProjectPage from "./pages/projectpage"
import Contact from "./pages/contact"
import Blogs from "./pages/blogs"
import BlogPage from "./pages/blogpage"
import Media from "./pages/media"

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/projects/:projectName" element={<ProjectPage/>} />
        <Route path="/chatter/" element={<Blogs/>} />
        <Route path="/chatter/:blogName" element={<BlogPage/>} />
        <Route path="/media" element={<Media/>} />
      </Routes>
    </Router>
  )
}