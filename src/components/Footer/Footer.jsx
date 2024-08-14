import React from "react";
import {
  Flex,
  Text,
  Image,
  Button,
  Box,
  Heading,
  Circle,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
          <Image src="./hblogowh.jpeg" alt="value" h={"60px"} />
          <Text color={" rgb(140 139 139)"} fontSize={"0.9rem"}>
            Worlds No.1 user centric platform
          </Text>
        </Flex>
        <Flex flexDir={"column"} align={"flex-start"} gap={"1.5rem"}>
          <Text color={"#1f3e72"} fontSize={"1.5rem"} fontWeight={"bold"}>
            Address
          </Text>
          <Text
            color={" rgb(140 139 139)"}
            fontSize={"0.9rem"}
            textAlign={"left"}
          >
            39A QUEENS ROAD, HYDE PARK,LEEDS. LS6 1NY. <br />
          </Text>
          <Flex
            align={"flex-start"}
            // flexDir={"column"}
            gap={"1.5rem"}
            fontWeight={"500"}
          >
            <Link to={"/about"}>
              <Text cursor={"pointer"}>About us</Text>
            </Link>
            <Link to={"/privacypolicy"}>
              <Text cursor={"pointer"}>Privacy Policy</Text>
            </Link>
            <Link to={"/termsandcondition"}>
              <Text cursor={"pointer"}>Terms and conditions</Text>
            </Link>
            <Text cursor={"pointer"}></Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
