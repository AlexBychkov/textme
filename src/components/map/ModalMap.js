import React, { useState } from 'react';

import MyMapComponent from './Map';

import classes from './ModalMap.module.css'
import Modal from '@material-ui/core/Modal';
import { Container } from '@material-ui/core';

export default function ModalMap(props) {
  const coords = { 
    lat: props.value ? parseFloat(props.value.latitude) : '',
    lng: props.value ?  parseFloat(props.value.longitude) : '',
    get strCords(){
      return this.lat + ',' + this.lng;
    }
   };
  let  srcMaps ='https://maps.googleapis.com/maps/api/staticmap?center=' + coords.strCords + '&markers=color:red%7Clabel:C%7C' + coords.strCords + '&zoom=13&size=200x200&key='  + process.env.REACT_APP_GOOGLEMAP_APP_KEY;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img className={classes.map_icon} onClick={handleOpen} src={srcMaps} alt='map'></img>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Container className={classes.paper} maxWidth="lg">
        {props.error ? props.error : <MyMapComponent isMarkerShown coords={coords} />}
        </Container>
      </Modal>
    </div>
  );
}
