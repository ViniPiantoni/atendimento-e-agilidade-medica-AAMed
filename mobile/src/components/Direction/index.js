import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBAJxkbJDUINqKFwXs-WGy-S7W-yD2ueJ4';

export default function Directions({ origin, destination, onReady }) {
  return (
    <MapViewDirections
      origin={origin}
      onReady={onReady}
      destination={destination}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={4}
      strokeColor={'#222'}
    />
  );
}
