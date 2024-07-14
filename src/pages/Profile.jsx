import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import data from "../utils/accordion";
import { listData } from "../lib/dummydata";
import Card from "../components/Card/Card";
import { AuthContext } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Environment";

const Profile = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const { user, onOpen, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = async () => {
    // console.log(user.token);
    console.log(user.token);
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        console.log(responseJson);
        if (responseJson.success) {
          localStorage.removeItem("user");
          setUser(null);
          navigate("/");
        } else {
          alert(`error${responseJson.message}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("failed to logout");
        console.log(`logout error ${error}`);
      });
  };
  return (
    <Flex
      justify={"center"}
      pb={["1rem", "3rem"]}
      pt={["3rem", "0rem"]}
      bg={"#fff"}
      w={"100%"}
    >
      <Flex
        justify={"space-between"}
        direction={{ base: "column", md: "row" }}
        w={["90%", "75%"]}
        gap={10}
      >
        <Box flex={3} p={10}>
          <Flex justify={"space-between"}>
            <Heading>User Information</Heading>
            <Button
              bg="#1A3D5B"
              color="white"
              _hover={{ bg: "#F6874F" }}
              cursor={"pointer"}
            >
              <Text fontSize="md">Update Profile </Text>
            </Button>
          </Flex>
          <Flex flexDir={"column"} gap={10} paddingTop={20}>
            <Flex gap={10} align={"center"}>
              <Text>Avatar</Text>{" "}
              <Avatar
                name={`${user?.firstname} ${user?.lastname}`}
                src={user?.avatar}
              />
            </Flex>
            <Flex gap={10} align={"center"}>
              <Text>Username</Text>{" "}
              <Heading size={"md"}>{user?.username}</Heading>{" "}
            </Flex>
            <Flex gap={10} align={"center"}>
              <Text>E-mail</Text> <Heading size={"md"}>{user?.email}</Heading>
            </Flex>
            <Flex>
              <Button
                bg="#1A3D5B"
                color="white"
                _hover={{ bg: "#F6874F" }}
                cursor={"pointer"}
                onClick={logout}
              >
                <Text fontSize="md">Logout </Text>
              </Button>
            </Flex>
          </Flex>

          <Flex justify={"space-between"} mt={20}>
            <Heading>My List</Heading>
            <Button
              bg="#1A3D5B"
              color="white"
              _hover={{ bg: "#F6874F" }}
              cursor={"pointer"}
            >
              <Text fontSize="md">Add New Post </Text>
            </Button>
          </Flex>

          <Flex gap={5} flexDir={"column"} mt={10}>
            {listData.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Flex>
        </Box>
        <Flex flex={2}></Flex>
      </Flex>
    </Flex>
  );
};

export default Profile;
