import React, { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaAngleDown, FaBars, FaSearch } from "react-icons/fa";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";
import {
  ApplyForAstro,
  GetCategory,
  PopupState,
  RechargeHistory,
  UpdateUserProfile,
} from "../../../api/userLogInReducer";
import Dropzone from "react-dropzone";
import { FaChevronLeft, FaXmark } from "react-icons/fa6";
import { AddBlog, MyBlog } from "../../../api/BlogReducer";
import { getSession } from "../../../api/chatReducer";
import { Footer, PaymentModel } from "../../..";
import { NavBar } from "../../Component/All";
import Navbar from "../../Component/Navbar/Navbar";
const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export function checkDateRange(dateString) {
  const date = new Date(dateString);
  const range1Start = new Date(date.getFullYear(), 2, 21);
  const range1End = new Date(date.getFullYear(), 3, 21);
  const range2Start = new Date(date.getFullYear(), 3, 21);
  const range2End = new Date(date.getFullYear(), 4, 22);
  const range3Start = new Date(date.getFullYear(), 4, 22);
  const range3End = new Date(date.getFullYear(), 5, 22);
  const range4Start = new Date(date.getFullYear(), 5, 22);
  const range4End = new Date(date.getFullYear(), 6, 24);
  const range5Start = new Date(date.getFullYear(), 6, 24);
  const range5End = new Date(date.getFullYear(), 7, 24);
  const range6Start = new Date(date.getFullYear(), 7, 24);
  const range6End = new Date(date.getFullYear(), 8, 24);
  const range7Start = new Date(date.getFullYear(), 8, 24);
  const range7End = new Date(date.getFullYear(), 9, 24);
  const range8Start = new Date(date.getFullYear(), 9, 24);
  const range8End = new Date(date.getFullYear(), 10, 23);
  const range9Start = new Date(date.getFullYear(), 10, 23);
  const range9End = new Date(date.getFullYear(), 11, 22);
  const range10Start = new Date(date.getFullYear(), 11, 22);
  const range10End = new Date(date.getFullYear(), 0, 21);
  const range11Start = new Date(date.getFullYear(), 0, 21);
  const range11End = new Date(date.getFullYear(), 1, 20);
  const range12Start = new Date(date.getFullYear(), 1, 20);
  const range12End = new Date(date.getFullYear(), 2, 21);
  if (date >= range1Start && date < range1End) {
    return zodiacSigns[0];
  } else if (date >= range2Start && date < range2End) {
    return [1];
  } else if (date >= range3Start && date < range3End) {
    return zodiacSigns[2];
  } else if (date >= range4Start && date < range4End) {
    return zodiacSigns[3];
  } else if (date >= range5Start && date < range5End) {
    return zodiacSigns[4];
  } else if (date >= range6Start && date < range6End) {
    return zodiacSigns[5];
  } else if (date >= range7Start && date < range7End) {
    return zodiacSigns[6];
  } else if (date >= range8Start && date < range8End) {
    return zodiacSigns[7];
  } else if (date >= range9Start && date < range9End) {
    return zodiacSigns[8];
  } else if (
    (date.getMonth() === 0 && date.getDate() < 22) ||
    (date.getMonth() === 11 && date.getDate() > 22)
  ) {
    return zodiacSigns[9];
  } else if (date >= range11Start && date < range11End) {
    return zodiacSigns[10];
  } else if (date >= range12Start && date < range12End) {
    return zodiacSigns[11];
  }
}

