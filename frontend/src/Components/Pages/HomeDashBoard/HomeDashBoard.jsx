import "./HomeDashBoard.css";
import { Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Banner from "../../Component/Banner/Banner";
import { Footer } from "../../..";
import { NavBar } from "../../Component/All";
import Navbar from "../../Component/Navbar/Navbar";
import axios from "axios";
import Faq from "../HomePage/Faq";
import { Helmet } from "react-helmet";
import { GetAstrologers, Horoscopy } from "../../../api/userLogInReducer";
import { motion, AnimatePresence } from "framer-motion";
import { GiButtonFinger } from "react-icons/gi";
import {
  Month,
  Taro,
  UMonth,
  UWeek,
  UYear,
  Week,
  Year,
  myHoroscopy,
  userTaro,
} from "../../../api/userLogInReducer";
export default function HomeDashBoard() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [horoscope, setHoroscope] = useState({});
  useEffect(() => {
    dispatch(myHoroscopy({ sign: "Aries" })).then((e) =>
      setHoroscope(e.payload.data.prediction)
    );
  }, []);
  const { user } = useSelector((state) => state.userLog);
  const { astrologers } = useSelector((state) => state.userLog);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  const [blogData, setblogData] = useState([]);

  const AllBlogData = () => {
    axios
      .get(`/api/v1/blog`)
      .then((response) => {
        let data = response.data;
        let blogs = data?.blogs;

        if (response.status) {
          if (data.status) {
            console.log({ blogs });
            setblogData(blogs);
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    AllBlogData();
  }, []);
  useEffect(() => {
    const ApiCallFindAstro = setInterval(() => {
      dispatch(GetAstrologers());
    }, 15000);
    dispatch(GetAstrologers());
    return () => clearInterval(ApiCallFindAstro);
    console.log({ astrologers });
  }, [dispatch]);
  return (
    <>
      <div className="as_main_wrapper homebg">
        <Helmet>
          <title>
            {
              "Discover Cosmic Insights with Expert Psychic Masters | unzziptruth.com"
            }
          </title>
          <meta
            name="description"
            content={
              "Get accurate horoscope readings, tarot interpretations, love compatibility insights, and expert psychic predictions. Unlock spiritual guidance and cosmic wisdom online"
            }
          />
          {/* <meta name="keywords" content={blogData?.keywords} /> */}
        </Helmet>

        <Navbar />
        {/* HomeBanner */}

        <div className="image-wrap" style={{ position: "relative" }}>
          <div className="img-content">
            <img
              src="./assets/images/Get a 1st chat fre for 3 min. (1280 x 500 px) (1).gif"
              alt="HomeBanner"
              className="w-100"
            />
            <div className="col-lg-12 text-center maine_banner_container">
              {/* <h1 className="maineHeadingText HEAD">UNZZIP TRUTH</h1>
              <h1 className="maineText SUBHEAD">
                Revealing The Secrets of Your Destiny
              </h1> */}
              <div className="button-container">
                <Link to="/auth?login=true" className="chatcolor btn-sm ms-0">
                  Chat Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section className="container-fluid  p-3 p-md-5">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
                    src="assets/Psynacis/BANNERQ2.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>
                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
               
                    src="assets/Psynacis/BANNERQ3.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>

                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
                    src="assets/Psynacis/BANNERQ4.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>
                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
                    src="assets/Psynacis/BANNERQ5.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>

                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
                    src="assets/Psynacis/BANNERQ6.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>
                <div className="col-md-6 col-md-auto mb-3 text-center">
                  <img
                    src="assets/Psynacis/BANNERQ7.jpg"
                    className="img-fluid"
                    onClick={() => navigate("/auth?login=true")}
                    alt="Banner"
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 col-12 m-auto">
              {/* <h1 className="as_heading text-start">About Us</h1> */}

              <div class="col-lg-12 text-center">
                <h1 class="as_top">About Us</h1>
                <div class="as-line"></div>
              </div>

              <p
                className="primary-color mt-3"
                style={{ textAlign: "justify" }}
              >
                Welcome to the right platform of astrology that guides you to
                the right path. Unzzip Truth helps you to fulfill your desires
                and achieve true happiness and joy. This platform is like a Pole
                Star that offers insight and guidance through astrology,
                Numerology, and psychic readings. Being rooted with ancient
                wisdom we blend it with modern technology to assist you in
                making the right decisions to achieve your aspirations and
                desires.
              </p>
            </div>
          </div>

          {/* <div className="as_banner_detail w-100  w-md-75 w-lg-75 mx-auto text-center">
              <h1 className="text-start text-black">
                "In <span className="as_text"> Unzzip Truth </span>, a finger
                points at truths within cosmic
                <span className="as_text"> constellations </span> ."
                <br />
              </h1>

              <p className="primary-color">
                Unzzip Truth serves as a guiding hand, pointing towards the
                profound realities that shape our lives. It's not the
                destination but a finger leading you to self-discovery and
                cosmic insights on your unique journey
              </p>
              <NavLink to="/auth?login=true" className="as_btn">
                Login
              </NavLink>
            </div> */}

          {/* <div className="col-lg-6 order-lg-1 col-md-6 order-md-1 col-sm-12 order-sm-1 col-12 order-2">
                <div className="as_banner_slider slick-initialized slick-slider slick-dotted">
                  <div className="as_banner_detail slick-slide slick-current slick-active">
                 
                    <h1 className="text-start">
                      "In <span className="as_text"> Unzzip Truth </span>, a
                      finger points at truths within cosmic
                      <span className="as_text"> constellations </span> ."
                      <br />
                    </h1>

                    <p>
                      Unzzip Truth serves as a guiding hand, pointing towards
                      the profound realities that shape our lives. It's not the
                      destination but a finger leading you to self-discovery and
                      cosmic insights on your unique journey
                    </p>
                    <NavLink to="/auth?login=true" className="as_btn">
                      Login
                    </NavLink>
                  </div>
                </div>
              </div> */}

          {/* <div className="col-lg-6 order-lg-2 col-md-6 order-md-2 col-sm-12 order-sm-2 col-12 order-1">
                <div className="as_banner_img text-center">
                  <img
                    src="assets/images/banner_image.png"
                 
                    alt=""
                    className="img-responsive"
                  />
                </div>
              </div> */}
        </section>

        {/* Today's Aries Horoscope */}

        <section className="as_about_wrapper  as_padderTop80 as_padderBottom80">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12 m-auto">
                <h2 className="as-head">Today's Aries Horoscope</h2>
                <div class="as-line"></div>
                <p className="primary-color mt-3">{horoscope?.personal}</p>

                <Link to="/horoscopy" className="horo-btn my-2">
                  read more
                </Link>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <div className="as_about_slider">
                  <div>
                    {/* <div className="as_aboutimg text-right"> */}
                      <img
                        src="assets/images/about1.jpg"
                        className="img-responsive"
                        alt="About"
                      />
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Psychic Masters */}

        <section className="as_service_wrapper  as_padderTop80 as_padderBottom80">
          <div className="container">
            <h2 className="as-head">Meet Our Psychic Masters</h2>
            <div className="as-line"></div>
            <p className="astroListSubHeading uilink">
              Get psychic reading online to get clarity on your life path
            </p>

            <div className="row  gy-3">
              {astrologers?.slice(0, 6)?.map((item) => (
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 display-grid">
                  <div className="astrologers_box">
                    <div className="box-upper-details">
                      <div className="astrologer_details">
                        <div className="img_astrolgers_rating">
                          <div className="img_astrologer normal_border">
                            <img
                              src={item?.avatar?.url}
                              alt="Generic placeholder image"
                              style={{
                                width: 70,
                                height: 70,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="star_rate">
                            {" "}
                            <ul
                              className="mb-0 list-unstyled d-flex flex-row"
                              style={{ color: "#1B7B2C" }}
                            >
                              {[...Array(item.rating)].map((_, index) => (
                                <li key={index}>
                                  <div>
                                    <i className="fas fa-star fa-xs" />
                                    {`(${
                                      item.reviews.filter((i) => i.rating)
                                        .length
                                    })`}{" "}
                                    {` `}
                                    {parseFloat(
                                      (
                                        item.reviews
                                          .filter((i) => i.rating)
                                          .reduce(
                                            (accumulator, currentValue) =>
                                              accumulator + currentValue.rating,
                                            0
                                          ) /
                                        item.reviews.filter((i) => i.rating)
                                          .length
                                      ).toFixed(1)
                                    ) || 0}{" "}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="astrologers_experence light_clr">
                          {item?.consultation} Orders 
                          </div>
                        </div>



                        <div className="astrologer_bio">
                          <div
                            className="astrologers_name"
                            onClick={() =>
                              navigate(`/astrologer/${item?._id}`)
                            }
                          >
                            {item.name}
                          </div>
                          <div className="astrologers_designation light_clr">
                            {item?.category?.slice(0, 3).map((itemCate) => (
                              <>
                                {" "}
                                <span>{itemCate} </span>,
                              </>
                            ))}
                          </div>
                          <div className="astrologers_language light_clr">
                            {item?.languages?.slice(0, 3).map((itemCate) => (
                              <>
                                {" "}
                                <span>{itemCate} </span>,
                              </>
                            ))}
                          </div>
                          <div className="astrologers_experence light_clr">
                            Exp: {item?.experience} years
                          </div>
                      
                          <div className="astrologers_experence light_clr">
                          {item.isOnline == "Online" ? "$2.51Per Min" : "$7 Per Question"} 
                          </div>
                        </div>
                      </div>
                      <div className="chat_btn_astrologer">
                        <div className="active_tick single-tick">
                          <span class="mat-tooltip-trigger tick_icon ng-star-inserted">
                            <img
                              height="512"
                              width="512"
                              alt="Verified Astrologer"
                              src="https://d1gcna0o0ldu5v.cloudfront.net/fit-in/24x24/assets/images/Chat_with_astrologers/webp/tick_icon.webp"
                            />
                          </span>
                        </div>
                        <div className="chat_button">
                          <button
                            type="button"
                            className={`btn chat-radio w-100  ${
                              item.isOnline == "Online"
                                ? "btn-success"
                                : "btn-warning"
                            }`}
                            onClick={() => navigate("/auth?login=true")}
                          >
                            {item.isOnline == "Online" ? "Chat" : "Ask"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            
            </div>
          </div>
        </section>
        {/* Explore Top Psychic Reading Topics */}

        <section className="as_service_wrapper as_padderTop80 as_padderBottom80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="as_top">Explore top psychic reading topics</h1>
                <div className="as-line"></div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/love.png" alt="Love" />
                  </span>
                  <h4 className="as_subheading">Love</h4>
                  <p>
                    Discover compatibility, soulmate connections, and love's
                    celestial secrets. Our Psychic Masters guide you on your
                    romantic journey. <br />
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/taro.png" alt="Medium" />
                  </span>
                  <h4 className="as_subheading">Medium</h4>
                  <p>
                    Discover guidance, healing, and the possibility of
                    communicating with departed loved ones. Explore the
                    mysteries of mediumship and the unseen world..
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/tarot.png" alt="Tarot" />
                  </span>
                  <h4 className="as_subheading">Tarot</h4>
                  <p>
                    Explore the ancient art of Tarot card reading, a practice
                    that uses a deck of special cards to gain insights into the
                    past, present, and future. Tarot readings can offer guidance
                    and reflection on various aspects of life.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/wedding.png" alt="Fortune" />
                  </span>
                  <h4 className="as_subheading">Fortune</h4>
                  <p>
                    Delve into the mysteries of fortune-telling, where
                    practitioners use various methods, such as divination tools
                    or intuitive abilities, to provide insights into future
                    events. Discover your potential paths and receive guidance
                    on making informed decisions.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/hourglass.png" alt="Past Time" />
                  </span>
                  <h4 className="as_subheading">Past Time</h4>
                  <p>
                    Journey into the exploration of past events and experiences.
                    Past time practices may include past life regression,
                    historical analysis, or other methods aimed at understanding
                    the impact of the past on the present.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/pentagram.png" alt="Astrology" />
                  </span>
                  <h4 className="as_subheading">Astrology</h4>
                  <p>
                    Unlock the celestial secrets of astrology, a discipline that
                    studies the positions and movements of celestial bodies to
                    interpret their influence on human affairs and natural
                    events.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/telepathy.png" alt="Dream Analysis" />
                  </span>
                  <h4 className="as_subheading">Dream Analysis</h4>
                  <p>
                    Dive into dream analysis, decoding the subconscious language
                    of nightly visions. Uncover hidden messages, gaining
                    insights to navigate waking life with newfound awareness.
                    Explore your mind's landscapes.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/user.png" alt="Mind Reading" />
                  </span>
                  <h4 className="as_subheading">Mind Reading</h4>
                  <p>
                    Embark on the intriguing journey of mind reading, unlocking
                    the mysteries of thoughts and emotions. Explore the art of
                    understanding minds, fostering connection, and gaining
                    insights into the human experience.
                  </p>
                </div>
              </div>
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xs-12"
                onClick={() =>
                  navigate(user?._id ? "/search" : "/auth?login=true")
                }
              >
                <div className="as_service_box text-center">
                  <span className="as_icon">
                    <img src="/img/numerology.png" alt="Numerology" />
                  </span>
                  <h4 className="as_subheading">Numerology</h4>
                  <p>
                    Explore the captivating world of numerology, unraveling the
                    secrets held in numbers. Gain insights into your life path,
                    personality, and destiny. Decode the language of numbers and
                    discover hidden meanings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us */}

        <section class="as_whychoose_wrapper as_padderTop80 as_padderBottom50">
          <div class="container">
            <div class="row as_verticle_center">
              <div class="col-lg-3 col-md-12">
                <h1 class="as_heading">Why Choose Us</h1>
                <p class="our-team">
                  Our team comprises 20+ astrologers and psychic masters with a
                  collective experience of over 200 years in the field.
                </p>
              </div>
              <div class="col-lg-9 col-md-12">
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span>
                          <span data-from="0" data-to="20" data-speed="5000">
                            20
                          </span>
                          +
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h4 className="primary-color">
                        Verified & tested Psychic Masters
                      </h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span>
                          <span data-from="0" data-to="15" data-speed="5000">
                            15
                          </span>
                          +
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h4 className="primary-color">
                        Masters already working globally
                      </h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span style={{ fontSize: "16px" }}>
                          <span data-from="0" data-to="99" data-speed="5000">
                            99
                          </span>
                          %
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h4 className="primary-color">
                        Track record of Accuracy
                      </h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span style={{ fontSize: "16px" }}>
                          <span data-from="0" data-to="100" data-speed="5000">
                            100
                          </span>
                          %
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h4 className="primary-color">Exclusive Insights</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span style={{ fontSize: "16px" }}>
                          <span data-from="0" data-to="100" data-speed="5000">
                            100
                          </span>
                          %
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h4 className="primary-color">Client’s Satisfaction</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                    <div class="as_whychoose_box text-center">
                      <span class="as_number">
                        <span style={{ fontSize: "16px" }}>
                          <span data-from="0" data-to="100" data-speed="5000">
                            100
                          </span>
                          %
                        </span>
                        <img src="assets/images/svg/shape.svg" alt="astro" />
                      </span>
                      <h3 className="primary-color">
                        Customer Privacy & Ethical Readings
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* testimonial  */}

        <section className="as_customer_wrapper as_padderBottom80 as_padderTop80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="as_say">What our clients say</h1>
                <div className="as-line"></div>
              </div>

              <div className="col-lg-12 text-center">
                <div className="row as_customer_slider">
                  <Carousel
                    responsive={responsive}
                    swipeable={true}
                    draggable={true}
                    infinite={true}
                    customTransition="all 1s"
                    keyBoardControl={true}
                    arrows={false}
                    focusOnSelect={true}
                    autoPlay={true}
                    autoPlaySpeed={5000}
                    centerMode={false}
                  >
                    <div className="col-lg-12 col-md-12">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img src="/five.jpg" alt="user" />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink ">
                          Absolutely amazed by the accuracy of the readings! The
                          astrologer provided deep insights that resonated with
                          my life. A truly gifted guide on my spiritual journey.
                          Highly recommended!
                        </p>
                        <h3>Jackson Patel</h3>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img
                            src="assets/images/team3.jpg"
                            alt="user profile"
                          />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink">
                          Incredible astrological insights! The astrologer's
                          wisdom brought clarity to my path. The personalized
                          reading was spot-on. Grateful for the guidance and
                          positive energy. Thank you
                        </p>
                        <h3>Emma Gonzalez</h3>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img
                            src="assets/images/customer1.jpg"
                            alt="user profile"
                          />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink">
                          A transformative experience! The astrologer's
                          compassionate approach and detailed analysis made me
                          feel understood. The reading was insightful and
                          empowering. I trust their expertise for future
                          guidance.
                        </p>
                        <h3>Harper Davis</h3>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img src="/three.jpg" alt="user profile" />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink">
                          Exceptional service! The astrologer's attention to
                          detail and professionalism exceeded my expectations.
                          The reading was not only accurate but also delivered
                          with a caring touch. Truly gifted!
                        </p>
                        <h3>Ethan Adams</h3>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img src="/fore.jpg" alt="user profile" />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink">
                          Enlightening and accurate readings! The astrologer's
                          deep understanding of astrology brought a new
                          perspective to my life. A trustworthy guide for anyone
                          seeking cosmic wisdom. Thank you for the
                          enlightenment!
                        </p>
                        <h3>Daniel Perezs</h3>
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12 ">
                      <div className="as_customer_box text-center">
                        <span className="as_customer_img">
                          <img src="/six.jpg" alt="user profile" />
                          <span>
                            <img
                              src="assets/images/svg/quote1.svg"
                              alt="user profile"
                            />
                          </span>
                        </span>
                        <p className=" as_margin0 uilink">
                          An astrologer with profound insight! The reading
                          provided a roadmap for my personal and spiritual
                          growth. The astrologer's wisdom and warmth create a
                          truly transformative experience. Grateful for the
                          guidance!
                        </p>
                        <h3>Madison Evans</h3>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Faq  blog section  */}

        <Faq />
        {/* blog section  */}

        <section className="as_blog_wrapper as_padderTop80 as_padderBottom80">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="as_blog">Our Latest Blog</h1>
                <div className="as-line"></div>

                <p className="as_font14  as_margin0 uilink as_padderBottom20"></p>

                <div className="blog-box">
                  <div className="text-left">
                    <div className="row">
                      {blogData?.slice(0, 3)?.map((item) => (
                        <div
                          onClick={() =>
                            navigate(`/Blog-details/${item?._id}`, {
                              state: item,
                            })
                          }
                          className="col-lg-4 col-md-6 col-sm-12 col-12 rounded border-light"
                          key={item?._id} // Adding a unique key for each mapped item
                        >
                          <div className="as_blog_box">
                            <div className="as_blog_img">
                              <Link
                                to={`/Blog-details/${item?._id}`}
                                state={item}
                              >
                                <img
                                  src={item?.banner.url}
                                  alt={item?.title}
                                  className="img-responsive"
                                  style={{ height: "250px" }}
                                />
                              </Link>
                            </div>
                            <ul>
                              <li>
                                <Link
                                  to={`/Blog-details/${item?._id}`}
                                  state={item}
                                  className="uilink"
                                >
                                  <i className="fas fa-user me-3"></i>
                                  By - Admin
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to={`/Blog-details/${item?._id}`}
                                  state={item}
                                  className="uilink"
                                >
                                  <i className="fas fa-comments me-3"></i>0
                                  comments
                                </Link>
                              </li>
                            </ul>
                            <h4 className="as_subheading">
                              <Link
                                to={`/Blog-details/${item?._id}`}
                                state={item}
                                className="uilink"
                              >
                                {item?.title?.slice(0, 50)}...
                              </Link>
                            </h4>
                            <p
                              className="as_font14  as_margin0 uilink"
                              dangerouslySetInnerHTML={{
                                __html:
                                  item?.description.length > 50
                                    ? `${item?.metaDescription.substring(
                                        0,
                                        50
                                      )}...`
                                    : item?.metaDescription ||
                                      item?.description,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Newsletter */}
        {/* <section className="as_footer_wrapper   as_padderTop80">

        
          <div className="container">
            <div className="as_newsletter_wrapper as_padderBottom60">
              <div className="row">
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12">
                  <h1 className="as_heading  text-start ">Our Newsletter</h1>
                  <p style={{color: "black"}}  className="text-daily">
                    Get Your Daily Horoscope, Daily Lovescope and Daily
                    <br /> Tarot Directly In Your Inbox
                  </p>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12">
                  <div className="as_newsletter_box">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Enter your Email Here..."
                    />
                    <a href="javascript:;" className="as_btn">
                      subscribe now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <Footer />
      </div>
    </>
  );
}
