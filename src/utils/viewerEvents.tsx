import {Cesium3DTileset, Cesium3DTileStyle, ScreenSpaceEventType} from "cesium";
import {defined} from "cesium";
import {Color} from "cesium";
import {styles} from "./featureStyles";
import {tenants, owners} from "../data/data";

let selectedFloor = {
    currentFeature: null,
    previousColor: null
};

export const viewerLeftClick = (viewer: any, tileset: any, setter: Function, currentSelection = null) => {

    let floorProperties = {
        floorNumber: null,
        featureName: '',
        owner: '',
        tenant: '',
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

        floorProperties.floorNumber = pickedFeature.getProperty('floor_number');
        floorProperties.featureName = pickedFeature.getProperty('Name');
        // @ts-ignore
        floorProperties.tenant = tenants[pickedFeature.getProperty('floor_id')] || 'Vacant';
        // @ts-ignore
        floorProperties.owner = owners[pickedFeature.getProperty('PropertyID')];
        // <tr><th>Tenant</th><td>  ${pickedFeature.getProperty('TenantName')}  </td></tr>
        // @ts-ignore
        floorProperties.id = pickedFeature.getProperty('PropertyID');


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

        console.log(floorProperties);
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
};
// const floorIds = ['42635-19', '42635-2', '805078-50', '42592-34'];
// const floorIds = [42635, '42635-2', '805078-50', '42592-34'];

function generateStyle(feature: string | number, arr: Array<string>) {
    let featureName;
    featureName = '${' + feature + '}';

    let selection = '';
    for (let i = 0; i < arr.length; i++) {
        if (i + 1 === arr.length) {
            if (typeof arr[0] === 'string') {
                selection += `${featureName} === "${arr[i]}"`;
            } else {
                selection += `${featureName} === ${arr[i]}`;
            }

            return selection;
        }
        if (typeof arr[0] == 'string') {
            selection += (`${featureName} === "${arr[i]}" ||`);
        } else {
            selection += (`${featureName} === ${arr[i]} ||`);
        }
    }
}

export function colorFloors(featureSet: Cesium3DTileset, feature: string, arr: Array<any>) {
    const cond = [
        [generateStyle(feature, arr), 'rgb(23,83,246)'],
        // EXAMPLE OUTPUT:
        // [' ${floor_id} === "42635-19" || ${floor_id} === "42635-2" || ${floor_id} === "805078-50" || ${floor_id} === "42592-34"', 'rgb(23,83,246)'],
        // ['${floor_number} === 12', 'rgb(23,83,246)'],
        // ['${floor_number} === 22', 'rgb(23,83,246)'],
        ['true', "rgb(237,244,246)"]
    ];
    // @ts-ignore
    featureSet.style = new Cesium3DTileStyle({
        color: {
            // conditions: cond
            conditions: cond
        }
    });
    console.log(cond)
};

export const makeMatchList = (feature: any, selector: string, isString = false) => {
    const matching = [];
    for (let [id, o] of Object.entries(feature)) {
        if (o === selector && !isString) {
            matching.push(parseInt(id))
        }

        if (o === selector && isString) {
            matching.push(id)
        }
    }
    console.log(matching)
    return matching;
};


