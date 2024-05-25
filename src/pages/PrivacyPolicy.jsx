import React, { useEffect } from "react";
import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
const PrivacyPolicy = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Flex direction={"column"}>
      <Flex
        justify={"center"}
        background={
          isDesktop
            ? "linear-gradient(90deg, #fff +2.38%, #c49bee 98.36%)"
            : "#f8f4fd"
        }
      >
        <Flex
          align="center"
          justify={"center"}
          minH="25vh"
          direction={"column"}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="700"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            Privacy Policy
          </Heading>
          <Box w={"70%"}>
            <Text textAlign={"center"}>
              Please read these Privacy Policy carefully as they contain
              important information for the use of Home Basket
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex direction={"column"} my={20} width={"100%"} align={"center"}>
        <Flex
          direction={"column"}
          borderColor={"black"}
          borderWidth={1}
          width={"80%"}
          // align={"center"}
          p={10}
        >
          <Text>
            This privacy policy will help you understand how we use and
            safeguard the personal data you provide to us when you visit or use
            our channels. This is because at HOME BASKET, we take your privacy
            seriously and handles it with the highest level of confidentiality
            to ensure that your personal information collected are safe and
            secured. Please read carefully to understand our practices regarding
            your personal information.
          </Text>

          <Heading mt={10}>Policy Updates</Heading>
          <Text mt={10}>
            We reserve the right to change this policy at any given time to
            reflect changes in our practices or applicable laws of which we will
            notify you of any material changes by posting the update policy on
            our website. If you want to make sure that you are up to date with
            the latest changes, we advise you to frequently visit this page.
          </Text>
          <Heading mt={10}>What user data we collect:</Heading>
          <Text mt={10}>
            When you visit this website, we may collect the following data:
          </Text>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>your name</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>you contact information such phone number</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>email address.</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>and location</Text>
          </Flex>

          <Heading mt={10}>Why we collect your data:</Heading>
          <Text mt={10}>We collect your data for the following purposes:</Text>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>
              {" "}
              to provide you with a personalised experience and improve our
              services.
            </Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>to facilitate your property searches</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>To connect you with real estate agents,</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>
              and provide you with relevant listings and recommendations.
            </Text>
          </Flex>

          <Heading mt={10}>Information Sharing</Heading>
          <Text mt={10}>
            We may share your personal information with the following third
            parties:
          </Text>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text> service providers who perform services on our behalf</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>affiliates and subsidiaries</Text>
          </Flex>
          <Flex gap={3} mt={5} align={"center"}>
            <Circle backgroundColor={"#000"} size={3}></Circle>
            <Text>advertising partners</Text>
          </Flex>

          <Heading mt={10}>Safeguarding and securing the data</Heading>
          <Text mt={10}>
            ⁠Home Basket is committed to securing your data and keeping it
            confidential. We implement reasonable measures to protect your
            personal information from unauthorized access, use, alteration or
            disclosure. However, no method of transmission over the internet or
            electronic storage is 100% secure and we cannot guarantee absolute
            security. We will do our best to ensure that your data is in safe
            our hands!
          </Text>

          <Heading mt={10}>Third Party Link and Services</Heading>
          <Text mt={10}>
            Our app may integrate links to third-party services or website such
            as payment gateways or social media platforms that are not governed
            by this privacy policy. We are not responsible for the privacy
            practices of these third parties, and we encourage you to review
            their policies.
          </Text>
          <Heading mt={10}>User’s Rights:</Heading>
          <Text mt={10}>
            You may have certain rights regarding your personal information such
            as the right to access, correct, delete or object to the processing
            of your personal information.
          </Text>
          <Heading mt={10}>Exit Right of User:</Heading>
          <Text mt={10}>
            If you no longer desire to receive communications from us, you can
            easily opt-out by adjusting your notification settings in the app.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PrivacyPolicy;
