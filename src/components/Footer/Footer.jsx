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
} from "@chakra-ui/react";
const Footer = () => {
  return (
    <Flex w={"100%"} justifyContent="center" alignItems="center">
      <Flex
        w={["90%", "80%"]}
        flexDir={["column", "row"]}
        px={[5, 12]}
        py={10}
        justify={"space-between"}
        align={["flex-start", "center"]}
        textAlign={"center"}
        gap={"1.5rem"}
      >
        <Flex flexDir={"column"} alignItems={"flex-start"} gap={"1.5rem"}>
          <Image src="./logo.png" alt="value" h={"60px"} />
          <Text color={" rgb(140 139 139)"} fontSize={"0.9rem"}>
            Our vision is to make all people <br />
            the best place to live for them
          </Text>
        </Flex>
        <Flex flexDir={"column"} align={"flex-start"} gap={"1.5rem"}>
          <Text color={"#1f3e72"} fontSize={"1.5rem"} fontWeight={"bold"}>
            Information
          </Text>
          <Text
            color={" rgb(140 139 139)"}
            fontSize={"0.9rem"}
            textAlign={"left"}
          >
            145 Zone 7, Abuja Nigeria <br />
            the best place to live for them
          </Text>
          <Flex
            align={"flex-start"}
            // flexDir={"column"}
            gap={"1.5rem"}
            fontWeight={"500"}
          >
            <Text cursor={"pointer"}>About us</Text>
            <Text cursor={"pointer"}>Privacy Policy</Text>
            <Text cursor={"pointer"}>Terms and cnditions</Text>
            <Text cursor={"pointer"}></Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
