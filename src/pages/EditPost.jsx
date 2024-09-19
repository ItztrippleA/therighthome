import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Textarea,
  useMediaQuery,
  Image,
  SimpleGrid,
  Select,
  Tag,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../Environment";
import { facilities, proptypes } from "../lib/dummydata";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import UploadWidget from "../components/UploadWidget/UploadWidget";
import GooglePlacesAutocomplete from "../components/GooglePlaces/GooglePlacesAutocomplete";

function EditPost() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedFaciItems, setSelectedFaciItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onOpen: onErrorOpen,
    onClose: onErrorClose,
  } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateSuccessOpen,
    onOpen: onUpdateSuccessOpen,
    onClose: onUpdateSuccessClose,
  } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      console.log("data", data.data);
      if (data.success) {
        const { id, userId, user, isSaved, ...postDataWithoutIdAndUser } =
          data.data;
        console.log(postDataWithoutIdAndUser);
        setPost({
          postData: { ...postDataWithoutIdAndUser },
          postDetail: {
            ...data.postDetail,
          },
        });
        setImages(data.data.images);
        setSelectedFaciItems(data.data.postDetail.facilities || []);
      } else {
        setErrorMessage("Failed to fetch post");
        onErrorOpen();
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setErrorMessage("An error occurred while fetching the post");
      onErrorOpen();
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      //   const { id, userId, ...postDataWithoutIdAndUser } = post.postData;
      const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          postData: {
            ...post.postData,
            images: images,
          },
          postDetail: {
            ...post.postDetail,
            facilities: selectedFaciItems,
          },
        }),
      });

      if (response.status === 403) {
        setErrorMessage("You don't have permission to update this post");
        onErrorOpen();
        return;
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        onUpdateSuccessOpen();
      } else {
        setErrorMessage(data.message || "Failed to update post");
        onErrorOpen();
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("An error occurred while updating the post");
      onErrorOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        onClose();
        onSuccessOpen();
      } else {
        setErrorMessage("Failed to delete post");
        onErrorOpen();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setErrorMessage("An error occurred while deleting the post");
      onErrorOpen();
    }
    setLoading(false);
  };

  const handleImageClick = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Flex
      justify="center"
      pb={["1rem", "3rem"]}
      pt={["3rem", "0rem"]}
      bg="#fff"
      w="100%"
    >
      <Flex
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        w={["90%", "75%"]}
        gap={10}
      >
        <Box flex={3} p={[0, 10]}>
          <Heading mb={6}>Edit Post</Heading>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={post.postData.title}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, title: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              value={post.postData.price}
              type="Number"
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, price: Number(e.target.value) },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Property Type</FormLabel>
            <Select
              value={post.postData.type}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, type: e.target.value },
                })
              }
            >
              {Object.keys(proptypes).map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input
              placeholder="Address"
              value={post.postData.address}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, address: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Size (sqm)</FormLabel>
            <Input
              value={post.postData.size}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, size: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Bedrooms</FormLabel>
            <Input
              value={post.postData.bedroom}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, bedroom: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Bathrooms</FormLabel>
            <Input
              value={post.postData.bathroom}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, bathroom: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Parking Spaces</FormLabel>
            <Input
              value={post.postData.parking}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, parking: e.target.value },
                })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={post.postData.description}
              onChange={(e) =>
                setPost({
                  ...post,
                  postData: { ...post.postData, description: e.target.value },
                })
              }
            />
          </FormControl>
          {post.postData.country !== "Nigeria" && (
            <>
              <FormControl mb={4}>
                <FormLabel>EPC Rating</FormLabel>
                <Select
                  value={post.postData.epcRating}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      postData: { ...post.postData, epcRating: e.target.value },
                    })
                  }
                >
                  {["A", "B", "C", "D", "E", "F", "G"].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Tax Band</FormLabel>
                <Select
                  value={post.postData.taxBand}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      postData: { ...post.postData, taxBand: e.target.value },
                    })
                  }
                >
                  {["A", "B", "C", "D", "E", "F", "G", "H", "I"].map((band) => (
                    <option key={band} value={band}>
                      {band}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
          {facilities && (
            <FormControl mb={4}>
              <FormLabel>Facilities</FormLabel>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Select Facilities
                </MenuButton>
                <MenuList>
                  {facilities.map((facility) => (
                    <MenuItem
                      key={facility}
                      onClick={() => {
                        if (selectedFaciItems.includes(facility)) {
                          setSelectedFaciItems(
                            selectedFaciItems.filter(
                              (item) => item !== facility
                            )
                          );
                        } else {
                          setSelectedFaciItems([
                            ...selectedFaciItems,
                            facility,
                          ]);
                        }
                      }}
                    >
                      {facility}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Wrap mt={2}>
                {selectedFaciItems.map((facility) => (
                  <WrapItem key={facility}>
                    <Tag size="md" variant="solid" colorScheme="blue">
                      {facility}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </FormControl>
          )}
          <FormControl mb={4}>
            <FormLabel>Images</FormLabel>
            <Flex gap={10} flexDir={["column", "row"]}>
              {images.map((item, i) => (
                <Image
                  src={item}
                  h={"100px"}
                  w={"100px"}
                  onClick={() => handleImageClick(i)}
                  key={i}
                  cursor="pointer"
                />
              ))}
            </Flex>
            {images.length <= 5 && (
              <UploadWidget
                uwConfig={{
                  cloudName: "dxn3xdcgf",
                  uploadPreset: "homeBasket",
                  multiple: true,
                  folder: "webUploads",
                }}
                setImages={setImages}
                images={images}
              />
            )}
          </FormControl>
          <Button
            colorScheme="blue"
            onClick={handleUpdate}
            isLoading={loading}
            mr={3}
          >
            Update Post
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            Delete Post
          </Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this post?</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDelete}
              isLoading={loading}
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isErrorOpen} onClose={onErrorClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onErrorClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Post deleted successfully!</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onSuccessClose();
                navigate("/profile");
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isUpdateSuccessOpen} onClose={onUpdateSuccessClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Post updated successfully!</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onUpdateSuccessClose();
                navigate("/profile");
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default EditPost;
