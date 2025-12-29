/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState} from "react"
import Navbar from "../components/navbar"
import Stars from "../components/backgrounds"

export default function Contact(){
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [forminput, setForminput] = useState({ email: '', message: '' });
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
      setForminput(prev => ({
        ...prev,
        [name]: value,
      }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if(currentStep != totalSteps){
      handleNextStep()
      return
    }
    setCurrentStep(prevStep => prevStep + 1);
    console.log(forminput)
    sendInfo()
  };

  const sendInfo = async () => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxJuJ22vboON9uwByOqXOolTQMCDzmDnGZSRKmMMO-BppoEiXAP5tedBAy-xrvRM5ZeiQ/exec", {
      method: "POST",
      mode: "no-cors", // required for no-cors Google Script
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        ...forminput,
        sheetName: "Sheet1"
      }).toString(),
    });
    console.log(response)
  } catch (err) {
    console.error("Submission error", err);
  }
  }
  return(
    <>
    <Stars/>
    <main className="main-page">
    <Navbar />
    <div className="hl">--------------------------------</div>
    email me, let's yap
    <div className="contact">
      farisamer569@gmail.com
      <div className="contact-links">
        <a href="https://www.linkedin.com/in/fwamer/">&nbsp;linkedin</a>
        <a href="https://github.com/faris-amer">&nbsp;&nbsp;github</a>
        <a  href="https://www.last.fm/user/zedzed__">&nbsp;&nbsp;last.fm</a>
      </div>
      <div className="contact-links">
        <a href="https://www.instagram.com/faris_amerr/">&nbsp;&nbsp;&nbsp;instagram</a>
        <a href="https://letterboxd.com/farisamer/">&nbsp;&nbsp;&nbsp;&nbsp;letterboxd</a>
      </div>
      <form onSubmit={handleSubmit}>{currentStep == 1 && (
        
        <div className="formItem">
          <a onClick={handleNextStep}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;resume</a>
        </div>
      )}

      {currentStep == 2 && (
        <div className="formItem">
          <label htmlFor="email">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email:</label>
          <input type="email" id="email" name="email"  value={forminput.email} onChange={handleChange}/>
        </div>
      )}

      {currentStep == 3 && (
        <div className="formItem">
          <label htmlFor="message">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;why?:</label>
          <input id="message" name="message" value={forminput.message} onChange={handleChange} required></input>
          <input type="hidden" name="sheetName" value="Sheet1"></input>
        </div>
      )}
      {currentStep == 4 && (
        <div className="formItem greentext">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;requested!</div>
      )}
      </form >

    </div>
    </main>
    </>
  )
}