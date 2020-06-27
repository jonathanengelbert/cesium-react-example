import React, {useState} from "react";
import {Viewer, Cesium3DTileset} from "resium";
import {
    IonResource,
    Ion,
    MapboxStyleImageryProvider,
    Cartesian3,
    HeadingPitchRoll,
    Cesium3DTileStyle, Cartographic, Matrix4, createWorldTerrain
} from "cesium";

// @ts-ignore
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

// Position tileset
const positionTileset = (tileset: any) => {
    const heightOffset = -32;
    const boundingSphere = tileset.boundingSphere;
    const cartographic = Cartographic.fromCartesian(boundingSphere.center);
    const surfacePosition = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    const offsetPosition = Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    const translation = Cartesian3.subtract(offsetPosition, surfacePosition, new Cartesian3());
    tileset.modelMatrix = Matrix4.fromTranslation(translation);
}

/////////////////////////////////////////////////////////////////////////
// Loading Terrain
//////////////////////////////////////////////////////////////////////////

// Load Cesium World Terrain
function loadTerrain(viewer: any) {
    viewer.terrainProvider = createWorldTerrain({
        // requestWaterMask : true, // required for water effects
        // requestVertexNormals: true // required for terrain lighting
    });
    // Enable depth testing so things behind the terrain disappear.
    viewer.scene.globe.depthTestAgainstTerrain = true;
}

//////////////////////////////////////////////////////////////////////////
// Style 3D Tileset
//////////////////////////////////////////////////////////////////////////

// Define a white, opaque building style
const defaultStyle = new Cesium3DTileStyle({
    anchorLineEnabled: 'true',
    color: "color('white')",
    show: true
});


// Define a white, transparent building style
const transparentStyle = new Cesium3DTileStyle({
    color: "color('white', 0.3)",
    show: true
});


const hideStyle = new Cesium3DTileStyle({
    // color: "color('red')",
    show: false
});


// MAKE STYLES

// DEFINE INITIAL POSITION AND OVERRIDE HOME BUTTON COORDS
// Create an initial camera view
function makeHome(viewer: any) {
    const initialPosition = Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
    const initialOrientation = HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306)
    const homeCameraView = {
        destination: initialPosition,
        orientation: {
            heading: initialOrientation.heading,
            pitch: initialOrientation.pitch,
            roll: initialOrientation.roll
        }
    };
    // Set the initial view
    viewer.scene.camera.setView(homeCameraView);
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e: any) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    })
}


//  BASEMAP CONFIG
function initializeMapboxBasemap(viewer: any) {
    const mapboxCustomBasemap = new MapboxStyleImageryProvider({
        styleId: 'dark-v10',
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN
    });
    // Remove default base layer
    if (viewer) {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
        viewer.imageryLayers.addImageryProvider(mapboxCustomBasemap)
    }
}

// LAYER STYLING


const App = () => {
    const [layers, setLayer] = useState<any>(null);
    let viewer: any; // This will be raw Cesium's Viewer object.
    const handleReady = (tileset: any) => {
        console.log(tileset);
        tileset.style = transparentStyle;
        // if (viewer) {
        initializeMapboxBasemap(viewer);
        makeHome(viewer);
        loadTerrain(viewer);
        positionTileset(tileset)
        // }
    };


    return (
        <Viewer
            full
            onClick={() => console.log(viewer)}
            ref={e => {
                viewer = e && e.cesiumElement;
            }}>
            {/*floors*/}
            <Cesium3DTileset url={IonResource.fromAssetId(78267, )} onReady={handleReady}/>
            {/*contextuals*/}
            <Cesium3DTileset url={IonResource.fromAssetId(76644)} onReady={handleReady} show={false}/>
        </Viewer>
    );
};

export default App;
