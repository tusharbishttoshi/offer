import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./Components/Pages/HomePage/home.css";
import "./index.css";
import "./s.css";
import { hydrate, render } from "react-dom";
import {
  BrowserRouter,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/HomePage/Home";
import Singin, { SignInFrom } from "./Components/Pages/LoginForms/Singin";
import { NavBar, RequestForAstrologer } from "./Components/Component/All";
import SearchPage from "./Components/Pages/SearchPage";
import ForgotPass, {
  ForgotForm,
} from "./Components/Pages/LoginForms/ForgotPass";
import ChatSideBar from "./Components/Pages/Chat/ChatSideBar";
import BlogPage from "./Components/Pages/BlogPage";
import Blog from "./Components/Pages/Blog";
import Verification from "./Components/Pages/LoginForms/Verification";
import io from "socket.io-client";
import ProfileSideBar, {
  ProfileID,
  AstrologerForm,
  AstrologerBlog,
} from "./Components/Pages/Profile/ProfileSideBar";
import {
  ClosePopupState,
  GetAstrologers,
  Recharge,
  TokenLogin,
  offlineChat,
} from "./api/userLogInReducer";
import { MessageHandler, Cancel } from "./api/chatReducer";
import store from "./store";
import RequestsPage from "./Components/Pages/RequestsPage";
import CallModel from "./Components/Pages/CallModel";
import ChatPage from "./Components/Pages/ChatPage";
import android from "./images/download/GooglePlay.png";
import AstrologerPage from "./Components/Pages/AstrologerPage";
import EditPage from "./Components/Pages/EditPage";
import { FaXmark } from "react-icons/fa6";
import { ClientChat, RemoveRequest } from "./api/ChatRequestReducer";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import OffChats from "./Components/Pages/OffChats";
import Rechargeadd from "./Components/Pages/Rechargeadd";
import Auth from "./Components/Pages/LoginForms/Auth";
import Model from "./Components/Component/Model/Model";
import Landing from "./Components/Pages/Landing/Landing";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareThreads } from "react-icons/fa6";
import axios from "axios";
import AllBlogList from "./Components/Pages/BlogManagement/AllBlogList";
import BlogDetails from "./Components/Pages/BlogManagement/BlogDetails";
import { Wallet } from "./Components/Pages/WalletManagement/Wallet";
import HomeDashBoard from "./Components/Pages/HomeDashBoard/HomeDashBoard";
import AboutUs from "./Components/Pages/AboutUs/AboutUs";
import ZodiacSign from "./Components/Pages/ZodiacSignDetails/ZodiacSign";
import ZodiacDetails from "./Components/Pages/ZodiacSignDetails/ZodiacDetails";
import Faq from "./Components/Pages/HomePage/Faq";
import Navbar from "./Components/Component/Navbar/Navbar";
import AuthAstroDetails from "./Components/Pages/AuthAstroDetails";
import PgaeOneSignUp from "./Components/Pages/Profile/PgaeOneSignUp";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Termcondition from "./Components/Pages/Term&condition/Termcondition";
import FrequentlyAsk from "./Components/Pages/HomePage/FrequentlyAsk";
import AstroVerification from "./Components/Pages/AstroVerification/AstroVerification";
import IdsVerification from "./Components/Pages/AstroVerification/IdsVerification";
// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

// const baseUrl = "http://localhost:8000/"
// const baseUrl = "http://193.203.162.221:8000/"
const baseUrl = "https://api.unzziptruth.com/";
// const baseUrl = "http://192.168.1.21:8000";

axios.defaults.baseURL = baseUrl;

