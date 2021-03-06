import { Cesium3DTileset, IonResource } from "cesium";
import {positionTileset} from "./viewConfig";

export const addTileset = (viewer: any, assetId: number) => {
    const tileset = viewer.scene.primitives.add(new Cesium3DTileset({url: IonResource.fromAssetId(assetId)}));
    // handles elevation
    tileset.readyPromise
        .then((tileset: Cesium3DTileset) => positionTileset(tileset));
    return tileset;
};
