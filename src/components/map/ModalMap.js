import React, { useState } from 'react';

import MyMapComponent from './Map';

import classes from './ModalMap.module.css'
import Modal from '@material-ui/core/Modal';
import MapIcon from '@material-ui/icons/Map';

export default function ModalMap(props) {
  const coords = { 
    lat: props.value ? parseFloat(props.value.latitude) : '',
    lng: props.value ?  parseFloat(props.value.longitude) : '' };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MapIcon onClick={handleOpen} fontSize="large" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          {props.error ? props.error : <MyMapComponent isMarkerShown coords={coords} />}
        </div>
      </Modal>
    </div>
  );
}
