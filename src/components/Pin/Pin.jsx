import {
  Flex,
  Image,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import React from "react";
import { BiBed, BiDollar } from "react-icons/bi";
import { Marker, Popup } from "react-leaflet";

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <Flex gap={2} w={200}>
          <Image
            src={item.img}
            alt=""
            w={"64px"}
            h={"48px"}
            objectFit={"cover"}
          />
          <Flex flexDir={"column"} justify={"space-between"}>
            <Link href={`/${item.id}`}>{item.title}</Link>
            <Flex>
              <Tag size={"sm"} variant="subtle" colorScheme="cyan">
                <TagLeftIcon boxSize="12px" as={BiBed} />
                <TagLabel>{item.bedroom} bedroom </TagLabel>
              </Tag>
            </Flex>
            <Flex>
              <Tag
                size={"sm"}
                variant="subtle"
                colorScheme="orange"
                align={"center"}
              >
                <TagLeftIcon boxSize="15px" as={BiDollar} />
                <TagLabel>{item.price}</TagLabel>
              </Tag>
            </Flex>
          </Flex>
        </Flex>
      </Popup>
    </Marker>
  );
};

export default Pin;
