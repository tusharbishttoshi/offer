import Navbar from "../../Component/Navbar/Navbar";
import { Footer } from "../../..";
import React, { useState, useMemo, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import axios from "axios";
import moment from "moment";
import OTPInput, { ResendOTP } from "otp-input-react";
import {
  BrowserRouter,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
export default function AstroVerification() {
  const { _id } = useParams();
  const [CountryCode, setCountryCode] = useState("");
  const [OTP, setOTP] = useState("");
  const [details, setdetails] = useState("");
  const navigate = useNavigate();
  const AstroDetails = () => {
    axios.get(`/api/v1/astro/GetAstrologer/${_id}`).then((res) => {
      let data = res?.data;
      console.log("rrrrrrrr", data);
      if (data?.success) {
        setdetails(data?.astrologer);
      } else {
        setdetails(data?.astrologer);
      }
    });
  };

  useEffect(() => {
    AstroDetails();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row  d-flex justify-content-center">
          <div className="col-md-3">
            <div className="bg-white rounded border">
              <div className="card-body">
                Phone Verification{" "}
                <i className=" ms-2 fas fa-hourglass-half fs-3"></i>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="seconde_bg">
              <div className="card-body">
                <h5 className="card-title as_top me-0 border-bottom fs-1 p-3">
                  Verification
                </h5>

                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-md-8">
                    <h5 className="card-title  fw-bolde fs-3 text-center p-3">
                      Phone Verification
                    </h5>

                    <div className="row border py-3 px-2 rounded">
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Name:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        {" "}
                        <p>{details?.name}</p>
                      </div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Email:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        <p> {details?.email} </p>
                      </div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Date:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        <p>
                          {" "}
                          {moment(details?.createdAt).format("MMM Do YY")}{" "}
                        </p>
                      </div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Status:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        <p> Waiting for an applicant to submit </p>
                      </div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">phone:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        {" "}
                        <p>{CountryCode} </p>
                      </div>
                    </div>

                    <div className="col-md-12 mt-5">
                      <p>
                        {" "}
                        We need to verify your phone number. Please enter your
                        phone and click Submit
                      </p>
                    </div>
                    <div className="col-md-12 mt-5  d-flex align-items-center justify-content-center">
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={CountryCode}
                        defaultCountry="in"
                        onChange={setCountryCode}
                      />
                    </div>

                    {/* <div className="row d-flex align-items-center justify-content-center">
                        <div className="col-md-12 p-3 rounded bg-white d-flex align-items-center">
                          <i className="fas fa-envelope fs-4 me-3"></i>
                          We sent an SMS with a CODE to the phone number you provided.
                        </div>
                        <div className="col-md-12 p-3  mt-5 rounded d-flex  align-items-center justify-content-center">
                          <OTPInput
                            value={OTP}
                            onChange={setOTP}
                            autoFocus
                            OTPLength={4}
                            otpType="number"
                            disabled={false}
                            // secure
                            className="custom-otp-input"
                          />
                        </div>
                        <div className="col-md-12 p-3   rounded d-flex  align-items-center justify-content-center">
                          <p>
                            Please enter the 4-digit number we have sent to your
                            phone
                          </p>
                        </div>
                        <div className="col-md-12 rounded d-flex  align-items-center justify-content-center">
                          <button
                            type="button"
                            // onClick={ResendOtp}
                            className="btn btn-link"
                          >
                            {" "}
                            Resend Otp
                          </button>
                        </div>
                   
                      </div> */}

                    <div className="col-md-12 mt-5">
                      <div className="d-flex align-items-center justify-content-around">
                        <button
                          onClick={() =>
                            navigate(`/Astro/IdsVerification/${_id}`)
                          }
                          type="button"
                          className="as_btn   d-flex ms-3"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
