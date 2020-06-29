import React, {useState} from 'react';

import './controlsStyles.scss';
// MATERIAL UI CONFIG
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';

type Props = {
    toggleContextuals: Function;
}

const owners = ['Person', 'Jake', 'Nigel'];
const tenants = ['Nikers', 'Loke', 'MBL'];

const makeOwnerList = (props: any) => {
    return (
        props.map((i: any)  =>
            <MenuItem value={i}>{i}</MenuItem>
        )
    )
};

const makeTenantList = (props: any) => {
    return (
        props.map((i: any)  =>
            <MenuItem value={i}>{i}</MenuItem>
        )
    )
};

const Controls = (props: Props) => {
    const [contextualsChecked, setContextualsChecked] = useState(false);
    const [owner, setOwner] = useState<any>();
    const [tenant, setTenant] = useState<any>();

    function toggleContextuals() {
        setContextualsChecked(!contextualsChecked);
        props.toggleContextuals();
    }


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
                >
                    {makeOwnerList(owners)}
                </Select>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={(e) => setTenant(e.target.value)}
                >
                    {makeTenantList(tenants)}
                </Select>
            </FormControl>

        </div>
    )
};

export default Controls;