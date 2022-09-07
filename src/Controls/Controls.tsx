import React, {useEffect, useState} from 'react';

import './controlsStyles.css';
// MATERIAL UI CONFIG
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

import {tenants, owners} from "../data/data";
import {colorFloors, makeMatchList} from "../utils/viewerEvents";
import {FormGroup} from "@material-ui/core";


type Props = {
    toggleContextuals: Function;
    floors: any;
}

const ownerList = Array.from(new Set(Object.values(owners).sort()));
const tenantList = Array.from(new Set(Object.values(tenants).sort()));

const makeOwnerList = (props: any) => {
    return (
        props.map((i: any) =>
            <MenuItem key={i} value={i}>{i}</MenuItem>
        )
    )
};

const makeTenantList = (props: any) => {
    return (
        props.map((i: any) =>
            <MenuItem key={i} value={i}>{i}</MenuItem>
        )
    )
};

const Controls = (props: Props) => {
    const [contextualsChecked, setContextualsChecked] = useState(false);
    const [owner, setOwner] = useState<any>('');
    const [tenant, setTenant] = useState<any>('');


    function toggleContextuals() {
        setContextualsChecked(!contextualsChecked);
        props.toggleContextuals();
    }

    // handling OWNER change
    useEffect(() => {
        if (owner) {
            if (tenant) {
                setTenant('');
            }
            const buildingList = makeMatchList(owners, owner);
            colorFloors(props.floors, 'PropertyID', buildingList);
        }
    }, [owner]);

    // handling TENANT change
    useEffect(() => {
        if (tenant) {
            if (owner) {
                setOwner('');
            }
            const buildingList = makeMatchList(tenants, tenant, true);
            colorFloors(props.floors, 'floor_id', buildingList);
        }
    }, [tenant]);

    return (
        <div className={"controls-container"}>
            <FormControlLabel
                control={<Checkbox checked={contextualsChecked}
                                   name="checkedA"/>}
                onChange={() => toggleContextuals()}
                label="Show Contextual Buildings"

            />
                <FormGroup>
                    <InputLabel className="input-label" color={'secondary'} id="demo-simple-select-label">Owner</InputLabel>
                    <Select
                        className={"select-label"}
                        labelId="demo-simple-select-label"
                        id="owner-select"
                        onChange={(e) => setOwner(e.target.value)}
                        value={owner}
                    >
                        {makeOwnerList(ownerList)}
                    </Select>
                    <InputLabel className="input-label" id="tenant-select">Tenant</InputLabel>
                    <Select
                        className={"select-label"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={(e) => setTenant(e.target.value)}
                        value={tenant}
                    >
                        {makeTenantList(tenantList)}
                    </Select>

                </FormGroup>

        </div>
    )
};

export default Controls;