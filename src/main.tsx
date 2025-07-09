
import { createRoot } from 'react-dom/client'
import './stylesheets/index.css'
import './stylesheets/projects.css'
import App from "./App"

const root = createRoot(document.getElementById('root')!)

root.render(
  <App />
)