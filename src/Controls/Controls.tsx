import React, {useEffect, useState} from 'react';

import './controlsStyles.scss';
// MATERIAL UI CONFIG
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

import {tenants, owners} from "../data/data";
import {colorFloors, makeMatchList} from "../utils/viewerEvents";
import {styles} from "../utils/featureStyles";


type Props = {
    toggleContextuals: Function;
    floors: any;
}

const ownerList = Array.from(new Set(Object.values(owners).sort()));
const tenantList = Array.from(new Set(Object.values(tenants).sort()));

const makeOwnerList = (props: any) => {
    return (
        props.map((i: any) =>
            <MenuItem value={i}>{i}</MenuItem>
        )
    )
};

const makeTenantList = (props: any) => {
    return (
        props.map((i: any) =>
            <MenuItem value={i}>{i}</MenuItem>
        )
    )
};

const Controls = (props: Props) => {
    const [contextualsChecked, setContextualsChecked] = useState(false);
    const [owner, setOwner] = useState<any>(null);
    const [tenant, setTenant] = useState<any>(null);


    function toggleContextuals() {
        setContextualsChecked(!contextualsChecked);
        props.toggleContextuals();
    }

    // handling OWNER change
    useEffect(() => {
        if (owner) {
            if (tenant) {
                setTenant(null);
            }
            const buildingList = makeMatchList(owners, owner);
            colorFloors(props.floors, 'PropertyID', buildingList);
        }
    }, [owner]);

    // handling TENANT change
    useEffect(() => {
        if (tenant) {
            if (owner) {
                setOwner(null);
            }
            const buildingList = makeMatchList(tenants, tenant, true);
            colorFloors(props.floors, 'floor_id', buildingList);
        }
    }, [tenant]);

    return (
        <div className={"controls-container"}>
            <h2>Controls</h2>
            <FormControl>
                <FormControlLabel
                    control={<Checkbox checked={contextualsChecked}
                                       name="checkedA"/>}
                    onChange={() => toggleContextuals()}
                    label="Show Contextual Buildings"

                />
                <InputLabel id="demo-simple-select-label">Owner</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setOwner(e.target.value)}
                    value={owner}
                >
                    {makeOwnerList(ownerList)}
                </Select>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setTenant(e.target.value)}
                    value={tenant}
                >
                    {makeTenantList(tenantList)}
                </Select>
            </FormControl>

        </div>
    )
};

export default Controls;