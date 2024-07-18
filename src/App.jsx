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
import { useCallback, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/:id" element={<SinglePage />} />
        <Route path="/termsandcondition" element={<TermsandCondition />} />
        <Route path="/profile" element={user ? <Profile /> : <HomePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
