import { Flex, Text } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { RiGalleryLine } from "react-icons/ri";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function UploadWidget({
  uwConfig,
  setPublicId,
  setImages,
  images,
  validateForm,
}) {
  const [loaded, setLoaded] = useState(false);
  const [secureUrls, setSecureUrls] = useState([]);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            if (images.length < 5) {
              // console.log("Done! Here is the image info: ", result.info);
              setImages((prevUrls) => [...prevUrls, result.info.secure_url]);
              setSecureUrls((prevUrls) => [
                ...prevUrls,
                result.info.secure_url,
              ]);
            } else {
              alert("You can only upload up to 5 images.");
            }
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          if (images.length < 5) {
            myWidget.open();
          } else {
            alert("You can only upload up to 5 images.");
          }
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider
      value={{ loaded }}
      onClick={initializeCloudinaryWidget}
    >
      <Flex
        backgroundColor="#F6874F"
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        flexDir={"column"}
        gap={10}
        w={"200px"}
        h={"200px"}
        onClick={initializeCloudinaryWidget}
        id="upload_widget"
        cursor={"pointer"}
      >
        <BiPlus color="#fff" fontSize={"40px"} />
        <Flex flexDirection={"row"} alignItems={"center"} gap={5}>
          <RiGalleryLine color="#fff" fontSize={"30px"} />
          <Text color={"#fff"}>Add photo</Text>
        </Flex>
      </Flex>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
