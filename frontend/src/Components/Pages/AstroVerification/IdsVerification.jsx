import Navbar from "../../Component/Navbar/Navbar";
import { Footer } from "../../..";
import React, { useState, useMemo, useEffect } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import OTPInput, { ResendOTP } from "otp-input-react";

export default function IdsVerification() {
  const { _id } = useParams();
  const [CountryCode, setCountryCode] = useState("");
  const [OTP, setOTP] = useState("");
  const [details, setdetails] = useState("");

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
          <div className="col-md-2">
            <div className="bg-white rounded border">
              <div className="card-body">
                Phone Verification
                <i
                  style={{ color: "#27ae60" }}
                  className=" ms-2 fas fa-check-circle fs-2"
                ></i>
              </div>
            </div>

            <div className="bg-white rounded border">
              <div className="card-body">
                ID Verification
                <i className=" ms-2 fas fa-hourglass-half fs-3"></i>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="seconde_bg">
              <div className="card-body">
                <h5 className="card-title as_top me-0 border-bottom  border-dark fs-1 p-3">
                  Verification
                </h5>

                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-md-8">
                    <h5 className="card-title  fw-bolde fs-3 text-center p-3">
                      ID Verification
                    </h5>

                    <div className="row border  mb-4 border-dark py-3 px-2 rounded">
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Name:</h6>
                      </div>
                      <div className="col-sm-9 ">{details?.name}</div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Email:</h6>
                      </div>
                      <div className="col-sm-9 ">{details?.email}</div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Date:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        {moment(details?.createdAt).format("MMM Do YY")}
                      </div>
                      <div className="col-sm-3">
                        <h6 className="mb-0 fw-bolder">Status:</h6>
                      </div>
                      <div className="col-sm-9 ">
                        Waiting for an applicant to submit
                      </div>
                    </div>

                    <div className="row border border-dark py-3 px-2 rounded">
                      <div className="col-md-12 ">
                        <h6 className="mb-0 fs-4 fw-bolder text-center">
                          Selfie with an ID upload:
                        </h6>
                        <h6 className="mb-0 fs-4 fw-bolder text-center">
                          Confirm your identity with a photo of yourself holding
                          your ID
                        </h6>
                      </div>

                      <div className="col-md-12 ">
                        1. Take the photo in a room with enough light.
                      </div>
                      <div className="col-md-12 ">
                        2. Select the highest photo quality on the device you
                        use to take the photo.
                      </div>
                      <div className="col-md-12 ">
                        3. Hold up the document next to your face, like in the
                        image below.
                      </div>
                      <div className="col-md-12 ">
                        4. Make sure both your face and ID are clear on the
                        photo — nothing on the ID can be covered or censored.
                      </div>
                      <div className="col-md-12 mt-3 ">
                        <p> Note: The maximum file size of a photo is 6.0MB.</p>

                        <img src="/ids.jpg" alt="ids" />

                        <p>
                          {" "}
                          Please upload the correct selfie. Applications
                          containing incorrect selfies will not be accepted
                        </p>
                      </div>
                    </div>

                    <div className="col-md-12 mt-5">
                      <div className="d-flex align-items-center justify-content-around">
                        <button type="button" className="as_btn   d-flex ms-3">
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
