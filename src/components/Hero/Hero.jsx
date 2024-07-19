import React, { useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";
import { BASE_URL } from "../../Environment";
import { AuthContext } from "../../context/AuthContext";

const Hero = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    type: "",
    country: "",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const { user, posts, setPosts, setLoading, setRefreshing } =
    useContext(AuthContext);

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
          alert(responseJson.message);
        }
        setLoading(false);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
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

          <Flex flexDir={"column"}>
            <Flex>
              <Button
                colorScheme="orange"
                variant={query.type === "sale" ? "solid" : "outline"}
                size={"lg"}
                onClick={() => switchType("sale")}
              >
                Buy
              </Button>
              <Button
                colorScheme="orange"
                variant={query.type === "rent" ? "solid" : "outline"}
                size={"lg"}
                onClick={() => switchType("rent")}
              >
                Rent
              </Button>
              <Button
                colorScheme="orange"
                variant={query.type === "shared" ? "solid" : "outline"}
                size={"lg"}
                onClick={() => switchType("shared")}
              >
                Shared
              </Button>
            </Flex>
            <Flex
              bg={"#fff"}
              borderRadius={"5px"}
              border={"3px solid #1f3e72"}
              p={"0.5rem 1rem"}
              justify={"space-between"}
              align={"center"}
              flexDir={["column", "row"]}
              gap={3}
              w={"100%"}
              flex={1}
            >
              <Flex align={"center"} flexDir={["column", "row"]}>
                {isDesktop && (
                  <HiLocationMarker color="#1f3e72" size={25} flex={1} />
                )}
                <Input
                  type="text"
                  placeholder="Search by city"
                  border={"none"}
                  outline={"none"}
                  color={"black"}
                  flex={3}
                  p={5}
                  w={"100%"}
                  onChange={(e) =>
                    setQuery((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
                <Input
                  type="text"
                  placeholder="Search by country"
                  border={"none"}
                  outline={"none"}
                  color={"black"}
                  flex={3}
                  p={5}
                  w={"100%"}
                  onChange={(e) =>
                    setQuery((prev) => ({ ...prev, country: e.target.value }))
                  }
                />

                <NumberInput
                  maxW={[32]}
                  min={0}
                  color={"black"}
                  onChange={(value) =>
                    setQuery((prev) => ({ ...prev, minPrice: value }))
                  }
                >
                  <NumberInputField
                    placeholder="Min price"
                    flex={1}
                    name="minPrice"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <NumberInput
                  maxW={32}
                  min={0}
                  color={"black"}
                  onChange={(value) =>
                    setQuery((prev) => ({ ...prev, maxPrice: value }))
                  }
                >
                  <NumberInputField
                    placeholder="Max price"
                    flex={1}
                    name="maxPrice"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>

              <IconButton
                colorScheme="orange"
                aria-label="Search"
                size="lg"
                onClick={() => {
                  const queryParams = new URLSearchParams(query).toString();
                  navigate(`/list?${queryParams}`);
                  fetchPosts();
                }}
                icon={<SearchIcon />}
              />
            </Flex>
          </Flex>

          <Flex justify={"space-between"} w={["100%", "70%"]}>
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
            <Flex align={"center"} flexDirection={"column"}>
              <Flex align={"center"}>
                <CountUp
                  end={28}
                  duration={4}
                  style={{ color: "#fff", fontSize: "2rem" }}
                />
                <Text fontSize={"1.5rem"} color={"orange"} fontWeight={"600"}>
                  +
                </Text>
              </Flex>
              <Text fontSize={".9rem"} color={"rgba(140 139 139)"}>
                Award Winnings
              </Text>
            </Flex>
          </Flex>
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
    </Flex>
  );
};

export default Hero;
