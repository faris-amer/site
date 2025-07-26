# Self-balancing Pendulum in C++ (or so I thought)
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

--- 3 days later ---

Okay, some major changes happened.  I was super excited, had my super-optimized program ready to go, I was confident in my C++ skill and how breezy everything had been so far... but I was in for a hell of a weekend. \[rant incoming]
I had always heard horror stories about C++ and trying to develop anything in it, but I have never experienced anything like trying to set up Libtorch to work in C++. Not only is it a C++ wrapper for python, so almost everything is python-y, but just getting it to compile was a nightmare. For one, I had to switch my compiler from MinGW to MSVC (i hate visual studio with a burning passion), mess around with my cmake file for a few hours at a time, hunting down red squigglies as they appeared. Finally I had gotten the library to link and build, but my .exe was crashing immediately on startup with no warning at all. Installing process monitor and setting up a few debuggers later, I found out I was missing .dll files.... that were in the directory next door the whole time. So just getting my environment setup without having to rewrite everything so far was enough of a hassle, but when it came time to implement the idea I had, I was honestly better off writing everything from scratch (foreshadowing!). Having never worked with pytorch, I had to convert all the tutorials and online resources I found into c++ and hope everything worked fine (it didn't). 3 days later, I found I wasn't making any progress, and it felt like the environment I was in was actively hostile towards anything I tried. Could I have spent another week and probably made it work? Maybe. But eventually I had std::unique_ptr<>'d my last std::unique_ptr<>, and decided I'd had enough. *Time to join the dark side.*

![](/projects/4/image10.png)

Not much has changed, right... except what's that little icon in the corner? I don't remember seeing that before...
and what's this in the taskbar?

![](/projects/4/image2.png)

I rewrote it all from scratch. In python!
Which was actually much easier, and to be honest probably what I should have done as soon as I knew I wanted to do anything ML related. I used the lessons learned from last time, and the code is also much cleaner this time around. Overall took me less than a day to get back to the point we were at before!
Now, for the training strategy, I want this to be as simple as possible really. No fancy deep-Q learning or backpropagation or gradient descent, instead I'll be implementing a simple evolution algorithm.

The problem we're solving has a solution, a function F(x,y,z, ... ) that takes in some information about the environment, and outputs an instruction: moving the pendulum some distance in some direction. We create a base for this function (a network) that can turn many inputs into one output:

![](/projects/4/image3.png) Each input gets a bias added to it, multiplied by some weight, and then an 'activation function' to introduce nonlinearity (you can think of it as adding a 3rd dimension of operations beyond multiplication and addition).

Now this is the simplest form of it, and the form I will be starting with. The way our program "learns" is we fully randomize the weights and biases, throw it at the problem a zillion times, take the best-performing few, randomize only *some* things, and try again. The idea is kind of like simulated natural selection, where the best models live on and get to reproduce, with the chance of making better (or worse) models in the future.

Running the initial model on 10 "agents", we see...

![](/projects/4/5.gif)

They're pretty dumb to start off with, so we need a lot more to get anywhere.
Running them so the transparency stacks takes a lot more processing to do, so I'll get rid of that for the sake of framerate. 
Of course, with a success rate this low, we'll need to run a LOT before we see anything useful. Running 1000 pendulums, each cycle takes about 0.2 seconds to run, which lands us at a smooth 5 fps. You'd think that getting rid of the visuals completely would speed things up, but running simple profiling by seeing how long each step takes we see that is not the case.
```
Time to simulate: 197 ms
  Time to get action from neural network: 187 ms
  Time to solve physics: 10 ms
Time to render: 12 ms
```

So far I've been running everything on my CPU, and you'd think that switching over to the GPU would make this process much faster; but the contrary is true. GPUs excel at large, parallel processing, but in a system like this with so few neurons and solving the system multiple times per second, it's much faster to instead solve on the CPU.
After a few iterations, we see some progress! You can see the pendulums trying to maximize their score using a scoring algorithm I had to tweak a little bit from our original.

![](/projects/4/6.gif)

And a few more runs later:

![](/projects/4/7.gif)

--- another 5 days pass ---

After much tinkering and messing around with Pytorch, I found that it wasn't the solution for me. I wanted to use many small, simple neural networks and be able to mutate and create new neurons/connections easily, and the overhead of the library was causing my simulations to run very slow. I also couldn't manage to make the model balance properly, so I took to the internet to do some research, and came across [this paper](https://www.cs.swarthmore.edu/~meeden/cs81/s14/papers/AwjinCaleb.pdf) from 2014 solving the same issue I was trying to solve! With some inspiration from the paper, I sought to create my own neural network that I could use for this task. One day later, and I had the first working prototype. I had made it compatible with most of the rest of my code, so I didn't have to change much to see immediate progress. An unexpected advantage of making a custom network was that it was much faster as well, at the same 100 pendulums:
```
Time to simulate: 24 ms
  Time to get action from network: 16 ms
  Time to solve physics: 8 ms
Time to render: 19 ms
``` 

Messing around with the algorithms for scoring and genetic selection/mutation, I landed on the following:
Scoring: Whenever a pendulum is "up" (at some angle from the vertical), start a timer. If the pendulum manages to stay up for half a second, then a score gets added that increases quadratically with how long the pendulum is balanced, and incentivizes staying near the middle.
Evolution: This one took a lot of trial and error, but mostly follows the paper linked above. At the end of each round, the top 20% of pendulums are directly carried over to the next round. The other 80% are created by randomly selecting from the previous round, including the top 20%, then mutating them in one way or another. Mutations include changing a weight, changing a bias, adding a hidden layer, adding a neuron to a random hidden layer, and creating or deleting a connection between any two neurons.

![](/projects/4/8.gif)

The final working model had 13 total neurons, with 30 connections between them, and got to a point where I was happy with the progress I'd made.  It got up pretty fast, and managed to stay there for the rest of the 100 second interval I was testing for. 

A lot of improvements could be made, like better training algorithms, balancing closer to the middle, and testing responsiveness to an external force (does it stay balanced if we push it?). Or we could take this to the next level, and try to balance a double pendulum, which is a *much* more unstable system. I'm taking a break from this project for now as I'm happy with where I got, especially with where I started.

Thanks for reading!