import React, { useContext } from "react";
import {
  Flex,
  Text,
  Image,
  Link,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import { BiMenuAltRight } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Header = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const navigate = useNavigate();
  const { user, onOpen, onOpenReg } = useContext(AuthContext);
  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();
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
            {user ? (
              <Avatar
                name={`${user.firstname} ${user.lastname}`}
                src={user.avatar}
              />
            ) : (
              <Link onClick={onOpen}>
                <Text fontSize="md">Sign in</Text>
              </Link>
            )}
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
            <BiMenuAltRight
              size="25px"
              fill="#fff"
              onClick={() => onOpenMenu()}
            />
          </Flex>
        )}
      </Flex>
      {isMobile && (
        <Modal onClose={onCloseMenu} size={"full"} isOpen={isOpenMenu}>
          <ModalOverlay />
          <ModalContent bgColor={"#000"}>
            <ModalHeader color={"#fff"}>Menu's</ModalHeader>
            <ModalCloseButton color={"#fff"} />
            <ModalBody justifyContent={"center"} alignItems={"center"}>
              <Flex
                align={"center"}
                justify={"center"}
                w={"100%"}
                flexDir={"column"}
                flex={1}
                gap={10}
                marginTop={30}
              >
                <Link href="/">
                  <Heading color={"#fff"}>Home</Heading>
                </Link>
                <Link href="/list">
                  <Heading color={"#fff"}>Residence</Heading>
                </Link>
                {user ? (
                  <Link href="/profile">
                    <Heading color={"#fff"}>Profile</Heading>
                  </Link>
                ) : (
                  <>
                    <Link onClick={onOpen}>
                      <Heading color={"#fff"}>Sign in</Heading>
                    </Link>
                    <Heading color={"#fff"} onClick={onOpenReg}>
                      Sign Up
                    </Heading>
                  </>
                )}
                <Link href="/">
                  <Heading color={"#fff"}>Our Vision</Heading>
                </Link>

                <Link href="/">
                  <Heading color={"#fff"}>About us</Heading>
                </Link>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onCloseMenu}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Flex>
  );
};

export default Header;
``;
