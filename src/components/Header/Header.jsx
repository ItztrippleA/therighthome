import React from "react";
import { Flex, Text, Image, Link, Button } from "@chakra-ui/react";
import { BiMenuAltRight } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
const Header = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Flex
      w={"100%"}
      align={"center"}
      px={4}
      py={2}
      direction={"column"}
      bg={"#131110"}
      boxShadow="base"
    >
      <Flex justify="space-between" align="center" w={["90%", "75%"]}>
        <Image
          src="./WhatsApp Image 2024-02-19 at 4.49.03 PM.jpeg"
          alt="logo"
          h={"60px"}
        />
        {!isMobile ? (
          <Flex gap={"2rem"} align={"center"} color={"white"}>
            <Link href="#">
              <Text fontSize="md">Residences</Text>
            </Link>
            <Link href="#">
              <Text fontSize="md">Our Values</Text>
            </Link>
            <Link href="#">
              <Text fontSize="md">Contact Us</Text>
            </Link>
            <Link href="#">
              <Button
                bg="#1A3D5B"
                color="white"
                _hover={{ bg: "#F6874F" }}
                cursor={"pointer"}
              >
                <Text fontSize="md">Contact </Text>
              </Button>
            </Link>
          </Flex>
        ) : (
          <Flex className="menu-icon">
            <BiMenuAltRight size="25px" fill="#fff" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
``;
