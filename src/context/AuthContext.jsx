import React, { createContext, useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../Environment";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Link,
} from "@chakra-ui/react";
import validate from "validate.js";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
export const AuthContext = createContext();
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const libraries = ["places"];
  const [autocomplete, setAutocomplete] = useState(null);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState({
    type: "",
    country: "",
    city: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

  const {
    isOpen: isOpenReg,
    onOpen: onOpenReg,
    onClose: onCloseReg,
  } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);
  const [membershipExist, setmembershipExist] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClick = () => setShow(!show);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const initialRegRef = React.useRef(null);
  const finalRegRef = React.useRef(null);
  const [errors, setErrors] = useState({});
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [forgotPasswordPhoneNumber, setForgotPasswordPhoneNumber] =
    useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();
  const {
    isOpen: isResetPasswordOpen,
    onOpen: onResetPasswordOpen,
    onClose: onResetPasswordClose,
  } = useDisclosure();

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: forgotPasswordPhoneNumber }),
      });
      const data = await response.json();
      console.log("Forgot password response:", data);
      if (data.success) {
        alert(data.message);
        onForgotPasswordClose();
        onResetPasswordOpen(); // Open the reset password modal
      } else {
        alert(data.message || "Failed to process forgot password request");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert(
        "An error occurred while processing your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber: forgotPasswordPhoneNumber,
          code: resetCode,
          newPassword: newPassword,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message);
        onResetPasswordClose();
        onClose(); // Close the login modal
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("An error occurred while resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user data from local storage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // console.log(storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [property, setProperty] = useState({
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
      promotionType: "PostOnce",
      property: "apartment",
      latitude: "",
      longitude: "",
      parking: 0,
      size: 0,
      furnishing: "unfurnished",
      condition: "Old",
      description: "",
      listedBy: "agent",
      security: false,
      isActive: true,
      name: "",
      phoneNumber: "",
      negotiable: false,
      isPromoted: true,
      epcRating: "A",
      taxBand: "A",
    },
    postDetail: {
      desc: "Desc 1",
      facilities: [],
      charge: false,
      pet: "not-Allowed",
      income: "£",
      school: 0,
      bus: 0,
    },
  });

  const fetchPosts = useCallback(
    async (query) => {
      setLoading(true);
      setRefreshing(true);
      setPosts([]); // Set posts to empty array first
      const {
        type = "",
        city = "",
        country = query.country == "" ? country : query.country,
        minPrice = 0,
        maxPrice = 0,
        property = "",
      } = query;
      // console.log({ type, city, country, minPrice, maxPrice, property });

      const headers = {
        "Content-Type": "application/json",
      };

      if (user?.token) {
        headers["Authorization"] = `Bearer ${user.token}`;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/posts?type=${type}&city=${city}&country=${country}&minPrice=${minPrice}&maxPrice=${maxPrice}&property=${property}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const responseJson = await response.json();
        if (responseJson.success) {
          setPosts(responseJson.data);
        } else {
          alert(responseJson.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user, country]
  );

  const fetchPost = useCallback(
    async (id) => {
      setLoading(true);
      setRefreshing(true);

      const headers = {
        "Content-Type": "application/json",
      };

      if (user?.token) {
        headers["Authorization"] = `Bearer ${user.token}`;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/posts/${id}`, {
          method: "GET",
          // headers: headers,
        });
        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.success) {
          setPost(responseJson.data);
        } else {
          alert(responseJson.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user]
  );

  const signIn = () => {
    // if (!validateInputs()) {
    //   return;
    // }
    // console.log(email, password);
    setLoading(true);
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        // console.log("Login", responseJson);
        if (responseJson.success) {
          setUser(responseJson);
          console.log();
          // AsyncStorage.setItem("user", JSON.stringify(responseJson));
          localStorage.setItem("user", JSON.stringify(responseJson));
          onClose();
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Login error");
        // console.log(`Login error: ${error}`);
      });
  };
  const constraints = {
    username: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        minimum: 3,
        message: "must be at least 3 characters",
      },
    },
    email: {
      presence: { allowEmpty: false, message: "is required" },
      email: {
        message: "email is not valid",
      },
    },
    firstname: {
      presence: { allowEmpty: false, message: "is required" },
    },
    lastname: {
      presence: { allowEmpty: false, message: "is required" },
    },
    password: {
      presence: { allowEmpty: false, message: "is required" },
      length: {
        minimum: 6,
        message: "must be at least 6 characters",
      },
    },
    confirmPassword: {
      presence: { allowEmpty: false, message: "is required" },
      equality: {
        attribute: "password",
        message: "does not match",
      },
    },
    phoneNumber: {
      presence: { allowEmpty: false, message: "is required" },
      format: {
        pattern: "\\+?\\d{10,15}",
        message: "must be a valid phone number with 10 to 15 digits",
      },
    },
  };
  const validateInputs = () => {
    const validationResult = validate(
      {
        username,
        email,
        firstname,
        lastname,
        password,
        confirmPassword,
        phoneNumber,
      },
      constraints,
      { fullMessages: false }
    );

    if (validationResult) {
      setErrors(validationResult);
      return false;
    }
    setErrors({});
    return true;
  };

  const register = () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        firstname,
        lastname,
        password,
        phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);

        if (responseJson.success) {
          localStorage.setItem("user", JSON.stringify(responseJson.user));
          alert("Registration successful");
          setUser(responseJson.user);
          onCloseReg();
        } else {
          alert(responseJson.errors[0].msg);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Registration error");
        // console.log(`Registration error: ${error}`);
      });
  };

  useEffect(() => {
    // Function to get user's location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            await getCountryFromCoordinates(latitude, longitude);
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Function to get country from coordinates
    const getCountryFromCoordinates = async (lat, lon) => {
      try {
        // Using a free reverse geocoding API (OpenCage Data)
        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=f189995b26c94e4fb9eed61ef8d670b5`
        );
        console.log(response);
        const { country } = response.data.results[0].components;
        setQuery((prev) => ({ ...prev, country }));
        console.log(country);
        setCountry(country);
      } catch (error) {
        console.error("Error getting country from coordinates:", error);
      }
    };

    getLocation();
  }, []);
  //a function to forget password

  const [filteredPosts, setFilteredPosts] = useState([]);

  // Add this new function
  const filterPosts = useCallback(
    (bathrooms, bedrooms, condition, facilities) => {
      const filtered = posts.filter((post) => {
        const bathroomMatch =
          bathrooms === "" || post.bathroom >= parseInt(bathrooms);
        const bedroomMatch =
          bedrooms === "" || post.bedroom >= parseInt(bedrooms);
        const conditionMatch = condition === "" || post.condition === condition;
        const facilitiesMatch =
          facilities.length === 0 ||
          facilities.every((facility) =>
            post.postDetail.facilities.includes(facility)
          );
        return (
          bathroomMatch && bedroomMatch && conditionMatch && facilitiesMatch
        );
      });
      setFilteredPosts(filtered);
    },
    [posts]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        property,
        setProperty,
        showOnboarding,
        setShowOnboarding,
        posts,
        setPosts,
        fetchPosts,
        refreshing,
        setRefreshing,
        type,
        setType,
        city,
        setCity,
        country,
        setCountry,
        onOpen,
        onOpenReg,
        fetchPost,
        post,
        setPost,
        address,
        setAddress,
        membershipExist,
        setmembershipExist,
        libraries,
        query,
        setQuery,
        intent,
        setIntent,
        filteredPosts,
        filterPosts,
      }}
    >
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>LOGIN</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Link
              color="blue.500"
              onClick={onForgotPasswordOpen}
              mt={2}
              display="inline-block"
            >
              Forgot Password?
            </Link>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={signIn}
              isLoading={loading}
            >
              Login
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isForgotPasswordOpen}
        onClose={onForgotPasswordClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Forgot Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="Enter your phone number"
                value={forgotPasswordPhoneNumber}
                onChange={(e) => setForgotPasswordPhoneNumber(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleForgotPassword}
              isLoading={loading}
            >
              Send Verification Code
            </Button>
            <Button onClick={onForgotPasswordClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isResetPasswordOpen}
        onClose={onResetPasswordClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Verification Code</FormLabel>
              <Input
                placeholder="Enter the verification code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>New Password</FormLabel>
              <Input
                placeholder="Enter your new password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleResetPassword}
              isLoading={loading}
            >
              Reset Password
            </Button>
            <Button onClick={onResetPasswordClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRegRef}
        finalFocusRef={finalRegRef}
        isOpen={isOpenReg}
        onClose={onCloseReg}
        isCentered
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>REGISTER</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRegRef}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <Text color="red.500">{errors.username[0]}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={errors.firstname}>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {errors.firstname && (
                <Text color="red.500">{errors.firstname[0]}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname && (
                <Text color="red.500">{errors.lastname[0]}</Text>
              )}
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <Text color="red.500">{errors.email[0]}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.phoneNumber}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <Text color="red.500">{errors.phoneNumber[0]}</Text>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500">{errors.password[0]}</Text>
              )}
            </FormControl>
            <FormControl mt={4} isInvalid={errors.confirmPassword}>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClickConfirmPassword}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && (
                <Text color="red.500">{errors.confirmPassword[0]}</Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              mr={3}
              onClick={register}
              isLoading={loading}
            >
              Register
            </Button>
            <Button onClick={onCloseReg}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </AuthContext.Provider>
  );
};
