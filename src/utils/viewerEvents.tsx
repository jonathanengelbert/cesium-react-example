import {Entity, ScreenSpaceEventType} from "cesium";
import {defined} from "cesium";
import {Color} from "cesium";

export const viewerLeftClick = (viewer: any, tileset: any) => {

    let selectedFloor = {
        currentFeature: null,
        previousColor: null
    };

    // let hoveredFloor = {
    //     currentFeature: null,
    //     previousColor: null
    // };
    // An entity object which will hold info about the currently selected feature for infobox display
    const selectedEntity = new Entity();
    // Get default left click handler for when a feature is not picked on left click
    const clickHandler = viewer.screenSpaceEventHandler.getInputAction(ScreenSpaceEventType.LEFT_CLICK);
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement: any) {
        //console.log('selected entity empty', selectedEntity);
        const pickedFeature = viewer.scene.pick(movement.position);
        console.log('TILESET', tileset);
        console.log('single feature', pickedFeature);
        console.log(pickedFeature);

        if (!defined(pickedFeature) || !pickedFeature.getProperty('floor_number')) {
            //reset previous object if one exists
            if (selectedFloor && selectedFloor.previousColor) {
                // @ts-ignore
                selectedFloor.currentFeature.color = selectedFloor.previousColor;
                selectedFloor = {
                    previousColor: null,
                    currentFeature: null
                };
                clickHandler(movement);
            }
            return;
        }

        //IF SAME ENTITY, DO NOTHING
        //If this is not implemented, clicking on entities twice permanently changes their colors
        if (selectedFloor.currentFeature) {
            // @ts-ignore
            if (selectedFloor.currentFeature.getProperty('floor_id') === pickedFeature.getProperty('floor_id')) {
                return
            }
        }
        const featureName = `${pickedFeature.getProperty('Name')} `;

        selectedEntity.name = featureName;
        // @ts-ignore
        selectedEntity.description = 'Loading <div class="cesium-infoBox-loading"></div>';
        viewer.selectedEntity = selectedEntity;

        // @ts-ignore
        if (selectedFloor.currentFeature && selectedFloor.currentFeature.getProperty('OBJECTID')
            !== pickedFeature.getProperty('OBJECTID')) {
            // @ts-ignore
            selectedFloor.currentFeature.color = selectedFloor.previousColor;
            selectedFloor.currentFeature = pickedFeature;
        }

        selectedFloor.currentFeature = pickedFeature;
        selectedFloor.previousColor = pickedFeature.color;
        pickedFeature.color = Color.RED.withAlpha(0.8);
        // TODO: Implement reverting to original color

        // @ts-ignore
        selectedEntity.description = '<table class="cesium-infoBox-defaultTable"><tbody>' +
            `<tr><th>Building ID</th><td> ${pickedFeature.getProperty('PropertyID')}  </td></tr>
        <tr><th>Floor</th><td>  ${pickedFeature.getProperty('floor_number')}  </td></tr>
        <tr><th>Tenant</th><td>  ${pickedFeature.getProperty('TenantName')}  </td></tr>
        <tr><th>Owner</th><td>  ${pickedFeature.getProperty('Owner')}  </td></tr>
        <tr><th>LXD</th><td>  ${pickedFeature.getProperty('LeaseExpirationDate').toLocaleString()} </td></tr>
        <tr><th>Occupancy Status</th><td> ${pickedFeature.getProperty('OccupancyStatus')}  </td></tr>
        <tr><th>Floor Size</th><td> ${pickedFeature.getProperty('FloorSize')}  </td></tr>
        </tbody></table>`;

    }, ScreenSpaceEventType.LEFT_CLICK);
}