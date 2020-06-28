import { Cesium3DTileStyle } from "cesium";

//////////////////////////////////////////////////////////////////////////
// STYLE 3D TILESET
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

export const styles = {
    defaultStyle: defaultStyle,
    transparentStyle: transparentStyle,
    hideStyle: hideStyle
};



///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////


