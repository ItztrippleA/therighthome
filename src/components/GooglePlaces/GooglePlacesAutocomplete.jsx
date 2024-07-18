import React, { useRef, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_API_KEY } from "../../Environment";

const libraries = ["places"];

const GooglePlacesAutocomplete = ({ onPlaceSelected }) => {
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      <Autocomplete
        onLoad={(autoC) => setAutocomplete(autoC)}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Enter a location"
          ref={inputRef}
          style={{
            width: "300px",
            height: "40px",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default GooglePlacesAutocomplete;
