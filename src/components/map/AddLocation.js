import React, { useEffect, useState } from 'react';

import AddLocationIcon from '@material-ui/icons/AddLocation';

export default function AddLocation(props) {
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    const defaultSettings = {
        enableHighAccuracy: false,
        timeout: Infinity,
        maximumAge: 0,
      };

    const onChange = ({coords}) => {
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      };
    
      const onError = (error) => {
        setError(error.message);
      };
    
     const handlerPosition = () => {
        if (!navigator || !navigator.geolocation) {
          setError('Geolocation is not supported');
          return;
        }
        navigator.geolocation.getCurrentPosition(onChange, onError, defaultSettings);
    }

    useEffect(() => {
     if (position.latitude) {
      props.createMessage('location',false, position);
     }
    }, [position.latitude])
   

    return (
        <AddLocationIcon onClick={handlerPosition}></AddLocationIcon>
    );
}


