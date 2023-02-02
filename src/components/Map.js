// import React from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100vh",
//   height: "100%"
// };

// const center = {
//   lat: 38.498,
//   lng: -98.698,
// };

// const Map = () => {
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: '',
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return (
//     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//       <Marker lat={59} lng={30} />
//     </GoogleMap>
//   );

//    // return (
//   //   <div>
//   //     <LoadScript googleMapsApiKey="">
//   //       <GoogleMap MapContainerStyle={containerStyle} center={center} zoom={10}>
//           // <Marker lat={59} lng={30} />
//   //       </GoogleMap>
//   //     </LoadScript>
//   //   </div>
//   // );
// };

// export default Map;

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const kGoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const Map = () => {

  const mapStyles = {
    height: "100vh",
    width: "100%"};

  const defaultCenter = {
    lat: 38.498, lng: -97.698
  }

  return (
    <LoadScript
      googleMapsApiKey={kGoogleApiKey}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={4.5}
        center={defaultCenter}
      />
    </LoadScript>
  )
};

export default Map;

// import { useMemo } from "react";
// import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// const Map = () => {
//   const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

//   const mapStyles = {
//     height: "100vh",
//     width: "100%",
//   };

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "",
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return (
//     <GoogleMap zoom={10} center={center} mapContainerStyle={mapStyles}>
//       <Marker position={center} />
//     </GoogleMap>
//   );
// };

// export default Map;