const ClintRoutes = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const socketRef = useRef();
  const { user, model } = useSelector((state) => state.userLog);

  useEffect(() => {
    const tokenHandler = async () => {
      const token = await localStorage.getItem("token");
      console.log(token);
      if (token) {
        console.log(token);
        dispatch(TokenLogin({ token })).then((e) => console.log(e.payload));
      }
    };
    tokenHandler();
  }, []);

  useEffect(() => {
    if (user?._id) {
      socketRef.current = io(baseUrl);
      socketRef.current.emit("setup", user._id);
      console.log("setupData", socketRef.current);
    }
  }, [user]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [callFromAstro, setCallFromAstro] = useState(false);
  const [astro, setAstro] = useState({});
  const [client, setClient] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      socketRef.current.on("connect", () => {
        console.log("Socket connected");
      });

      socketRef.current.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      socketRef.current.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      socketRef.current.on("message received", (newMessageReceived) => {
        dispatch(MessageHandler(newMessageReceived));
      });

      socketRef.current.on("astroReject", (newMessageReceived) => {
        dispatch(RemoveRequest(newMessageReceived.astro));
      });

      socketRef.current.on("Cancel", (newMessageReceived) => {
        dispatch(Cancel(newMessageReceived.astro));
      });
      socketRef.current.on("ChatPage", ({ path, astro }) => {
        setAstro({ ...astro });
        navigate(`/ChatPage/${path}`);
        console.log("path", { path });
      });



    }
  });



  const a = useParams();
  const { token } = useParams();
  const value = a["*"];

  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AS3ieuQvAhlw1neiJ5cF_tt-IUdGoMyE5n05bOnIUvWkZAv-RobWmqTbKbqBNSe91LJ_NA3CcZVw7DRb",
        }}
      >
        <Model />

        <Routes>
          <Route
            exact
            path="/"
            element={<HomeDashBoard socketRef={socketRef} />}
          />
          <Route
            exact
            path="/faq"
            element={<FrequentlyAsk socketRef={socketRef} />}
          />

          {/* <Route exact path="/" element={<Home socketRef={socketRef} />} /> */}
          <Route
            exact
            path="/ChatPage/:id"
            element={
              <ChatPage
                socketRef={socketRef}
                setAstro={setAstro}
                astro={astro}
              />
            }
          />
          <Route exact path="/Privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/term&condition" element={<Termcondition />} />
          <Route exact path="/mobile/payment" element={<Rechargeadd />} />
          <Route exact path="/chat/*" element={<ChatSideBar />} />
          <Route
            exact
            path="/profile/:id/*"
            element={
              <ProfileSideBar>
                <Routes>
                  <Route exact path="/" element={<ProfileID />} />
                  <Route exact path="/wallet" element={<Wallet />} />
                </Routes>
              </ProfileSideBar>
            }
          />
          <Route exact path="/offChats" element={<OffChats />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/horoscopy" element={<ZodiacSign />} />
          <Route
            exact
            path="/Zodiac-Details/:_id"
            element={<ZodiacDetails />}
          />
          {/* <Route exact path="/horoscopy" element={<Blog />} /> */}
          <Route exact path="/Blog" element={<AllBlogList />} />
          <Route exact path="/Blog-details/:_id" element={<BlogDetails />} />
          <Route exact path="/contact-us" element={<Ad />} />
          <Route exact path="/astro-form" element={<AstrologerForm />} />
          <Route exact path="/astro-signup-one" element={<PgaeOneSignUp />} />
          <Route exact path="/astro-About-us" element={<AboutUs />} />
          <Route
            exact
            path="/astrologer/:id"
            element={<AstrologerPage socketRef={socketRef} />}
          />

          <Route
            exact
            path="/astrologer-details/:id"
            element={<AuthAstroDetails socketRef={socketRef} />}
          />
          <Route
            exact
            path="/search"
            element={<SearchPage socketRef={socketRef} />}
          />
          <Route exact path="/home/landing" element={<Landing />} />
          <Route
            exact
            path="/Astro/verification/:_id"
            element={<AstroVerification />}
          />
          <Route
            exact
            path="/Astro/IdsVerification/:_id"
            element={<IdsVerification />}
          />
        </Routes>
        <RequestForAstrologer socketRef={socketRef} />

        {/* */}
      </PayPalScriptProvider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// if (root.hasChildNodes()) {
//   hydrate(root);
// } else {
//   render(root);
// }

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route exact path="/*" element={<ClintRoutes />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);

export const Footer = () => {
  const { user } = useSelector((state) => state.userLog);
  return (
    <>
      <div
        className="astro-footer"
        // style={{ backgroundImage: "url('/assets/images/footer.jpg')" }}
        style={{ background: "#F5B041" }}
      >
        <footer>
          <div
            className="container footer"
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "space-evenly",
              padding: "50px 10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0px",
                flexDirection: "column",
                alignItems: "center",
                alignSelf: "start",
              }}
            >
              <div style={{ height: "80px" }}>
                <img
                  src="/UnzipLogo.jpeg"
                  style={{ height: "100%", width: "100%", borderRadius: "50%" }}
                  alt=""
                />
              </div>
              <Link to="/" className="uilink">
                {" "}
                <img style={{ height: "80px" }} src={android} alt="" />
              </Link>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  className="uilink"
                  href="https://www.threads.net/@unzziptruth"
                  target="_blank"
                >
                  <FaSquareThreads size={30} />
                </a>
                <a
                  className="uilink"
                  href="https://www.instagram.com/unzziptruth"
                  target="_blank"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  className="uilink"
                  href="https://www.facebook.com/UnzzipTruthOfficial"
                  target="_blank"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  className="uilink"
                  href="https://www.linkedin.com/company/100972682"
                  target="_blank"
                >
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "0px",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "end",
              }}
            >
              <p
                style={{
                  // color: "var(--dark)",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Useful Links
              </p>
              <Link className="uilink" to="/Privacy-policy">
                Privacy policy
              </Link>
              <Link className="uilink" to="/term&condition">
                Term & Conditions
              </Link>
              {/* <Link className="uilink"  to="/contact-us">Contact Us</Link> */}
              {/* <Link  className="uilink" to="/astro-form">Join Us Astrologers</Link> */}
              <Link className="uilink" to="/astro-About-us">
                About Us
              </Link>
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "0px",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "end",
              }}
            >
              <p
                style={{
                  // color: "var(--dark)",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "20px",
                  color: "white",
                }}
              >
                Online Advice{" "}
              </p>
              <Link
                className="uilink"
                to={user?._id ? "/search" : "/auth?login=true"}
              >
                Chat with Astrologers
              </Link>
              <Link
                className="uilink"
                to={user?._id ? "/search" : "/auth?login=true"}
              >
                Astrologers
              </Link>
              <Link className="uilink" to="/astro-signup-one">
                Join Us Astrologers
              </Link>
              {/* <Link   className="uilink" to="/">Tarot readers</Link>
            <Link  className="uilink" to="/">Numerologists</Link>
            <Link  className="uilink" to="/">Vastu expets </Link>
            <Link  className="uilink"  to="/">Fengshui experts </Link> */}
            </div>
          </div>
          {/* <div
          style={{
            height: "70px",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p style={{ color: "white" }}>
            Developed by{" "}
            <a
              href="https://igeeksquadbay.com/"
              target="_blank"
              style={{ color: "#ff4949" }}
            >
              iGeek Squad Bay Pvt Ltd
            </a>
          </p>
        </div> */}
        </footer>
      </div>
    </>
  );
};

