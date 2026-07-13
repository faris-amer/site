import { Howl } from "howler";

let playing = false 

// Create a Howl with sprite definitions
const sound = new Howl({
  src: ["/media/sounds/all-audio.wav"],  // your big audio file
  sprite: {
        f60:          [0, 5000],
        f240:         [5000, 5000],
        f60240:       [10000, 5000],
        beat:         [15000, 5000],
        square:       [20000, 5000],
        upsweep:      [25000, 5000],
        crossweep:    [30000,5000],
        B5:           [35000, 5000],
        B26:          [40000, 3500],
        Bcustom:      [43800, 2000],
        Bcsweep:      [45800, 3000],
        bpcustom:     [48800,9473],
        bp:           [58270,9458],
        hihat:        [67734,115],
        hihat1:       [67849,461],
        hihat10:      [68311,461],
        hihat1000:    [68772,461],
        hihat10000:   [69234,461],
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
    <img src="/media/pictures/projects/icons/spectrogram.png"/>
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
      <br/>
      You can click/tap on any image with a <span style={{color: "rgba(0, 84, 209, 1)"}}>blue</span> border to listen to it. Click again to stop! 
      If you don't have headphones on or decent speakers, you won't be able to hear the lower frequencies ~60-512Hz.
    </p>
    <img src="/media/pictures/projects/6/60hz.png" className="clickable-image" onClick={()=>playSound("f60")}/>
    <img src="/media/pictures/projects/6/240hz.png" className="clickable-image" onClick={()=>playSound("f240")}/>
    <img src="/media/pictures/projects/6/60+240hz.png" className="clickable-image" onClick={()=>playSound("f60240")}/>
    <p>
      The higher the frequency, the higher the pitch of the tone. You can see in the combined tone, the two waves add and subtract from each other; when they are both high, 
      the combined tone is higher, and vice versa. Already with two tones we see some interesting behavior. If you stack two tones that are very close together, you get a 
      "beat" effect. The best way to explain this is like car blinkers. You ever notice that every car seems to blink just out of sync with every other car, meaning sometimes 
      it looks like they're blinking in sync, and sometimes on alternate timings? The same thing is happening with our waves. When they're in sync, they amplify each other, 
      and when they're out of sync, they negate each other. This constant sync-and-unsync causes the sound to "beat".
    </p>
    <img src="/media/pictures/projects/6/beat.png" className="clickable-image" onClick={()=>playSound("beat")}/>
    <p>
      We can also experiment by generating non-sinusoidal wave shapes. Here's a square wave for example: (warning, it's loud!)
    </p>
    <img src="/media/pictures/projects/6/square.png" className="clickable-image" onClick={()=>playSound("square")}/>
    <p>
    Now while this is a 60Hz square wave, in reality - it's a combination of many, many frequencies, with the **fundamental** 
    frequency being at 60hz. This'll make sense later, but for now just keep that in mind. Let's go back to our example with 
    the two waves - if we were just given the output wave and we had no idea what frequencies (or how many) were added to get 
    there, how can we find that out? The answer is the Fourier transform - a way for us to, instead of looking at the position 
    of the wave over time, lets us look at all the frequency components of the wave.
    So you can think of each frequency as having it's own amplitude (how relatively 'loud' this frequency is compared to the others)
    and *phase angle*, or how far left/right we move the wave (because not every wave starts at 0). For now, we can ignore the phase angle, and 
    just graph the magnitudes. Let's look at our first example:
    </p>
    <img src="/media/pictures/projects/6/fourier1.png"/>
    <p>
      One spike at 60Hz and one at 240, at equal magnitudes - exactly what we expected! Now what about that square wave?
    </p>
    <img src="/media/pictures/projects/6/fourier2.png"/>
    <p>
      Here we see some interesting math - notice how the main frequency starts at 60, and then every other frequency 
      that's a multiple of 60? and notice how they all go down as multiples of pi? if the fundemental is at 1, then the 
      next is at 1/3, 1/5, etc etc.
      <br/>
      <br/>
      What does this look like in the time domain? well:
    </p>
    <img src="/media/pictures/projects/6/square-decon.png"/>
    <p>
      Now that we have an intuition for waves and adding them together, let's look at a another useful tool we can use to our advantage - 
      the spectrogram. A waveform graph (The graphs i've been showing you so far) show you the amplitude (loudness) of a signal over time, 
      a spectrogram is a graph that correlates frequency, amplitude, and time. You can kind of infer changes in frequency using a 
      waveform, but it's hard to tell exactly what frequencies are involved, especially when you have multiple overlapping frequencies. 
      For example, here's a frequency sweep tone - moving from one frequency to another, can you guess the minimum and maximum frequencies? 
    </p>
    <img src="/media/pictures/projects/6/upsweep.png" className="clickable-image" onClick={()=>playSound("upsweep")}/>
    <p>(it's 128 and 512 Hz)</p>
    <p>
      As you can see, the spectrogram is much easier to read, especially for longer audio clips. The scale is logarithmic because generally
      differences in lower frequencies tend to be more audible than changes in higher frequencies, and it makes it easier to visualise. Our 
      baseline is the "loudest" frequency at 0dB, and then the colors go down the quieter the other frequencies are. Another note about the spectrogram: 
      in reality (in this case), we have a single frequency, but due to the way computers work, we see some noise in the spectrogram stretching 
      below and above our single frequency at lower amplitudes. You can ignore these for now. So, we have the spectrogram now, let's try a few examples:
    </p>
    <img src="/media/pictures/projects/6/crossweep.png"className="clickable-image" onClick={()=>playSound("crossweep")}/>
    <img src="/media/pictures/projects/6/B5.png" className="clickable-image" onClick={()=>playSound("B5")}/>

    <p>The first example is (as you can probably see) just two frequency sweeps, starting at different points and increasing/decreasing as 
      the clip plays. Below that, you can see a B5 note from a piano. The piano is synthetic (some random MIDI piano I found online), but 
      this gets me started on the next thing I wondered: what makes a note a note? How can a piano, a guitar, and a flute all play the same 
      note, and sound completely different?</p>
    <h2>learning music theory by looking at the waves</h2>
    <p>After a quick google, I found out that the musical alphabet consists of 7 letters: A, B, C, D, E, F, and G. <br/>
        There are 12 notes that repeat across any musical instrument: A, A#/B♭, B, C, C#/D♭, D, D#/E♭, E, F, F#/G♭, 
        G, G#/A♭, where # denotes "sharp" and ♭ means "flat".
        What makes the notes unique? and how can you have an A be higher or lower pitch, but still be an A?
        The main thing that makes a note unique is its *fundemental frequency*, or the frequency that's the highest 
        amplitude in that note. You'll notice in the B5 example above, the "brightest" frequency is ~987 Hz, which 
        is the fundemental frequency for a B5 note. From there, multiples of the fundemental frequency (1974Hz, 3948Hz, ...) exist at lower amplitudes all the way up the audible range.</p>
    <img src="/media/pictures/projects/6/B2-6.png" className="clickable-image" onClick={()=>playSound("B26")}/>
    <p>
      now what if we try to make our own instrument with the tools we have? i'll create a 'main' frequency, and quieter frequencies at the same intervals as a regular note,
      then add a little "decay" so it sounds like a note being struck then fading away with time:
    </p>
    <img src="/media/pictures/projects/6/B5-custom.png" className="clickable-image" onClick={()=>playSound("Bcustom")}/>
    <p>
      now listen to both, side by side:
    </p>
    <img src="/media/pictures/projects/6/B2-6-custom.png" className="clickable-image" onClick={()=>playSound("Bcsweep")}/>
    <img src="/media/pictures/projects/6/B2-6.png" className="clickable-image" onClick={()=>playSound("B26")}/>
    <p>
      NEAT! Let's try to play a short melody with some chords now:
    </p>
    <img src="/media/pictures/projects/6/blackparade-custom.png" className="clickable-image" onClick={()=>playSound("bpcustom")}/>
    <img src="/media/pictures/projects/6/blackparade.png" className="clickable-image" onClick={()=>playSound("bp")}/>

    <h2>just like lego</h2>
    <p>
      I wanted a better idea about how the different 'components' of a sound really affect it, because my piano notes sounded a lot different to the 'real' piano notes.
      If we took apart a sound and slowly built it back up, at what point does it become recognizeable? how much of an effect do the smaller frequencies have to play in the sound?
      <br/>
      <br/>
      I'm going to start with a hi-hat, and run a fourier transform over the sound clip to find the power spectrum:
    </p>
    <img src="/media/pictures/projects/6/hihat.png" className="clickable-image" onClick={()=>playSound("hihat")}/>
    <p>
      and then I'll build it back up, starting with the first frequency: (warning it's loud!)
    </p>
    <img src="/media/pictures/projects/6/hihat1.png" className="clickable-image" onClick={()=>playSound("hihat1")}/>
    <p>
      and then build up to 10:
    </p>
    <img src="/media/pictures/projects/6/hihat10.png" className="clickable-image" onClick={()=>playSound("hihat10")}/>
    <p>
      and then 1,000:
    </p>
    <img src="/media/pictures/projects/6/hihat1000.png" className="clickable-image" onClick={()=>playSound("hihat1000")}/>
    <p>
      and then 10,000 we get an almost perfect recreation of the original sound:
    </p>
    <img src="/media/pictures/projects/6/hihat10000.png" className="clickable-image" onClick={()=>playSound("hihat10000")}/>
    <p>
      an interesting thing that's happening here is as we add frequencies, our sound actually gets quieter due to subtractive interference;
      it's cool that the most important parts of a sound are the frequencies that "carve" away the rest and allow for quiet  periods in the audio.
    </p>
    <p>
      anyways, that's all! There's so so so much I didn't even come close to when it comes to synthesizers and making realistic-sounding instruments or 
      creative sounds, but I was just messing around with sound and thought it was a pretty interesting application of math i'd been learning.
    </p>
    </div>
  );
}