import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useMediaQuery,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GooglePlacesAutocomplete from "../../pages/GooglePlacesAutocomplete";
import { AuthContext } from "../../context/AuthContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { facilities } from "../../lib/dummydata"; // Make sure to import the facilities array

const Filter = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const { filterPosts } = useContext(AuthContext);

  const defaultQuery = {
    city: "",
    country: "",
    type: "",
    property: "",
    minPrice: 0,
    maxPrice: 1000000,
  };

  const [query, setQuery] = useState(defaultQuery);
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [condition, setCondition] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasParams = Array.from(params.keys()).length > 0;

    const initialQuery = {
      city: params.get("city") || defaultQuery.city,
      country: params.get("country") || defaultQuery.country,
      type: params.get("type") || defaultQuery.type,
      property: params.get("property") || defaultQuery.property,
      minPrice: parseInt(params.get("minPrice") || defaultQuery.minPrice),
      maxPrice: parseInt(params.get("maxPrice") || defaultQuery.maxPrice),
    };

    if (!hasParams) {
      // Navigate to default query parameters if no parameters are present in the URL
      const queryParams = new URLSearchParams(initialQuery).toString();
      navigate(`/list?${queryParams}`, { replace: true });
    } else {
      setQuery(initialQuery);
      onSearch(initialQuery); // Fetch posts with initial query
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(query).toString();
    navigate(`/list?${queryParams}`, { replace: true });
  }, [query, navigate]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    filterPosts(bathrooms, bedrooms, condition, selectedFacilities);
  };

  const handleLocationChange = (newLocation) => {
    const updatedQuery = {
      ...query,
      city: newLocation.city,
      country: newLocation.country,
    };
    setQuery(updatedQuery);

    // Update URL immediately when location changes
    const queryParams = new URLSearchParams(updatedQuery).toString();
    navigate(`/list?${queryParams}`, { replace: true });
  };

  return (
    <Box pt={10}>
      <Heading size={"md"} fontWeight={"300"}>
        Search results for
      </Heading>

      <form onSubmit={handleSearch}>
        <Flex gap={5} flexDir={"column"}>
          <FormControl mt={10}>
            <FormLabel>Location</FormLabel>
            <Box border="1px solid grey" borderRadius="md">
              <GooglePlacesAutocomplete
                setQuery={handleLocationChange}
                query={query}
              />
            </Box>
          </FormControl>
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Select
                placeholder="Type"
                name="type"
                value={query.type}
                onChange={handleInputChange}
              >
                <option value="sale">Buy</option>
                <option value="rent">Rent</option>
                <option value="shared">Shared Apartment</option>
                <option value="distress">Distress</option>
                <option value="hotel">Hotel</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Min Price</FormLabel>
              <NumberInput
                max={1000000}
                min={0}
                color={"black"}
                value={query.minPrice}
                onChange={(valueString) =>
                  handleNumberChange("minPrice", parseInt(valueString))
                }
              >
                <NumberInputField placeholder="min price" name="minPrice" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Max Price</FormLabel>
              <NumberInput
                max={1000000}
                min={0}
                color={"black"}
                value={query.maxPrice}
                onChange={(valueString) =>
                  handleNumberChange("maxPrice", parseInt(valueString))
                }
              >
                <NumberInputField placeholder="max price" name="maxPrice" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Bathrooms</FormLabel>
              <Select
                placeholder="Bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Bedrooms</FormLabel>
              <Select
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Condition</FormLabel>
              <Select
                placeholder="Condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="Fairly Used">Fairly Used</option>
                <option value="Newly Built">Newly Built</option>
                <option value="Old">Old</option>
                <option value="Renovated">Renovated</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Facilities</FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  {selectedFacilities.length > 0
                    ? `${selectedFacilities.length} selected`
                    : "Select Facilities"}
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    title="Facilities"
                    type="checkbox"
                    value={selectedFacilities}
                    onChange={(values) => setSelectedFacilities(values)}
                  >
                    {facilities.map((facility) => (
                      <MenuItemOption key={facility} value={facility}>
                        {facility}
                      </MenuItemOption>
                    ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </FormControl>
            <FormControl>
              <FormLabel>&nbsp;</FormLabel>
              <Button
                type="submit"
                colorScheme="orange"
                variant="solid"
                size={"lg"}
                w="100%"
              >
                Search
              </Button>
            </FormControl>
          </SimpleGrid>
        </Flex>
      </form>
    </Box>
  );
};

export default Filter;
