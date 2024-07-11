import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../Environment";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
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
      promotionType: "Premium",
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

  const fetchPosts = async (type = "", city = "", country = "") => {
    setLoading(true);
    setRefreshing(true);
    console.log(type, city, country);

    const headers = {
      "Content-Type": "application/json",
    };

    if (user.token) {
      headers["Authorization"] = `Bearer ${user.token}`;
    }

    fetch(
      `${BASE_URL}/api/posts?type=${type}&city=${city}&country=${country}&minPrice=&maxPrice=&property=`,
      {
        method: "GET",
        headers: headers,
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.success) {
          setPosts(responseJson.data);
          setLoading(false);
          setRefreshing(false);
        } else {
          alert(responseJson.message);
          setLoading(false);
          setRefreshing(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setRefreshing(false);
      });
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
