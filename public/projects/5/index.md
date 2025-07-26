# WFR25 Distributed ECU
The ECU (Engine/Electrical Control Unit) is at the heart of every vehicle, and serves as the brains of the car. It interfaces with all the devices on the car, and keeps track of the car's state, making sure we only go when we're ready - and safe! - to go. We take advantage of the versatility of our design and reduce design complexity by using two ECUs, one at the front of the car, and one at the rear, that run identical hardware and firmware, and work in tandem with each other. This is done to reduce the amount of wires going through the car, any signals that need to cross the rear-front boundary can go over CAN, which makes debugging incredibly simple.
## Hardware
This was our second year making a custom ECU, and with the lessons learned from last year, I had some idea of what I wanted to create. The board had to be versatile, reliable, and have enough expandability for us to use again in future years without having to do a board revision.

The board had to:
- be powered by 24V
- have switched 24V drivers
- Have 5v IO
- Be able to support up to 16 sensors through an external ADC
- Have multiple CAN connections
- Have Wi-fi compatibility for wireless debugging
- A real-time clock & SD card for data logging
- Able to log accelerometer data in real-time
- Be easily debuggable, accessible, and weatherproof
- Fit within a tiny footprint due to limited space for mounting

Quite a task, but I was excited to give it a shot, as it was the most complex board I'd designed to date. 

To start with, I chose the MCU: an ESP32-S3 module. 
![](/projects/5/image0.png)

Most teams that do custom ECU use STM32 chips, which have become somewhat of an industry standard, but I chose to stay away for a few reasons: the ESP32 module is incredibly easy to design for, as everything you need is setup inside the package. No external clocks, no external USB peripheral, no need for external flash memory or SRAM, it's all built into the package. Additionally, developing with esp-idf, Espressif's version of [FreeRTOS](https://www.freertos.org/Why-FreeRTOS/What-is-FreeRTOS), is a breeze. The documentation is incredibly well-written, in contrast to STM's lackluster HAL, and anyone who's been exposed to a little bit of Arduino can get the gist pretty easily. No special IDE required, you can write and compile your project all in VS Code by using [PlatformIO](https://platformio.org/), and debugging doesn't need any special hardware - a USB cable is enough. Need I go on? The ESP32 is great, especially for projects like this, where you need to do a lot and be flexible, with very little time to do it. I could go on and on about how much better of a choice this was, but I digress.

After doing my research and selecting a connector and supporting ICs, I got to work making the schematic. I learned from working with dev board from brands like Adafruit that having the board be interactive and configurable is extremely important, so I added a test button, a jumper for CAN termination, 4 jumpers for strapping pin configuration and configuring rear vs. front ECU, ability to flash via the built-in USB peripheral but also via a UART bridge, and more that made developing with this board extremely intuitive and easy.

Below is the finished version:
Inputs + Outputs:

![](/projects/5/image1.png)

MCU:

![](/projects/5/image2.png)

Various ICs:

![](/projects/5/image3.png)

Power in + out:

![](/projects/5/image4.png)

Analog filtering + buffering:

![](/projects/5/image5.png)

PCB layout (without ground/power planes):

![](/projects/5/image6.png)

And the finished product (I swear I'll take better photos in the future):

![](/projects/5/image7.png)
![](/projects/5/image8.png)

## Software
Once we had the boards in, it was time to start writing software for it. The general architecture is a state machine, where the front ECU handles sensor input, throttle control, and state machine control, and the rear ECU handles data logging, light control, rear sensor input, and cooling control. The software is identical, but a jumper on the ECU board controls whether the ECU is rear or front, and the software acts accordingly. All data is stored on the on-board SD card, which logs every CAN message as well as all sensor data to later be uploaded to our data acquisition database.