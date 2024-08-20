import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import { PaystackButton } from "react-paystack";
import { BASE_URL, PAYSTACK_KEY, STRIPE_PUBLISHABLE_KEY } from "../Environment";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const MembershipModalUk = ({ isOpen, onClose: oncloseMod }) => {
  const stripe = useStripe();
  const elements = useElements();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#282838",
        border: "1px solid #D1D1D1",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const {
    user,
    setmembershipExist,
    property,
    setProperty,
    loading,
    setLoading,
    intent,
    setIntent,
  } = useContext(AuthContext);
  const [naira, setNaira] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSelectPlan = (promotionType, price, isPromoted) => {
    setProperty((prevState) => ({
      ...prevState,
      postData: {
        ...prevState.postData,
        isPromoted,
        promotionType: promotionType,
      },
    })); // Track the selected plan
    setSelectedPlan(promotionType);
    setNaira(price); // Update the amount for Paystack
  };
  const createMembershipNaija = async (paymentRef) => {
    console.log("Red", paymentRef);
    try {
      const response = await fetch(
        `${BASE_URL}/api/membership/payment-status-naija`,
        {
          method: "POST",
          body: JSON.stringify({
            paymentRef,
            promotionType: property.postData.promotionType,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = await response.json();
      console.log("response", result);
      if (result.success) {
        alert("Payment successful and membership created");
        setmembershipExist(true);
        oncloseMod();
      }
    } catch (error) {
      console.error("Error polling payment status:", error);
    }
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference after success call.
    console.log("called me");
    if (selectedPlan == "PostOnce") {
      setmembershipExist(true);
      oncloseMod();
    } else {
      createMembershipNaija(reference);
    }
    // setmembershipExist(true);
    // console.log(reference);
    // oncloseMod();
    // Additional logic after success
  };

  const handlePaystackCloseAction = () => {
    // Implementation for whatever you want to do when the Paystack dialog is closed.
    alert("payment closed");
    console.log("closed");
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: naira * 100, // Convert to Kobo
    publicKey: PAYSTACK_KEY,
  };

  const componentProps = {
    ...config,
    text: "Pay with Paystack",
    onSuccess: (ref) => handlePaystackSuccessAction(ref.reference),
    onClose: handlePaystackCloseAction,
  };

  const pollPaymentStatus = async (paymentIntentId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/membership/payment-status/${paymentIntentId}`
      );
      const result = await response.json();
      console.log(result);
      if (result.status === "succeeded") {
        alert("Payment successful and membership created");
        clearInterval(pollingInterval); // Stop polling
        setmembershipExist(true);
        history.goBack();
      }
      clearInterval(pollingInterval); // Stop polling
    } catch (error) {
      console.error("Error polling payment status:", error);
      clearInterval(pollingInterval); // Stop polling
    }
  };

  let pollingInterval;

  const subMembership = async (promotionType) => {
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/membership/subscribe`, {
        method: "POST",
        body: JSON.stringify({ promotionType }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);

      if (responseJson.success) {
        if (responseJson.clientSecret) {
          const stripe = await stripePromise;

          // Use confirmCardPayment for handling the payment in web
          const result = await stripe.confirmCardPayment(
            responseJson.clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                  name: user.email,
                },
              },
            }
          );

          if (result.error) {
            if (result.error.code === "canceled") {
              alert("Payment canceled");
            } else {
              throw new Error(result.error.message);
            }
          } else {
            alert("Payment successful and membership created");

            // Polling the payment status (adjust polling interval as needed)
            pollingInterval = setInterval(() => {
              pollPaymentStatus(responseJson.paymentIntentId);
            }, 5000); // Poll every 5 seconds
            setmembershipExist(true);
            history.goBack();
            // Optionally navigate to a success screen
            // history.push("/post-success");
          }
        } else {
          alert("Your post has been uploaded successfully");
          history.push("/post-success");
        }
      } else {
        alert(`Error: ${responseJson.message}`);
        console.log("structure", responseJson);
      }
    } catch (error) {
      console.log(`Upload error ${error}`);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (promotionType) => {
    try {
      // Call your backend to create a Checkout Session
      const response = await fetch(`${BASE_URL}/api/membership/subscribeWeb`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // If you need to pass a token or any authorization headers
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ promotionType }),
      });

      const data = await response.json();

      if (data.success) {
        // Optionally store the paymentIntentId for later use
        const paymentIntentId = data.paymentIntentId;
        setIntent(paymentIntentId);
        console.log("Payment Intent ID:", paymentIntentId);

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });

        if (error) {
          console.error("Stripe Checkout error:", error);
          alert("Failed to redirect to Stripe Checkout");
        }
      } else {
        console.error("Failed to create Stripe Checkout session");
        alert("Failed to initiate checkout");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={oncloseMod} size="xl" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="10px">
        <ModalHeader>Membership</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="16px" color="gray.600" mb="4">
            Choose a promotional type for your property. This will enable your
            property to have an edge over other properties.
          </Text>
          <VStack spacing="4">
            {/* Premium Platinum */}
            <Box
              w="100%"
              p="5"
              borderWidth="1px"
              borderColor={
                selectedPlan === "Premium Platinum" ? "orange.400" : "gray.300"
              }
              borderRadius="10px"
              onClick={() => handleCheckout("Premium Platinum")}
              cursor="pointer"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="17px" fontWeight="600">
                  Premium Platinum
                </Text>
                <Text color="gray.500" fontSize="14px">
                  unlimited posts
                </Text>
              </HStack>
              <HStack justifyContent="space-between" mt="2">
                <Box
                  bg="orange.400"
                  color="white"
                  px="4"
                  py="2"
                  borderRadius="10px"
                  textAlign="center"
                >
                  3 Months with promotion
                </Box>
                <Text fontSize="17px" fontWeight="600">
                  £ 5
                </Text>
              </HStack>
            </Box>

            {/* Premium Gold */}
            <Box
              w="100%"
              p="5"
              borderWidth="1px"
              borderColor={
                selectedPlan === "Premium Gold" ? "orange.400" : "gray.300"
              }
              borderRadius="10px"
              onClick={() => handleCheckout("Premium Gold")}
              cursor="pointer"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="17px" fontWeight="600">
                  Premium Gold
                </Text>
                <Text color="gray.500" fontSize="14px">
                  unlimited posts
                </Text>
              </HStack>
              <HStack justifyContent="space-between" mt="2">
                <Box
                  bg="orange.400"
                  color="white"
                  px="4"
                  py="2"
                  borderRadius="10px"
                  textAlign="center"
                >
                  1 Month with Promotion
                </Box>
                <Text fontSize="17px" fontWeight="600">
                  £ 2.5
                </Text>
              </HStack>
            </Box>

            {/* Premium */}
            <Box
              w="100%"
              p="5"
              borderWidth="1px"
              borderColor={
                selectedPlan === "Premium" ? "orange.400" : "gray.300"
              }
              borderRadius="10px"
              onClick={() => handleCheckout("Premium")}
              cursor="pointer"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="17px" fontWeight="600">
                  Premium
                </Text>
                <Text color="gray.500" fontSize="14px">
                  unlimited posts
                </Text>
              </HStack>
              <HStack justifyContent="space-between" mt="2">
                <Box
                  bg="orange.400"
                  color="white"
                  px="4"
                  py="2"
                  borderRadius="10px"
                  textAlign="center"
                >
                  1 Month with no Promotion
                </Box>
                <Text fontSize="17px" fontWeight="600">
                  £ 1.55
                </Text>
              </HStack>
            </Box>

            {/* Post Once */}
            {/* <Box
              w="100%"
              p="5"
              borderWidth="1px"
              borderColor={
                selectedPlan === "PostOnce" ? "orange.400" : "gray.300"
              }
              borderRadius="10px"
              onClick={() => handleCheckout("PostOnce")}
              cursor="pointer"
            >
              <HStack justifyContent="space-between">
                <Text fontSize="17px" fontWeight="600">
                  Post once
                </Text>
                <Text color="gray.500" fontSize="14px">
                  single post
                </Text>
              </HStack>
              <HStack justifyContent="space-between" mt="2">
                <Box
                  bg="orange.400"
                  color="white"
                  px="4"
                  py="2"
                  borderRadius="10px"
                  textAlign="center"
                >
                  1 Month no Promotion
                </Box>
                <Text fontSize="17px" fontWeight="600">
                  £ 1.0
                </Text>
              </HStack>
            </Box> */}
          </VStack>
        </ModalBody>

        <ModalFooter>
          {/* <Flex bgColor="#ff922d" mr={3} p={3} borderRadius={15} color={"#fff"}>
            <PaystackButton {...componentProps} />
          </Flex> */}
          <Button colorScheme="blackAlpha" mr={3} onClick={oncloseMod}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MembershipModalUk;
