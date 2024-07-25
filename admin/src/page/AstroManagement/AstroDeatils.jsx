import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {
  AddAstrologers,
  UpdateAstrologers,
  deleteAstrologers,
  updatePass,
  uploadImage,
} from "../../api/User";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { FaXmark, FaEye } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { GetCategory } from "../../api/Category";
import Dropzone from "react-dropzone";
import ChatViewReport from "../ChatManagement/ChatViewReport";
import ChatManagementList from "../ChatManagement/ChatManagementList";
import InvoiceAstroManagement from "../InvoiceAstro/InvoiceAstroManagement";
import Astrologs from "../AstroManagement/LoginActivity";


export const AstroDeatils = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname, search, state } = location;
  console.log({ state });

  const [astro, setAstro] = useState({
    ...state,
  });

  const handleInput = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };
  const Spirituality = [
    "Relationship",
    "Finance",
    "Job",
    "Career",
    "Marriage",
    "Child birth",
    "Spirituality",
  ];

  const [category, setCategory] = useState([]);
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
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryReducer);

  const handleSubmit = () => {
    dispatch(
      UpdateAstrologers({ ...findChangedValues(state, astro), id: astro?.astro|| astro?._id })
    ).then((e) => {
      if (e.payload?.success) {
        toast.success("Successfully updated");

        navigate("/astrologer");
      } else {
        toast.error(e.payload?.error?.message);
      }
    });
  };

  function findChangedValues(objA, objB) {
    const changedValues = {};

    // Iterate through keys of objA
    for (const key in objA) {
      // Check if the key exists in objB and if the values are different
      if (
        objA.hasOwnProperty(key) &&
        objB.hasOwnProperty(key) &&
        objA[key] !== objB[key]
      ) {
        changedValues[key] = objB[key];
      }
    }

    // Iterate through keys of objB to find new keys
    for (const key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        changedValues[key] = objB[key];
      }
    }

    return changedValues;
  }

  useEffect(() => {
    dispatch(GetCategory());
  }, []);

  const [password, setPassword] = useState("");

  return (
    <>
      <div className="container">
        <ToastContainer />
        <div className="row  m-5">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Astrologer Profile</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">
                  Astrologer Management
                </li>
                <li className="breadcrumb-item active">Astrologer Profile</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#" className="text-white" onClick={() => navigate(-1)}>
              <button type="button" className="btn text-white btn-dark">
                Back
              </button>
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 rounded">
            <div className="card bg-white mb-4">
              <div className="card-body text-center">
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (reader.readyState === 2) {
                        dispatch(
                          uploadImage({
                            profile: reader.result,
                            Id: state?._id,
                          })
                        ).then((e) => {
                          if (e?.payload?.success) {
                            setAstro(e?.payload?.astro);

                            toast.success("profile update successfully");
                          } else {
                            toast.error("profile not update ");
                          }
                        });
                      }
                    };
                    reader.readAsDataURL(acceptedFiles[0]);
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />

                        <img
                          src={astro?.avatar?.url}
                          className="rounded-circle img-fluid"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                    </section>
                  )}
                </Dropzone>

                <h5 className="my-3"> {astro?.name} </h5>

                <h5 className="my-3">
                  {" "}
                  <div className="col-12">
                    <label className="form-label">
                      {" "}
                      {astro?.experience} Years Experience{" "}
                    </label>
                  </div>
                </h5>
              </div>
              <div className="p-5">
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-0 form-label">Total Order</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="text-muted mb-0 form-label">
                      {0}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-0 form-label">Total Time</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="text-muted mb-0 form-label ">
                      {0}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-6">
                    <p className="mb-0 form-label">Total Earning</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="text-muted mb-0 form-label ">
                      {astro?.counting?.total || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <label className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  value={astro?.bio}
                  onChange={handleInput}
                  name="bio"
                  style={{ height: "150px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8 rounded">
            <div className="card bg-white mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label
                      htmlFor="name"
                      className="form-label fw-bold text-uppercase"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={astro?.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="email"
                      className="form-label fw-bold text-uppercase"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={astro?.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="number"
                      className="form-label fw-bold text-uppercase"
                    >
                      Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="number"
                      name="number"
                      value={astro?.number}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="country"
                      className="form-label fw-bold text-uppercase"
                    >
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={astro?.country}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="address"
                      className="form-label fw-bold text-uppercase"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={astro?.address}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="earnPrise"
                      className="form-label fw-bold text-uppercase"
                    >
                      Earn Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="earnPrise"
                      name="earnPrise"
                      value={astro?.earnPrise}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor="chargePrise"
                      className="form-label fw-bold text-uppercase"
                    >
                      Charge Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="chargePrise"
                      name="chargePrise"
                      value={astro?.chargePrise}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <div className="d-flex gap-2">
                      <div className="d-flex gap-7">
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={astro?.gender == "male"}
                          name="gender"
                          value="male"
                          id="male"
                          onChange={handleInput}
                        />
                        <label htmlFor="male" className="form-check-label">
                          Male
                        </label>
                      </div>
                      <div className="d-flex gap-7">
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={astro?.gender === "female"}
                          name="gender"
                          value="female"
                          id="female"
                          onChange={handleInput}
                        />
                        <label htmlFor="female" className="form-check-label">
                          Female
                        </label>
                      </div>
                      <div className="d-flex gap-7">
                        <input
                          type="radio"
                          className="form-check-input"
                          checked={astro?.gender === "other"}
                          name="gender"
                          value="other"
                          id="other"
                          onChange={handleInput}
                        />
                        <label htmlFor="other" className="form-check-label">
                          Other
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Date of birth */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      value={astro?.dob}
                      name="dob"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Account Name */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Account Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.accountName}
                      name="accountName"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Account Number */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.accountNumber}
                      name="accountNumber"
                      onChange={handleInput}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Bank Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.bankName}
                      name="bankName"
                      onChange={handleInput}
                    />
                  </div>
                  {/* IFSC Code */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.ifscCode}
                      name="ifscCode"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Pan Card Number */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Pan Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.panNumber}
                      name="panNumber"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Adhara Card Number */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Adhara Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.adhara}
                      name="adhara"
                      onChange={handleInput}
                    />
                  </div>
                  {/* Passport Number */}
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Passport Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={astro?.passport}
                      name="passport"
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 my-3 rounded card ">
            <Tabs>
              <TabList>
                <Tab>Basic Info</Tab>
                <Tab>Chats History</Tab>
                <Tab>Invoice</Tab>
                <Tab>Logs</Tab>

              </TabList>

              <TabPanel>
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "var(--cta-white)",
                    padding: "10px 20px",
                    borderRadius: "10px",
                  }}
                >
                  <p
                    style={{
                      color: "var(--dark)",
                      fontSize: "1.3rem",
                      fontWeight: "500",
                    }}
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
                    <div className="mb-3">
                      <label className="form-label">Experience</label>
                      <input
                        type="text"
                        className="form-control"
                        value={astro?.experience}
                        onChange={handleInput}
                        name="experience"
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
                        {categories?.map((e) => (
                          <>
                            <div
                              onClick={() => {
                                astro?.category?.includes(e.category)
                                  ? setAstro({
                                      ...astro,
                                      category: astro?.category.filter(
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
                                border: astro?.category?.includes(e.category)
                                  ? "1px solid green"
                                  : "1px solid red",
                                borderRadius: "10px",
                                backgroundColor: astro?.category?.includes(
                                  e.category
                                )
                                  ? "#c6ffc5"
                                  : "#ffc5c5",
                              }}
                            >
                              {e.category}
                              {astro?.category?.includes(e.category) && (
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
                        {Spirituality?.map((e) => (
                          <>
                            <div
                              onClick={() => {
                                console.log(astro?.spirituality?.includes(e));
                                astro?.spirituality?.includes(e)
                                  ? setAstro({
                                      ...astro,
                                      spirituality: astro?.spirituality?.filter(
                                        (i) => i !== e
                                      ),
                                    })
                                  : setAstro({
                                      ...astro,
                                      spirituality: [...astro?.spirituality, e],
                                    });
                              }}
                              style={{
                                padding: "5px 15px",
                                alignItems: "center",
                                display: "flex",
                                gap: "8px",
                                borderRadius: "10px",
                                backgroundColor: astro?.spirituality?.includes(
                                  e
                                )
                                  ? "#c6ffc5"
                                  : "#ffc5c5",
                                border: astro?.spirituality?.includes(e)
                                  ? "1px solid green"
                                  : "1px solid red",
                              }}
                            >
                              {e}
                              {astro?.spirituality?.includes(e) && <FaXmark />}
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
                                astro?.languages?.includes(e)
                                  ? setAstro({
                                      ...astro,
                                      languages: astro?.languages?.filter(
                                        (i) => i !== e
                                      ),
                                    })
                                  : setAstro({
                                      ...astro,
                                      languages: [...astro?.languages, e],
                                    });
                              }}
                              style={{
                                padding: "5px 15px",
                                alignItems: "center",
                                display: "flex",
                                gap: "8px",
                                border: astro?.languages?.includes(e)
                                  ? "1px solid green"
                                  : "1px solid red",
                                borderRadius: "10px",
                                backgroundColor: astro?.languages?.includes(e)
                                  ? "#c6ffc5"
                                  : "#ffc5c5",
                              }}
                            >
                              {e} {astro?.languages?.includes(e) && <FaXmark />}
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-3">
                  <div className="d-flex flex-wrap gap-3 mt-3 text-dark">
                    <div className="d-flex flex-column gap-2 w-100">
                      <label className="fw-500 text-uppercase fs-5">
                        New Password
                      </label>
                      <div className="d-flex w-100 align-items-center gap-2">
                        <input
                          type="text"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          style={{ borderRadius: "6px" }}
                        />
                        <div
                          onClick={() => {
                            if (password.length >= 8) {
                              dispatch(
                                updatePass({ Id: state?._id, password })
                              ).then((e) => {
                                if (e.payload.success) {
                                  toast.success(
                                    "Password changed successfully"
                                  );
                                  setPassword("");
                                } else {
                                  toast.error(e.payload.message);
                                }
                              });
                            } else {
                              toast.error(
                                "Password must be 8 characters or more"
                              );
                            }
                          }}
                          className="btn btn-warning d-flex align-items-center justify-content-center"
                          style={{ borderRadius: "6px" }}
                        >
                          Change
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-3">
                      <div
                        onClick={handleSubmit}
                        className="btn btn-primary d-flex justify-content-center align-items-center"
                        style={{ width: "130px", fontWeight: "600" }}
                      >
                        Submit
                      </div>
                      <div
                        onClick={() =>
                          dispatch(deleteAstrologers({ id: state?._id }))
                        }
                        className="btn btn-danger d-flex justify-content-center align-items-center"
                        style={{ width: "130px", fontWeight: "600" }}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel> <ChatManagementList  astro={astro?._id}/></TabPanel>
              <TabPanel>

<InvoiceAstroManagement astro={astro?._id}/>

              </TabPanel>
              <TabPanel>

<Astrologs id={astro?._id}/>

              </TabPanel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AstroDeatils;
