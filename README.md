# Predix Hackathon 2018 - Adaptive Lighting

## App Description

Our application adjusts the dimming of the smart node street lamps implemented in Downtown San Diego based on its detection of nearby pedestrians. Implementation of this application will significantly reduce the wattage consumption of street lights downtown while still providing a well lit environment for those in the area, so as to not compromise their feelings of safety. The application senses whether or not a pedestrian is within its range. If a pedestrian is present, that street light (in addition to all street lights within 100 ft) will have 100% brightness, and street lights within 500 ft will turn to 60% brightness. If a node does not detect any pedestrians or is not near a node that detects pedestrians, its brightness will be adjusted to 10% - this allows enough light for potential cars driving through the streets, while still saving a significant portion of its energy.

## Demonstration

<img src="https://github.com/mgit7/SDSU-Predix-Hackathon/blob/master/giphy.gif" width="800" height="449" />

## How to run on your machine

### Install tools

If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine:

1. Install node
2. Install bower globally: `$ npm install bower -g`
3. Install gulp globally: `$ npm install gulp-cli -g`

### Clone this repo and install all the dependencies

Run the following commands

1. $ npm install
2. $ bower install

###### Base template and components obtained from predix
