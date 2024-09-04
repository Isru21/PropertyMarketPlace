import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

import "react-toastify/dist/ReactToastify.css";

// pages and components
import PrivateRoute from "./components/private/PrivateRoute";
import PublicRoute from "./components/public/PublicRoute";
import Home from "./pages/Home";
import Navbar from "./components/public/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContactUs from "./pages/ContactUs";
// import ContactUs from './pages/ContactUs';
// import AboutUs from './pages/AboutUs';
import Requests from "./pages/Requests";
import Apts from "./pages/Apts";
import UserProfile from "./pages/UserProfile";
import AptDetail from "./pages/AptDetail";
import RealEstateDetail from "./pages/RealEstateDetail";
import StickyFooter from "./sticky-footer/StickyFooter";
import { CardMedia } from "@mui/material";
import { Container } from "@mui/system";

export default function App() {

  const [LoginClicked, setLoginClicked] = useState("");
  const [searchKeywords, setSearchKeywords] = useState('');
  const [HomePageCheck, setHomePageCheck] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        {LoginClicked !== "yes" && (
          <Navbar
          searchKeywords={searchKeywords}
          setSearchKeywords={setSearchKeywords}
            HomePageCheck={HomePageCheck}
          />
        )}

        {LoginClicked !== "yes" && (
          <CardMedia
            component="img"
            height="394"
            image="https://images.unsplash.com/photo-1668003312597-2fc136bc56e0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            sx={{ mb: 7 }}
          />
        )}
        <div className={LoginClicked !== "yes" ? "pages" : "pageLOG"}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  setLoginClicked={setLoginClicked}
                  searchKeywords={searchKeywords}
                  setSearchKeywords={setSearchKeywords}
                  setHomePageCheck={setHomePageCheck}
                />
              }
            />
            <Route path="/StickyFooter" element={<StickyFooter />} />
            {/* <Route path='/contact_us' element={<ContactUs />} /> */}

            {/* <Route path='/about_us' element={<AboutUs />} /> */}

            <Route path="/apartment_details/:id" element={<AptDetail  />} />

            <Route path="/apartments" element={<Apts setHomePageCheck={setHomePageCheck} />} />

            <Route
              path="/realestate_details/:id"
              element={<RealEstateDetail setHomePageCheck={setHomePageCheck}/>}
            />

            <Route element={<PrivateRoute />}>
              <Route path="/requests" element={<Requests setHomePageCheck={setHomePageCheck} />} />
              <Route path="/profile" element={<UserProfile setHomePageCheck={setHomePageCheck} />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route
                path="/login"
                element={<Login setLoginClicked={setLoginClicked} />}
              />
              <Route
                path="/signup"
                element={<Signup setLoginClicked={setLoginClicked} />}
              />
            </Route>
          </Routes>
        </div>
        {LoginClicked !== "yes" && <StickyFooter />}

        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}
