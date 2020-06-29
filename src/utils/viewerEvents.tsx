import {Entity, ScreenSpaceEventType} from "cesium";
import {defined} from "cesium";
import {Color} from "cesium";
import { styles } from "./featureStyles";


let selectedFloor = {
    currentFeature: null,
    previousColor: null
};

export const viewerLeftClick = (viewer: any, tileset: any, setter: Function, currentSelection=null) => {

    let floorProperties = {
        floorId: '',
        floorNumber: null,
        featureName: '',
        buildingId: '',
        pickedFeature: null
    };

    // HANDLE CLICK OUTSIDE TILESET  (reset colors, empties property object, closes popup)
    // viewer.screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.LEFT_CLICK);
   viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement: any) {
        const pickedFeature = viewer.scene.pick(movement.position);
        if (!defined(pickedFeature) || !pickedFeature.getProperty('floor_number')) {
            // reset color of floors if clicking on any feature other than floors
            tileset.style = styles.defaultStyle;
            if (selectedFloor && selectedFloor.previousColor) {
                // @ts-ignore
                selectedFloor.currentFeature.color = selectedFloor.previousColor;
                selectedFloor = {
                    previousColor: null,
                    currentFeature: null
                };
            }
            return setter(null);
        }

        //IF SAME ENTITY, DO NOTHING
        //If this is not implemented, clicking on entities twice permanently changes their colors
        if (selectedFloor.currentFeature) {
            // @ts-ignore
            if (selectedFloor.currentFeature.getProperty('floor_id') === pickedFeature.getProperty('floor_id')) {
                return
            }
        }

        floorProperties.floorId = pickedFeature.getProperty('floor_id');
        floorProperties.floorNumber =  pickedFeature.getProperty('floor_number');
        floorProperties.featureName = pickedFeature.getProperty('Name');
        floorProperties.buildingId = pickedFeature.getProperty('PropertyID');
        floorProperties.pickedFeature = pickedFeature;
        // <tr><th>Tenant</th><td>  ${pickedFeature.getProperty('TenantName')}  </td></tr>


        // @ts-ignore
        if (selectedFloor.currentFeature && selectedFloor.currentFeature.getProperty('OBJECTID')
            !== pickedFeature.getProperty('OBJECTID')) {
            // @ts-ignore
            selectedFloor.currentFeature.color = selectedFloor.previousColor;
            selectedFloor.currentFeature = pickedFeature;
        }

        selectedFloor.currentFeature = pickedFeature;
        selectedFloor.previousColor = pickedFeature.color;
        // tileset.style = styles.defaultStyle;
        pickedFeature.color = Color.RED.withAlpha(0.8);
        // TODO: Implement reverting to original color

        return setter(floorProperties);
        // @ts-ignore
        // selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
        //     `<tr><th>Building ID</th><td> ${pickedFeature.getProperty('PropertyID')}  </td></tr>
        // <tr><th>Floor</th><td>  ${pickedFeature.getProperty('floor_number')}  </td></tr>
        // <tr><th>Tenant</th><td>  ${pickedFeature.getProperty('TenantName')}  </td></tr>
        // <tr><th>Owner</th><td>  ${pickedFeature.getProperty('Owner')}  </td></tr>
        // <tr><th>LXD</th><td>  ${pickedFeature.getProperty('LeaseExpirationDate').toLocaleString()} </td></tr>
        // <tr><th>Occupancy Status</th><td> ${pickedFeature.getProperty('OccupancyStatus')}  </td></tr>
        // <tr><th>Floor Size</th><td> ${pickedFeature.getProperty('FloorSize')}  </td></tr>
        // </tbody></table>`;

    }, ScreenSpaceEventType.LEFT_CLICK);
}