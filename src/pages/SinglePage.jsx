import {
  Flex,
  Heading,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import { singlePostData, userData } from "../lib/dummydata";
import { BiDollar, BiLocationPlus } from "react-icons/bi";
import Slider from "../components/Slider/Slider";
import Map from "../components/Map/Map";
import { useParams, useSearchParams } from "react-router-dom";

const SinglePage = () => {
  const facilities = singlePostData.postDetail.facilities;
  const mid = Math.ceil(facilities.length / 2);
  const firstHalf = facilities.slice(0, mid);
  const secondHalf = facilities.slice(mid);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  console.log(id);
  return (
    <Flex
      // position={"relative"}
      justify={"center"}
      pb={["1rem", "3rem"]}
      pt={["3rem", "0rem"]}
      w={"100%"}
    >
      <Flex
        // align={"center"}
        justify={"space-between"}
        direction={{ base: "column", md: "row" }}
        w={["90%", "75%"]}
        alignSelf={"center"}
      >
        <Flex flex={3} p={5} flexDir={"column"} gap={10}>
          <Slider images={singlePostData.images} />
          <Flex justify={"space-between"}>
            <Flex flexDir={"column"} gap={5}>
              <Heading>{singlePostData.title}</Heading>
              <Flex gap={2} align={"center"}>
                <BiLocationPlus />
                <Text color={"#888"} fontSize={["15px", "18px"]}>
                  {singlePostData.address}
                </Text>
              </Flex>
              <Flex align={"center"}>
                <Tag
                  size={["md", "lg"]}
                  variant="subtle"
                  colorScheme="orange"
                  align={"center"}
                >
                  <TagLeftIcon boxSize="20px" as={BiDollar} />
                  <TagLabel>{singlePostData.price}</TagLabel>
                </Tag>
              </Flex>
            </Flex>
            {/* <Flex
              flexDir={"column"}
              align={"center"}
              bgColor={"#FEEBC8"}
              justify={"center"}
              p={"30px"}
              borderRadius={10}
              gap={5}
            >
              <Image
                src={userData.img}
                w={"50px"}
                h={"50px"}
                borderRadius={"50%"}
                objectFit={"cover"}
              />
              <Text fontWeight={"600"} fontSize={"20px"}>
                {userData.name}
              </Text>
            </Flex> */}
          </Flex>
          <Text>{singlePostData.description}</Text>
        </Flex>
        <Flex flex={2} p={5} flexDir={"column"} bgColor={"#feebc8"} gap={10}>
          <Heading size={"md"}>General</Heading>

          <Flex flex={1} flexDir={"column"} p={1} gap={5}>
            <Flex
              flexDir={"column"}
              gap={5}
              bgColor={"#fff"}
              p={3}
              borderRadius={20}
            >
              <Heading size={"md"}>Other Features</Heading>
              <Flex>
                <Flex gap={1} flex={1} flexDir={"column"}>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Furnishing:
                    </Text>
                    <Text color={"#000"}>{singlePostData.furnishing}</Text>
                  </Flex>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Property Size:
                    </Text>
                    <Text color={"#000"}>{singlePostData.size}</Text>
                  </Flex>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Service Charge:
                    </Text>
                    <Text color={"#000"}>
                      {singlePostData.postDetail.charge ? "Yes" : "No"}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap={1} flex={1} flexDir={"column"}>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Condition:
                    </Text>
                    <Text color={"#000"}>{singlePostData.condition}</Text>
                  </Flex>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Parking Space::
                    </Text>
                    <Text color={"#000"}>{singlePostData.parking}</Text>
                  </Flex>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Listed By:
                    </Text>
                    <Text color={"#000"}>{singlePostData.listedBy}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={5}
              bgColor={"#fff"}
              p={3}
              borderRadius={20}
            >
              <Heading size={"md"}>Facilities</Heading>
              <Flex>
                <Flex gap={1} flex={1} flexDir={"column"}>
                  {firstHalf.map((item, i) => (
                    <Text color={"#999"} fontSize={"14"} key={i}>
                      {item}
                    </Text>
                  ))}
                </Flex>
                <Flex gap={1} flex={1} flexDir={"column"}>
                  {secondHalf.map((item, i) => (
                    <Text color={"#999"} fontSize={"14"} key={i}>
                      {item}
                    </Text>
                  ))}
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={5}
              bgColor={"#fff"}
              p={3}
              borderRadius={20}
            >
              <Heading size={"md"}>Contact Details</Heading>
              <Flex gap={1} flex={1} flexDir={"column"}>
                <Flex align={"center"} gap={1}>
                  <Text color={"#999"} fontSize={"14"}>
                    Name:
                  </Text>
                  <Text color={"#000"}>{singlePostData.name}</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Text color={"#999"} fontSize={"14"}>
                    Phone Number:
                  </Text>
                  <Text color={"#000"}>{singlePostData.phoneNumber}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flexDir={"column"}
              gap={5}
              // bgColor={"#fff"}
              p={3}
              borderRadius={20}
              h={300}
            >
              <Heading size={"md"}>Location</Heading>
              <Map data={[singlePostData]} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SinglePage;
