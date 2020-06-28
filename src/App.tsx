import React, {useEffect, useRef, useState} from "react";
import { Ion, Viewer } from "cesium";
import {styles} from './utils/featureStyles';
import {
    makeHome,
    initializeMapboxBasemap,
    loadTerrain,
} from "./utils/viewConfig";

import { addTileset } from "./utils/layerHandling";
import './App.scss';

// @ts-ignore
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

const App = () => {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const [floors, setFloors] = useState<Object>([]);
    let viewer: any; // This will be raw Cesium's Viewer object.
    function inializeViewer() {
        // @ts-ignore
        viewer = new Viewer('viewerContainer');
    }

    useEffect(() => {
        if(viewerContainer) {
            inializeViewer();
            initializeMapboxBasemap(viewer);
            makeHome(viewer);
            loadTerrain(viewer);

            setFloors(addTileset(viewer, 78267));
            console.log(floors)
        }
    }, [viewerContainer]);

    return (
        <div ref={viewerContainer} id={'viewerContainer'}>
        </div>
    );
};

export default App;
