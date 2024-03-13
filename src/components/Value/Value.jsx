import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../utils/accordion";

const Value = () => {
  return (
    <Flex w={"100%"} justifyContent="center" alignItems="center">
      <Flex
        w={["90%", "80%"]}
        flexDir={["column", "row"]}
        px={[5, 12]}
        // py={6}
        justify={"space-between"}
      >
        <Flex justifyContent="flex-start" alignItems="center" flex={1}>
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
            <Image src="./value.png" alt="value" h={"35rem"} w={"30rem"} />
          </Flex>
        </Flex>
        <Flex justifyContent="flex-start" alignItems="center" flex={1}>
          <Flex flexDir={"column"} gap={".5rem"}>
            <Text color={"orange"} fontSize={"1.5rem"} fontWeight={"600"}>
              Our Value
            </Text>
            <Text color={"#1f3e72"} fontWeight={"bold"} fontSize={"2.5rem"}>
              Value we give to you
            </Text>
            <Text className="secondaryText" fontSize={"0.9rem"}>
              We always ready to help by providing the best services for you
              <br />W believe a good place to live can make your life better
            </Text>

            <Accordion
              allowMultipleExpanded={false}
              preExpanded={[0]}
              className="accordion"
            >
              {data.map((item, index) => {
                const [className, setClassName] = React.useState(null);
                return (
                  <AccordionItem
                    key={index}
                    className={`accordionItem ${className}`}
                    uuid={index}
                  >
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordionButton">
                        <AccordionItemState>
                          {({ expanded }) =>
                            expanded
                              ? setClassName("expanded")
                              : setClassName("collapsed")
                          }
                        </AccordionItemState>
                        <Flex align={"center"} justify="space-between">
                          <Flex
                            p={"10px"}
                            background={"#eeeeff"}
                            borderRadius={"5px"}
                          >
                            {item.icon}
                          </Flex>
                          <Text
                            color={"#1f3e72"}
                            fontWeight={"bold"}
                            fontSize={"1.1rem"}
                          >
                            {item.heading}
                          </Text>
                          <Flex
                            p={"10px"}
                            background={"#eeeeff"}
                            borderRadius={"5px"}
                          >
                            <MdOutlineArrowDropDown size={20} fill="#4066ff" />
                          </Flex>
                        </Flex>
                        {/* <MdOutlineArrowDropDown /> */}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <Text className="secondaryText">{item.detail}</Text>
                    </AccordionItemPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Value;
