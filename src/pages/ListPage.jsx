import React, { useContext, useEffect } from "react";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
import Filter from "../components/filter/Filter";
import Card from "../components/Card/Card";
import Map from "../components/Map/Map";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const ListPage = () => {
  const { fetchPosts, posts } = useContext(AuthContext);
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = {
      type: params.get("type") || "",
      city: params.get("city") || "",
      country: params.get("country") || "",
      minPrice: params.get("minPrice") || 0,
      maxPrice: params.get("maxPrice") || 0,
      property: params.get("property") || "",
    };
    fetchPosts(initialQuery);
  }, []);

  const handleSearch = (query) => {
    fetchPosts(query);
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
        <Box flex={3}>
          <Filter onSearch={handleSearch} />
          <Flex gap={5} flexDir={"column"} mt={10}>
            {posts.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Flex>
        </Box>
        <Flex flex={2} pt={20} h={1000}>
          {isDesktop && <Map data={posts} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListPage;
