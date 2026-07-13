# Making a robo-spider

Inspired by the rise of definitely-not-meant-for-killing-humans robotic dogs coming out of boston dynamics and similar companies, I've always been interested in how exactly one programs such a creature to move, walk, jump, etc. I understood the concept on a high level: find the equations to translate from body to foot positions, work backwards to find the motor rotations necessary and then program some sort of walking motion with the given equations. To get a better understanding however (and get ahead of my 4th year classes while I was still on internship) I decided to give it a go myself.

The first step was to get a high-level understanding of the motions necessary for the robot's legs. Instead of a typical "dog"-like leg with a spherical joint at the hip and a revolute at the knee, I decided to go with a slightly simpler spider-like leg with 3 revolute joints. This is both to simplify the hardware required (I can just use 3 cheapo servos per leg) and because I like the idea of a creepy crawly walk of a robot-spider making its way around obstacles.

I made a simple model just to see what the motion would look like, to help my mental image of the project moving forward:

![](/media/pictures/projects/7/firstmodel.png)

Happy with the result, I moved on to find a way to fit these bulky servo motors into these tiny joints. The idea is that each limb would have it's own servo, and each servo would connect to another limb. I also ditched the ball-jointed foot for now, to make tracking the tip of each leg a little easier.

![](/media/pictures/projects/7/spiderv1.png)

And so I ended up with this abomination. I didn't really trust the servos to carry themselves with that big of a moment arm on the thigh and shin, but I trusted in the mighty SG90s and started printing 2 sets of legs to test with. This spider, which I'll call V1, taught me 2 very important lessons when designing a robot like this. 


Lesson 1 was that these motors are strong for their size and budget, but not as strong as I thought they were. The legs worked fine on their own, but could barely carry their own weight midair and any jerky motions would send parts of the leg flying off the servo gears (I hadn't screwed anything in at this point since I didn't want to break something by accident, quick release kneecaps ftw)

Lesson 2 was: when possible, simplify the math. Doing the inverse kinematics for a 3 limbs where each limb was a 3d transform from the next ballooned the equations (which i'll get into in a sec) and generally made life difficult for debugging why the leg wasn't exactly tracking the coordinates I expected it to. I programmed a simple PD controller which interpolated bewteen positions given in (x,y,z) coordinates and made an IK solver which worked (sort of) well, given the circumstances. But I would keep getting strange offsets and error would compound between the difference between CAD and irl measurements, error in the cheapo servo angles, and general slop in the whole mechanism, especially in the bend of the pivot when it was placed on a surface.

To address these issues, I created spidey V2:

![](/media/pictures/projects/7/spiderv2.png)

I wanted to shrink the legs significantly and reduce the geometric complexity, but couldn't figure out how to do so with the current configuartion of servos. So I turned to the internet and looked at how some robots in the industry were designed for inspiration (after all, good engineers copy, great engineers steal!), and found something in common between all of them:

![](/media/pictures/projects/7/nomotor.png)

They almost always had the motors in the 1st and 3rd limbs, but never in the second. This allows for the geometry to become a lot simpler, because both of your motor attachment points, or your pivots, become co-planar, and you skip the 3-D transform between the second and third revolute joint.

To illustrate the simplification, here's a stripped-down skeleton model of v1 and v2, side-by-side.

![](/media/pictures/projects/7/skeletoncomparison.png)

The origin and endpoint are co-planar along the x-z axis, and both y-axis revolute joints are connected by a single line. This simplifies the leg geometry by a lot and allows us to skip some steps when calculating the forward and inverse kinematics of each leg.

When I printed them out and tested by poking and prodding and applying pressure in certain areas, I found that the pivot was still too flexible, and would bend when an upwards force was applied to the servo it was holding (force applied from the ground), and would shear due to the torque coming from the other limbs. So, I decided it was time to do some FEA (Fingertip Experimentation Analysis):

This made clear to me 2 areas which needed strengthening: the walls of the servo (they would shear when a torque was applied) and the arm where the servo gear attaches. Both of these can be strengthened at the same time if I add a rib to the part which goes along the length of the pivot. I didn't have success in making the "spike" actually hold onto the bottom of the servo unfortunately, so this will be our approach for now.




So, now with a slightly more functional leg, time to get it moving! The first thing I did was grab a copy of *Robot Modeling and Control, First Ed. by Mark W. Spong, Seth Hutchinson, and M. Vidyasagar* and read through the first 3 chapters, which I felt armed we well to tackle the challenge ahead. I noticed my robot's leg looked very similar to an example they called an "elbow manipulator", with the same 3-revolute joint setup i've got:

![](/media/pictures/projects/7/elbow.png)

Below is a copy of my own notes and microsoft paint doodles from solving this problem (I swear it's not chatGPT, I just like to write in LaTeX):


![](/media/pictures/projects/7/notes1.png)

![](/media/pictures/projects/7/notes2.png)

![](/media/pictures/projects/7/notes3.png)

![](/media/pictures/projects/7/notes4.png)

/// WORK IN PROGRESS ! it walks but i need to take proper videos of it, updates soonish maybe ///