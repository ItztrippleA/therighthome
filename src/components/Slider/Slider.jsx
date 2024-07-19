import { CloseButton, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const Slider = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(null);
  console.log(images);
  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };
  return (
    <Flex h={"350px"} gap={5}>
      {imageIndex !== null && (
        <Flex
          position={"absolute"}
          w={"100vw"}
          h={"100vh"}
          top={0}
          left={0}
          bgColor={"#000"}
          align={"center"}
        >
          <Flex>
            <BiLeftArrow
              style={{ flex: 1 }}
              color="#fff"
              size={"50px"}
              cursor={"pointer"}
              onClick={() => changeSlide("left")}
            />
          </Flex>
          <Flex flex={1}>
            <Image flex={10} src={images[imageIndex]} w={"100%"} />
          </Flex>
          <Flex>
            <BiRightArrow
              style={{ flex: 1 }}
              color="#fff"
              size={"50px"}
              cursor={"pointer"}
              onClick={() => changeSlide("right")}
            />
          </Flex>
          <Flex>
            <CloseButton
              color={"#fff"}
              position={"absolute"}
              right={"25px"}
              top={"25px"}
              fontSize={"40px"}
              onClick={() => setImageIndex(null)}
            />
          </Flex>
        </Flex>
      )}
      <Flex flex={3}>
        {images && (
          <Image
            src={images[0]}
            alt=""
            borderRadius={"10px"}
            objectFit={"cover"}
            onClick={() => setImageIndex(0)}
          />
        )}
      </Flex>
      <Flex flexDir={"column"} flex={1} justify={"space-between"} gap={5}>
        {images?.slice(1).map((image, index) => {
          return (
            <Image
              src={image}
              alt=""
              key={index}
              borderRadius={"10px"}
              objectFit={"cover"}
              h={"100px"}
              onClick={() => setImageIndex(index + 1)}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Slider;
