import Navbar from "../components/navbar"
import Stars from "../components/backgrounds"

export default function Landing(){
  
  const ascii = `        ~+

                 *       +
           '                  |
       ()    .-.,="\`\`"=.    - o -
             '=/_       \\     |
          *   |  '=._    |
               \\     \`=./\`,        '
            .   '=.__.=' \`='      *
   +                         +
        O      *        '       .
`
  
  return(
    <main className="main-page">
      <Stars />
      <Navbar />
      <div className="main-box">
        <div className="sidebar">
          <div className="top">
            <a href="/projects">projects</a>
            <a href="/chatter">chatter</a>
            <a href="/media">media</a>
          </div>
          <div className="bottom">
            <a href="/contact">contact</a>
          </div>
        </div>
        <div className="vl"></div>
        <div className="box-contents">
          <div className="ascii">
            {ascii}
          </div>
          <div className="hl"></div>
          <div className="main-text">
          I'm faris, I like to make things, and talk about whatever's on my mind.
          <br/> 
          <br/> 
          the site is very much under construction, but feel free to look around in the meantime.
          <br/> 
          <br/> 

          Welcome to my space.
          <br/> 
          <br/>
          </div>
        </div>
      </div>
      <div className="main-spacer">
        
      </div>
    </main>
  )
}