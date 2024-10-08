import React from "react";
import {
  Flex,
  Text,
  Image,
  Link,
  Button,
  Box,
  Heading,
  Circle,
  Input,
} from "@chakra-ui/react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";
const Contact = () => {
  return (
    <Flex w={"100%"} justifyContent="center" alignItems="center">
      <Flex
        w={["100%", "80%"]}
        flexDir={["column", "row"]}
        px={[5, 12]}
        py={10}
        justify={"space-between"}
      >
        <Flex justifyContent="flex-start" alignItems="center" flex={1} p={10}>
          <Flex flexDir={"column"} gap={".5rem"}>
            <Text color={"orange"} fontSize={"1.5rem"} fontWeight={"600"}>
              Contact us
            </Text>
            <Text color={"#1f3e72"} fontWeight={"bold"} fontSize={"2.5rem"}>
              Easy to contact us
            </Text>
            <Text className="secondaryText" fontSize={"0.9rem"}>
              We always ready to help by providing the best services for you We{" "}
              <br />
              believe a good place to live can make your life better
            </Text>

            <Flex
              justify={"flex-start"}
              flexDir={["column", "row"]}
              gap={"1.5rem"}
            >
              <Flex flexDir={"column"} gap={"1rem"}>
                {/* Call Section */}
                <Flex
                  flexDir={"column"}
                  justify={"flex-start"}
                  w={"100%"}
                  p={"1rem"}
                  border={"0.8px solid rgba(128,128,128,0.143)"}
                  borderRadius={"5px"}
                  gap={"1rem"}
                  transition={"all 300ms ease-in"}
                  cursor={"pointer"}
                  // className="mode"
                >
                  <Flex flexDir={"row"} gap={"1.6rem"} w={"100%"}>
                    <Flex
                      justify={"center"}
                      p={"10px"}
                      background={"#eeeeff"}
                      borderRadius={"5px"}
                    >
                      <MdCall size="25px" fill="#4066ff" />
                    </Flex>
                    <Flex justify={"center"} flexDir={"column"}>
                      <Text fontSize={"1.1rem"} fontWeight={"600"}>
                        Call
                      </Text>
                      <Text fontSize={"1.1rem"}>+447853734503</Text>
                    </Flex>
                  </Flex>
                  <Flex justify={"center"} w={"100%"}>
                    <Link
                      href="tel:+447853734503"
                      style={{ width: "100%" }}
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        bg="#1A3D5B"
                        color="white"
                        _hover={{ bg: "#F6874F", transform: "scale(0.95)" }}
                        w={"100%"}
                      >
                        <Text fontSize="0.9rem" fontWeight={"600"}>
                          Call now
                        </Text>
                      </Button>
                    </Link>
                  </Flex>
                </Flex>

                {/* Chat Section */}
                <Flex
                  flexDir={"column"}
                  justify={"flex-start"}
                  w={"100%"}
                  p={"1rem"}
                  border={"0.8px solid rgba(128,128,128,0.143)"}
                  borderRadius={"5px"}
                  gap={"1rem"}
                  transition={"all 300ms ease-in"}
                  cursor={"pointer"}
                  className="mode"
                >
                  <Flex
                    flexDir={"row"}
                    align={"center"}
                    gap={"1.6rem"}
                    w={"100%"}
                  >
                    <Flex
                      justify={"center"}
                      p={"10px"}
                      background={"#eeeeff"}
                      borderRadius={"5px"}
                    >
                      <BsFillChatDotsFill size="25px" fill="#4066ff" />
                    </Flex>
                    <Flex justify={"center"} flexDir={"column"}>
                      <Text fontSize={"1.1rem"} fontWeight={"600"}>
                        Chat
                      </Text>
                      <Text fontSize={"1.1rem"}>+447853734503</Text>
                    </Flex>
                  </Flex>
                  <Flex justify={"center"} w={"100%"}>
                    <Link
                      href="sms:+447853734503"
                      style={{ width: "100%" }}
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        bg="#1A3D5B"
                        color="white"
                        _hover={{ bg: "#F6874F", transform: "scale(0.95)" }}
                        w={"100%"}
                      >
                        <Text fontSize="0.9rem" fontWeight={"600"}>
                          Chat now
                        </Text>
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
              {/* //here */}
              <Flex flexDir={"column"} gap={"1rem"}>
                <Flex
                  flexDir={"column"}
                  justify={"flex-start"}
                  w={"100%"}
                  p={"1rem"}
                  border={"0.8px solid rgba(128,128,128,0.143)"}
                  borderRadius={"5px"}
                  gap={"1rem"}
                  transition={"all 300ms ease-in"}
                  cursor={"pointer"}
                  // className="mode"
                >
                  <Flex flexDir={"row"} gap={"1.6rem"} w={"100%"}>
                    <Flex
                      justify={"center"}
                      p={"10px"}
                      background={"#eeeeff"}
                      borderRadius={"5px"}
                    >
                      <MdCall size="25px" fill="#4066ff" />
                    </Flex>
                    <Flex justify={"center"} flexDir={"column"}>
                      <Text fontSize={"1.1rem"} fontWeight={"600"}>
                        Call
                      </Text>
                      <Text fontSize={"1.1rem"}>+447817350938</Text>
                    </Flex>
                  </Flex>
                  <Flex justify={"center"} w={"100%"}>
                    <Link
                      href="tel:+447817350938"
                      style={{ width: "100%" }}
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        bg="#1A3D5B"
                        color="white"
                        _hover={{ bg: "#F6874F", transform: "scale(0.95)" }}
                        w={"100%"}
                      >
                        <Text fontSize="0.9rem" fontWeight={"600"}>
                          Call now
                        </Text>
                      </Button>
                    </Link>
                  </Flex>
                </Flex>

                <Flex
                  flexDir={"column"}
                  justify={"flex-start"}
                  w={"100%"}
                  p={"1rem"}
                  border={"0.8px solid rgba(128,128,128,0.143)"}
                  borderRadius={"5px"}
                  gap={"1rem"}
                  transition={"all 300ms ease-in"}
                  cursor={"pointer"}
                  className="mode"
                >
                  <Flex
                    flexDir={"row"}
                    align={"center"}
                    gap={"1.6rem"}
                    w={"100%"}
                  >
                    <Flex
                      justify={"center"}
                      p={"10px"}
                      background={"#eeeeff"}
                      borderRadius={"5px"}
                    >
                      <BsFillChatDotsFill size="25px" fill="#4066ff" />
                    </Flex>
                    <Flex justify={"center"} flexDir={"column"}>
                      <Text fontSize={"1.1rem"} fontWeight={"600"}>
                        Chat
                      </Text>
                      <Text fontSize={"1.1rem"}>+447817350938</Text>
                    </Flex>
                  </Flex>
                  <Flex justify={"center"} w={"100%"}>
                    <Link
                      href="sms:+447817350938"
                      style={{ width: "100%" }}
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        bg="#1A3D5B"
                        color="white"
                        _hover={{ bg: "#F6874F", transform: "scale(0.95)" }}
                        w={"100%"}
                      >
                        <Text fontSize="0.9rem" fontWeight={"600"}>
                          Chat now
                        </Text>
                      </Button>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" alignItems="center" flex={1}>
          <Flex
            w={"30rem"}
            h={"35rem"}
            borderRadius={"15rem 15rem 0 0"}
            border={"8px solid rgba(255, 255, 255, 0.12)"}
            overflow={"hidden"}
            // flex={1}
            justify={"center"}
            align={"center"}
          >
            <Image src="./contact.jpg" alt="value" h={"35rem"} w={"30rem"} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Contact;
