import React from 'react';

import './sidePopupStyles.scss';

type Props = {
    // activeFeature: any | null | undefined
    // comments: Array<Comment> | null;
    // setComments: Function;
}

// @ts-ignore
// const SidePopup = ({selectedFloorProperties: {floorId, floorNumber, featureName}}) => {
const SidePopup = ({selectedFloorProperties: {featureName, floorNumber, floorId}}) => {
    return (
        <div className={'side-popup'}>
            <div className={'side-popup-content'}>
                <h1>{featureName}</h1>
                <p>Floor Number: {floorNumber}</p>
                <p>Floor Id: {floorId}</p>
            </div>
        </div>
    )
};

export default React.memo(SidePopup);