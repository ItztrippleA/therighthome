import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TermsandCondition from "./pages/TermsandCondition";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ListPage from "./pages/ListPage";
import SinglePage from "./pages/SinglePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditPost from "./pages/EditPost"; // Import the new EditPost component
// import "dotenv/config";
import { useCallback, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import About from "./pages/About";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { GOOGLE_API_KEY, STRIPE_PUBLISHABLE_KEY } from "./Environment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const libraries = ["places"];
function App() {
  const { user } = useContext(AuthContext);
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  return (
    <Elements stripe={stripePromise}>
      <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/:id" element={<SinglePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/termsandcondition" element={<TermsandCondition />} />
          <Route path="/profile" element={user ? <Profile /> : <HomePage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route
            path="/edit/:id"
            element={user ? <EditPost /> : <HomePage />}
          />{" "}
          {/* New route for editing posts */}
        </Routes>
        <Footer />
      </LoadScript>
    </Elements>
  );
}

export default App;