function ProfileSideBar({ children }) {
  const [isModel, setIsModel] = useState("");
  const [profile, setProfile] = useState("");
  const [zodiac, setZodiac] = useState("");
  const { user } = useSelector((state) => state.userLog);
  const [userUpdateDetails, setUserUpdateDetails] = useState({
    name: user.name,
    dob: user.dob,
    bp: user.bp,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUser = (e) => {
    if (e.target.name === "dob") {
      setZodiac(checkDateRange(e.target.value));
    }
    setUserUpdateDetails({
      ...userUpdateDetails,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    setZodiac(checkDateRange(user.dob));
  }, [user]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <NavBar />

      <div
        style={{
          height: " calc(100vh - 91px)",
          height: "100%",
          width: "100vw",
          overflow: "hidden",
          // backgroundColor: "var(--bg-yellow)",
        }}
        className="primary-bg"
      >
        <div
          className="container shfjsd"
          style={{
            marginTop: "2px",
            height: "100%",
            padding: "0px",
            display: "flex",
            gap: "2%",
          }}
        >
          <div
            style={{ position: "relative", zIndex: "1000" }}
            className="profileBar"
          >
            <FaBars
              size={30}
              style={{
                color: "black",
                cursor: "pointer",
                margin: "30px 20px",
                float: "inline-end",
              }}
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
          <div
            className={isOpen ? " profileSide isOpen" : "profileSide"}
            style={{
              maxWidth: "350px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "120px",
                // width: "50%",
                borderRadius: "50%",
                margin: " 20px auto 0px auto ",
                backgroundColor: "gray",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={profile ? profile : user?.avatar?.url}
                alt="profile"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </div>

            <Dropzone
              onDrop={(acceptedFiles) => {
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setProfile(reader.result);
                    dispatch(
                      UpdateUserProfile({
                        profile: reader.result,
                        id: user._id,
                      })
                    );
                  }
                };
                reader.readAsDataURL(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      style={{
                        width: "90%",
                        borderRadius: "5px",
                        padding: "5px 20px",
                        border: "1px solid black",
                        margin: " 20px auto ",
                        backgroundColor: "white",
                        textAlign: "center",
                        overflow: "hidden",
                      }}
                    >
                      change image
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <div
              style={{
                width: "90%",
                borderRadius: "5px",
                padding: "5px 20px",
                border: "1px solid black",
                margin: "0px auto",
                backgroundColor: "white",
                textAlign: "center",
                overflow: "hidden",
              }}
              onClick={() => setIsModel("editProfile")}
            >
              Edit profile
            </div>

            <div
              onClick={() => navigate(`/profile/${user._id}/wallet`)}
              style={{
                width: "90%",
                borderRadius: "10px",
                margin: " 10px auto ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                backgroundColor: "white",
                minHeight: "20px",
                padding: "18px 20px",
              }}
              // className="as_btn"
            >
              <p
                style={{
                  color: "var(--dark)",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Wallet
              </p>
              <BsFillArrowRightCircleFill size={25} color="var(--dark)" />
            </div>
            <div
              onClick={() => navigate(`/offChats`)}
              style={{
                width: "90%",
                borderRadius: "10px",
                margin: " 10px auto ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                backgroundColor: "white",
                minHeight: "20px",
                padding: "18px 20px",
              }}
            >
              <p
                style={{
                  color: "var(--dark)",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Offline Chats
              </p>
              <BsFillArrowRightCircleFill size={25} color="var(--dark)" />
            </div>
            <div
              onClick={() => navigate(`/chat`)}
              style={{
                width: "90%",
                borderRadius: "10px",
                margin: " 10px auto ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                backgroundColor: "white",
                minHeight: "20px",
                padding: "18px 20px",
              }}
            >
              <p
                style={{
                  color: "var(--dark)",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Chats
              </p>
              <BsFillArrowRightCircleFill size={25} color="var(--dark)" />
            </div>

            <div
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
                window.location.reload();
              }}
              style={{
                width: "90%",
                borderRadius: "10px",
                margin: " 10px auto ",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                backgroundColor: "white",
                minHeight: "20px",
                padding: "18px 20px",
              }}
            >
              <p
                style={{
                  color: "var(--dark)",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                }}
              >
                Logout
              </p>
              <BsFillArrowRightCircleFill size={25} color="var(--dark)" />
            </div>
          </div>
          {children}
        </div>
      </div>
      {isModel === "editProfile" && (
        <>
          <div
            style={{
              height: "100vh",
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#ffffff80",
              position: "absolute",
              top: "0px",
              left: "0px",
            }}
          >
            <div
              style={{
                width: "440px",
                paddingTop: "30px",
                minHeight: "300px",
                backgroundColor: "white",
                borderRadius: "10px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setIsModel("")}
              >
                <FiArrowLeft size={30} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px",
                  padding: "20px 40px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    name
                  </label>
                  <input
                    value={userUpdateDetails?.name}
                    onChange={handleUser}
                    name="name"
                    type="text"
                    style={{
                      border: "1px solid gray",
                      outline: "none",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={userUpdateDetails?.dob}
                    onChange={handleUser}
                    name="dob"
                    style={{
                      border: "1px solid gray",
                      outline: "none",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Birth Place
                  </label>
                  <input
                    value={userUpdateDetails.bp}
                    type="text"
                    onChange={handleUser}
                    name="bp"
                    style={{
                      border: "1px solid gray",
                      outline: "none",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    zodiac
                  </label>
                  <p
                    style={{
                      background: "white",
                      border: "1px solid gray",
                      outline: "none",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontWeight: "500",
                    }}
                  >
                    {zodiac}
                  </p>
                </div>
                {/* <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                  <label style={{ fontSize: "1.2rem", fontWeight: "500", textTransform: "uppercase" }}>
                    Zodiac
                  </label>
                  <select name="zodiac">
                    <option default>select zodiac</option>
                    {zodiacSigns.map((e) => (
                      <option value={e}>{e}</option>
                    ))}
                  </select>


                </div> */}
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      UpdateUserProfile({
                        ...userUpdateDetails,
                        zodiac,
                        id: user._id,
                      })
                    ).then((e) => {
                      e?.payload?.success && setIsModel("");
                      e?.payload?.success && alert("profile updated");
                    });
                  }}
                  style={{
                    border: "2px solid var(--dark)",
                    padding: "5px 20px",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Update
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
export const ProfileID = () => {
  const { user } = useSelector((state) => state.userLog);
  return (
    <>
      <div
        style={{
          flex: "1",
          margin: "20px 0px",
          display: "flex",
          flexDirection: "column",
          padding: "50px 40px",
          gap: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <p style={{ fontSize: "25px" }}>
          Here you found all information regarding your account
        </p>
        <div
          style={{
            width: "100%",
            // backgroundColor: "var(--cta-white)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          className="seconde_bg"
        >
          <p
            style={{
              color: "var(--dark)",
              fontSize: "1.3rem",
              fontWeight: "500",
            }}
          >
            Info....
          </p>
          <p
            className="text-black"
            style={{ fontWeight: "300", marginTop: "5px" }}
          >
            Astro use your this information to verify your identity and to keep
            our community safe
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              paddingBottom: "20px",
              gridGap: "20px",
              marginTop: "20px",
              color: "var(--dark)",
            }}
          >
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Name</p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user.name}
              </span>
            </div>{" "}
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Email</p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user.email}
              </span>
            </div>
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                Date of Birth
              </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user.dob}
              </span>
            </div>
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                Birth Place
              </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user.bp}
              </span>
            </div>
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                Birth Time
              </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user.bt}
              </span>
            </div>
            <div style={{ padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>
                Western Zodiac SunSign
              </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>
                {user?.zodiac}
              </span>
            </div>
          </div>
        </div>
        {/* <div style={{ width: "100%", backgroundColor: "rgba(135, 135, 135, 0.28)", padding: "10px 20px", borderRadius: "10px" }}>
          <p style={{ color: "white", fontSize: "20px" }}>Bank Details</p>
          <p style={{ color: "#a8a8a8", fontSize: "16px", fontWeight: "300", marginTop: "5px" }}>This is your bank details</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", paddingBottom: "20px", gridGap: "20px", marginTop: "20px", color: "white" }}>
            <div style={{ backgroundColor: "#353535", padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Account Number</p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>8273424623872</span>
            </div><div style={{ backgroundColor: "#353535", padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Account Name</p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>ABHISHEK</span>
            </div>
            <div style={{ backgroundColor: "#353535", padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>Branch name </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>Dehradun</span>
            </div> <div style={{ backgroundColor: "#353535", padding: "10px 20px", borderRadius: "3px" }}>
              <p style={{ fontSize: "20px", marginBottom: "10px" }}>IFCI code </p>
              <span style={{ fontSize: "18px", fontWeight: "300" }}>SB 283723</span>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
const spokenLanguages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Portuguese",
  "Italian",
  "Dutch",
  "Swedish",
  "Turkish",
  "Hindi",
  "Bengali",
  "Urdu",
  "Punjabi",
  "Swahili",
  "Tagalog",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Farsi",
  "Hebrew",
  "Greek",
  "Polish",
  "Hungarian",
];
const hours = [
  "1 hours",
  "2 hours",
  "3 hours",
  "4 hours",
  "5 hours",
  "6 hours",
  "7 hours",
  "8 hours",
  "above then 8",
];

export const AstrologerForm = () => {
  const s = [
    "Relationship",
    "Finance",
    "Job",
    "Career",
    "Marriage",
    "Child birth",
    "Spirituality",
  ];
  const [astro, setAstro] = useState({
    name: "",
    email: "",
    number: "",
    category: [],
    price: "",
    languages: [],
    country: "",
    address: "",
    experience: "",
    gender: "",
    dateOfBirth: "",
    dailyHours: "",
    platform: "",
    onboard: "",
    interviewDate: "",
    interviewTime: "",
    bio: "",
    spirituality: [],
  });
  const dispatch = useDispatch();
  const a = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };
  const validateFields = () => {
    if (
      !astro.name ||
      !astro.email ||
      !astro.number ||
      !astro.experience ||
      !astro.category ||
      !astro.languages ||
      !astro.country ||
      !astro.gender
    ) {
      dispatch(PopupState({ status: "Error", message: "fill all fields" }));
      return;
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(astro.email) ===
      false
    ) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid email format." })
      );
      return;
    }

    if (!parseInt(astro.number)) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid phone number format." })
      );
      return;
    }

    if (!parseInt(astro.experience)) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid experience format." })
      );
      return;
    }
    dispatch(ApplyForAstro({ ...astro })).then((e) => {
      e.payload.success
        ? dispatch(
            PopupState({ status: "Success", message: e.payload.message })
          )
        : dispatch(PopupState({ status: "Error", message: e.payload.message }));
      // e.payload.success && setAstro({
      //   name: "",
      //   email: "",
      //   number: "",
      //   category: [],
      //   price: "",
      //   languages: [],
      //   country: "",
      //   address: "",
      //   experience: "",
      //   gender: "",
      //   dateOfBirth: "",
      //   dailyHours: "",
      //   platform: "",
      //   onboard: "",
      //   interviewDate: "",
      //   interviewTime: "",
      //   bio: "",
      //   spirituality: []
      // })
    });
  };
  const [category, setCategory] = useState([]);
  const [e, setE] = useState(false);
  const { user } = useSelector((state) => state.userLog);
  useEffect(() => {
    dispatch(GetCategory()).then((e) => setCategory(e.payload.categories));
  }, []);
  const [d, setd] = useState(window.innerWidth);
  return (
    <>
      {user?._id ? <NavBar /> : <Navbar />}
      <div
        className="aj seconde_bg"
        style={{
          flex: "1",
          height: "100%",
          maxWidth: "1400px",
          overflow: "hidden",
          // margin: "20px 0px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "50px 40px",
          gap: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <p className="as_heading" style={{ color: "", fontSize: "25px" }}>
          Fill the form for work as a Astrologer
        </p>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cta-white)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <p
            className="as_heading fs-3 mt-3"
            // style={{
            //   color: "var(--dark)",
            //   fontSize: "1.3rem",
            //   fontWeight: "500",
            // }}
          >
            Info....
          </p>
          <p style={{ color: "#a8a8a8", fontWeight: "300", marginTop: "5px" }}>
            Fill the information for easy to connect with in future
          </p>
          <div
            className="sj"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(auto-fit, minmax(${
                d > 450 ? "300px" : "100%"
              }, 1fr))`,
              paddingBottom: "20px",
              gridGap: "20px",
              marginTop: "20px",
              color: "var(--dark)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                name
              </label>
              <input
                value={astro.name}
                onChange={a}
                name="name"
                type="text"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                email
              </label>
              <input
                type="text"
                value={astro.email}
                onChange={a}
                name="email"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                number
              </label>
              <input
                type="text"
                value={astro.number}
                onChange={a}
                name="number"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Country
              </label>
              <input
                type="text"
                value={astro.country}
                onChange={a}
                name="country"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Address
              </label>
              <input
                type="text"
                value={astro.address}
                onChange={a}
                name="address"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Gender
              </label>
              <div style={{ display: "flex", gap: "2%" }}>
                <div style={{ display: "flex", gap: "7px " }}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    id="male"
                    onChange={a}
                  />
                  <label
                    htmlFor="male"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Male
                  </label>
                </div>
                <div style={{ display: "flex", gap: "7px " }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    id="female"
                    onChange={a}
                  />
                  <label
                    htmlFor="female"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Female
                  </label>
                </div>
                <div style={{ display: "flex", gap: "7px " }}>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    id="other"
                    onChange={a}
                  />
                  <label
                    htmlFor="other"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                date of birth
              </label>
              <input
                type="date"
                value={astro.dateOfBirth}
                onChange={a}
                name="dateOfBirth"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cta-white)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <p
            // style={{
            //   color: "var(--dark)",
            //   fontSize: "1.3rem",
            //   fontWeight: "500",
            // }}
            className="as_heading fs-3 mt-3"
          >
            Experience Information
          </p>
          <div
            className="sj"
            style={{
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              color: "var(--dark)",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                experience
              </label>
              <input
                type="text"
                value={astro.experience}
                onChange={a}
                name="experience"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                // style={{
                //   fontSize: "1.2rem",
                //   fontWeight: "500",
                //   textTransform: "uppercase",
                // }}
                className="as_heading fs-3 mt-3"
              >
                categories
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  outline: "none",
                  position: "relative",
                }}
              >
                {category?.map((e) => (
                  <>
                    <div
                      onClick={() => {
                        astro.category.includes(e.category)
                          ? setAstro({
                              ...astro,
                              category: astro.category.filter(
                                (i) => i !== e.category
                              ),
                            })
                          : setAstro({
                              ...astro,
                              category: [...astro.category, e.category],
                            });
                      }}
                      style={{
                        padding: "5px 15px",
                        alignItems: "center",
                        display: "flex",
                        gap: "8px",
                        border: astro.category.includes(e.category)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro.category.includes(e.category)
                          ? "rgb(108 16 0)"
                          : "#d51e00",

                        color: "#ffff",
                      }}
                    >
                      {e.category}{" "}
                      {astro.category.includes(e.category) && <FaXmark />}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                spirituality
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  outline: "none",
                  position: "relative",
                }}
              >
                {s?.map((e) => (
                  <>
                    <div
                      onClick={() => {
                        astro.spirituality.includes(e)
                          ? setAstro({
                              ...astro,
                              spirituality: astro.spirituality.filter(
                                (i) => i !== e
                              ),
                            })
                          : setAstro({
                              ...astro,
                              spirituality: [...astro.spirituality, e],
                            });
                      }}
                      style={{
                        padding: "5px 15px",
                        alignItems: "center",
                        display: "flex",
                        gap: "8px",
                        border: astro.spirituality.includes(e)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro.spirituality.includes(e)
                          ? "rgb(108 16 0)"
                          : "#d51e00",

                        color: "#ffff",
                      }}
                    >
                      {e} {astro.spirituality.includes(e) && <FaXmark />}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Languages
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                  outline: "none",
                  position: "relative",
                }}
              >
                {spokenLanguages?.map((e) => (
                  <>
                    <div
                      onClick={() => {
                        astro.languages.includes(e)
                          ? setAstro({
                              ...astro,
                              languages: astro.languages.filter((i) => i !== e),
                            })
                          : setAstro({
                              ...astro,
                              languages: [...astro.languages, e],
                            });
                      }}
                      style={{
                        padding: "5px 15px",
                        alignItems: "center",
                        display: "flex",
                        gap: "8px",
                        border: astro.languages.includes(e)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro.languages.includes(e)
                          ? "rgb(108 16 0)"
                          : "#d51e00",
                        color: "#ffff",
                      }}
                    >
                      {e} {astro.languages.includes(e) && <FaXmark />}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            backgroundColor: "var(--cta-white)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <p
            // style={{
            //   color: "var(--dark)",
            //   fontSize: "1.3rem",
            //   fontWeight: "500",
            // }}
            className="as_heading fs-3 mt-3"
          >
            Work information
          </p>
          <div
            style={{
              display: "flex",
              paddingBottom: "20px",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
              color: "var(--dark)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                How many hours an you contribute daily?
              </label>
              <select
                name="dailyHours"
                onChange={a}
                style={{
                  border: "1px solid gray",
                  height: "35px",
                  backgroundColor: "white",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "10px",
                }}
              >
                <option>Select Daily hours</option>
                {hours.map((e) => (
                  <option>{e}</option>
                ))}
              </select>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Are you working on any other platform?
              </label>
              <div style={{ display: "flex", gap: "2%" }}>
                <div style={{ display: "flex", gap: "7px " }}>
                  <input
                    type="radio"
                    name="platform"
                    onChange={a}
                    value="yes"
                    id="yes"
                  />
                  <label
                    htmlFor="yes"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    Yes
                  </label>
                </div>
                <div style={{ display: "flex", gap: "7px " }}>
                  <input
                    type="radio"
                    name="platform"
                    onChange={a}
                    value="no"
                    id="no"
                  />
                  <label
                    htmlFor="no"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
              <label style={{ fontSize: "1.2rem", fontWeight: "500", textTransform: "uppercase" }}>
                What is the suitable time for interview?
              </label>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

                <input type="date" onChange={a} name='interviewDate' style={{ border: "1px solid gray", outline: "none", padding: "3px 10px", flex: "1", borderRadius: "6px", fontWeight: "500" }} />
                <input type="time" onChange={a} name='interviewTime' style={{ border: "1px solid gray", outline: "none", padding: "3px 10px", flex: "1", borderRadius: "6px", fontWeight: "500" }} />
              </div>
            </div> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
              }}
            >
              <label
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                Bio
              </label>
              <textarea
                type="text"
                value={astro.bio}
                onChange={a}
                name="bio"
                style={{
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  width: "100%",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{ width: "130px" }}
          className="as_btn d-flex ms-3"
          onClick={validateFields}
        >
          submit
        </div>
      </div>
      <Footer />
    </>
  );
};

export const AstrologerBlog = () => {
  const [addNew, setAddNew] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    heading: "",
    paragraph: "",
  });
  const [banner, setBanner] = useState("");
  const { user } = useSelector((state) => state.userLog);
  const { myBlog } = useSelector((state) => state.blog);
  const formHandle = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    user._id && dispatch(MyBlog({ id: user._id }));
  }, [user]);
  return (
    <>
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          margin: "20px 0px",
          display: "flex",
          flexDirection: "column",
          padding: "50px 40px",
          gap: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {addNew ? (
            <>
              <FaChevronLeft
                size={30}
                style={{ cursor: "pointer" }}
                onClick={() => setAddNew(false)}
              />
            </>
          ) : (
            <>
              <p style={{ color: "", fontSize: "25px" }}>Your blogs</p>
              <div
                style={{
                  fontSize: "20px",
                  border: "2px solid black",
                  padding: "5px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setAddNew(true);
                }}
              >
                Add Blog
              </div>
            </>
          )}
        </div>
        {addNew ? (
          <>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1",
                  minWidth: "250px",
                }}
              >
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={blog.title}
                  onChange={formHandle}
                  name="title"
                  id="title"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1",
                  minWidth: "250px",
                }}
              >
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  value={blog.description}
                  name="description"
                  onChange={formHandle}
                  id="description"
                />
              </div>
            </div>
            <p style={{ color: "", fontSize: "25px" }}>Add blog sections</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "250px",
              }}
            >
              <label htmlFor="Heading">Heading</label>
              <input
                type="text"
                value={blog.heading}
                name="heading"
                id="Heading"
                onChange={formHandle}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: "1",
                minWidth: "250px",
              }}
            >
              <label htmlFor="Paragraph">Paragraph</label>
              <input
                type="text"
                value={blog.paragraph}
                name="paragraph"
                id="Paragraph"
                onChange={formHandle}
              />
            </div>

            <Dropzone
              onDrop={(acceptedFiles) => {
                const reader = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setBanner(reader.result);
                  }
                };
                reader.readAsDataURL(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "16 / 9 ",
                        margin: " 20px auto ",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {banner === "" ? (
                        <>
                          {/* <img src={user?.avatar?.url} alt="" style={{ width: "100%", objectFit: "cover", }} /> */}
                        </>
                      ) : (
                        <img
                          src={banner}
                          style={{ width: "100%", objectFit: "cover" }}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
            <div
              onClick={(e) => {
                e.preventDefault();
                dispatch(AddBlog({ ...blog, banner, user: user._id }));
              }}
              style={{
                border: "2px solid black",
                width: "100px",
                padding: "5px",
                cursor: "pointer",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              submit
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {myBlog.map((e) => (
                <div
                  key={e._id}
                  style={{
                    width: "33%",
                    backgroundColor: "white",
                    paddingBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "16 / 9",
                      backgroundColor: "red",
                    }}
                  >
                    <img
                      src={e?.banner?.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 10px",
                    }}
                  >
                    <div
                      onClick={() => navigate(`/blog/${e._id}`)}
                      style={{
                        padding: "0px 10px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <p style={{ marginTop: "10px", fontWeight: "500" }}>
                        {e.title}
                      </p>
                      <p>1-2-2003</p>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        borderRadius: "6px",
                        padding: "5px 15px",
                        border: "2px solid var(--dark)",
                      }}
                      onClick={() => navigate(`/editBlog/${e._id}`)}
                    >
                      Edit
                    </div>
                  </div>

                  {/* <div style={{ display: "flex", flexWrap: "wrap", padding: "5px 10px", gap: "10px" }}>
                        <p style={{ padding: "4px 10px", fontWeight: "500", backgroundColor: "var(--cta-yellow)", borderRadius: "3px", cursor: "pointer" }}>Lorem</p>
                        <p style={{ padding: "4px 10px", fontWeight: "500", backgroundColor: "var(--cta-yellow)", borderRadius: "3px", cursor: "pointer" }}>Lorem</p>

                      </div> */}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

// wallet code

export const Wallet = () => {
  const { user } = useSelector((state) => state.userLog);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pValue = queryParams.get("p");
  const dispatch = useDispatch();
  const { session } = useSelector((state) => state.chat);
  const AllTransition = [...session].reverse();
  const [recharge, setRecharge] = useState([]);
  useEffect(() => {
    user._id && dispatch(getSession({ id: user._id }));
    user._id &&
      dispatch(RechargeHistory({ id: user._id })).then(
        (e) => e.payload.success && setRecharge(e.payload.rechargeHistory)
      );
  }, [user]);
  const [prise, setAmount] = useState(0);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState("transition");

  const convertMinutesToHourMinute = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}:${remainingMinutes.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* AS3ieuQvAhlw1neiJ5cF_tt-IUdGoMyE5n05bOnIUvWkZAv-RobWmqTbKbqBNSe91LJ_NA3CcZVw7DRb */}
      <div
        style={{
          flex: "1",
          height: "100%",
          overflow: "hidden",
          margin: "20px 0px",
          display: "flex",
          flexDirection: "column",
          padding: "50px 40px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        <div className="d-flex justify-content-between flex-wrap">
          <p style={{ color: "", fontSize: "25px" }}>Wallet</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                padding: "5px 15px",
                borderRadius: "5px",
              }}
            >
              USD {user?.balance > 0 ? user?.balance?.toFixed(2) : 0}
            </div>
            <div
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                padding: "5px 15px",
                borderRadius: "5px",
              }}
            >
              Bonus Balance {user?.bonus > 0 ? user.bonus?.toFixed(2) : 0}
            </div>
            <div
              style={{
                background: "transparent",
                border: "2px solid var(--dark)",
                display: "flex",
                alignItems: "center",
                padding: "5px 15px",
                borderRadius: "5px",
              }}
              onClick={() =>
                pValue === "addmoney"
                  ? navigate(`/profile/${user._id}/wallet`)
                  : navigate(`/profile/${user._id}/wallet?p=addmoney`)
              }
            >
              {pValue === "addmoney" ? "wallet history" : "add money"}
            </div>
          </div>
        </div>

        {pValue === "addmoney" ? (
          <>
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                gap: "1px",
                color: "white",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  onClick={() => {
                    setAmount(10);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $10{" "}
                </div>
                <div
                  onClick={() => {
                    setAmount(29);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $29
                </div>
                <div
                  onClick={() => {
                    setAmount(49);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $49
                </div>
                <div
                  onClick={() => {
                    setAmount(99);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $99
                </div>
                <div
                  onClick={() => {
                    setAmount(149);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $149
                </div>
                <div
                  onClick={() => {
                    setAmount(199);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $199
                </div>
                <div
                  onClick={() => {
                    setAmount(222);
                    setShow(true);
                  }}
                  style={{
                    border: "1px solid gray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    aspectRatio: "4/3",
                    width: "30%",
                    maxWidth: "200px",
                    borderRadius: "6px",
                    color: "green",
                    background: "white",
                    maxWidth: "100px",
                  }}
                >
                  $222
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                gap: "1px",
                backgroundColor: "var(--dark)",
              }}
            >
              <div
                onClick={() => setPage("transition")}
                style={{
                  flex: "1",
                  textAlign: "center",
                  backgroundColor: page == "transition" ? "#fff4cc" : "white",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                all transition
              </div>
              <div
                onClick={() => setPage("recharge")}
                style={{
                  flex: "1",
                  textAlign: "center",
                  backgroundColor: page == "recharge" ? "#fff4cc" : "white",
                  padding: "10px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  fontWeight: "600",
                }}
              >
                recharge history
              </div>
            </div>
            {page === "transition" && (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    borderTop: "1px solid var(--dark)",
                    gap: "1px",
                  }}
                >
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Astro Name</th>
                        <th>User Paid</th>
                        <th>Chat Price</th>
                        <th>Chat Durations</th>
                        <th>Chat Time</th>
                        <th>Chat Date</th>
                        <th>Refund Status</th>
                        <th>Refund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllTransition?.map((e, i) => (
                        <tr key={i}>
                          <td>{e.astro.name}</td>
                          <td>-${parseFloat(e.userPaid?.toFixed(2))}</td>
                          <td>{e.userPaidPrise}</td>

                          <td>{convertMinutesToHourMinute(e.timeInSeconds)}</td>
                          <td>
                            <span>{new Date(e.createdAt)?.getHours()}</span>:
                            <span>{new Date(e.createdAt)?.getMinutes()}</span>:
                            <span>{new Date(e.createdAt)?.getSeconds()}</span>
                          </td>
                          <td>
                            <span>{new Date(e.createdAt)?.getDate()}</span>-
                            <span>{new Date(e.createdAt)?.getMonth() + 1}</span>
                            -<span>{new Date(e.createdAt)?.getFullYear()}</span>
                          </td>
                          <td>
                            <span class="badge rounded-pill bg-warning text-dark">
                              Pending
                            </span>
                          </td>
                          <td>
                            <button type="button" className="btn btn-primary">
                              Primary
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {page === "recharge" && (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    borderTop: "1px solid var(--dark)",
                    gap: "1px",
                  }}
                >
                  {recharge?.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flex: "1",
                        minWidth: "50%",
                        backgroundColor: "var(--bg-white)",
                        alignItems: "center",
                        padding: "10px 20px",
                      }}
                    >
                      <div
                        style={{
                          flex: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        +{e.amount}
                      </div>
                      <div
                        style={{
                          flex: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{new Date(e.createdAt).getHours()}</span>:
                        <span>{new Date(e.createdAt).getMinutes()}</span>
                      </div>
                      <div
                        style={{
                          flex: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{new Date(e.createdAt).getDate()}</span>-
                        <span>{new Date(e.createdAt).getMonth() + 1}</span>-
                        <span>{new Date(e.createdAt).getFullYear()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      {show && <PaymentModel prise={prise} setShow={setShow} />}
    </>
  );
};

export default ProfileSideBar;
