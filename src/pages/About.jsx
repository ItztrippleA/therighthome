import React, { useEffect } from "react";
import {
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
const About = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Flex direction={"column"}>
      <Flex
        justify={"center"}
        background={
          isDesktop
            ? "linear-gradient(90deg, #CCFCD9 +2.38%, #95B9FE 98.36%)"
            : "#f8f4fd"
        }
      >
        <Flex
          align="center"
          justify={"center"}
          minH="25vh"
          direction={"column"}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="700"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            About Us
          </Heading>
          <Box w={"100%"}>
            <Heading size="md" textAlign={"center"} color={"#F6874F"}>
              Come on in.. meet the management
            </Heading>
          </Box>
        </Flex>
      </Flex>
      <Flex
        direction={"column"}
        my={20}
        width={"100%"}
        align={"center"}
        gap={10}
      >
        <Flex
          direction={"column"}
          borderColor={"#c4c4c4"}
          borderWidth={1}
          width={"80%"}
          bgColor={"#FCFAF3"}
          // align={"center"}
          gap={5}
          p={10}
        >
          <>
            <Heading size="xl" textAlign={"center"} color={"#F6874F"}>
              Our Vision
            </Heading>
            <Flex
              direction={"column"}
              width={"100%"}
              bgColor={"#D8D8D3"}
              p={10}
            >
              <Text textAlign={"center"}>
                To revolutionize the the property listing experience by
                providing a seamless platform that prioritizes transparency,
                convenience, and trust worthiness which create a diverse and
                inclusive community where every user feels valued and supported
                throughout their real estate journey.
              </Text>
            </Flex>
          </>
          <>
            <Heading size="xl" textAlign={"center"} color={"#F6874F"}>
              Our Mission
            </Heading>
            <Flex
              direction={"column"}
              width={"100%"}
              bgColor={"#D8D8D3"}
              p={10}
            >
              <Text textAlign={"center"}>
                To revolutionize the the property listing experience by
                providing a seamless platform that prioritizes transparency,
                convenience, and trust worthiness which create a diverse and
                inclusive community where
              </Text>
            </Flex>
          </>
        </Flex>
        <Flex
          direction={"column"}
          borderColor={"#c4c4c4"}
          borderWidth={1}
          width={"80%"}
          bgColor={"#F1F2F2"}
          // align={"center"}
          gap={5}
          paddingTop={10}
        >
          <Flex w={"100%"} bgColor={"#C9D2DA"} p={5} justify={"center"}>
            <Text textAlign={"center"} color={"#F6874F"} fontSize={20}>
              "Driven by innovation and a passion for excellence, our leadership
              brings together expertise from various fields in the industry to
              create impactful solutions.
            </Text>
          </Flex>
          <Flex w={"100%"} flexDir={"column"}>
            {/* one */}
            <Flex
              flex={1}
              justify={"space-between"}
              flexDirection={["column", "row"]}
            >
              <Flex
                paddingLeft={[0, 20]}
                padding={[5, ""]}
                direction={["column", "row"]}
                gap={5}
                flex={[1, 4]}
              >
                <Flex
                  h={200}
                  w={["100%", 400]}
                  borderColor={"#F6874F"}
                  borderWidth={2}
                  borderRadius={20}
                  objectFit={"cover"}
                >
                  <Image
                    borderRadius={20}
                    src="./assets/images/chris.jpeg"
                    alt="chris"
                    h={"100%"}
                    w={"100%"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                  />
                </Flex>
                <Flex direction="column">
                  <Heading color={"#1A3D5C"}>CHRISTOPHER</Heading>
                  <Heading color={"#F6874F"}>BRIDGES</Heading>

                  <Box
                    borderTopWidth={2}
                    borderTopColor={"#F6874F"}
                    w={["100%", "70%"]}
                  >
                    <Text color={"#F6874F"}>Chief executive officer</Text>
                    <Text color={"#1A3D5C"}>
                      Became CEO of the Homebasket in August 2024, holds a
                      degree in Science and Law (Kings London and Leeds), and is
                      a Fellow of the Association of Residential Letting Agents.
                      He has 20 years of experience in letting and property
                      management. An industry expert.
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex flex={1}></Flex>
            </Flex>
            {/* two */}
            <Flex flex={1} flexDirection={["column", "row"]} w={"100%"}>
              <Flex flex={1}></Flex>
              <Flex
                paddingRight={[0, 20]}
                align={"center"}
                padding={[5, ""]}
                direction={["column-reverse", "row"]}
                gap={5}
                flex={[1, 4]}
                justify={"end"}
              >
                <Flex direction="column">
                  <Flex align={"center"} gap={2} flexWrap={"wrap"}>
                    <Heading color={"#1A3D5C"}>KALU</Heading>
                    <Heading color={"#F6874F"}>CHUKWUDI</Heading>
                  </Flex>

                  <Box
                    borderTopWidth={2}
                    borderTopColor={"#F6874F"}
                    w={["100%", "100%"]}
                  >
                    <Text color={"#F6874F"} textAlign={"right"}>
                      Chief Operating Officer. C.O.O
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  h={200}
                  w={["100%", 200]}
                  borderColor={"#F6874F"}
                  borderWidth={2}
                  borderRadius={20}
                  objectFit={"cover"}
                >
                  <Image
                    borderRadius={20}
                    src="./assets/images/chuks.jpeg"
                    alt="chris"
                    h={"100%"}
                    w={"100%"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                  />
                </Flex>
              </Flex>
            </Flex>
            {/* three */}
            <Flex
              flex={1}
              justify={"space-between"}
              flexDirection={["column", "row"]}
            >
              <Flex
                paddingLeft={[0, 20]}
                padding={[5, ""]}
                direction={["column", "row"]}
                gap={5}
                flex={[1, 4]}
                align={"center"}
              >
                <Flex
                  h={200}
                  w={["100%", 200]}
                  borderColor={"#F6874F"}
                  borderWidth={2}
                  borderRadius={20}
                  objectFit={"cover"}
                >
                  <Image
                    borderRadius={20}
                    src="./assets/images/johnson.jpeg"
                    alt="chris"
                    h={"100%"}
                    w={"100%"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                  />
                </Flex>
                <Flex direction="column">
                  <Flex align={"center"} gap={2} flexWrap={"wrap"}>
                    <Heading color={"#1A3D5C"}>NNENAYA</Heading>
                    <Heading color={"#F6874F"}>JONSON</Heading>
                  </Flex>

                  <Box
                    borderTopWidth={2}
                    borderTopColor={"#F6874F"}
                    w={["100%", "70%"]}
                  >
                    <Text color={"#F6874F"}>
                      Board of director - Strategic Management Newyork
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex flex={1}></Flex>
            </Flex>
            {/* four */}
            <Flex flex={1} flexDirection={["column", "row"]} w={"100%"}>
              <Flex flex={1}></Flex>
              <Flex
                paddingRight={[0, 20]}
                align={"center"}
                padding={[5, ""]}
                direction={["column-reverse", "row"]}
                gap={5}
                flex={[1, 4]}
                justify={"end"}
              >
                <Flex direction="column">
                  <Flex align={"center"} gap={2} flexWrap={"wrap"}>
                    <Heading color={"#1A3D5C"}>OKEKE</Heading>
                    <Heading color={"#F6874F"}>DANIEL</Heading>
                  </Flex>

                  <Box
                    borderTopWidth={2}
                    borderTopColor={"#F6874F"}
                    w={["100%", "100%"]}
                  >
                    <Text color={"#F6874F"} textAlign={"right"}>
                      Board of director - Information Technology, Turkey
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  h={200}
                  w={["100%", 200]}
                  borderColor={"#F6874F"}
                  borderWidth={2}
                  borderRadius={20}
                  objectFit={"cover"}
                >
                  <Image
                    borderRadius={20}
                    src="./assets/images/daniel.jpeg"
                    alt="chris"
                    h={"100%"}
                    w={"100%"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                  />
                </Flex>
              </Flex>
            </Flex>
            {/* five */}
            <Flex
              flex={1}
              justify={"space-between"}
              flexDirection={["column", "row"]}
            >
              <Flex
                paddingLeft={[0, 20]}
                padding={[5, ""]}
                direction={["column", "row"]}
                gap={5}
                flex={[1, 4]}
                align={"center"}
              >
                <Flex
                  h={200}
                  w={["100%", 200]}
                  borderColor={"#F6874F"}
                  borderWidth={2}
                  borderRadius={20}
                  objectFit={"cover"}
                >
                  <Image
                    borderRadius={20}
                    src="./assets/images/darl.jpeg"
                    alt="chris"
                    h={"100%"}
                    w={"100%"}
                    objectFit={"cover"}
                    cursor={"pointer"}
                  />
                </Flex>
                <Flex direction="column">
                  <Flex align={"center"} gap={2} flexWrap={"wrap"}>
                    <Heading color={"#1A3D5C"}>DARLINGTON</Heading>
                    <Heading color={"#F6874F"}>ONYENWE</Heading>
                  </Flex>

                  <Box
                    borderTopWidth={2}
                    borderTopColor={"#F6874F"}
                    w={["100%", "70%"]}
                  >
                    <Text color={"#F6874F"}>
                      Managing director - West Africa
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Flex flex={1}></Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default About;
