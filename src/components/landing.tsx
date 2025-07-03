export default function Title(){
  
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
      <a href="https://www.farisamer.com">www.farisamer.com</a>
      <div className="main-box">
        <div className="sidebar">
          <div className="top">
            <a href="#">projects</a>
            <a href="#">chatter</a>
            <a href="#">professional</a>
          </div>
          <div className="bottom">
            <a href="https://typeintothevoid.com/">contact</a>
          </div>
        </div>
        <div className="vl"></div>
        <div className="box-contents">
          <div className="ascii">
            {ascii}
          </div>
          <div className="hl"></div>
          <div className="main-text">
          I'm faris, I like to make things. 
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          //////////////// UNDER CONSTRUCTION //////////////////////////////
          </div>
        </div>
      </div>
    </main>
  )
}