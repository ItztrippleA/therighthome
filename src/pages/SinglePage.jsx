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
import React, { useContext, useEffect } from "react";
import { singlePostData, userData } from "../lib/dummydata";
import { BiDollar, BiLocationPlus } from "react-icons/bi";
import Slider from "../components/Slider/Slider";
import Map from "../components/Map/Map";
import { useParams, useSearchParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const SinglePage = () => {
  const { id } = useParams();
  const { fetchPost, post, setPost } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");

  useEffect(() => {
    fetchPost(id);
    // console.log(post);
  }, []);
  const facilities = post?.postDetail?.facilities;
  const mid = Math.ceil(facilities?.length / 2);
  const firstHalf = facilities?.slice(0, mid);
  const secondHalf = facilities?.slice(mid);

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
          <Slider images={post.images} />
          <Flex justify={"space-between"}>
            <Flex flexDir={"column"} gap={5}>
              <Heading>{post.title}</Heading>
              <Flex gap={2} align={"center"}>
                <BiLocationPlus />
                <Text color={"#888"} fontSize={["15px", "18px"]}>
                  {post.address}
                </Text>
              </Flex>
              <Flex align={"center"}>
                <Tag
                  size={["md", "lg"]}
                  variant="subtle"
                  colorScheme="orange"
                  align={"center"}
                >
                  {/* <TagLeftIcon boxSize="20px" as={BiDollar} /> */}
                  <TagLabel>
                    {" "}
                    {post.postDetail?.income === "₦"
                      ? new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(post.price)
                      : new Intl.NumberFormat("en-GB", {
                          style: "currency",
                          currency: "GBP",
                        }).format(post.price)}
                  </TagLabel>
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
          <Text>{post.description}</Text>
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
                  {post.property !== "land" && (
                    <Flex align={"center"} gap={1}>
                      <Text color={"#999"} fontSize={"14"}>
                        Furnishing:
                      </Text>
                      <Text color={"#000"}>{post.furnishing}</Text>
                    </Flex>
                  )}
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Property Size:
                    </Text>
                    <Text color={"#000"}>{post.size}</Text>
                  </Flex>
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Service Charge:
                    </Text>
                    <Text color={"#000"}>
                      {post?.postDetail?.charge ? "Yes" : "No"}
                    </Text>
                  </Flex>
                  {post.country === "United Kingdom" &&
                    post.property !== "land" &&
                    post.property !== "hotel" && (
                      <>
                        <Flex align={"center"} gap={1}>
                          <Text color={"#999"} fontSize={"14"}>
                            EPC Rating:
                          </Text>
                          <Text color={"#000"}>{post.epcRating}</Text>
                        </Flex>
                        <Flex align={"center"} gap={1}>
                          <Text color={"#999"} fontSize={"14"}>
                            Tax Band:
                          </Text>
                          <Text color={"#000"}>{post.taxBand}</Text>
                        </Flex>
                      </>
                    )}
                </Flex>
                <Flex gap={1} flex={1} flexDir={"column"}>
                  {post.property !== "land" && (
                    <>
                      <Flex align={"center"} gap={1}>
                        <Text color={"#999"} fontSize={"14"}>
                          Condition:
                        </Text>
                        <Text color={"#000"}>{post.condition}</Text>
                      </Flex>
                      <Flex align={"center"} gap={1}>
                        <Text color={"#999"} fontSize={"14"}>
                          Parking Space:
                        </Text>
                        <Text color={"#000"}>{post.parking}</Text>
                      </Flex>
                    </>
                  )}
                  <Flex align={"center"} gap={1}>
                    <Text color={"#999"} fontSize={"14"}>
                      Listed By:
                    </Text>
                    <Text color={"#000"}>{post.listedBy}</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {post.property !== "land" && (
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
                    {firstHalf?.map((item, i) => (
                      <Text color={"#999"} fontSize={"14"} key={i}>
                        {item}
                      </Text>
                    ))}
                  </Flex>
                  <Flex gap={1} flex={1} flexDir={"column"}>
                    {secondHalf?.map((item, i) => (
                      <Text color={"#999"} fontSize={"14"} key={i}>
                        {item}
                      </Text>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            )}
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
                  <Text color={"#000"}>{post.name}</Text>
                </Flex>
                <Flex align={"center"} gap={1}>
                  <Text color={"#999"} fontSize={"14"}>
                    Phone Number:
                  </Text>
                  <Text color={"#000"}>{post.phoneNumber}</Text>
                </Flex>
              </Flex>
            </Flex>
            {/* <Flex
              flexDir={"column"}
              gap={5}
              // bgColor={"#fff"}
              p={3}
              borderRadius={20}
              h={300}
            >
              <Heading size={"md"}>Location</Heading>
              <Map data={[post]} />
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SinglePage;
