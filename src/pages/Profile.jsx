import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
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
  useMediaQuery,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Textarea,
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../Environment";
import Card from "../components/Card/Card";
import { facilities, listData, proptypes } from "../lib/dummydata";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { BsFillHousesFill, BsFillPeopleFill } from "react-icons/bs";
import { RiGalleryFill, RiGalleryLine, RiHotelFill } from "react-icons/ri";
import { GiFamilyHouse, GiGalley } from "react-icons/gi";
import { FaPlusCircle } from "react-icons/fa";
import GooglePlacesAutocomplete from "../components/GooglePlaces/GooglePlacesAutocomplete";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MdPictureAsPdf, MdPictureInPicture } from "react-icons/md";
import UploadWidget from "../components/UploadWidget/UploadWidget";
import MembershipModal from "./MembershipModal";
import MembershipModalUk from "./MembershipModalUk";

const Profile = () => {
  const [isDesktop] = useMediaQuery("(min-width: 1050px)");
  const {
    user,
    setUser,
    setLoading,
    loading,
    setProperty,
    property,
    setmembershipExist,
    membershipExist,
    country,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [propType, setPropType] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState(user?.avatar || "");
  const [propertyList, setPropertyList] = useState(proptypes["sell"]);
  const [selectedFaciItems, setSelectedFaciItems] = useState([]);
  const [images, setImages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleMenuChange = (values) => {
    setSelectedFaciItems(values);
    setProperty((prevState) => ({
      ...prevState,
      postDetail: {
        ...prevState.postDetail,
        facilities: values,
      },
    }));
  };
  const handleSelect = (value) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        security: value === "Yes",
      },
    }));
  };

  const handleSelectServ = (value) => {
    setProperty((prevState) => ({
      ...prevState,
      postDetail: {
        ...prevState.postDetail,
        charge: value === "Yes",
      },
    }));
  };
  const handleSelectFur = (value) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        furnishing: value,
      },
    }));
  };
  const handleSelectCon = (value) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        condition: value,
      },
    }));
  };
  const handleSelectBy = (value) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        listedBy: value,
      },
    }));
  };
  const handleImageClick = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const validateForm = () => {
    const {
      type,
      address,
      size,
      title,
      bedroom,
      bathroom,
      parking,
      description,
      price,
      listedBy,
      name,
      phoneNumber,
    } = property.postData;

    const missingFields = [];

    if (!type) missingFields.push("Property Type");
    if (!address) missingFields.push("Property Location");
    if (!size) missingFields.push("Property Size");
    if (!title) missingFields.push("Property Name");
    if (!bedroom) missingFields.push("Number of Bedrooms");
    if (!bathroom) missingFields.push("Number of Bathrooms");
    if (!parking) missingFields.push("Parking Space");
    if (!description) missingFields.push("Description");
    if (!price) missingFields.push("Price");
    if (!listedBy) missingFields.push("Listed by");
    if (!name) missingFields.push("Name");
    if (!phoneNumber) missingFields.push("Listed by");

    if (images.length < 1) missingFields.push("At least 1 Photo");
    if (selectedFaciItems.length < 1) missingFields.push("atleast 1 Facility");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following fields:\n${missingFields.join(", ")}`
      );
      onErrorOpen();
      return false;
    }

    return true;
  };
  const validateFormLand = () => {
    const {
      type,
      address,
      title,
      size,
      // parking,
      description,
      price,
      listedBy,
      name,
      phoneNumber,
    } = property.postData;

    const missingFields = [];

    if (!type) missingFields.push("Property Type");
    if (!address) missingFields.push("Property Location");
    if (!size) missingFields.push("Property Size");
    if (!title) missingFields.push("Property Name");

    if (!description) missingFields.push("Description");
    if (!price) missingFields.push("Price");
    if (!listedBy) missingFields.push("Listed by");
    if (!name) missingFields.push("Name");
    if (!phoneNumber) missingFields.push("Listed by");

    if (images.length < 1) missingFields.push("At least 1 Photo");
    // if (getSelectedFacilities().length < 1)
    //   missingFields.push("atleast 1 Facility");

    if (missingFields.length > 0) {
      setErrorMessage(
        `Please fill in the following fields:\n${missingFields.join(", ")}`
      );
      onErrorOpen();
      return false;
    }

    return true;
  };
  const {
    isOpen: isOpenReg,
    onOpen: onOpenReg,
    onClose: onCloseReg,
  } = useDisclosure();
  const initialRegRef = React.useRef(null);
  const finalRegRef = React.useRef(null);
  const [errors, setErrors] = useState({});

  const handleUpload = (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "homeBasket");
    data.append("cloud_name", "dxn3xdcgf");
    data.append("color_space", "srgb");

    fetch("https://api.cloudinary.com/v1_1/dxn3xdcgf/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.secure_url);
        updateImage(data.secure_url);
        setErrorMessage("Image upload successful");
        onErrorOpen();
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error while uploading");
        onErrorOpen();
      });
  };

  const update = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          email,
          phoneNumber,
          password: password ? password : null,
          avatar: picture,
        }),
      });

      const responseJson = await response.json();
      setLoading(false);

      if (responseJson.success) {
        const updatedUserData = {
          ...user,
          email: responseJson.email,
          phoneNumber: responseJson.phoneNumber,
          avatar: responseJson.avatar,
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setUser(updatedUserData);
        onClose();
      } else {
        setErrorMessage(`Error: ${responseJson.message}`);
        onErrorOpen();
        console.error(`Error: ${responseJson}`);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to update");
      onErrorOpen();
      console.error(`Update error: ${error}`);
    }
  };

  const updateImage = async (image) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ avatar: image }),
      });

      const responseJson = await response.json();
      setLoading(false);

      if (responseJson.success) {
        const updatedUserData = {
          ...user,
          avatar: responseJson.avatar,
        };

        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setUser(updatedUserData);
      } else {
        setErrorMessage(`Error: ${responseJson.message}`);
        onErrorOpen();
        console.error(`Error: ${responseJson}`);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to update");
      onErrorOpen();
      console.error(`Update error: ${error}`);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const responseJson = await response.json();
      setLoading(false);

      if (responseJson.success) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      } else {
        setErrorMessage(`Error: ${responseJson.message}`);
        onErrorOpen();
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to logout");
      onErrorOpen();
      console.error(`Logout error: ${error}`);
    }
  };
  const handlePlaceSelected = (place) => {
    // console.log("Selected place:", place);
  };

  const handleSelectTaxBand = (band) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        taxBand: band,
      },
    }));
  };
  const handleSelectEpcRating = (rating) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        epcRating: rating,
      },
    }));
  };
  const [selectedItem, setSelectedItem] = useState("sell");
  // console.log(proptypes["sell"]);
  const postProperty = async () => {
    if (property.postData.property == "land") {
      if (!validateFormLand()) {
        setLoading(false);
        return;
      }
    } else {
      if (!validateForm()) {
        setLoading(false);
        return;
      }
    }
    // console.log("str", {
    //   ...property,
    //   postData: {
    //     ...property.postData,
    //     negotiable: property.postData.negotiable,
    //     images: images,
    //   },
    // });
    // console.log(images);
    // console.log(user.token);
    setLoading(true);
    await fetch(`${BASE_URL}/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        ...property,
        postData: {
          ...property.postData,
          negotiable: property.postData.negotiable,
          images: images,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((responseJson) => {
        setLoading(false);
        // console.log(responseJson);
        if (responseJson.success) {
          // alert("Your post has been uploaded successfully");
          setProperty({
            postData: {
              title: "",
              price: 0,
              images: [],
              address: "",
              city: "",
              country: "",
              bedroom: 0,
              bathroom: 0,
              type: "rent",
              promotionType: "Premium",
              property: "",
              latitude: "",
              longitude: "",
              parking: 0,
              size: 0,
              furnishing: "unfurnished",
              description: "",
              listedBy: "agent",
              security: false,
              name: "",
              phoneNumber: "",
              negotiable: false,
              isPromoted: false,
            },
            postDetail: {
              desc: "Desc 1",
              facilities: [],
              charge: false,
              pet: "not-Allowed",
              income: "",
              school: 0,
              bus: 0,
            },
          });
          onCloseReg();
          onSuccessOpen();
        } else {
          setErrorMessage(`error${responseJson.message}`);
          onErrorOpen();
          // console.log("structure", responseJson);
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage("upload error");
        onErrorOpen();
        // console.log(`upload error ${error}`);
      });
  };
  useEffect(() => {
    fetchMyPosts();
    checkMembership();
  }, []);

  useEffect(() => {
    if (property.postData.property === "land") {
      // console.log("active", item.tag);
      setProperty((prevState) => ({
        ...prevState,
        postData: {
          ...prevState.postData,
          size: 0,
          bedroom: 0,
          bathroom: 0,
          parking: 0,
        },
        postDetail: {
          ...prevState.postDetail,
          facilities: ["None"],
        },
      }));
    } else {
      // console.log("none", item.tag);
      setProperty((prevState) => ({
        ...prevState,
        postData: {
          ...prevState.postData,
          size: 0,
          bedroom: 0,
          bathroom: 0,
          parking: 0,
        },
        postDetail: {
          ...prevState.postDetail,
          facilities: [],
        },
      }));
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUkOpen, setIsModalUkOpen] = useState(false);
  const checkMembership = async () => {
    setLoading(true);
    fetch(`${BASE_URL}/api/membership/check-membership`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success) {
          console.log("status", responseJson);

          responseJson.hasActiveMembership
            ? setmembershipExist(true)
            : setmembershipExist(false);
          //   setPosts(responseJson.data);
          setLoading(false);
          //   setRefreshing(false);
        } else {
          setErrorMessage(responseJson.message);
          onErrorOpen();
          setLoading(false);
          //   setRefreshing(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        // setRefreshing(false);
      });
  };
  const fetchMyPosts = async () => {
    setLoading(true);

    fetch(`${BASE_URL}/api/users/profilePosts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("pers Item", responseJson);
        if (responseJson.success) {
          setPosts(responseJson.userPosts);
          setWishlist(responseJson.savedPosts);
          setLoading(false);
        } else {
          setErrorMessage(responseJson.message);
          onErrorOpen();
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const {
    isOpen: isOpenCountry,
    onOpen: onOpenCOuntry,
    onClose: onCloseCountry,
  } = useDisclosure();
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
          <Flex justify="space-between">
            <Heading>User Information</Heading>
            <Button
              bg="#1A3D5B"
              color="white"
              _hover={{ bg: "#F6874F" }}
              onClick={onOpen}
            >
              <Text fontSize="md">Update Profile</Text>
            </Button>
          </Flex>
          <Flex flexDir="column" gap={10} pt={20}>
            <Flex gap={10} align="center">
              <Text>Avatar</Text>
              <Avatar
                name={`${user?.firstname} ${user?.lastname}`}
                src={user?.avatar}
              />
            </Flex>
            <Flex gap={10} align="center">
              <Text>Username</Text>
              <Heading size="md">{user?.username}</Heading>
            </Flex>
            <Flex gap={10} align="center">
              <Text>E-mail</Text>
              <Heading size="md">{user?.email}</Heading>
            </Flex>
            <Flex>
              <Button
                bg="#1A3D5B"
                color="white"
                _hover={{ bg: "#F6874F" }}
                onClick={logout}
              >
                <Text fontSize="md">Logout</Text>
              </Button>
            </Flex>
          </Flex>
          <Flex justify="space-between" mt={20}>
            <Heading>My List</Heading>
            <Button
              bg="#1A3D5B"
              color="white"
              isLoading={loading}
              _hover={{ bg: "#F6874F" }}
              onClick={
                () => {
                  console.log(country);
                  membershipExist ? onOpenReg() : onOpenCOuntry();
                }
                // alert("coming soon")
              }
            >
              <Text fontSize="md">Add New Post</Text>
            </Button>
          </Flex>
          <Flex gap={5} flexDir="column" mt={10}>
            {posts.map((item) => (
              <Card key={item.id} item={item} isMyList={true} />
            ))}
          </Flex>
        </Box>
        <Flex flex={3} flexDir={"column"}>
          <Flex justify="space-between" mt={20}>
            <Heading>WishList</Heading>
          </Flex>
          <Flex gap={5} flexDir="column" mt={10}>
            {wishlist.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Modal isOpen={isOpenCountry} onClose={onCloseCountry} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Country of Property</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                colorScheme={"gray"}
                flex={1}
                w={"100%"}
                p={7}
              >
                Country
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setIsModalOpen(true);
                    onCloseCountry();
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        country: "Nigeria",
                      },
                      postDetail: {
                        ...prevState.postDetail,
                        income: "₦",
                      },
                    }));
                  }}
                >
                  Nigeria
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsModalUkOpen(true);
                    onCloseCountry();
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        country: "United Kingdom",
                      },
                      postDetail: {
                        ...prevState.postDetail,
                        income: "£",
                      },
                    }));
                  }}
                >
                  United Kingdom
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsModalUkOpen(true);
                    onCloseCountry();
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        country: "United States",
                      },
                      postDetail: {
                        ...prevState.postDetail,
                        income: "$",
                      },
                    }));
                  }}
                >
                  United States
                </MenuItem>
              </MenuList>
            </Menu>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseCountry}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <MembershipModal
        isOpen={isModalOpen}
        checkMembership={checkMembership}
        onClose={() => setIsModalOpen(false)}
      />
      <MembershipModalUk
        isOpen={isModalUkOpen}
        onClose={() => setIsModalUkOpen(false)}
      />

      <Modal isOpen={isErrorOpen} onClose={onErrorClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{errorMessage}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onErrorClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Your post has been uploaded successfully!</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onSuccessClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Avatar</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={update}
              isLoading={loading}
            >
              Update
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        initialFocusRef={initialRegRef}
        finalFocusRef={finalRegRef}
        isOpen={isOpenReg}
        onClose={onCloseReg}
        isCentered
        size="full"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"50px"}>ADD NEW POST</ModalHeader>
          <ModalCloseButton size={"lg"} />
          <ModalBody p={6}>
            <Flex flexDir={["column", "row"]} gap={10}>
              {/* <Flex
                flex={1}
                align={"center"}
                w={"100%"}
                // bgColor={"red"}
                justify={"center"}
                flexDir={"column"}
                gap={10}
              > */}
              {/* <Image
                  src="/public/hblogowh.jpeg"
                  alt="logo"
                  h={"200px"}
                  w={"200px"}
                />
                <Heading>WELCOME TO THE HOME BASKET</Heading> */}
              <Flex flexDir={"column"} w={"100%"} gap={5} flex={1}>
                <Heading size={"md"}>
                  What are you interested in posting?
                </Heading>

                <Button
                  backgroundColor={
                    selectedItem == "sell" ? "#F6874F" : "#1A3D5C"
                  }
                  color="white"
                  _hover={{ bg: "#F6874F", scale: 0.8 }}
                  w={"100%"}
                  p={"50px"}
                  borderRadius={20}
                  onClick={() => {
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        type: "sale",
                      },
                    }));
                    setSelectedItem("sell");
                    setPropertyList(proptypes["sell"]);
                    setPropType("");
                  }}
                >
                  <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <Text fontSize="30px" fontWeight={"600"}>
                      Sell
                    </Text>
                    <FaPlusCircle color="#fff" fontSize={40} />
                  </Flex>
                </Button>
                <Button
                  backgroundColor={
                    selectedItem == "rent" ? "#F6874F" : "#1A3D5C"
                  }
                  color="white"
                  _hover={{ bg: "#F6874F", scale: 0.8 }}
                  w={"100%"}
                  p={"50px"}
                  borderRadius={20}
                  onClick={() => {
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        type: "rent",
                      },
                    }));
                    setSelectedItem("rent");
                    setPropertyList(proptypes["rent"]);
                    setPropType("");
                  }}
                >
                  <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <Text fontSize="30px" fontWeight={"600"}>
                      Rent
                    </Text>
                    <BsFillHousesFill color="#fff" fontSize={40} />
                  </Flex>
                </Button>

                <Button
                  backgroundColor={
                    selectedItem == "shared" ? "#F6874F" : "#1A3D5C"
                  }
                  color="white"
                  _hover={{ bg: "#F6874F", scale: 0.8 }}
                  w={"100%"}
                  p={"50px"}
                  borderRadius={20}
                  onClick={() => {
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        type: "shared",
                      },
                    }));
                    setSelectedItem("shared");
                    setPropertyList(proptypes["shared"]);
                    setPropType("");
                  }}
                >
                  <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <Text fontSize="30px" fontWeight={"600"}>
                      Shared
                    </Text>
                    <BsFillPeopleFill color="#fff" fontSize={40} />
                  </Flex>
                </Button>

                <Button
                  backgroundColor={
                    selectedItem == "hotel" ? "#F6874F" : "#1A3D5C"
                  }
                  color="white"
                  _hover={{ bg: "#F6874F", scale: 0.8 }}
                  w={"100%"}
                  p={"50px"}
                  borderRadius={20}
                  onClick={() => {
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        type: "hotel",
                      },
                    }));
                    setSelectedItem("hotel");
                    setPropertyList(proptypes["hotel"]);
                    setPropType("");
                  }}
                >
                  <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <Text fontSize="30px" fontWeight={"600"}>
                      Hotel
                    </Text>

                    <RiHotelFill color="#fff" fontSize={40} />
                  </Flex>
                </Button>
                <Button
                  backgroundColor={
                    selectedItem == "distress" ? "#F6874F" : "#1A3D5C"
                  }
                  color="white"
                  _hover={{ bg: "#F6874F", scale: 0.8 }}
                  w={"100%"}
                  // h={"80px"}
                  p={"50px"}
                  borderRadius={20}
                  onClick={() => {
                    setProperty((prevState) => ({
                      ...prevState,
                      postData: {
                        ...prevState.postData,
                        type: "distress",
                      },
                    }));
                    setSelectedItem("distress");
                    setPropertyList(proptypes["distress"]);
                    setPropType("");
                  }}
                >
                  <Flex align={"center"} justify={"space-between"} w={"100%"}>
                    <Text fontSize="30px" fontWeight={"600"}>
                      Distress
                    </Text>

                    <GiFamilyHouse color="#fff" fontSize={40} />
                  </Flex>
                </Button>
              </Flex>
              {/* </Flex> */}

              {propType !== "" ? (
                <Flex flex={1} flexDir={"column"} gap={10} p={[0, 10]}>
                  <Heading>{propType}</Heading>
                  <Flex gap={10} flexDir={["column", "row"]}>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input
                        placeholder="Title"
                        value={property.title}
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              title: e.target.value,
                            },
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Price</FormLabel>
                      <Input
                        placeholder="Price"
                        value={property.price}
                        type="Number"
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              price: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="Address"
                        value={property.address}
                        p={7}
                        fontSize={20}
                        onChange={(e) => {
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              address: e.target.value,
                              longitude: `53.8216`,
                              latitude: `1.5692`,
                            },
                          }));
                        }}
                      />
                    </FormControl>
                  </Flex>
                  <Flex gap={10} flexDir={["column", "row"]}>
                    <FormControl>
                      <FormLabel>City</FormLabel>
                      <Input
                        placeholder="City"
                        value={property.city}
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              city: e.target.value,
                            },
                          }))
                        }
                      />
                    </FormControl>

                    <Box w={"100%"}>
                      <FormLabel>
                        {property.postData.country == ""
                          ? "Country"
                          : property.postData.country}
                      </FormLabel>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          colorScheme={"gray"}
                          flex={1}
                          w={"100%"}
                          p={7}
                        >
                          Country
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() =>
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  country: "Nigeria",
                                },
                                postDetail: {
                                  ...prevState.postDetail,
                                  income: "₦",
                                },
                              }))
                            }
                          >
                            Nigeria
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  country: "United Kingdom",
                                },
                                postDetail: {
                                  ...prevState.postDetail,
                                  income: "£",
                                },
                              }))
                            }
                          >
                            United Kingdom
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  country: "United States",
                                },
                                postDetail: {
                                  ...prevState.postDetail,
                                  income: "$",
                                },
                              }))
                            }
                          >
                            United States
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                  </Flex>

                  <Flex gap={10} flexDir={["column", "row"]} align={"center"}>
                    <FormControl>
                      <FormLabel>Property Size (in sqm)*</FormLabel>
                      <Input
                        placeholder="Size"
                        value={property.size}
                        type="number"
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              size: Number(e.target.value),
                            },
                          }))
                        }
                      />
                    </FormControl>
                    {property.postData.property !== "land" && (
                      <>
                        <FormControl>
                          <FormLabel>Number of Bedrooms</FormLabel>
                          <Input
                            placeholder="Bedroom"
                            value={property.bedroom}
                            type="number"
                            p={7}
                            fontSize={20}
                            onChange={(e) =>
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  bedroom: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Number of Bathrooms</FormLabel>
                          <Input
                            placeholder="Bathroom"
                            value={property.bathroom}
                            p={7}
                            fontSize={20}
                            onChange={(e) =>
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  bathroom: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Number of Parking Space</FormLabel>
                          <Input
                            placeholder="Parking Space"
                            value={property.parking}
                            p={7}
                            fontSize={20}
                            onChange={(e) => {
                              setProperty((prevState) => ({
                                ...prevState,
                                postData: {
                                  ...prevState.postData,
                                  parking: Number(e.target.value),
                                },
                              }));
                            }}
                          />
                        </FormControl>
                      </>
                    )}
                  </Flex>

                  <Flex gap={10} flexDir={["column", "row"]}>
                    {property.postData.property !== "land" && (
                      <Menu closeOnSelect={false}>
                        <MenuButton
                          as={Button}
                          colorScheme={
                            selectedFaciItems.length >= 1 ? "orange" : "gray"
                          }
                          flex={1}
                          p={7}
                          rightIcon={<ChevronDownIcon />}
                        >
                          Select Property Facilities
                        </MenuButton>
                        <MenuList minWidth="240px">
                          <MenuOptionGroup
                            title="Facilities"
                            type="checkbox"
                            onChange={handleMenuChange}
                          >
                            {facilities.map((item, i) => (
                              <MenuItemOption value={item} key={i}>
                                {item}
                              </MenuItemOption>
                            ))}
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                    )}
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme={"gray"}
                        flex={1}
                        p={7}
                      >
                        Security
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleSelect("Yes")}>
                          Yes
                        </MenuItem>
                        <MenuItem onClick={() => handleSelect("No")}>
                          No
                        </MenuItem>
                      </MenuList>
                    </Menu>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        flex={1}
                        p={7}
                      >
                        Service Charge
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleSelectServ("Yes")}>
                          Yes
                        </MenuItem>
                        <MenuItem onClick={() => handleSelectServ("No")}>
                          No
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  {property.postData.property !== "land" && (
                    <Flex gap={10} flexDir={["column", "row"]}>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          flex={1}
                          p={7}
                        >
                          Furnishing
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => handleSelectFur("furnished")}
                          >
                            Furnished
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSelectFur("semi-furnished")}
                          >
                            Semi-Furnished
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSelectFur("unfurnished")}
                          >
                            Unfurnished
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Menu>
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          flex={1}
                          p={7}
                        >
                          Condition
                        </MenuButton>
                        <MenuList>
                          <MenuItem
                            onClick={() => handleSelectCon("Fairly Used")}
                          >
                            Fairly Used
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSelectCon("Newly Built")}
                          >
                            Newly Built
                          </MenuItem>
                          <MenuItem onClick={() => handleSelectCon("Old")}>
                            Old
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleSelectCon("Renovated")}
                          >
                            Renovated
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      {property.postData.country !== "Nigeria" &&
                        property.postData.property !== "land" &&
                        property.postData.property !== "hotel" && (
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                              flex={1}
                              p={7}
                            >
                              Tax Band
                            </MenuButton>
                            <MenuList>
                              {[
                                "A",
                                "B",
                                "C",
                                "D",
                                "E",
                                "F",
                                "G",
                                "H",
                                "I",
                              ].map((band) => (
                                <MenuItem
                                  key={band}
                                  onClick={() => handleSelectTaxBand(band)}
                                >
                                  {band}
                                </MenuItem>
                              ))}
                            </MenuList>
                          </Menu>
                        )}
                    </Flex>
                  )}
                  {property.postData.property !== "land" &&
                    property.postData.property !== "hotel" && (
                      <Flex gap={10} flexDir={["column", "row"]}>
                        {property.postData.country !== "Nigeria" && (
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                              flex={1}
                              p={7}
                            >
                              EPC Rating
                            </MenuButton>
                            <MenuList>
                              {["A", "B", "C", "D", "E", "F", "G"].map(
                                (rating) => (
                                  <MenuItem
                                    key={rating}
                                    onClick={() =>
                                      handleSelectEpcRating(rating)
                                    }
                                  >
                                    {rating}
                                  </MenuItem>
                                )
                              )}
                            </MenuList>
                          </Menu>
                        )}
                      </Flex>
                    )}
                  <Flex gap={10} flexDir={["column", "row"]}>
                    <Menu>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        flex={1}
                        p={7}
                      >
                        Listed by
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => handleSelectBy("agent")}>
                          Agent
                        </MenuItem>
                        <MenuItem onClick={() => handleSelectBy("developer")}>
                          Developer
                        </MenuItem>
                        <MenuItem onClick={() => handleSelectBy("owner")}>
                          Owner
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                  <Flex flexDir={["column"]}>
                    <Text mb="8px">Description</Text>
                    <Textarea
                      value={property.description}
                      onChange={(e) => {
                        setProperty((prevState) => ({
                          ...prevState,
                          postData: {
                            ...prevState.postData,
                            description: e.target.value,
                          },
                        }));
                      }}
                      placeholder="Description"
                      size="lg"
                      rows={10}
                    />
                  </Flex>
                  <Flex gap={10} flexDir={["column", "row"]}>
                    <FormControl>
                      <FormLabel>Display name</FormLabel>
                      <Input
                        placeholder="Name"
                        value={property.name}
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              name: e.target.value,
                            },
                          }))
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Display Phone Numnber</FormLabel>
                      <Input
                        placeholder="Phone number"
                        value={property.phoneNumber}
                        p={7}
                        fontSize={20}
                        onChange={(e) =>
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              phoneNumber: e.target.value,
                            },
                          }))
                        }
                      />
                    </FormControl>
                  </Flex>
                  <Flex gap={10} flexDir={["column", "row"]}>
                    {images?.map((item, i) => (
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
                      validateForm={() => validateForm()}
                    />
                  )}
                </Flex>
              ) : (
                <Flex flex={1} flexDir={"column"} gap={10} p={[0, 10]}>
                  <Heading>Property Category</Heading>
                  <Flex flexDir={"column"}>
                    {propertyList.map((item, i) => (
                      <Flex
                        align={"center"}
                        gap={10}
                        p={5}
                        borderColor={"#c4c4c4"}
                        borderWidth={0.3}
                        key={i}
                        onClick={() => {
                          setProperty((prevState) => ({
                            ...prevState,
                            postData: {
                              ...prevState.postData,
                              property: item.tag,
                            },
                          }));
                          setPropType(item.title);
                        }}
                        cursor={"pointer"}
                      >
                        <Image src={item.image} w={10} h={10} />
                        <Text>{item.title}</Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={postProperty}
              isLoading={loading}
            >
              Post
            </Button>
            <Button onClick={onCloseReg}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Profile;
