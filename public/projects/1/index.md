# physics - in java!

Before we start, why would anyone use java for this kinda of thing? I made this in my first year, where I had to take a java course. In studying for the course, I found the slides much too boring, and I decided to try to actually make something, and learn that way.

![](/projects/1/falling-balls1.gif)

I used verlet integration to calculate the movement of the balls, an O^1 algorithm to calculate collisions with the stage, then an O^2 algorithm to calculate collisions with the other balls. I had to create custom Vector and Ball classes, and used native java packages for drawing and timing.

If you want to see my code, you can look at the repository [here](https://github.com/faris-amer/CollisionSim) to view the full code. I'm pretty proud of myself for this one, I didn't follow any tutorials and just followed a few videos that covered collision detection conceptually, but never a full code rundown.


All the steps I followed to create the program, as well as a longer video of the full program running is below.

The first step I had to do was to create a stage, somewhere for the simulation to take place. For this, I just used basic java.awt methods and created a flat gray background and a white circle inside.

![](/projects/1/falling-balls2.png)

Next, I created a Ball object, drew it, and added gravity to it. Something's off though... It seems to be passing straight through.

![](/projects/1/falling-balls3-1.png) ![](/projects/1/falling-balls3.gif)

Now, we add some collision code that keeps the ball in the stage, that goes as follows:

![](/projects/1/falling-balls4-1.png) ![](/projects/1/falling-balls4.gif)

It works! (first try, of course). But the balls don't know that the other balls exist yet; let's fix that.

![](/projects/1/falling-balls6.gif) 

This is fine, but when you let it run for a while....

![](/projects/1/falling-balls7.gif)

This happens because when you let the simulation run with many objects on the screen, they all update at once, and get pushed into each other. The program renders another frame before making sure that there are no collision conflicts. We can fix this by allowing the simulation to run a few times in "sub-steps" before actually rendering. This is surprisingly easy to implement, and works like a charm!

![](/projects/1/falling-balls8.gif)

And that's it! Adding a few more lines of code to color the balls, make them different sizes, and spray them from the middle, we get a nice show of what the program is capable of.

<iframe width="720" height="480" src="https://www.youtube.com/embed/Jw-E-bbr2vM?si=AItiBMyrAdhFu88b&amp;" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

