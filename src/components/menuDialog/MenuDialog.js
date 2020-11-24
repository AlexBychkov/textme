import React, { useState } from 'react';

import AddLocation from '../map/AddLocation';

import { Menu, MenuItem } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';



export default function MenuDialog(props) {
    const [anchorEl, setAnchorEl] = useState(null);
		
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AttachFileIcon onClick={handleClick}></AttachFileIcon>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                  <MenuItem onClick={handleClose}>
                    <AddLocation createMessage={props.createMessage}/>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <AddAPhotoIcon></AddAPhotoIcon>
                </MenuItem>
            </Menu>
        </div>
    );
}