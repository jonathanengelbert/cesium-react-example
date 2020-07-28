# Cesium React Example

An example of Cesium integrated with React and Typescript to create a 3D map of buildings split into floors.

## Table of Contents

* [Live Demo](#live-demo)
* [Installation](#installation)
* [What is the project for?](#what-is-the-project-for)
* [Technologies](#technologies)
* [Contributing](#contributing)
* [Authors](#authors)
* [License](#license)

## Live Demo

<https://3d-mapping-example.jonathanengelbert.com/> 


### Installation

`$ git clone https://github.com/jonathanengelbert/cesium-react-example.git`
<br>
`$ cd cesium-react-example && npm install`
<br>

Make a .env that takes two variables:
<br>
<br>
REACT_APP_CESIUM_TOKEN:  You will need to register with [Cesium](https://cesium.com/) to retrieve assets from their cloud.
<br>
REACT_APP_MAPBOX_TOKEN:  You will need to register with [Mapbox](https://mapbox.com) and request a key for your app. This is not necessary if using the Cesium-provided base maps, but be aware that the initial basemap loaded by default in this app example will request a mapbox basemap.  

`$ npm start`

### What is the project for?

The goal of this project is to serve as a template for general 3D mapping that focuses on the handling of granular building data, such as building floors 
and/or building spaces (floors further split into suites)
<br>
<br>
The project may however, simply serve as a starting point or model for what porting Cesium to a React app is like, regardless of the context. 

### Technologies 

* Typescript ^3.7.5 
* React ^16.13.1
* Material UI ^4.9.11
* Mapbox GL ^1.9.0 
* Node-Sass ^4.13.1
* Cesium ^1.70.1
* Craco ^5.6.4

And sub-dependencies of these modules

### Word of caution

Cesium works poorly with react. At the time of this writing, its NPM package was still badly built and did not work without some further webpack/bundle manager configuration. This project uses [CRACO](https://github.com/gsoft-inc/craco) and [CRACO-CESIUM](https://www.npmjs.com/package/craco-cesium) to handle these issues, but frankly, it's a bit of a hack.
<br>
<br>

Overall performance issues and a bizarre bug where the client freezes when another tab is focused (difficult to replicate and still being investigated) are some of the reasons why I would caution anyone to carefully examine this code before using it in production, particularly its dependencies to CRACO/CRACO-CESIUM.

### Contributing

There are currently no set guidelines on how to contribute to this project, but contributions are welcome.
Please reach out to the author of this project directly at <jonathanengelbert@gmail.com>

### Authors

* Jonathan Engelbert

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
