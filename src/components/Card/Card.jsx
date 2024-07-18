import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  BiBath,
  BiBed,
  BiDollar,
  BiFullscreen,
  BiLocationPlus,
} from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const navigate = useNavigate();
  console.log(item);
  return (
    <Flex
      p={3}
      gap={[3, 5]}
      h={[370, 200]}
      cursor={"pointer"}
      flexDir={["column", "row"]}
      onClick={() => navigate(`/${item.id}`)}
    >
      <Flex flex={1}>
        <Image src={item?.images[0]} alt="image" w={"100%"} borderRadius={15} />
      </Flex>
      <Flex flexDir={"column"} flex={2} justify={"space-between"}>
        <Heading size={["sm", "md"]}>
          {item.title.length > 30
            ? `${item.title.slice(0, 35)}...`
            : item.title}
        </Heading>
        <Flex align={"center"} gap={2}>
          <BiLocationPlus />
          <Text color={"#888"} fontSize={["15px", "18px"]}>
            {item.address}
          </Text>
        </Flex>
        <Flex align={"center"}>
          <Tag
            size={["md", "lg"]}
            variant="subtle"
            colorScheme="orange"
            align={"center"}
          >
            <TagLeftIcon boxSize="15px" as={BiDollar} />
            <TagLabel>{item.price}</TagLabel>
          </Tag>
        </Flex>
        <Flex justify={"space-between"} align={"center"}>
          <Flex gap={3}>
            <Tag size={"md"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={BiBed} />
              <TagLabel>{item.bedroom} </TagLabel>
            </Tag>
            <Tag size={"md"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={BiBath} />
              <TagLabel>{item.bathroom} </TagLabel>
            </Tag>
            <Tag size={"md"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={BiFullscreen} />
              <TagLabel>{item.size}</TagLabel>
            </Tag>
          </Flex>
          <Flex gap={5}>
            <CiHeart size="35px" />
            {/* <CiHeart size="35px" /> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
