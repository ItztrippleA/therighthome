import { AddIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Image,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import {
  BiBath,
  BiBed,
  BiDollar,
  BiFullscreen,
  BiLocationPlus,
} from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../Environment";

const Card = ({ item, isMyList }) => {
  const navigate = useNavigate();
  const { user, fetchPosts } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the item is saved when the component mounts
    setIsSaved(item.isSaved);
  }, [item.isSaved]);

  const handleSave = async (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the heart icon
    if (!user) {
      alert("Please login to save properties");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/save`, {
        method: "POST",
        body: JSON.stringify({
          postId: item.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const responseJson = await response.json();

      if (responseJson.success) {
        setIsSaved(!isSaved);
        alert(responseJson.message);
        fetchPosts(); // Refresh the posts to update the UI
      } else {
        alert(`Error: ${responseJson.message}`);
      }
    } catch (error) {
      alert("An error occurred while saving the property");
      console.error(`Save error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    if (isMyList) {
      navigate(`/edit/${item.id}`);
    } else {
      navigate(`/${item.id}`);
    }
  };

  return (
    <Flex
      p={3}
      gap={[3, 5]}
      h={[370, 200]}
      cursor={"pointer"}
      flexDir={["column", "row"]}
      onClick={handleCardClick}
    >
      <Flex flex={1} h={[200, "100%"]} position="relative">
        <Image src={item?.images[0]} alt="image" w={"100%"} borderRadius={15} />
        <Tag
          position="absolute"
          top={2}
          left={2}
          size="sm"
          variant="solid"
          colorScheme="gray"
          opacity={0.7}
        >
          {item.property}
        </Tag>
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
            <TagLabel>
              {item.postDetail?.income === "₦"
                ? new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(item.price)
                : new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(item.price)}
            </TagLabel>
          </Tag>
        </Flex>
        <Flex justify={"space-between"} align={"center"}>
          <Flex gap={3}>
            {item.property !== "land" && (
              <>
                <Tag size={"md"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={BiBed} />
                  <TagLabel>{item.bedroom} </TagLabel>
                </Tag>
                <Tag size={"md"} variant="subtle" colorScheme="cyan">
                  <TagLeftIcon boxSize="12px" as={BiBath} />
                  <TagLabel>{item.bathroom} </TagLabel>
                </Tag>
              </>
            )}
            <Tag size={"md"} variant="subtle" colorScheme="cyan">
              <TagLeftIcon boxSize="12px" as={BiFullscreen} />
              <TagLabel>{item.size}</TagLabel>
            </Tag>
          </Flex>
          <IconButton
            icon={isSaved ? <FaHeart color="orange" /> : <CiHeart />}
            onClick={handleSave}
            isLoading={loading}
            variant="ghost"
            aria-label={isSaved ? "Unsave property" : "Save property"}
            size="lg"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
