# Self-balancing Pendulum in C++
I kept thinking about the really simple physics simulator I made earlier, and I really wanted to do more with it. Making a physics engine from scratch is really fun, I get to apply a lot of the dynamic math I learned in school and challenge my programming skills. 

At the same time, AI is taking over the world, and I've always wanted to mess around with reinforcement learning. The concept is really simple, but powerful, and can be applied in many places. 

Usually, machine learning projects are done in python due to its ease of use and widespread support, but I really wanted to strengthen my c++ skills and do as much from scratch as possible. I'll be using SFML for graphics, and LibTorch (pytorch for c++) for the reinforcement learning stack.
Before we get training, we need a simulator! So I used the same concepts from my previous project to create a playground we could mess around in. The main solver class can have multiple pendulums created (preparing for parallelization for training the AI), and each end of the pendulum goes into a vector of Particles. Each pendulum has two particles and a constraint between them, and we loop over all particles and constraints every simulation loop:

![](/projects/4/image1.png) ![](/projects/4/first.gif)

Our end goal is to have the AI be able to balance the pendulum perfectly upwards & directly in the center,  but for now, let's just focus on being able to balance it upwards. We have two knobs we can tune to make this easier or harder: the strength of gravity and the amount of air resistance (or friction) our pendulum sees. After a little bit of practice, I could balance the pendulum for a few seconds at a time, which was an acceptable difficulty level to begin with.

![](/projects/4/second.gif)

Before we integrate AI, I'll add two things to make our life easier: A score, and replay functionality. If the sim is in "save" mode, it will save the position of the pendulum's pivot every simulation loop. If it's in "replay" mode, it will play back those positions. Since our simulation is deterministic (exact same outputs every time for a set of given inputs) we don't need to save every single variable in the state, only the inputs we give to the simulation. This will also give our learning model an easier time parsing the sim data.
For reinforcement learning, you also need a scoring algorithm. For now, I'll use a stupid-simple scoring method, and improve if I need to in the future (I will probably need to). If the pendulum can keep an angle of +/- 30 degrees from the vertical for one second, the score goes up by one. Some visual flair later and we have our finished environment (for now):

![](/projects/4/3.gif) ![](/projects/4/4.gif)

More to this project coming soon!