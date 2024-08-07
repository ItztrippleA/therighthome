import React from "react";
import {
  Flex,
  Text,
  Image,
  Link,
  Button,
  Box,
  Heading,
  Circle,
  Input,
  Icon,
} from "@chakra-ui/react";
import { FaApple, FaGooglePlay } from "react-icons/fa";
const GetStarted = () => {
  return (
    <Flex w={"100%"} justifyContent="center" alignItems="center">
      <Flex
        w={["90%", "80%"]}
        flexDir={"column"}
        px={[5, 12]}
        py={10}
        justify={"center"}
        align={"center"}
        bgColor={"#4066ff"}
        textAlign={"center"}
        gap={"1.5rem"}
        borderRadius={"10px"}
        border={"6px solid #5d77d6"}
      >
        <Text
          color={"white"}
          fontSize={{ base: "1.5rem", md: "2rem" }}
          fontWeight="bold"
        >
          Get Started with The Home Basket
        </Text>

        <Text color={"rgba(255, 255, 255, 0.78)"} fontSize={"0.9rem"}>
          Start by Downloading our app for amazing discounts
        </Text>
        {/* <Button
          bg="#5a73d7"
          border={"2px solid white"}
          borderRadius={"10px"}
          color="white"
          _hover={{ bg: "#F6874F", scale: 0.8 }}
          w={"250px"}
        >
          <Text fontSize="0.9rem" fontWeight={"600"}>
            Get Started
          </Text>
        </Button> */}
        <Flex
          direction={["column", "row"]}
          justify="center"
          align="center"
          padding="20px"
          gap="4"
        >
          <Link
            href="https://apps.apple.com/ng/app/the-home-basket/id6504646908"
            isExternal
          >
            <Button leftIcon={<Icon as={FaApple} />} colorScheme="black">
              Get Started with iOS
            </Button>
          </Link>
          <Link
            href="https://expo.dev/artifacts/eas/mtqQRz1pzPXmVBmhzfSwYT.apk"
            isExternal
          >
            <Button leftIcon={<Icon as={FaGooglePlay} />} colorScheme="blue">
              Get started with Android early access
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GetStarted;
