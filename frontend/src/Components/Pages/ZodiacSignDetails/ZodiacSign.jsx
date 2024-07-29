import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Footer } from "../../..";
import Navbar from "../../Component/Navbar/Navbar";
import { NavBar } from "../../Component/All";
import { Helmet } from "react-helmet";
export default function ZodiacSign() {
  const { user } = useSelector((state) => state.userLog);
  return (
    <div className="as_main_wrapper">
       <Helmet>
          <title>
            {
              "Explore Your Destiny with Horoscopy | Unzziptruth.com"
            }
          </title>
          <meta
            name="description"
            content={
              "Unlock the secrets of the cosmos with personalized horoscopes on Unzziptruth.com. Discover what the stars have in store for you today"
            }
          />
          {/* <meta name="keywords" content={blogData?.keywords} /> */}
        </Helmet>




      {user?._id ? <NavBar /> : <Navbar />}

      <section className="as_zodiac_sign_wrapper primary-bg as_padderTop80 as_padderBottom80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="as_heading as_heading_center as_logintext w-50 m-auto">
                Choose Your sun sign
              </h1>

              <div className="as_zodiac_inner text-left">
                <div className="row as_verticle_center">
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <ul className="as_sign_ul">
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Aries"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign1.svg" alt="Aries" />
                          </span>
                          <div>
                            <h5>Aries</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Taurus"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign2.svg" alt="Taurus" />
                          </span>
                          <div>
                            <h5>Taurus </h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Gemini"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign3.svg" alt="Gemini" />
                          </span>
                          <div>
                            <h5>Gemini</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Cancer"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign4.svg" alt="Cancer" />
                          </span>
                          <div>
                            <h5>Cancer</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Leo"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign5.svg" alt="Leo" />
                          </span>
                          <div>
                            <h5>Leo</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Virgo"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign6.svg" alt="Virgo" />
                          </span>
                          <div>
                            <h5>Virgo</h5>
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-sm-3">
                    <div
                      className="Sign_center_image text-center"
                     
                      >
                      <img
                        src="/Untitled (1080 x 1080 px).gif"
                        alt="horoscope"
                
                        style={{
                          width: '100%', // Make sure the image fills the container
                          height: 'auto',
                          display: 'block',
                          // borderRadius: '50%', // Ensure the image itself is also circular
                      }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                    <ul className="as_sign_ul as_sign_ul_right">
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Libra"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign7.svg" alt="Libra" />
                          </span>
                          <div>
                            <h5>Libra</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Scorpio"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign8.svg" alt="Scorpio" />
                          </span>
                          <div>
                            <h5>Scorpio</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Sagittarius"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign9.svg" alt="Sagittarius" />
                          </span>
                          <div>
                            <h5>Sagittarius</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Capricorn"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign10.svg" alt="Capricorn" />
                          </span>
                          <div>
                            <h5>Capricorn</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Capricorn"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign11.svg" alt="Capricorn" />
                          </span>
                          <div>
                            <h5>Aquarius</h5>
                          </div>
                        </NavLink>
                      </li>
                      <li className="as_sign_box">
                        <NavLink to={`/Zodiac-Details/${"Pisces"}`}>
                          <span className="as_sign">
                            <img src="assets/images/svg/sign12.svg" alt="Pisces" />
                          </span>
                          <div>
                            <h5>Pisces</h5>
                          </div>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
