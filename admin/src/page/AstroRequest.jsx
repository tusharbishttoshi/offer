import React, { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import {
  AddAstrologers,
  UpdateAstrologers,
  deleteAstrologers,
  updatePass,
  uploadImage,
} from "../api/User";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { FaXmark, FaEye } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { GetCategory } from "../api/Category";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AstroRequest() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container py-5">
        <div className="row   m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Add Astrologer</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Add Astrologer</li>
                <li className="breadcrumb-item active">Add Astrologer</li>
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
        <From />
      </div>
    </>
  );
}

const From = () => {
  const navigate = useNavigate();
  const [astro, setAstro] = useState({
    panNumber: "",
    adhara: "",
    passport: "",
    spirituality: [],
    name: "",
    dob: "",
    password: "",
    email: "",
    address: "",
    category: [],
    country: "",
    languages: [],
    gender: "",
    earnPrise: "",
    chargePrise: "",
    experience: "",
    bio: "",
    accountNumber: "",
    ifscCode: "",
    accountName: "",
    bankName: "",
  });
  const [d, setd] = useState(window.innerWidth);
  const [e, setE] = useState("");
  const { categories } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  const s = [
    "Relationship",
    "Finance",
    "Job",
    "Career",
    "Marriage",
    "Child birth",
    "Spirituality",
  ];
  const [picture, setPicture] = useState("");
  useEffect(() => {
    dispatch(GetCategory());
  }, []);

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

  const handleInput = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form action="" className="card bg-white p-5">
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="name" className="form-label fw-bold text-uppercase">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={handleInput}
              placeholder="Enter your name"
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
              onChange={handleInput}
              placeholder="Enter your email"
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
              onChange={handleInput}
              placeholder="Enter your phone number"
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
              onChange={handleInput}
              placeholder="Enter your country"
            />
          </div>
          <div className="col-md-4">
            <label
              htmlFor="password"
              className="form-label fw-bold text-uppercase"
            >
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              name="password"
              onChange={handleInput}
              placeholder="Enter your password"
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
              onChange={handleInput}
              placeholder="Enter your address"
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
              onChange={handleInput}
              placeholder="Enter your earning price"
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
              onChange={handleInput}
              placeholder="Enter your charging price"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Gender</label>
            <div className="d-flex gap-2">
              <div className="d-flex gap-7">
                <input
                  type="radio"
                  className="form-check-input"
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
              name="dob"
              onChange={handleInput}
              placeholder="Enter your date of birth"
            />
          </div>
          {/* Account Name */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Account Name</label>
            <input
              type="text"
              className="form-control"
              name="accountName"
              onChange={handleInput}
              placeholder="Enter your account name"
            />
          </div>
          {/* Account Number */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Account Number</label>
            <input
              type="text"
              className="form-control"
              name="accountNumber"
              onChange={handleInput}
              placeholder="Enter your account number"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Bank Name</label>
            <input
              type="text"
              className="form-control"
              name="bankName"
              onChange={handleInput}
              placeholder="Enter your bank name"
            />
          </div>
          {/* IFSC Code */}
          <div className="col-md-4 mb-3">
            <label className="form-label">IFSC Code</label>
            <input
              type="text"
              className="form-control"
              name="ifscCode"
              onChange={handleInput}
              placeholder="Enter your IFSC code"
            />
          </div>
          {/* Pan Card Number */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Pan Card Number</label>
            <input
              type="text"
              className="form-control"
              name="panNumber"
              onChange={handleInput}
              placeholder="Enter your pan card number"
            />
          </div>
          {/* Adhara Card Number */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Adhara Card Number</label>
            <input
              type="text"
              className="form-control"
              name="adhara"
              onChange={handleInput}
              placeholder="Enter your Adhara card number"
            />
          </div>
          {/* Passport Number */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Passport Number</label>
            <input
              type="text"
              className="form-control"
              name="passport"
              onChange={handleInput}
              placeholder="Enter your passport number"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Experience</label>
            <input
              type="number"
              className="form-control"
              min={0}
              name="experience"
              placeholder="Enter your Experience"
              onChange={handleInput}
            />
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
                    astro?.category.includes(e.category)
                      ? setAstro({
                          ...astro,
                          category: astro?.category.filter(
                            (i) => i !== e.category
                          ),
                        })
                      : setAstro({
                          ...astro,
                          category: [...astro?.category, e.category],
                        });
                  }}
                  style={{
                    padding: "5px 15px",
                    alignItems: "center",
                    display: "flex",
                    gap: "8px",
                    border: astro?.category.includes(e.category)
                      ? "1px solid green"
                      : "1px solid red",
                    borderRadius: "10px",
                    backgroundColor: astro?.category.includes(e.category)
                      ? "#c6ffc5"
                      : "#ffc5c5",
                  }}
                >
                  {e.category}{" "}
                  {astro?.category.includes(e.category) && <FaXmark />}
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
                          spirituality: astro?.spirituality.filter(
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
                    border: astro?.spirituality.includes(e)
                      ? "1px solid green"
                      : "1px solid red",
                    borderRadius: "10px",
                    backgroundColor: astro?.spirituality.includes(e)
                      ? "#c6ffc5"
                      : "#ffc5c5",
                  }}
                >
                  {e} {astro?.spirituality.includes(e) && <FaXmark />}
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
                          languages: astro?.languages.filter((i) => i !== e),
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
                    border: astro?.languages.includes(e)
                      ? "1px solid green"
                      : "1px solid red",
                    borderRadius: "10px",
                    backgroundColor: astro?.languages.includes(e)
                      ? "#c6ffc5"
                      : "#ffc5c5",
                  }}
                >
                  {e} {astro?.languages.includes(e) && <FaXmark />}
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="p-0 px-md-2 d-flex flex-column gap-5 w-100">
          <label
            className="fw-bold text-uppercase"
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              textTransform: "uppercase",
            }}
          >
            Bio
          </label>
          <textarea
            className="form-control"
            value={astro?.bio}
            onChange={handleInput}
            name="bio"
            style={{ borderRadius: "6px", fontWeight: "500" }}
          />
        </div>

        {/* <Dropzone
          onDrop={(acceptedFiles) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPicture(reader.result);
              }
            };
            reader.readAsDataURL(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                className="d-flex align-items-center justify-content-center w-100 mb-4"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "5px",
                  // backgroundColor: "gray",
                  overflow: "hidden",
                }}
              >
                {picture !== "" && (
                  <img
                    src={picture}
                    className="img-fluid"
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                )}
              </div>
              <div
                className="d-flex justify-content-center"
                {...getRootProps()}
                style={{ width: "200px" }}
              >
                <input {...getInputProps()} />
                <div
                  className="text-center bg-white border border-dark p-2 rounded fw-bold"
                  style={{ cursor: "pointer", width: "130px" }}
                >
                  Upload Image
                </div>
              </div>
            </section>
          )}
        </Dropzone> */}
        <div className="p-0 px-md-2 d-flex flex-column  mt-3 gap-5 w-100">
          <Dropzone
            onDrop={(acceptedFiles) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setPicture(reader.result);
                }
              };
              reader.readAsDataURL(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  className="d-flex flex-column align-items-center justify-content-center w-100 mb-4"
                  style={{
                    width: "180px",
                    height: "180px",
                    borderRadius: "5px",
                    border: "2px dotted #ccc", // Dotted border
                    overflow: "hidden",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="text-center fw-bold">Drag & Drop Image</div>
                  <div className="text-center mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      {...getInputProps()}
                    />
                    <div
                      className="text-center bg-white border border-dark p-2 rounded fw-bold mt-2"
                      style={{ cursor: "pointer", width: "130px" }}
                    >
                      Browse
                    </div>
                  </div>
                </div>
                {picture !== "" && (
                  <img
                    src={picture}
                    className="img-fluid"
                    style={{
                      objectFit: "cover",
                      width: "180px",
                      height: "180px",
                    }}
                    alt=""
                  />
                )}
              </section>
            )}
          </Dropzone>
        </div>
        <div className="col-12 mt-3">
        <button
        type="button"
  onClick={() =>
    dispatch(AddAstrologers({ ...astro, picture })).then((e) => {
      if (e.payload.success) {
        setAstro({
          spirituality: [],
          name: "",
          password: "",
          email: "",
          address: "",
          category: [],
          country: "",
          languages: [],
          gender: "",
          earnPrise: "",
          chargePrise: "",
          experience: "",
          bio: "",
        });
        toast.success('Astrologer added successfully!' );
        navigate('/astrologer')
      } else {
        toast.error('Failed to add astrologer. Please try again.');
      }
    })
  }
  className="btn btn-primary"
>
  Submit
</button>
        </div>
      </form>

      {/* <form action="" style={{ paddingBottom: "50px" }}>
        <div
          style={{
            display: "grid",
            padding: "15px 2%",
            gridTemplateColumns: `repeat(auto-fit, minmax(${
              d > 450 ? "300px" : "100%"
            }, 1fr))`,
            paddingBottom: "20px",
            gridGap: "20px",
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
              value={astro?.name}
              onChange={handleInput}
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
              value={astro?.email}
              onChange={handleInput}
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
              value={astro?.number}
              onChange={handleInput}
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
              value={astro?.country}
              onChange={handleInput}
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
              Password
            </label>
            <input
              type="text"
              value={astro?.password}
              onChange={handleInput}
              name="password"
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
              value={astro?.address}
              onChange={handleInput}
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
              Earn Price
            </label>
            <input
              type="number"
              min={1}
              value={astro?.earnPrise}
              onChange={handleInput}
              name="earnPrise"
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
              Charge Price
            </label>
            <input
              type="number"
              min={1}
              value={astro?.chargePrise}
              onChange={handleInput}
              name="chargePrise"
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
              value={astro?.dob}
              onChange={handleInput}
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
        </div>
        <div
          style={{
            display: "grid",
            padding: "15px 2%",
            gridTemplateColumns: `repeat(auto-fit, minmax(${
              d > 450 ? "300px" : "100%"
            }, 1fr))`,
            paddingBottom: "20px",
            gridGap: "20px",
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
              Account Name
            </label>
            <input
              value={astro?.accountName}
              onChange={handleInput}
              name="accountName"
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
              Account Number
            </label>
            <input
              type="text"
              value={astro?.accountNumber}
              onChange={handleInput}
              name="accountNumber"
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
              Bank Name
            </label>
            <input
              type="text"
              value={astro?.bankName}
              onChange={handleInput}
              name="bankName"
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
              IFSC Code
            </label>
            <input
              type="text"
              value={astro?.ifscCode}
              onChange={handleInput}
              name="ifscCode"
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
        <div
          style={{
            display: "grid",
            padding: "15px 2%",
            gridTemplateColumns: `repeat(auto-fit, minmax(${
              d > 450 ? "300px" : "100%"
            }, 1fr))`,
            paddingBottom: "20px",
            gridGap: "20px",
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
              Pan card Number
            </label>
            <input
              value={astro?.panNumber}
              onChange={handleInput}
              name="panNumber"
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
              Adhara card Number
            </label>
            <input
              type="text"
              value={astro?.adhara}
              onChange={handleInput}
              name="adhara"
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
              Passport Number
            </label>
            <input
              type="text"
              value={astro?.passport}
              onChange={handleInput}
              name="passport"
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
        <div
          style={{ width: "100%", padding: "0px 30px", borderRadius: "10px" }}
        >
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
                value={astro?.experience}
                onChange={handleInput}
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
                        astro?.category.includes(e.category)
                          ? setAstro({
                              ...astro,
                              category: astro?.category.filter(
                                (i) => i !== e.category
                              ),
                            })
                          : setAstro({
                              ...astro,
                              category: [...astro?.category, e.category],
                            });
                      }}
                      style={{
                        padding: "5px 15px",
                        alignItems: "center",
                        display: "flex",
                        gap: "8px",
                        border: astro?.category.includes(e.category)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro?.category.includes(e.category)
                          ? "#c6ffc5"
                          : "#ffc5c5",
                      }}
                    >
                      {e.category}{" "}
                      {astro?.category.includes(e.category) && <FaXmark />}
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
                              spirituality: astro?.spirituality.filter(
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
                        border: astro?.spirituality.includes(e)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro?.spirituality.includes(e)
                          ? "#c6ffc5"
                          : "#ffc5c5",
                      }}
                    >
                      {e} {astro?.spirituality.includes(e) && <FaXmark />}
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
                              languages: astro?.languages.filter(
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
                        border: astro?.languages.includes(e)
                          ? "1px solid green"
                          : "1px solid red",
                        borderRadius: "10px",
                        backgroundColor: astro?.languages.includes(e)
                          ? "#c6ffc5"
                          : "#ffc5c5",
                      }}
                    >
                      {e} {astro?.languages.includes(e) && <FaXmark />}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: "0px 2%",
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
            value={astro?.bio}
            onChange={handleInput}
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
        <Dropzone
          onDrop={(acceptedFiles) => {
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setPicture(reader.result);
              }
            };
            reader.readAsDataURL(acceptedFiles[0]);
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                style={{
                  width: "180px",
                  borderRadius: "5px",
                  margin: " 20px ",
                  backgroundColor: "gray",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {picture !== "" && (
                  <img
                    src={picture}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                )}
              </div>
              <div
                {...getRootProps()}
                style={{ width: "200px", margin: "15px 2%" }}
              >
                <input {...getInputProps()} />
                <div
                  style={{
                    backgroundColor: "white",
                    cursor: "pointer",
                    border: "2px solid var(--dark)",
                    padding: "5px 20px",
                    width: "130px",
                    textAlign: "center",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Upload Image
                </div>
              </div>
            </section>
          )}
        </Dropzone>
        <div
          style={{
            margin: "15px 2%",
            cursor: "pointer",
            border: "2px solid var(--dark)",
            padding: "5px 20px",
            width: "130px",
            textAlign: "center",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() =>
            dispatch(AddAstrologers({ ...astro, picture })).then((e) => {
              e.payload.success
                ? setAstro({
                    spirituality: [],
                    name: "",
                    password: "",
                    email: "",
                    address: "",
                    category: [],
                    country: "",
                    languages: [],
                    gender: "",
                    earnPrise: "",
                    chargePrise: "",
                    experience: "",
                    bio: "",
                  })
                : alert("can not added this astro");
              console.log(e);
            })
          }
        >
          submit
        </div>
      </form>  */}
    </>
  );
};

