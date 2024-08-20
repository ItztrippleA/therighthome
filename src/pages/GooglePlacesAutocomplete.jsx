import React, { useContext, useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { Box, Flex, Text } from "@chakra-ui/react";
import { GOOGLE_API_KEY } from "../Environment";
import { AuthContext } from "../context/AuthContext";

const libraries = ["places"];

const GooglePlacesAutocomplete = ({ query, setQuery }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const { user, city, country, setCity, setCountry, address, setAddress } =
    useContext(AuthContext);
  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      setAddress(place.formatted_address);

      // Extracting city, country, and other relevant information
      const addressComponents = place.address_components;

      let city = "";
      let country = "";

      addressComponents.forEach((component) => {
        const types = component.types;

        if (types.includes("locality")) {
          city = component.long_name;
        } else if (types.includes("postal_town")) {
          city = component.long_name;
        } else if (types.includes("administrative_area_level_2")) {
          if (!city) city = component.long_name; // fallback if locality is not available
        } else if (types.includes("administrative_area_level_1")) {
          if (!city) city = component.long_name; // another fallback
        }

        if (types.includes("country")) {
          country = component.long_name;
        }
      });

      setCity(city);
      setCountry(country);
      setQuery((prev) => ({ ...prev, country, city }));

      console.log("Selected place:", place);
      console.log("City:", city);
      console.log("Country:", country);
    }
  };

  return (
    // <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
    <Box w={"100%"}>
      {/* <h2>Google Places Autocomplete</h2> */}
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Enter a location"
          style={{ width: "300px", height: "40px", color: "#000" }}
        />
      </Autocomplete>
      <Text color={"#000"}>{city}</Text>
      <Text color={"#000"}>current selected country({country})</Text>
    </Box>
    // </LoadScript>
  );
};

export default GooglePlacesAutocomplete;
