import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ locations }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA', 
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: locations[0].latitude, lng: locations[0].longitude }, // Center map on the first location
        zoom: 12,
      });

      locations.forEach(location => {
        new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.title || 'Location',
        });
      });
    });
  }, [locations]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;