export const PaymentModel = ({ prise, setShow }) => {
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const { user } = useSelector((state) => state.userLog);
  const dispatch = useDispatch();
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            user: user._id,
            amount: {
              currency_code: "USD",
              value: prise,
            },
          },
        ],
      })
      .then((order_id) => {
        setOrderID(order_id);
        return order_id;
      });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      if (details.status === "COMPLETED") {
        dispatch(
          Recharge({
            userID: user._id,
            amount: details.purchase_units[0].amount.value,
          })
        ).then((e) => console.log(e.payload));
      }
      setSuccess(true);
    });
  };

  const handleApprove = () => {
    dispatch(
      Recharge({
        userID: user._id,
        amount: prise,
      })
    ).then((e) => e.payload.success == true ? setSuccess(true) : setErrorMessage("Failed Payment"));
  }

  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0px",
          zIndex: "999",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          className="paymentModel"
          style={{
            position: "relative",
            maxHeight: "50%",
            overflowY: "scroll",
            maxWidth: "440px",
            width: "95%",
            backgroundColor: "#f2f2f2",
            padding: "50px 20px",
            borderRadius: "10px",
          }}
        >
          <FaXmark
            onClick={() => setShow(false)}
            style={{ position: "absolute", top: "20px", right: "20px" }}
          />
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
          />
          {/* <button onClick={handleApprove}>Approve Payment</button>
          {ErrorMessage && <div>{ErrorMessage}</div>}
          {success && <div>Payment successful!</div>} */}
        </div>
      </div>
    </>
  );
};

const Ad = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);

    // Optionally, you can also scroll to the top when the component unmounts
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <>
      <Navbar />

      <Footer />
    </>
  );
};
