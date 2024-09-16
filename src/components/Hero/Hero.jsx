import React, { useContext, useState, useEffect } from "react";
import {
  Flex,
  Text,
  Image,
  Button,
  Box,
  Heading,
  Circle,
  Input,
  useMediaQuery,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { BASE_URL } from "../../Environment";
import { AuthContext } from "../../context/AuthContext";
import GooglePlacesAutocomplete from "../../pages/GooglePlacesAutocomplete";
// import "dotenv/config";
const Hero = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("BASE_URL from .env:", import.meta.env.VITE_PAYSTACK_KEY);
  }, []);

  const { user, posts, setPosts, setLoading, setRefreshing, query, setQuery } =
    useContext(AuthContext);

  // console.log("hello", import.meta.env.VITE_PAYSTACK_KEY);
  const fetchPosts = async () => {
    setLoading(true);
    setRefreshing(true);

    const headers = {
      "Content-Type": "application/json",
    };

    if (user?.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    fetch(
      `${BASE_URL}/api/posts?type=${query.type}&city=${
        query.city.charAt(0).toUpperCase() + query.city.slice(1)
      }&country=${query.country}&minPrice=${query.minPrice}&maxPrice=${
        query.maxPrice
      }&property=`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          setPosts(responseJson.data);
        } else {
          setErrorMessage(responseJson.message);
          onOpen();
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while fetching posts.");
        onOpen();
        setLoading(false);
        setRefreshing(false);
      });
  };

  const switchType = (value) => {
    setQuery((prev) => ({ ...prev, type: value }));
  };

  return (
    <Flex
      color={"white"}
      justify={"center"}
      pb={["1rem", "3rem"]}
      pt={["3rem", "0rem"]}
      bg={"#131110"}
      w={"100%"}
    >
      <Flex
        align={"center"}
        justify={"space-between"}
        direction={{ base: "column", md: "row" }}
        w={["90%", "75%"]}
        gap={10}
      >
        <Flex
          position={"relative"}
          zIndex={5}
          flexDirection={"column"}
          gap={10}
        >
          <Heading
            as={"h1"}
            fontWeight={"700"}
            fontSize={"3.8rem"}
            lineHeight={"4rem"}
            position={"relative"}
          >
            <Circle
              size="4rem"
              bg="linear-gradient(270deg, #ffb978 0%, #ff922d 100%)"
              position={"absolute"}
              top={-3}
              right={"28%"}
              zIndex={-1}
            />
            Discover <br />
            Most Suitable <br /> Property
          </Heading>

          <Box>
            <Text fontSize={".9rem"} color={"rgba(140 139 139)"}>
              Find a variety of property that suits you very easily{" "}
            </Text>
            <Text fontSize={".9rem"} color={"rgba(140 139 139)"}>
              Forget all difficulties in finding a residence for you
            </Text>
          </Box>

          <Flex flexDir="column" gap={4}>
            <Flex gap={2}>
              {["sale", "rent", "shared"].map((type) => (
                <Button
                  key={type}
                  colorScheme="orange"
                  variant={query.type === type ? "solid" : "outline"}
                  size="lg"
                  onClick={() => switchType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </Flex>
            <Flex
              bg="white"
              borderRadius="5px"
              border="3px solid #1f3e72"
              p="0.5rem 1rem"
              justify="space-between"
              align="center"
              flexDir={["column", "row"]}
              gap={3}
              w="100%"
            >
              <Flex align="center" flexDir={["column", "row"]} flex={1}>
                {isDesktop && <HiLocationMarker color="#1f3e72" size={25} />}
                <GooglePlacesAutocomplete setQuery={setQuery} query={query} />
              </Flex>
            </Flex>
            <Flex
              bg="white"
              borderRadius="5px"
              border="3px solid #1f3e72"
              p="0.5rem 1rem"
              justify="space-between"
              align="center"
              flexDir={["column", "row"]}
              gap={3}
              w="100%"
            >
              <Flex
                align="center"
                flexDir={["column", "row"]}
                flex={1}
                gap={2}
                w={["100%", "auto"]}
              >
                {["minPrice", "maxPrice"].map((price) => (
                  <NumberInput
                    key={price}
                    maxW={["100%", 32]}
                    min={0}
                    color="black"
                    onChange={(value) =>
                      setQuery((prev) => ({ ...prev, [price]: value }))
                    }
                    w={["100%", "auto"]}
                  >
                    <NumberInputField
                      placeholder={`${
                        price === "minPrice" ? "Min" : "Max"
                      } price`}
                      name={price}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                ))}
              </Flex>
              <IconButton
                colorScheme="orange"
                aria-label="Search"
                size="lg"
                onClick={() => {
                  if (query.type === "") {
                    setErrorMessage(
                      "Please select a property type (sale, rent, or shared)"
                    );
                    onOpen();
                  } else if (query.country === "") {
                    setErrorMessage("Kindly select a location");
                    onOpen();
                  } else {
                    const queryParams = new URLSearchParams(query).toString();
                    navigate(`/list?${queryParams}`);
                    fetchPosts();
                  }
                }}
                icon={<SearchIcon />}
                w={["100%", "auto"]}
              />
            </Flex>
          </Flex>

          {/* <Flex justify={"space-between"} w={["100%", "70%"]}>
            <Flex align={"center"} flexDirection={"column"}>
              <Flex align={"center"}>
                <CountUp
                  end={9000}
                  duration={4}
                  start={8800}
                  style={{ color: "#fff", fontSize: "2rem" }}
                />
                <Text fontSize={"1.5rem"} color={"orange"} fontWeight={"600"}>
                  +
                </Text>
              </Flex>
              <Text fontSize={".9rem"} color={"rgba(140 139 139)"}>
                Premium product
              </Text>
            </Flex>
            <Flex align={"center"} flexDirection={"column"}>
              <Flex align={"center"}>
                <CountUp
                  end={2000}
                  duration={4}
                  start={1950}
                  style={{ color: "#fff", fontSize: "2rem" }}
                />
                <Text fontSize={"1.5rem"} color={"orange"} fontWeight={"600"}>
                  +
                </Text>
              </Flex>
              <Text fontSize={".9rem"} color={"rgba(140 139 139)"}>
                Happy Customers
              </Text>
            </Flex>
          </Flex> */}
        </Flex>
        <Flex justify={"center"} align={"center"}>
          <Flex
            w={["20rem", "30rem"]}
            h={["25rem", "35rem"]}
            borderRadius={"15rem 15rem 0 0"}
            border={"8px solid rgba(255, 255, 255, 0.12)"}
            overflow={"hidden"}
            justify={"center"}
            align={"center"}
          >
            <Image src="./hero-image.png" alt="hero image" />
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{errorMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Hero;
