import React from "react";
import {Viewer, Cesium3DTileset} from "resium";
import { IonResource, Ion } from "cesium";
import {styles} from './utils/featureStyles';
import {
    makeHome,
    initializeMapboxBasemap,
    loadTerrain,
    positionTileset
} from "./utils/viewConfig";

import './App.scss';

// @ts-ignore
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

const App = () => {
    let viewer: any; // This will be raw Cesium's Viewer object.
    const handleReady = (tileset: any) => {
        tileset.style = styles.transparentStyle;
        initializeMapboxBasemap(viewer);
        makeHome(viewer);
        loadTerrain(viewer);
        positionTileset(tileset)
    };

    function changeStyle(viewer: any) {
        const floors = viewer.scene.primitives.get(0)
        floors.style = styles.defaultStyle;
    }

    return (
        <div>
            <button className={'test-button'} onClick={() => changeStyle(viewer)}>CHANGE STYLE</button>
            <Viewer
                full
                onClick={() => console.log(viewer.scene.primitives)}
                ref={e => {
                    viewer = e && e.cesiumElement;
                }}>
                {/*floors*/}
                <Cesium3DTileset url={IonResource.fromAssetId(78267,)} onReady={handleReady}/>
                {/*contextuals*/}
                <Cesium3DTileset url={IonResource.fromAssetId(76644)} onReady={handleReady}/>
            </Viewer>
        </div>
    );
};

export default App;
