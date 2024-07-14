import React, { useContext } from "react";
import { Flex, Text, Image, Link, Button, Avatar } from "@chakra-ui/react";
import { BiMenuAltRight } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Header = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const navigate = useNavigate();
  const { user, onOpen, onOpenReg } = useContext(AuthContext);
  return (
    <Flex
      w={"100%"}
      align={"center"}
      px={4}
      py={2}
      direction={"column"}
      bg={"#000"}
      boxShadow="base"
    >
      <Flex justify="space-between" align="center" w={["90%", "75%"]}>
        <Image
          src="./hbLogo.jpeg"
          alt="logo"
          h={"60px"}
          onClick={() => navigate("/")}
          cursor={"pointer"}
        />
        {!isMobile ? (
          <Flex gap={"2rem"} align={"center"} color={"white"}>
            <Link href="/list">
              <Text fontSize="md">Residences</Text>
            </Link>
            <Link href="#">
              <Text fontSize="md">Our Values</Text>
            </Link>
            <Link href="#" onClick={onOpen}>
              {user ? (
                <Avatar
                  name={`${user.firstname} ${user.lastname}`}
                  src={user.avatar}
                />
              ) : (
                <Text fontSize="md">Sign in</Text>
              )}
            </Link>
            {user ? (
              <Link href="/profile">
                <Button
                  bg="#1A3D5B"
                  color="white"
                  _hover={{ bg: "#F6874F" }}
                  cursor={"pointer"}
                >
                  <Text fontSize="md">Profile </Text>
                </Button>
              </Link>
            ) : (
              <Button
                bg="#1A3D5B"
                color="white"
                _hover={{ bg: "#F6874F" }}
                cursor={"pointer"}
                onClick={onOpenReg}
              >
                <Text fontSize="md">Sign Up </Text>
              </Button>
            )}
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
