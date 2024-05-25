import { Flex, Text, Box } from "@chakra-ui/react";
import Header from "./../components/Header/Header";
import Hero from "./../components/Hero/Hero";
import Companies from "./../components/Companies/Companies";
import Residences from "./../components/Residences/Residences";
import Value from "./../components/Value/Value";
import Contact from "./../components/Contact/Contact";
import GetStarted from "./../components/GetStarted/GetStarted";
import Footer from "./../components/Footer/Footer";
const HomePage = () => {
  return (
    <Flex direction="column" flex={1} position={"relative"} overflow-x={"clip"}>
      <>
        <Box
          position={"absolute"}
          w={"20rem"}
          h={"20rem"}
          bg={"rgba(255,255,255,0.522)"}
          filter={"blur(100px)"}
        ></Box>

        <Hero />
      </>
      <Companies />
      <Residences />
      <Value />
      <Contact />
      <GetStarted />
    </Flex>
  );
};

export default HomePage;
