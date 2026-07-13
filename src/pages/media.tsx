import Navbar from "../components/navbar"
import Footer from "../components/footer"
import Stars from "../components/backgrounds"

export default function Media(){

  const media = [
    {
      title: "Slugs ★",
      link: "https://youtu.be/wYrNjPGgAAA"
    },
    {
      title: "Cigarette Aesthetica",
      link: "https://youtu.be/hFRhcix3K6A"
    },
    {
      title: "You're way more interesting than you think you are",
      link: "https://youtu.be/kZN9vysQnhc"
    },
    {
      title: "Coreys",
      link:"https://youtu.be/_2nzkiOaeqE"
    },
    {
      title: "be your own algorithm",
      link: "https://youtu.be/Bdj14_jdumI"
    },
    {
      title: "[BOFU2015] Credits [BGA]",
      link: "https://youtu.be/EOTAWLaDa58"
    },
    {
      title: "A rant on personal engineering projects ★",
      link: "https://youtu.be/4jgTCayWlwc"
    },
    {
      title: "\"How do I deal with burnout?\"",
      link:"https://youtu.be/-dwTpAU3Gdc"
    },
    {
      title: "man drives around in a porsche giving engineering career advice ★",
      link: "https://youtu.be/2EYUKW2o-5Q"
    },
    {
      title: "Wire",
      link: "https://youtu.be/kGj_HkKhhSE"
    },
    {
      title: "Being Able to Talk",
      link: "https://youtu.be/g_XfjW5UFe4"
    },
    {
      title: "Grinch's ultimatum ★",
      link: "https://youtu.be/BuKft9LpL_0"
    },
    {
      title: "If Not Today, Then Tomorrow",
      link: "https://youtu.be/1dxaiQMK5mI"
    },
    {
      title: "playstation jungle mix 01",
      link: "https://youtu.be/Do5_wU9X1pc"
    },
    {
      title: "Gell-Mann Amnesia and Michio Kaku",
      link: "https://youtu.be/wBBnfu8N_J0"
    },
    {
      title: "Beautiful World",
      link: "https://youtu.be/uR0dnQFsQHg"
    },
    {
      title: "hh20250607 9 10 ESI4000",
      link: "https://youtu.be/5azMciojDfY"
    },
  ]

  const mediaIndex = media.map((x)=>(
  <a key={x.title} className="bloglink" href={x.link}>
    <div className="mediatitle">{x.title}</div>
  </a>
  ))

  return(
    <>
      <Stars />
      <main className="big-box">
        <Navbar/>
          <div className="main-box">
            <div className="subheader">
              here's some media I like.
            </div>
            {mediaIndex}
          </div>
        <Footer />
      </main>
    </>
  )
}