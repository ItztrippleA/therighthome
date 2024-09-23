import React, { useContext, useEffect, useCallback } from "react";
import { Box, Flex, useMediaQuery, Spinner } from "@chakra-ui/react";
import Filter from "../components/filter/Filter";
import Card from "../components/Card/Card";
import Map from "../components/Map/Map";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const ListPage = () => {
  const { fetchPosts, filteredPosts, posts, loading } = useContext(AuthContext);
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const location = useLocation();

  const memoizedFetchPosts = useCallback(
    (query) => {
      fetchPosts(query);
    },
    [fetchPosts]
  );

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
    memoizedFetchPosts(initialQuery);
  }, [location.search, memoizedFetchPosts]);

  return (
    <Flex
      justify="center"
      pb={["1rem", "3rem"]}
      pt={["3rem", "0rem"]}
      bg="#fff"
      w="100%"
    >
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        w={["90%", "75%"]}
        gap={10}
      >
        <Box flex={4}>
          <Filter onSearch={memoizedFetchPosts} />
          {loading ? (
            <Flex justify="center" align="center" mt={10}>
              <Spinner size="xl" />
            </Flex>
          ) : (
            <Flex gap={5} flexDir="column" mt={10}>
              {filteredPosts.length > 0
                ? filteredPosts.map((item) => (
                    <Card key={item._id} item={item} />
                  ))
                : posts.map((item) => <Card key={item._id} item={item} />)}
            </Flex>
          )}
        </Box>
        {isDesktop && (
          <Flex flex={2} pt={20} h={1000}>
            <Map data={filteredPosts.length > 0 ? filteredPosts : posts} />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ListPage;
