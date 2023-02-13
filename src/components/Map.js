import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";

const kGoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

Geocode.setApiKey(kGoogleApiKey);
Geocode.setLanguage("en");
// Geocode.enableDebug();

const getLatLng = (address) => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      const latLon = { lat: parseFloat(lat), lng: parseFloat(lng) };
      return latLon;
    },
    (err) => console.log(`getLatLng ${err}`)
  );
};

const Map = (props) => {
  const [markerData, setMarkerData] = useState("");

  const getMarkerData = () => {
    if (props.contactData.address) {
      getLatLng(props.contactData.address)
        .then((location) => {
          setMarkerData(location);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getMarkerData();
    // eslint-disable-next-line
  }, [props.contactData]);

  const mapStyles = {
    height: "35vh",
    width: "100%",
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: kGoogleApiKey,
  });

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  const renderMap = () => {
    return (
      <div className="mb-3">
        {props.contactData.address ? (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={12}
            center={markerData ? markerData : null}
          >
            <MarkerF onLoad={onLoad} position={markerData ? markerData : null} />
          </GoogleMap>
        ) : null}
      </div>
    );
  };

  return isLoaded ? renderMap() : null;
};

Map.propTypes = {
  contactData: PropTypes.object,
};

export default Map;
