import React, { useState } from 'react';

import MyMapComponent from './Map';

import classes from './ModalMap.module.css';
import Modal from '@material-ui/core/Modal';
import { Container } from '@material-ui/core';

export default function ModalMap(props) {
  const coords = {
    lat: props.value ? parseFloat(props.value.latitude) : '',
    lng: props.value ? parseFloat(props.value.longitude) : '',
    get strCords() {
      return this.lng + ',' + this.lat;
    },
  };
  let srcMaps =
    'https://static-maps.yandex.ru/1.x/?ll=' +
    coords.strCords +
    '&pt=' +
    coords.strCords +
    ',pm2dgm&z=13&l=map&size=200,200';
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <img
        className={classes.map_icon}
        onClick={handleOpen}
        src={srcMaps}
        alt="map"
      ></img>
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
