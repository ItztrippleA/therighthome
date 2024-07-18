import { Flex, Text, Image, Button, Box } from "@chakra-ui/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
// import data from "../../utils/slider.json";
import { listData } from "../../lib/dummydata";

const Residences = () => {
  const data = listData;
  const SliderButtons = () => {
    const swiper = useSwiper();
    return (
      <Flex className="r-buttons" w={"100%"} justify={"flex-end"}>
        <Button onClick={() => swiper.slidePrev()} fontSize={"1.2rem"}>
          &lt;
        </Button>
        <Button onClick={() => swiper.slideNext()} fontSize={"1.2rem"}>
          &gt;
        </Button>
      </Flex>
    );
  };
  return (
    <Flex w={"100%"} align={"center"} justify={"center"} position={"relative"}>
      <Flex w={["90%", "80%"]} flexDirection={"column"}>
        <Box>
          <Text color={"orange"} fontSize={"1.5rem"} fontWeight={"600"}>
            Best Choices
          </Text>
          <Text color={"#1f3e72"} fontWeight={"bold"} fontSize={"2.5rem"}>
            Popular Residences
          </Text>
        </Box>
        <Box w={"100%"} pb={10}>
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            breakpoints={{
              400: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              750: {
                slidesPerView: 3,
              },
              950: {
                slidesPerView: 4,
              },
              1100: {
                slidesPerView: 5,
              },
            }}
          >
            <SliderButtons />
            {data.map((card, i) => (
              <SwiperSlide key={i}>
                <Flex
                  flexDirection={"column"}
                  gap={"0.6rem"}
                  borderRadius={"10px"}
                  // maxW={"max-content"}
                  margin={"auto"}
                  p={"1rem"}
                  transition={"all 300ms ease-in"}
                  className="r-card"
                >
                  <Image
                    src={card.images[0]}
                    alt="home"
                    w={"100%"}
                    // maxW={"15rem"}
                    h={"150px"}
                  />
                  <Flex fontSize={"1.2rem"} fontWeight={"600"}>
                    <Text color={"orange"}>$</Text>
                    <Text>{card.price}</Text>
                  </Flex>
                  <Text className="primaryText" fontSize={"1.2rem"}>
                    {card.title.length > 15
                      ? `${card.title.slice(0, 15)}...`
                      : card.title}
                  </Text>
                  <Text className="secondaryText" fontSize={"0.7rem"}>
                    {card.address}
                  </Text>
                </Flex>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Residences;
