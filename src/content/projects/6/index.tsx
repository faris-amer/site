import { Howl } from "howler";
import { useState } from "react";

let playing = false 

// Create a Howl with sprite definitions
const sound = new Howl({
  src: ["/media/sounds/60hz.wav"],  // your big audio file
  sprite: {
        intro: [0, 1000],
        click: [1000, 1500],
        outro: [1500, 100],
      },
});

const playSound = (clip:string) =>{
    if(playing == false){
      playing=true
      sound.play(clip)
    } else{
      playing=false
      sound.stop()
    }
}

sound.on('end', function(){
  console.log('Finished!');
  playing=false
});

export default function project() {
  console.log("Hello!")
  return (
    <div className="project-container">
    <h1>
      A few experiements with sound
    </h1>
    <p>
      I've learned about Fourier transforms for the past ~3 years of studying, and every time I sit in class and solve the 
      problems and solve for the fundamental frequencies and graph yet another rect/sinc function pair I do wonder; what is this even useful for? 
      I get the concept, but why we never did any real-world signal processing in my signal processing class baffles me. So I took it into my own hands.
      <br/>
      <br/>
      I've also always wanted to mess around with audio processing and never really understood what a spectrogram was (pictured below). 
      Today we solve all these problems.
    </p>
      <img src="/src/content/projects/6/spectrogram.png"/>
    <h2>defining sound</h2>
    <p>
      Physically, sound is the oscillation of pressure waves through the air or another medium. These pressure waves bounce off things and hit your ears, which act as pickups,
      transferring the sound into your brain. That's a fine definition, but not very useful if we want to twist and turn sound to our liking.
      <br/>
      <br/>
      All sound can be described as a 'wave'. Like how waves travel through a still pond when you drop a rock in it, sound waves travel through the air in 3 dimensions. 
      A simplifaction of this is a 1-D wave. "pure" waves can be described with sinusoids (fancy wave graphs). These waves are entirely controlled by two factors - frequency 
      (how fast the wave oscillates) and amplitude (how loud it is). 
      <br/>
      <br/>
      I have below a 60Hz wave, and a 120Hz wave. 
    </p>
      <img className="project-image" src="/src/content/projects/6/60hz.png"/>
      <img src="/src/content/projects/6/240hz.png"/>
    <p>
      The higher the frequency, the higher the pitch of the tone. You can see in the combined tone, the two waves add and subtract from each other; when they are both high, 
      the combined tone is higher, and vice versa. Already with two tones we see some interesting behavior. If you stack two tones that are very close together, you get a 
      "beat" effect. The best way to explain this is like car blinkers. You ever notice that every car seems to blink just out of sync with every other car, meaning sometimes 
      it looks like they're blinking in sync, and sometimes on alternate timings? The same thing is happening with our waves. When they're in sync, they amplify each other, 
      and when they're out of sync, they negate each other. This constant sync-and-unsync causes the sound to "beat".
    </p>

    <div onClick={()=>playSound("click")}>
      Hello!
    </div>
    </div>
  );
}