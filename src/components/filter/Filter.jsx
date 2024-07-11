import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Select,
  useMediaQuery,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import React from "react";

const Filter = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  return (
    <Box pt={10}>
      <Heading size={"md"} fontWeight={"300"}>
        Search results for
      </Heading>

      <Flex gap={5} flexDir={"column"}>
        <FormControl mt={10}>
          <FormLabel>Location</FormLabel>
          <Input type="text" id="location" placeholder="city location" />
        </FormControl>
        <Flex gap={3} align={"center"} flexDir={["column", "row"]}>
          <Select placeholder="Type" flex={1}>
            <option value="option1">Buy</option>
            <option value="option2">Rent</option>
            <option value="option3">Shared Apartment</option>
          </Select>
          <Select placeholder="Property" flex={1}>
            <option value="option1">Buy</option>
            <option value="option2">Rent</option>
            <option value="option3">Shared Apartment</option>
          </Select>
          <NumberInput
            // defaultValue={15}
            max={1000000}
            min={0}
            color={"black"}
            flex={1}
            w={["100%", ""]}
          >
            <NumberInputField placeholder="min price" name="minPrice" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <NumberInput
            // defaultValue={15}
            max={1000000}
            min={0}
            color={"black"}
            flex={1}
            w={["100%", ""]}
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
          >
            Search
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Filter;
