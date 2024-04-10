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
        center: { lat: locations[0].latitude, lng: locations[0].longitude }, 
        zoom: 7,
      });

      locations.forEach(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map,
          title: location.title || 'Location',
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<h3>${location.title}</h3><p>Address: ${location.address}</p>`,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, [locations]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;