import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TermsandCondition from "./pages/TermsandCondition";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/termsandcondition" element={<TermsandCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
