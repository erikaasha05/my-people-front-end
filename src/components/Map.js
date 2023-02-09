import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";

const kGoogleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

Geocode.setApiKey(kGoogleApiKey);
Geocode.setLanguage("en");
Geocode.enableDebug();

const getLatLng = (address) => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(response.results);
      console.log(`location ${lat} lng:${lng}`);
      // return { lat: {lat}, lng: {lng} };
      const latLon = {
        lat: lat,
        lng: lng,
      };
      // console.log(`should be object ${latLon}`);
      // console.log(latLon);
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
          console.log(location);
          setMarkerData(location);
        })
        .catch((err) => console.log(err));
    }
    // const latLng = props.contacts.map((contact) => {
    //   getLatLng(contact.address).then((result) => {
    //     const toJson = result.json()
    //     console.log(`get marker data ${toJson}`)
    //     return result.json();
    // });
    // const latLng = props.contacts.map((contact) => {
    //   return getLatLng(contact.address).then((result) => {
    //     console.log(`get Marker Data ${result}`);
    //     console.log(result);
    //     // console.log(result)
    //     return result;
    //   });
    // });
    // const latLng = props.contacts.map((contact) => {
    //   return getLatLng(contact.address)
    //     .then((result) => {
    //       console.log(`get Marker Data ${result}`);
    //       return result;
    // }
    // // .then((data) => {
    // //   console.log(`get Marker Data ${data}`);
    // //   return data;
    // // });
    // );

    // setMarkerData([...markerData, latLng]);
    // console.log(`latlng: ${latLng}`);
    // console.log("latLng" + latLng);
    // console.log(`markerData ${markerData}`);
    // console.log(markerData)

    // const listOfLatLon = [];

    // for (let i = 0; i < props.contacts.length; i++) {
    //   // console.log(props.contacts[i].address)
    //   getLatLng(props.contacts[i].address).then((result) => {
    //     console.log(`result ${result}`);
    //     console.log(result);
    //     listOfLatLon.append(result)
    //   })
    //   // if (props.contacts[i].address) {
    //   //   return getLatLng(props.contact[i].address).then((result) => {
    //   //     console.log(`result ${result}`)
    //   //     listOfLatLon.append(result);
    //   //   });
    //   // }
    // }
    // console.log(`list ${listOfLatLon}`);
    // return listOfLatLon;
  };

  // const markerInfo = () => {
  //   const contactInfo = props.contacts.map((contact) => {
  //     const latLng = getLatLng(contact.address);
  //     console.log(`result of getlatlng ${latLng}`);
  //     console.log({ ...latLng, name: contact.firstName });
  //     return { ...latLng, name: contact.firstName };
  //   });

  //   console.log(`contactData ${contactInfo}`);
  //   return contactInfo;
  // };

  useEffect(() => {
    getMarkerData();
  }, []);

  const mapStyles = {
    height: "35vh",
    width: "40%",
  };

  // const defaultCenter = {
  //   lat: 37.722,
  //   lng: -122.214,
  // };

  // const position = {
  //   lat: 37.722,
  //   lng: -122.214,
  // };

  const onLoad = (marker) => {
    console.log("marker: ", marker);
  };

  return (
    <div>
      {props.contactData.address ? (
        <LoadScript googleMapsApiKey={kGoogleApiKey}>
          <GoogleMap mapContainerStyle={mapStyles} zoom={8} center={markerData}>
            <MarkerF onLoad={onLoad} position={markerData} />
          </GoogleMap>
        </LoadScript>
      ) : null}
    </div>
  );
};

export default Map;
