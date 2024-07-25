import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import { IoIosLogIn } from "react-icons/io";
import { useParams, useNavigate, Link } from "react-router-dom";
import NavBar from "../../components/ProtectedRoutes/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import { uploadImage } from "../../api/useReducer";

function Dashboard() {
  const { astro } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`styles.wrapper p-3`}
        // className="container"
        style={{ height: "calc(100vh - 55px)" }}
      >
        <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3 mb-5 mb-lg-0">
          <h1 class="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
            Activity
          </h1>

          <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
              <li class="breadcrumb-item text-muted">
                <Link
                  to={"/"}
                  class="breadcrumb-link text-muted text-hover-primary"
                >
                  Home
                </Link>
              </li>

              <li class="breadcrumb-item">
                <span class="bullet bg-gray-300 w-5px h-2px"></span>
              </li>

              <li class="breadcrumb-item text-muted">User Profile</li>
            </ol>
          </nav>
        </div>

        <div className="card my-6">
          <div className="card-body pt-9 pb-0">
            {/*begin::Details*/}
            <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
              {/*begin: Pic*/}
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img src={astro?.avatar?.url} alt="image" />
                  {/* {/ <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle h-15px w-15px" /> /} */}
                </div>
              </div>

              {/*end::Pic*/}
              {/*begin::Info*/}
              <div className="flex-grow-1">
                {/*begin::Title*/}
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  {/*begin::User*/}
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="#"
                        className="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                      >
                        {astro.name}
                      </a>
                      <a href="#">
                        <i className="ki-duotone ki-verify fs-1 text-primary">
                          <span className="path1" />
                          <span className="path2" />
                        </i>
                      </a>
                    </div>
                    <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone fad fa-user ki-address-book fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                          <span className="path3" />
                        </i>{" "}
                        Astrologer
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone fas fa-map-marker-check ki-geolocation fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                        </i>{" "}
                        {astro.country}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <i className="ki-duotone fad fa-envelope ki-sms fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                        </i>{" "}
                        {astro.email}
                      </a>
                    </div>
                  </div>
                  {/*end::User*/}
                  {/*begin::Actions*/}
                  {/* <div className="d-flex my-4">
            <a
              href="#"
              className="btn btn-light btn-active-text-gray-900 me-3"
              id="kt_user_follow_button"
            >
              <i className="ki-duotone ki-check fs-2 d-none" />
          
              <span className="indicator-label">Follow</span>
            
              <span className="indicator-progress">
                Please wait...{" "}
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              </span>
          
            </a>
            <a
              href="#"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_offer_a_deal"
            >
              Offer a Deal
            </a>
          </div> */}
                </div>

                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  {/*begin::User*/}
                  <div className="d-flex flex-column">
                    <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone fad fa-calendar-day ki-geolocation fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                        </i>{" "}
                        {astro.dob}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                      >
                        <i className="ki-duotone  fad fa-mobile-alt ki-sms fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                        </i>{" "}
                        {astro.number}
                      </a>
                      <a
                        href="#"
                        className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                      >
                        <i className="ki-duotone  ki-address-book fs-4 me-1">
                          <span className="path1" />
                          <span className="path2" />
                          <span className="path3" />
                        </i>{" "}
                        {astro.earnPrice}
                      </a>
                    </div>
                  </div>
                </div>

                {/*end::Title*/}
                {/*begin::Stats*/}
                <div className="d-flex flex-wrap justify-content-between">
                  {/*begin::Info*/}
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div
                          className="fs-1 fw-bold counted"
                          data-kt-countup="true"
                          data-kt-countup-value="6,840"
                          data-kt-countup-prefix="$"
                          data-kt-initialized={1}
                        >
                          ${parseFloat(astro?.balance?.toFixed(2))}
                        </div>
                        <div className="fw-semibold fs-6 text-gray-500">
                          Total Earnings
                        </div>
                      </div>
                      {/* <div className="border border-dashed rounded min-w-125px py-2 px-4 me-6 mb-3">
                <div
                  className="fs-1 fw-bold counted"
                  data-kt-countup="true"
                  data-kt-countup-value={179}
                  data-kt-initialized={1}
                >
                  179
                </div>
                <div className="fw-semibold fs-6 text-gray-500">
                  New Referals
                </div>
              </div>
              <div className="border border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                <div
                  className="fs-1 fw-bold counted"
                  data-kt-countup="true"
                  data-kt-countup-value={39}
                  data-kt-initialized={1}
                >
                  39
                </div>
                <div className="fw-semibold fs-6 text-gray-500">New Deals</div>
              </div> */}
                    </div>
                  </div>

                  {/*end::Info*/}
                  {/*begin::Progress*/}
                  {/* <div className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
              <span className="fw-semibold fs-6 text-gray-500">
                Profile Status
              </span>
              <span className="fw-bold fs-6">68%</span>
            </div>
            <div className="h-5px mx-3 w-100 bg-light   rounded mb-3">
              <div
                className="bg-primary rounded h-5px"
                role="progressbar"
                style={{ width: "68%" }}
                aria-valuenow={50}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div> */}
                  {/*end::Progress*/}
                </div>
                {/*end::Stats*/}

                <div className="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
                  <label className="fs-6 fw-semibold mb-2">Category</label>
                  <div
                    className="form-control form-control-solid"
                    style={{ minHeight: "100px" }}
                  >
                    {astro.category.map((item, index) => (
                      <span key={index}>
                        {item}
                        {index < astro.category.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="d-flex flex-column mb-10 fv-row fv-plugins-icon-container">
                  <label className="fs-6 fw-semibold mb-2">Bio</label>
                  <textarea
                    className="form-control form-control-solid"
                    rows={6}
                    name="message"
                    placeholder=""
                    value={astro?.bio}
                    readOnly
                  />
                </div>
              </div>
              {/*end::Info*/}
            </div>
            {/*end::Details*/}
            <div className="separator" />

            {/* <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 "
          href="/good/pages/user-profile/overview.html"
        >
          Overview{" "}
        </a>
      </li>
    
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 "
          href="/good/pages/user-profile/projects.html"
        >
          Projects{" "}
        </a>
      </li>
    
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 "
          href="/good/pages/user-profile/campaigns.html"
        >
          Campaigns{" "}
        </a>
      </li>
    
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 "
          href="/good/pages/user-profile/documents.html"
        >
          Documents{" "}
        </a>
      </li>
    
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 "
          href="/good/pages/user-profile/followers.html"
        >
          Followers{" "}
        </a>
      </li>
    
   
      <li className="nav-item mt-2">
        <a
          className="nav-link text-active-primary ms-0 me-10 py-5 active"
          href="/good/pages/user-profile/activity.html"
        >
          Activity{" "}
        </a>
      </li>
    
    </ul> */}
          </div>
        </div>

        {/* <h2
          style={{
            width: "95%",
            margin: "auto",
         
            padding: "10px 20px",
          }}
        >
          Profile
        </h2>

        <div
          id="profile"
          style={{ background: "var(--white)" }}
          className={styles.dashboard}
        >
          <div className={styles.left}>
            <div
              style={{
                width: "100%",
                overflow: "hidden",
                aspectRatio: "1",
                backgroundColor: "red",
                borderRadius: "3%",
              }}
            >
              <img
                src={astro?.avatar?.url}
                style={{ height: "100%", width: "100%" }}
                alt=""
              />
            </div>
          </div>
          <div className={styles.right}>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div className={styles.inputContainer}>
                <label htmlFor="name">Name</label>
                <p>{astro.name}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="name">Email</label>
                <p>{astro.email}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="name">Number</label>
                <p>{astro.number}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="country">country</label>
                <p>{astro.country}</p>
              </div>{" "}
              <div className={styles.inputContainer}>
                <label htmlFor="dateOfBirth">dateOfBirth</label>
                <p>{astro.dob}</p>
              </div>
              <div className={styles.inputContainer}>
                <label htmlFor="price">price</label>
                <p>{astro.earnPrice}</p>
              </div>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="category">Category</label>
              <p>
                {astro.category.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index < astro.category.length - 1 && ","}{" "}

                  </span>
                ))}
              </p>
            </div>
            <div className={styles.inputContainer}>
              <label htmlFor="bio">bio</label>
              <p>{astro.bio}</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Dashboard;
