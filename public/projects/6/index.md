# messing around with audio and Fourier
I've learned about Fourier transforms for the past ~3 years of studying, and every time I sit in class and solve the problems and solve for the fundamental frequencies and graph yet another rect/sinc function pair I do wonder; what is this even useful for? I get the concept, but why we never did any real-world signal processing in my signal processing class baffles me. So I took it into my own hands.

I've also always wanted to mess around with audio processing and never really understood what a spectrogram was (pictured below). Today we solve all these problems.

![](/projects/6/spectrogram.png)

The core concept to have going in is that every wave is made up of combinations of "pure" waves. The same way that colors can be mixed with different intensities and wavelengths, so can sound. Let's look at an example of this. I have below a 60Hz wave, and a 120Hz wave. 

<input type="text">Hello!</input>

The higher the frequency, the higher the pitch of the tone. You can see in the combined tone, the two waves add and subtract from each other; when they are both high, the combined tone is higher, and vice versa. Already with two tones we see some interesting behavior. If you stack two tones that are very close together, you get a "beat" effect. The best way to explain this is like car blinkers. You ever notice that every car seems to blink just out of sync with every other car, meaning sometimes it looks like they're blinking in sync, and sometimes on alternate timings? The same thing is happening with our waves. When they're in sync, they amplify each other, and when they're out of sync, they negate each other. This constant sync-and-unsync causes the sound to "beat".