export const ViewMore = ({ setView, view }) => {
  console.log({ view, setView });
  const [d, setd] = useState(window.innerWidth);

  const handleInput = (e) => {
    setAstro({ ...astro, [e.target.name]: e.target.value });
  };
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
    ...view,
  });
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

  const su = () => {
    dispatch(
      UpdateAstrologers({ ...findChangedValues(view, astro), id: astro?._id })
    ).then((e) =>
      e.payload?.success
        ? alert("successfully updated")
        : alert(e.payload?.error?.message)
    );
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
    <div
      style={{
        display: "flex",
        overflow: "scroll",
        gap: "20px",
        padding: "20px",
        flexDirection: "column",
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => setView({})}
      >
        <FaXmark size={30} />
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
          style={{
            color: "var(--dark)",
            fontSize: "1.3rem",
            fontWeight: "500",
          }}
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
              value={astro?.name}
              onChange={handleInput}
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
              value={astro?.email}
              onChange={handleInput}
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
              value={astro?.number}
              onChange={handleInput}
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
              value={astro?.country}
              onChange={handleInput}
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
              value={astro?.address}
              onChange={handleInput}
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
              Earn Price
            </label>
            <input
              type="number"
              value={astro?.earnPrise}
              onChange={handleInput}
              name="earnPrise"
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
              Charge Price
            </label>
            <input
              type="number"
              value={astro?.chargePrise}
              onChange={handleInput}
              name="chargePrise"
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
              value={astro?.dob}
              onChange={handleInput}
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
              Account Name
            </label>
            <input
              value={astro?.accountName}
              onChange={handleInput}
              name="accountName"
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
              Account Number
            </label>
            <input
              type="text"
              value={astro?.accountNumber}
              onChange={handleInput}
              name="accountNumber"
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
              Bank Name
            </label>
            <input
              type="text"
              value={astro?.bankName}
              onChange={handleInput}
              name="bankName"
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
              IFSC Code
            </label>
            <input
              type="text"
              value={astro?.ifscCode}
              onChange={handleInput}
              name="ifscCode"
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
              Pan card Number
            </label>
            <input
              value={astro?.panNumber}
              onChange={handleInput}
              name="panNumber"
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
              Adhara card Number
            </label>
            <input
              type="text"
              value={astro?.adhara}
              onChange={handleInput}
              name="adhara"
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
              Passport Number
            </label>
            <input
              type="text"
              value={astro?.passport}
              onChange={handleInput}
              name="passport"
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
              value={astro?.experience}
              onChange={handleInput}
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
                      astro?.category.includes(e.category)
                        ? setAstro({
                            ...astro,
                            category: astro?.category.filter(
                              (i) => i !== e.category
                            ),
                          })
                        : setAstro({
                            ...astro,
                            category: [...astro?.category, e.category],
                          });
                    }}
                    style={{
                      padding: "5px 15px",
                      alignItems: "center",
                      display: "flex",
                      gap: "8px",
                      border: astro?.category.includes(e.category)
                        ? "1px solid green"
                        : "1px solid red",
                      borderRadius: "10px",
                      backgroundColor: astro?.category.includes(e.category)
                        ? "#c6ffc5"
                        : "#ffc5c5",
                    }}
                  >
                    {e.category}
                    {astro?.category?.includes(e.category) && <FaXmark />}
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
                      backgroundColor: astro?.spirituality?.includes(e)
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
                      astro?.languages.includes(e)
                        ? setAstro({
                            ...astro,
                            languages: astro?.languages.filter((i) => i !== e),
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
                      border: astro?.languages.includes(e)
                        ? "1px solid green"
                        : "1px solid red",
                      borderRadius: "10px",
                      backgroundColor: astro?.languages.includes(e)
                        ? "#c6ffc5"
                        : "#ffc5c5",
                    }}
                  >
                    {e} {astro?.languages.includes(e) && <FaXmark />}
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
              Bio
            </label>
            <textarea
              type="text"
              value={astro?.bio}
              onChange={handleInput}
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
        style={{
          width: "100%",
          backgroundColor: "var(--cta-white)",
          padding: "10px 20px",
          borderRadius: "10px",
        }}
      >
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
              New Password
            </label>
            <div
              style={{ display: "flex", width: "100%", flex: "1", gap: "4px" }}
            >
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid gray",
                  outline: "none",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontWeight: "500",
                }}
              />
              <div
                onClick={() => {
                  if (password.length >= 8) {
                    dispatch(updatePass({ Id: view._id, password })).then((e) =>
                      e.payload.success
                        ? alert("password change successfully ")
                        : alert(e.payload.message)
                    );
                  } else {
                    alert("password must 8 or more then 8");
                  }
                }}
                style={{
                  cursor: "pointer",
                  background: "var(--yellow)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 20px",
                  borderRadius: "6px",
                }}
              >
                Change{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dropzone
        onDrop={(acceptedFiles) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              dispatch(
                uploadImage({ profile: reader.result, Id: view._id })
              ).then((e) => e?.payload?.success && setView(e?.payload?.astro));
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
                  width: "180px",
                  borderRadius: "5px",
                  margin: " 20px ",
                  backgroundColor: "gray",
                  aspectRatio: "1",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={view?.avatar?.url}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
          </section>
        )}
      </Dropzone>
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          onClick={su}
          style={{
            cursor: "pointer",
            border: "2px solid var(--dark)",
            padding: "5px 20px",
            width: "130px",
            textAlign: "center",
            borderRadius: "4px",
            background: "var(--dark)",
            color: "var(--white)",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          submit
        </div>
        <div
          onClick={() => dispatch(deleteAstrologers({ id: view._id }))}
          style={{
            cursor: "pointer",
            border: "2px solid red",
            padding: "5px 20px",
            width: "130px",
            textAlign: "center",
            borderRadius: "4px",
            background: "red",
            color: "var(--white)",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default AstroRequest;
