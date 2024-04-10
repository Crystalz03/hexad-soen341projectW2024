import React, { useRef, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDB1QSetyBSLxtSUqBXk8SyCBE2n3-CyCA', 
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 12,
      });

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        title: 'Branch',
      });
    });
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '50em' }} />;
};

export default Map;