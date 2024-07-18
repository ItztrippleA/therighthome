import React, { useContext, useEffect } from "react";
import { listData } from "../lib/dummydata";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Filter from "../components/filter/Filter";
import Card from "../components/Card/Card";
import Map from "../components/Map/Map";
import { AuthContext } from "../context/AuthContext";

const ListPage = () => {
  const data = listData;
  const { fetchPosts, posts } = useContext(AuthContext);
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  useEffect(() => {
    fetchPosts();
  }, []);
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
        <Box flex={3}>
          <Filter />
          <Flex gap={5} flexDir={"column"} mt={10}>
            {posts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Flex>
        </Box>
        <Flex flex={2} pt={20} h={1000}>
          {isDesktop && <Map data={data} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListPage;
