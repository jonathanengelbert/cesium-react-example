import React, {useEffect, useRef, useState} from "react";
import {Ion,
        Viewer,
        Cesium3DTileset,
} from "cesium";

import {styles} from './utils/featureStyles';
import {
    makeHome,
    initializeMapboxBasemap,
    loadTerrain,
} from "./utils/viewConfig";

import {addTileset} from "./utils/layerHandling";
import {viewerLeftClick} from "./utils/viewerEvents";
import Controls from "./Controls/Controls";
import Sidepopup from "./SidePopup/SidePopup";

import './App.scss';

// @ts-ignore
Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

const App = () => {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const [floors, setFloors] = useState<Cesium3DTileset | null>(null);
    const [contextuals, setContextuals] = useState<Cesium3DTileset | null>(null);
    const [viewer, setViewer] = useState<any>();
    const [selectedFloorProperties, setSelectedFloorProperties] = useState<any>();


    useEffect(() => {
        function initializeViewer() {
            // @ts-ignore
            setViewer(new Viewer(viewerContainer.current));
        }

        if (viewer) {
            // viewerLeftClick(viewer, floors);

            // Sets scene configuration
            initializeMapboxBasemap(viewer);
            makeHome(viewer);
            loadTerrain(viewer);

            // Adds layers
            setFloors(addTileset(viewer, 78267));
            setContextuals(addTileset(viewer, 76644));
        }
        if (!viewer) initializeViewer()
    }, [viewer]);

    // events config
    useEffect(() => {
        if (viewer) {
            viewerLeftClick(viewer, floors, setSelectedFloorProperties, selectedFloorProperties);
        }
    }, [viewer, floors, selectedFloorProperties]);

    // contextual layer config
    useEffect(() => {
        if (contextuals) {
            contextuals.style = styles.transparentStyle;
            contextuals.show = false;
        }
    }, [contextuals]);

    function toggleContextuals() {
        if (contextuals) {
            contextuals.show = !contextuals.show;
        }
    }


    return (
        <div ref={viewerContainer} className={'viewer-container'}>
            <Controls
                toggleContextuals={toggleContextuals}
                floors={floors}

            />

            {
                selectedFloorProperties
                    ?
                    <Sidepopup
                        selectedFloorProperties={selectedFloorProperties}
                    />
                    :
                    null
            }
        </div>
    );
};

export default App;
