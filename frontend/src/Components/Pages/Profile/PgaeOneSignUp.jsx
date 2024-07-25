import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Footer, PaymentModel } from "../../..";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaXmark } from "react-icons/fa6";
import OTPInput, { ResendOTP } from "otp-input-react";
import {
  ApplyForAstro,
  GetCategory,
  PopupState,
  RechargeHistory,
  UpdateUserProfile,
} from "../../../api/userLogInReducer";
import axios from "axios";
import Navbar from "../../Component/Navbar/Navbar";
import moment from "moment";
const PageOneSignUp = () => {
  const navigate = useNavigate();

  const s = [
    "Relationship",
    "Finance",
    "Job",
    "Career",
    "Marriage",
    "Child birth",
    "Spirituality",
  ];
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
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const [d, setd] = useState(window.innerWidth);
  const [userId, setuserId] = useState("");

  const HandlerChange = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };

  const validateFields = async (e) => {
    e.preventDefault();
    // Check if any required field is empty
    const requiredFields = [
      "name",
      "email",
      "number",
      "experience",
      "category",
      "languages",
      "country",
      "gender",
    ];
    const missingFields = requiredFields.filter((field) => !astro[field]);
    if (missingFields.length > 0) {
      dispatch(
        PopupState({ status: "Error", message: "Please fill in all fields." })
      );
      return;
    }

    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(astro.email)) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid email format." })
      );
      return;
    }

    // Validate number format
    if (isNaN(parseInt(astro.number))) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid phone number format." })
      );
      return;
    }

    // Validate experience format
    if (isNaN(parseInt(astro.experience))) {
      dispatch(
        PopupState({ status: "Error", message: "Invalid experience format." })
      );
      return;
    }
    axios.post("/api/v1/astro/otp", astro).then((res) => {
      let data = res.data;
      console.log({ data });
      if (data?.success) {
        setuserId(data?.astro?._id);
        handleNext();
        toast.success(data?.message);
      }
    });
    // Dispatch action to apply for astro
    // dispatch(ApplyForAstro({ ...astro })).then((res) => {
    //   let data = res.payload.success;

    //   if (data) {
    //     axios.post("/api/v1/astro/otp", astro).then((res) => {
    //       let data = res.data;
    //       console.log({ data });
    //       if (data?.success) {
    //         setuserId(data?.astro?._id);
    //         handleNext();
    //         toast.success(data?.message);
    //       }
    //     });
    //   } else {
    //     toast.error(data?.message);
    //   }
    // });
  };

  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(GetCategory()).then((e) => setCategory(e.payload.categories));
  }, []);

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
    password: "",
    confirmPassword: "",
    idProof: "",
    image: "",
  });

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const [OTP, setOTP] = useState("");

  const ResendOtp = () => {
    axios.post("/api/v1/astro/otp", astro).then((res) => {
      let data = res?.data;
      console.log("rrrrrrrr", data);
      if (data?.success) {
        toast.success(data?.message);
        setOTP("");
      } else {
        toast.error(data?.message);
        setOTP("");
      }
    });
  };

  const OtpCheck = (e) => {
    e.preventDefault();
    axios
      .post("/api/v1/astro/verify/otp", {
        otp: OTP,
        id: userId,
      })
      .then((res) => {
        let data = res?.data;
        console.log("otp", data);
        if (data?.status) {
          dispatch(ApplyForAstro({ ...astro })).then((res) => {
            let data = res.payload.success;

            if (data) {
              toast.success(data?.message);
              handleNext();
            } else {
              toast.error(data?.message);
            }
          });
        } else {
          toast.error(data?.message);
          setOTP("");
          // dispatch(PopupState({ status: "Error", message: data?.message }));
        }
      });
  };

  const RegisterAstro = (e) => {
    e.preventDefault();
    dispatch(ApplyForAstro({ ...astro })).then((res) => {
      let data = res.payload.success;

      if (data) {
        toast.success(data?.message);
        // navigate(-1);
        // setCurrentPage(5);
      } else {
        toast.error(data?.message);
      }
    });
  };

  // profile upload
  const [preview, setPreview] = useState(null);

  // Function to handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Function to read the file and set the preview
  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setAstro({ ...astro, ["image"]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Function to prevent default behavior on drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // ids upload
  const [Idpreview, setIdPreview] = useState(null);

  // Function to handle file drop
  const IdhandleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    IdhandleFile(file);
  };

  // Function to handle file input change
  const IdhandleFileChange = (e) => {
    const file = e.target.files[0];
    IdhandleFile(file);
  };

  // Function to read the file and set the preview
  const IdhandleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setIdPreview(reader.result);
      setAstro({ ...astro, ["idProof"]: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Function to prevent default behavior on drag over
  const IdhandleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <Container>
        <Row className="justify-content-center align-items-center">
          <Col>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "20px",
                position: "relative",
              }}
            >
              {currentPage != 4 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "600px",
                    position: "relative",
                  }}
                >
                  {/* Line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "72%",
                      left: "0",
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#ccc",
                      zIndex: "-1",
                    }}
                  ></div>

                  {[1, 2, 3].map((page) => (
                    <div
                      key={page}
                      className={`circle ${
                        currentPage === page
                          ? "active_circle"
                          : "Inactive_circle"
                      }`}
                      // onClick={() => setCurrentPage(page)}
                    >
                      {currentPage > page ? "✔️" : page}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="row  d-flex align-items-center justify-content-center ">
              <div className="col-md-8 col-10 seconde_bg rounded p-4">
                {/* Your form inputs for each page */}
                {currentPage === 1 && (
                  <>
                    <div class="col-lg-12 text-center mb-2">
                      <h1 class="as_top">Unziptruth Psychic Hiring Process</h1>
                      <div class="as-line"></div>
                    </div>

                    <p>
                      Thank You for applying to Unzzip Truth. Here is how our
                      onboarding process works. You will be assigned an
                      Onboarding specialist within 5 working days. Post that, we
                      generally take 2-3 days to make your profile live! We will
                      initiate a chat window for you to get you all the updates
                      about the following process. On final selection (post
                      third round), we will send you a congratulatory mail as
                      feedback and ensure further process.
                    </p>

                    <ol>
                      <li> 1 Profile level shortlisting (Current stage)</li>
                      <li>2 First round (Typing Test)</li>
                      <li>3 Second round (Audio/Video call)</li>
                      <li>4 Document verification (on selection only)</li>
                      <li>
                        5 Astrologer Application Training session (on selection
                        only)
                      </li>
                      <li>6 Sample customer call/chat (on selection only)</li>
                      <li>7 Your profile is live!</li>
                    </ol>

                    <form onSubmit={handleNext}>
                      <div>
                        <input
                          type="checkbox"
                          id="termsCheckbox"
                          className="me-3"
                          required
                        />
                        <label htmlFor="termsCheckbox">
                          I agree and confirm these terms.
                        </label>
                      </div>

                      <div className="d-flex align-items-center justify-content-center">
                        <button type="submit" className="as_btn   d-flex ms-3">
                          Next
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {/* Your form inputs for Hiring Process page */}
                {currentPage === 2 && (
                  <>
                    <form onSubmit={validateFields}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="text"
                              id="firstName"
                              required
                              name="name"
                              value={astro?.name}
                              onChange={HandlerChange}
                              placeholder="First Name"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="email"
                              required
                              value={astro?.email}
                              onChange={HandlerChange}
                              name="email"
                              placeholder="Enter email"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4 pb-2">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="tel"
                              id="phoneNumber"
                              required
                              name="number"
                              value={astro?.number}
                              onChange={HandlerChange}
                              placeholder="Enter Phone Number"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4 pb-2">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="text"
                              placeholder="Enter Country"
                              required
                              name="country"
                              value={astro?.country}
                              onChange={HandlerChange}
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="text"
                              placeholder="Enter Address"
                              required
                              name="address"
                              value={astro?.address}
                              onChange={HandlerChange}
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <input
                              type="number"
                              placeholder="Enter experience "
                              className="form-control form-control-lg"
                              name="experience"
                              value={astro?.experience}
                              min={0}
                              onChange={HandlerChange}
                              required
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-6 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <label className="form-label" htmlFor="DateOfBirth">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              id="DateOfBirth"
                              required
                              name="dateOfBirth"
                              value={astro?.dateOfBirth}
                              onChange={HandlerChange}
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div> */}
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">Gender: </h6>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              required
                              name="gender"
                              id="femaleGender"
                              onChange={HandlerChange}
                              value={"Female"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="femaleGender"
                            >
                              Female
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="maleGender"
                              value={"Male"}
                              onChange={HandlerChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="maleGender"
                            >
                              Male
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="otherGender"
                              onChange={HandlerChange}
                              value={"Other"}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="otherGender"
                            >
                              Other
                            </label>
                          </div>
                        </div>

                        <p className="as_heading fs-3 mt-3">Work information</p>

                        <div className="col-md-6 mb-4">
                          <div>
                            <label htmlFor="howDidYouHear">
                              How did you hear about us?
                            </label>
                            <select
                              id="howDidYouHear"
                              class="form-select"
                              onChange={HandlerChange}
                              name="howDidYouHear"
                              required
                            >
                              <option value="">Select an option</option>
                              <option value="socialMedia">
                                Social media (Facebook, Instagram, Twitter,
                                etc.)
                              </option>
                              <option value="wordOfMouth">Word of mouth</option>
                              <option value="searchEngine">
                                Search engine (Google, Bing, etc.)
                              </option>
                              <option value="advertisement">
                                Advertisement (Online or offline)
                              </option>
                              <option value="websiteAd">
                                Website/Social media ad
                              </option>
                              <option value="friendOrFamily">
                                Friend or family member
                              </option>
                              <option value="eventTradeshow">
                                Event/Tradeshow
                              </option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="techSkills">
                            How do you consider your tech skills?
                          </label>
                          <select
                            id="techSkills"
                            class="form-select"
                            onChange={HandlerChange}
                            name="techSkills"
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="beginner">
                              Beginner: Basic understanding, limited experience.
                            </option>
                            <option value="intermediate">
                              Intermediate: Comfortable using technology,
                              moderate experience.
                            </option>
                            <option value="advanced">
                              Advanced: Extensive knowledge and experience, can
                              tackle complex tech tasks.
                            </option>
                            <option value="expert">
                              Expert: Highly skilled, deep expertise can
                              troubleshoot and innovate.
                            </option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <label htmlFor="commitment">
                            Are you able to commit 21 hours a week?
                          </label>
                          <select
                            id="commitment"
                            class="form-select"
                            onChange={HandlerChange}
                            name="commitment"
                            required
                          >
                            <option value="">Select an option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>

                        <div className="col-md-6 mb-4 pb-2">
                          <label htmlFor="readingStyle">
                            What is your reading style?
                          </label>
                          <select
                            id="readingStyle"
                            class="form-select"
                            onChange={HandlerChange}
                            name="readingStyle"
                            required
                          >
                            <option value="">Select your reading style</option>
                            <option value="Direct">Direct</option>
                            <option value="Wise">Wise</option>
                            <option value="Thoughtful">Thoughtful</option>
                            <option value="Compassionate">Compassionate</option>
                            <option value="Expressive">Expressive</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                              <h6 className="mb-2 pb-1">
                                {" "}
                                Do you have a laptop/computer and a secure
                                internet connection?
                              </h6>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  required
                                  name="platform"
                                  id="femaleGender"
                                  onChange={HandlerChange}
                                  value="yes"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="femaleGender"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="platform"
                                  id="maleGender"
                                  onChange={HandlerChange}
                                  value="no"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="maleGender"
                                >
                                  No
                                </label>
                              </div>
                            </div>
                        <div className="col-md-12">
                          <div className="row">
                        

                            <div className="col-md-6 mb-4 pb-2">
                              <label htmlFor="educationLevel">
                                What is the highest level of Education you do
                                have?
                              </label>
                              <div
                                data-mdb-input-init=""
                                className="form-outline"
                              >
                                <input
                                  type="text"
                                  id="educationLevel"
                                  placeholder="Enter your highest education level"
                                  required
                                  name="educationLevel"
                                  value={astro?.educationLevel}
                                  onChange={HandlerChange}
                                  className="form-control form-control-lg"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <label htmlFor="trainingsCertifications">
                                What trainings/certifications do you have?
                              </label>
                              <div
                                data-mdb-input-init=""
                                className="form-outline"
                              >
                                <input
                                  type="text"
                                  id="trainingsCertifications"
                                  placeholder="Enter your trainings/certifications"
                                  required
                                  name="trainingsCertifications"
                                  value={astro?.trainingsCertifications}
                                  onChange={HandlerChange}
                                  className="form-control form-control-lg"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 mb-4 pb-2">
                              <label htmlFor="socialMediaLink">
                                Do you use Social Media to promote yourself?
                                Kindly provide a direct link to those
                                pages/profile
                              </label>
                              <input
                                type="text"
                                id="socialMediaLink"
                                placeholder="Enter your social media link"
                                value={astro?.socialMediaLink}
                                onChange={HandlerChange}
                                name="socialMediaLink"
                                className="form-control"
                                required
                              />
                            </div>

                            <div className="col-md-12 mb-4 pb-2">
                              <label htmlFor="psychicAbilities">
                                How did you come to know that you do have
                                psychic abilities?
                              </label>
                              <div
                                data-mdb-input-init=""
                                className="form-outline"
                              >
                                <textarea
                                  id="psychicAbilities"
                                  placeholder="Enter your answer (up to 500 words)"
                                  required
                                  name="psychicAbilities"
                                  value={astro?.psychicAbilities}
                                  onChange={HandlerChange}
                                  className="form-control form-control-lg"
                                  maxLength={500} // Add max length attribute to limit to 500 words
                                  rows={6} // Set number of visible rows
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mb-4 pb-2">
                              <label htmlFor="discoverYourAbility">
                                When & how did you discover that you do have
                                special psychic abilities and how do you
                                describe your reading style?
                              </label>
                              <textarea
                                id="discoverYourAbility"
                                placeholder="Enter your response here"
                                value={astro?.discoverYourAbility}
                                onChange={HandlerChange}
                                className="form-control"
                                name="discoverYourAbility"
                                rows={6}
                                required
                              />
                            </div>
                            <div className="col-md-12 mb-4 pb-2">
                              <label htmlFor="platformsInfo">
                                If you have operated a private reading service
                                or you are working with any other psychic
                                reading platforms, please list the names of any
                                other services you have worked on with your
                                stage name. Please provide a direct link to all
                                your current profiles on other psychic
                                platforms.
                              </label>
                              <textarea
                                id="platformsInfo"
                                placeholder="Enter your response here"
                                value={astro?.platformsInfo}
                                onChange={HandlerChange}
                                name="platformsInfo"
                                className="form-control"
                                rows={6}
                                required // Set number of visible rows
                              />
                            </div>
                          </div>
                        </div>

                        <>
                          <div>
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
                                <label className="as_heading fs-3 mt-3">
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
                                          astro?.category.includes(e.category)
                                            ? setAstro({
                                                ...astro,
                                                category:
                                                  astro?.category.filter(
                                                    (i) => i !== e.category
                                                  ),
                                              })
                                            : setAstro({
                                                ...astro,
                                                category: [
                                                  ...astro?.category,
                                                  e.category,
                                                ],
                                              });
                                        }}
                                        style={{
                                          padding: "5px 15px",
                                          alignItems: "center",
                                          display: "flex",
                                          gap: "8px",
                                          border: astro?.category.includes(
                                            e.category
                                          )
                                            ? "1px solid green"
                                            : "1px solid white",
                                          borderRadius: "10px",
                                          backgroundColor:
                                            astro?.category.includes(e.category)
                                              ? "#82e0aa"
                                              : "#F8C471",

                                          color: "#ffff",
                                        }}
                                      >
                                        {e.category}{" "}
                                        {astro?.category.includes(
                                          e.category
                                        ) && <FaXmark />}
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
                                          astro?.spirituality.includes(e)
                                            ? setAstro({
                                                ...astro,
                                                spirituality:
                                                  astro?.spirituality.filter(
                                                    (i) => i !== e
                                                  ),
                                              })
                                            : setAstro({
                                                ...astro,
                                                spirituality: [
                                                  ...astro?.spirituality,
                                                  e,
                                                ],
                                              });
                                        }}
                                        style={{
                                          padding: "5px 15px",
                                          alignItems: "center",
                                          display: "flex",
                                          gap: "8px",
                                          border: astro?.spirituality.includes(
                                            e
                                          )
                                            ? "1px solid green"
                                            : "1px solid white",
                                          borderRadius: "10px",
                                          backgroundColor:
                                            astro?.spirituality.includes(e)
                                              ? "#82e0aa"
                                              : "#F8C471",

                                          color: "#ffff",
                                        }}
                                      >
                                        {e}{" "}
                                        {astro?.spirituality.includes(e) && (
                                          <FaXmark />
                                        )}
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
                                          astro?.languages.includes(e)
                                            ? setAstro({
                                                ...astro,
                                                languages:
                                                  astro?.languages.filter(
                                                    (i) => i !== e
                                                  ),
                                              })
                                            : setAstro({
                                                ...astro,
                                                languages: [
                                                  ...astro?.languages,
                                                  e,
                                                ],
                                              });
                                        }}
                                        style={{
                                          padding: "5px 15px",
                                          alignItems: "center",
                                          display: "flex",
                                          gap: "8px",
                                          border: astro?.languages.includes(e)
                                            ? "1px solid green"
                                            : "1px solid white",
                                          borderRadius: "10px",
                                          backgroundColor:
                                            astro?.languages.includes(e)
                                              ? "#82e0aa"
                                              : "#F8C471",
                                          color: "#ffff",
                                        }}
                                      >
                                        {e}{" "}
                                        {astro?.languages.includes(e) && (
                                          <FaXmark />
                                        )}
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-6 mb-4">
                                  <div
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    style={{
                                      border: "2px dashed #cccccc",
                                      padding: "20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      style={{ display: "none" }}
                                      id="fileInput"
                                    />
                                    <label htmlFor="fileInput">
                                      Click here or drag and drop a Profile
                                      image
                                    </label>
                                    {preview && (
                                      <div>
                                        <img
                                          src={preview}
                                          alt="Astro Profile"
                                          style={{ maxWidth: "100%" }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                  <div
                                    onDrop={IdhandleDrop}
                                    onDragOver={IdhandleDragOver}
                                    style={{
                                      border: "2px dashed #cccccc",
                                      padding: "20px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={IdhandleFileChange}
                                      style={{ display: "none" }}
                                      id="idFileInput"
                                    />
                                    <label htmlFor="idFileInput">
                                      Click here or drag and drop an ID Proof
                                      image
                                    </label>
                                    {Idpreview && (
                                      <div>
                                        <img
                                          src={Idpreview}
                                          alt="ID Proof"
                                          style={{ maxWidth: "100%" }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12 mb-4 pb-2">
                              <label htmlFor="platformsInfo">Bio</label>
                              <textarea
                                id="platformsInfo"
                                placeholder="Enter your Bio here"
                                value={astro?.bio}
                                onChange={HandlerChange}
                                name="bio"
                                className="form-control"
                                rows={6} // Set number of visible rows
                              />
                            </div>
                          </div>
                        </>
                      </div>

                      <div className="d-flex align-items-center justify-content-around">
                        <button
                          type="button"
                          className="as_btn  d-flex ms-3"
                          onClick={handlePrev}
                        >
                          Previous
                        </button>

                        <button type="submit" className="as_btn   d-flex ms-3">
                          Next
                        </button>
                      </div>
                    </form>
                  </>
                )}
                {currentPage === 3 && (
                  <>
                    <form onSubmit={OtpCheck}>
                      <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-8 p-3 rounded bg-white d-flex align-items-center">
                          <i className="fas fa-envelope fs-4 me-3"></i>
                          We sent an EMAIL with a CODE to the email address you
                          provided.
                        </div>
                        <div className="col-md-8 p-3  mt-5 rounded d-flex  align-items-center justify-content-center">
                          <OTPInput
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            // secure
                            className="custom-otp-input"
                          />
                        </div>
                        <div className="col-md-8 p-3   rounded d-flex  align-items-center justify-content-center">
                          <p>
                            Please enter the 6-digit number we have sent to your
                            email
                          </p>
                        </div>
                        <div className="col-md-8 rounded d-flex  align-items-center justify-content-center">
                          <button
                            type="button"
                            onClick={ResendOtp}
                            className="btn btn-link"
                          >
                            {" "}
                            Resend Otp
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-around">
                          <button
                            type="button"
                            className="as_btn  d-flex ms-3"
                            onClick={handlePrev}
                          >
                            Previous
                          </button>

                          <button
                            type="submit"
                            className="as_btn   d-flex ms-3"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {currentPage === 4 && (
                  <>
                    <div className="row d-flex align-items-center justify-content-center">
                      <div className="col-md-8  text-center ">
                        <h1 class="as_top m-0 p-0 fs-3 mb-3">Survey</h1>

                        <div className="row border border-danger  py-3 px-2 rounded">
                          <div className="col-sm-3">
                            <h6 className="mb-0 fw-bolder">Date:</h6>
                          </div>
                          <div className="col-sm-9 ">
                            <p>
                              {" "}
                              {moment().format("MMMM Do YYYY, h:mm:ss a")}{" "}
                            </p>
                          </div>
                          <div className="col-sm-3">
                            <h6 className="mb-0 fw-bolder">Status:</h6>
                          </div>
                          <div className="col-sm-9 ">
                            <p> Waiting for Approval </p>
                          </div>
                          <div className="col-sm-12 ">
                            <p>
                              {" "}
                              Thank you for answering questions, we will review
                              it. If we confirm it we will notify you, otherwise
                              we will list the reason and additional options
                              available for you.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="d-flex align-items-center justify-content-around">
                      <button type="button" className="as_btn   d-flex ms-3">
                        GET STARTED
                      </button>
                    </div> */}
                  </>
                )}
                {currentPage === 5 && (
                  <>
                    <form onSubmit={RegisterAstro}>
                      <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-8 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <label htmlFor="password">Password:</label>
                            <input
                              type="text"
                              id="firstName"
                              required
                              name="password"
                              value={astro?.password}
                              onChange={HandlerChange}
                              placeholder="password"
                              className="form-control form-control-lg"
                            />
                            <span>
                              Your password must contain at least 8 characters.
                            </span>
                          </div>
                        </div>
                        <div className="col-md-8 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                              type="text"
                              required
                              value={astro?.confirmPassword}
                              onChange={HandlerChange}
                              name="confirmPassword"
                              placeholder="Enter confirm Password"
                              className="form-control form-control-lg"
                            />

                            <span>
                              Enter the same password as before, for
                              verification.
                            </span>
                          </div>
                        </div>
                        <div className="col-md-8 mb-4">
                          <div data-mdb-input-init="" className="form-outline">
                            <div class="form-check position-relative">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                required
                                id="flexCheckChecked"
                              />
                              <label class="form-check-label">
                                I agree to the{" "}
                                <Link
                                  className="btn btn-link"
                                  to="/term&condition"
                                >
                                  Psychic Terms & Conditions{" "}
                                </Link>{" "}
                                and to the{" "}
                                <Link
                                  className=" btn btn-link"
                                  to="/Privacy-policy"
                                >
                                  {" "}
                                  Privacy Policy{" "}
                                </Link>{" "}
                                and Cookie Policy
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-around">
                        <button
                          type="button"
                          className="as_btn  d-flex ms-3"
                          onClick={handlePrev}
                        >
                          Previous
                        </button>

                        <button type="submit" className="as_btn   d-flex ms-3">
                          Submit
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PageOneSignUp;
