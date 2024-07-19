import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Filter = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");

  const defaultQuery = {
    location: "",
    type: "",
    property: "",
    minPrice: 0,
    maxPrice: 1000000,
  };

  const [query, setQuery] = useState(defaultQuery);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasParams = Array.from(params.keys()).length > 0;

    const initialQuery = {
      location: params.get("city") || defaultQuery.location,
      type: params.get("type") || defaultQuery.type,
      property: params.get("property") || defaultQuery.property,
      minPrice: parseInt(params.get("minPrice") || defaultQuery.minPrice),
      maxPrice: parseInt(params.get("maxPrice") || defaultQuery.maxPrice),
    };

    if (!hasParams) {
      // Navigate to default query parameters if no parameters are present in the URL
      const queryParams = new URLSearchParams(initialQuery).toString();
      navigate(`/list?${queryParams}`);
    } else {
      setQuery(initialQuery);
      onSearch(initialQuery); // Fetch posts with initial query
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams(query).toString();
    navigate(`/list?${queryParams}`);
    onSearch(query); // Fetch posts with current query
  };

  return (
    <Box pt={10}>
      <Heading size={"md"} fontWeight={"300"}>
        Search results for
      </Heading>

      <Flex gap={5} flexDir={"column"}>
        <FormControl mt={10}>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            id="location"
            name="location"
            value={query.location}
            onChange={handleInputChange}
            placeholder="city location"
          />
        </FormControl>
        <Flex gap={3} align={"center"} flexDir={["column", "row"]}>
          <Select
            placeholder="Type"
            name="type"
            value={query.type}
            onChange={handleInputChange}
            flex={1}
          >
            <option value="sale">Buy</option>
            <option value="rent">Rent</option>
            <option value="shared">Shared Apartment</option>
          </Select>
          {/* <Select
            placeholder="Property"
            name="property"
            value={query.property}
            onChange={handleInputChange}
            flex={1}
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </Select> */}
          <NumberInput
            max={1000000}
            min={0}
            color={"black"}
            flex={1}
            w={["100%", ""]}
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
          <NumberInput
            max={1000000}
            min={0}
            color={"black"}
            flex={1}
            w={["100%", ""]}
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
          <Button
            colorScheme="orange"
            variant="solid"
            size={"lg"}
            flex={1}
            p={[3, ""]}
            w={["100%", ""]}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Filter;
