import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default function Loading(props) {
  return (
    <Backdrop open={props.open} style={{ zIndex: 10 }}>
      <CircularProgress style={{ color: '#ffffff' }} />
    </Backdrop>
  );
}
