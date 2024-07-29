import React, { useEffect, useState } from "react";
import Carouse from "../../Component/TopCarouselComponent/Carouse";
import android from "../../../images/download/GooglePlay.png";
import { BsStarHalf, BsStarFill } from "react-icons/bs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";
import "./ok.css";
// import { TbZodiacAquarius, TbZodiacAries, TbZodiacCancer, TbZodiacCapricorn, TbZodiacGemini } from "react-icons/tb";
import img from "../../../images/female_dummy.jpg";
import { FaArrowRight } from "react-icons/fa";
// import { GetAstrologers } from '../../../api/userLogInReducer';
import { useDispatch, useSelector } from "react-redux";
import { GetAstrologers, Horoscopy } from "../../../api/userLogInReducer";
import { NavBar } from "../../Component/All";
import { ClientChat } from "../../../api/ChatRequestReducer";
import Faq from "./Faq";
import { Footer } from "../../..";
import Banner from "../../Component/Banner/Banner";
import Horoscope from "../../Component/Horoscope/Horoscope";
import { Services, Testimonial } from "../../Component/Static/Static";
import { motion, AnimatePresence } from "framer-motion";
function Home({ socketRef }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
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
  // const responsive2 = {
  //   superLargeDesktop: {
  //     breakpoint: { max: 4000, min: 0 },
  //     items: 1
  //   },
  // }
  // const { astrologers } = useSelector((state) => state.userLog)
  const { user } = useSelector((state) => state.userLog);
  // const [zodiac, setZodiac] = useState("aries")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [horoscope, setHoroscope] = useState({})
  const { astrologers } = useSelector((state) => state.userLog);

  useEffect(() => {
    user?._id && navigate("/search");
  }, [user]);

  // useEffect(() => {
  //   zodiac && dispatch(Horoscopy({ sign: zodiac })).then((e) => {
  //     e.payload?.success && setHoroscope(e.payload?.data?.prediction)
  //   })

  // }, [zodiac])
  const { AstroRequest } = useSelector((state) => state.astroRequest);
  const [s, sets] = useState({});

  useEffect(() => {
    const a = setInterval(() => {
      dispatch(GetAstrologers());
    }, 15000);
    dispatch(GetAstrologers());
    return () => clearInterval(a);
  }, [dispatch]);

  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Banner />
      <Horoscope />

   

      <div style={{ width: "100vw", backgroundColor: "var(--white)" }}>
        <div className="container" style={{}}>
          <h2 className="astroListHeading">Meet Our Psychic Masters</h2>
          <p className="astroListSubHeading">
            Get psychic reading online to get clarity on your life path
          </p>

          {/* <div className="row  gy-3">
            {astrologers?.slice(0, 6)?.map((item) => (
              <motion.div
                key={item.id}
                layoutId={item.id}
                onClick={() => setSelectedId(item.id)}
                className="col-sm-6 col-md-4 col-lg-4"
              >
                <motion.div
                  className="card w-100"
                  style={{ borderRadius: 15, backgroundColor: "#ffff" }}
                  layout
                >
                  <div className="card-body p-4 text-black">
                    <div className="d-flex align-items-center mb-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item?.avatar?.url}
                          alt="Generic placeholder image"
                          className="img-fluid rounded-circle border border-dark border-3"
                          style={{ width: 70 }}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex flex-row align-items-center mb-2">
                          <p className="mb-0 me-2 fs-5">{item.name}</p>
                          <ul
                            className="mb-0 list-unstyled d-flex flex-row"
                            style={{ color: "#1B7B2C" }}
                          >
                            {[...Array(item.rating)].map((_, index) => (
                              <li key={index}>
                                <div>
                                  <i className="fas fa-star fa-xs" />
                                  {`(${
                                    item.reviews.filter((i) => i.rating).length
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

                        <div className="d-flex flex-row align-items-center">
                          <button
                            onClick={() => navigate(`/auth?login=true`)}
                            type="button"
                            className="btn btn-outline-dark btn-rounded btn-sm me-3"
                            data-mdb-ripple-color="dark"
                          >
                            See profile
                          </button>

                          {item.isOnline === "Online" ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-success btn-rounded btn-sm"
                              >
                                Online
                              </button>
                            </>
                          ) : item.isOnline === "Offline" ? (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-dark btn-rounded btn-sm"
                              >
                                Offline
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-rounded btn-sm"
                              >
                                Busy
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <hr />
                      <p className="">{item?.experience} years Experience</p>
                      <p className="">
                        {item?.consultation} consultations done
                      </p>

                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          margin: "10px 0px",
                          flexWrap: "wrap",
                        }}
                      >
                        {item?.category?.length > 0 ? (
                          <>
                            {item?.category?.slice(0, 5).map((itemCate) => (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-outline-dark btn-rounded btn-sm me-3"
                                  data-mdb-ripple-color="dark"
                                >
                                  {itemCate}
                                </button>
                              </>
                            ))}
                          </>
                        ) : (
                          <>
                            <p
                              style={{
                                background: "var(--yellow)",
                                boxShadow: "0px 0px 10px var(--gray)",
                                padding: "5px 15px",
                                borderRadius: "20px ",
                              }}
                            >
                              Astrologer
                            </p>
                          </>
                        )}
                        <button
                          type="button"
                          className="btn primary-btn btn-rounded btn-sm me-3"
                          data-mdb-ripple-color="dark"
                          onClick={() => navigate(`/astrologer/${item?._id}`)}
                        >
                          More...
                        </button>
                      </div>
                    </div>

                    <hr />

                    <div className="d-flex align-items-center justify-content-between">
                      <p className="fw-bold mb-0">
                        {" "}
                        {item.isOnline === "Online"
                          ? `$${item?.chargePrise}Per Min`
                          : "$7 Per Question"}
                      </p>

                      <button
                        onClick={() => {
                          if (!user?._id) {
                            navigate(`/auth?login=true`);
                          }
                        }}
                        type="button"
                        className="btn primary-btn btn-rounded btn-block btn-lg"
                      >
                        <i className="fas fa-comment me-2" />
                        {item.isOnline === "Online" ? "chat" : "ask"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div> */}


          <div className="astroContainer">
            {
              // var(--bg-yellow)
              astrologers.slice(0, 6).map((e) => (
                <div
                  key={e._id}
                  className="card1"
                  style={{
                    display: "flex",
                    flex: "1",
                    minWidth: "31%",
                    flexDirection: "column",
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(83.5deg, #fff4cc -15.87%, #ffc5c5 96.3%)",
                      flex: "1",
                      display: "flex",
                      flexDirection: "column",
                      padding: "20px 15px 15px 15px",
                      gap: "8px",
                      paddingBottom: "20px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        padding: "5px 10px",
                        border: "1px solid gray",
                        borderRadius: "4px",
                        bottom: "10px",
                        right: "10px",
                      }}
                    >
                      {e.isOnline === "Online" ? (
                        <>
                          <div
                            style={{
                              height: "10px",
                              aspectRatio: "1",
                              background: "green",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Online</span>
                        </>
                      ) : e.isOnline === "Offline" ? (
                        <>
                          <div
                            style={{
                              height: "10px",
                              aspectRatio: "1",
                              background: "gray",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Offline</span>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              height: "10px",
                              aspectRatio: "1",
                              background: "red",
                              borderRadius: "50%",
                            }}
                          ></div>
                          <span>Busy</span>
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "5%",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          height: "100px",
                          minWidth: "100px",
                          position: "relative",
                          maxWidth: "100px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={e?.avatar?.url}
                          alt=""
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Link
                          to={`/auth?login=true`}
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                        >
                          {e.name}
                        </Link>
                        <p>
                          {`(${e.reviews.filter((i) => i.rating).length})`}{" "}
                          {` `}
                          {parseFloat(
                            (
                              e.reviews
                                .filter((i) => i.rating)
                                .reduce(
                                  (accumulator, currentValue) =>
                                    accumulator + currentValue.rating,
                                  0
                                ) / e.reviews.filter((i) => i.rating).length
                            ).toFixed(1)
                          ) || 0}{" "}
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        margin: "10px 0px",
                        flexWrap: "wrap",
                      }}
                    >
                      {e?.category?.length > 0 ? (
                        <>
                          {e?.category?.slice(0, 5).map((e) => (
                            <>
                              <p
                                style={{
                                  background: "var(--yellow)",
                                  boxShadow: "0px 0px 10px var(--gray)",
                                  padding: "5px 15px",
                                  borderRadius: "20px ",
                                }}
                              >
                                {e}
                              </p>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <p
                            style={{
                              background: "var(--yellow)",
                              boxShadow: "0px 0px 10px var(--gray)",
                              padding: "5px 15px",
                              borderRadius: "20px ",
                            }}
                          >
                            Astrologer
                          </p>
                        </>
                      )}
                      <p
                        onClick={() => navigate(`/astrologer/${e._id}`)}
                        style={{
                          background: "gray",
                          boxShadow: "0px 0px 10px var(--gray)",
                          padding: "5px 15px",
                          borderRadius: "20px ",
                          color: "white",
                        }}
                      >
                        More...
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                      }}
                    >
                      <p>
                        {e.experience} years <span>Experience</span>
                      </p>
                      <p>
                        {e.consultation}{" "}
                        <span style={{ fontWeight: "400" }}>
                          consultations done
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "var(--yellow)",
                      padding: "10px 20px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--dark)",
                      }}
                    >
                      {e.isOnline === "Online"
                        ? `$${e?.chargePrise}Per Min`
                        : "$7 Per Question"}
                    </div>

                    <div
                      style={{
                        background: "var(--dark)",
                        color: "var(--white)",
                        padding: "5px 20px",
                        borderRadius: "3px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                      onClick={() => {
                        if (!user?._id) {
                          navigate(`/auth?login=true`);
                        }
                      }}
                    >
                      {e.isOnline === "Online" ? "chat" : "ask"}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <div
        style={{
          overflow: "hidden",
          width: "100vw",
          background: "var(--bg-white)",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h2
            className="staticHeading"
            style={{
              color: "var(--bg-dark)",
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "40px",
              fontSize: "40px",
            }}
          >
            Why you Choose us.
          </h2>
          <div className="cardhasfj" style={{ display: "flex", gap: "4%" }}>
            <div className="sahdf" style={{ flex: "1", overflow: "hidden" }}>
              <img
                src="/horoscope.jpeg"
                alt=""
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
            <div
              style={{
                flex: "1",
                padding: "10px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                className="staticHeading"
                style={{
                  color: "var(--bg-dark)",
                  marginBottom: "5px",
                  fontSize: "30px",
                }}
              >
                {" "}
                Discover the Magic of Our Daily Horoscope!
              </h2>
              <p style={{ fontSize: "20px" }}>
                Exciting news for all astrology enthusiasts! Unveil the
                mysteries of your day with the Best Daily Horoscope by UNZZIP
                TRUTH. Our Psychic Masters have curated insightful predictions
                to guide you through every twist and turn of life.
              </p>
              <br />
              <p style={{ fontSize: "20px", marginTop: "20px;" }}>
                Don't miss out on the cosmic wisdom. Join our community of
                believers and skeptics alike. Trust us for the best in
                astrological insights!
              </p>
            </div>
          </div>
          <div
            className="cardhasfj"
            style={{ display: "flex", gap: "4%", marginTop: "30px" }}
          >
            <div
              style={{
                flex: "1",
                padding: "10px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                className="staticHeading"
                style={{
                  color: "var(--bg-dark)",
                  marginBottom: "5px",
                  fontSize: "30px",
                }}
              >
                Unlock the Mysteries with a FREE 1-Card Tarot Reading!
              </h2>
              <p style={{ fontSize: "20px" }}>
                Curious about what the cards have in store for you? We're
                offering you the chance to experience the magic with a FREE
                1-Card Tarot Reading!
              </p>
              <p style={{ fontSize: "20px", margin: "15px 0px" }}>
                Embrace the wisdom of the cards and gain clarity on your
                journey. Whether it's love, career, or personal growth, let the
                tarot be your guide!
              </p>{" "}
              <p style={{ fontSize: "20px" }}>
                Limited time offer! Don't miss this opportunity to discover the
                secrets that await you
              </p>
              {/* <p style={{ fontSize: "20px", fontWeight: "700", margin: "10px 0px" }}>Why you choose us</p> */}
              {/* <ul>
                <li style={{ fontSize: "20px", }}>* Accurate insights tailored to your zodiac sign</li>
                <li style={{ fontSize: "20px", }}>* Expert astrologers decoding the celestial influences</li>
                <li style={{ fontSize: "20px", }}>* Daily doses of inspiration, love, and career guidance</li>
                <li style={{ fontSize: "20px", }}>* It's like having your own personal cosmic roadmap!</li>
              </ul> */}
              {/* <br />
              <p style={{ fontSize: "20px", marginTop: "20px;" }}>Don't miss out on the cosmic wisdom. Join our community of believers and skeptics alike. Trust us for the best in astrological insights!</p> */}
            </div>
            <div style={{ flex: "1", overflow: "hidden" }}>
              <img
                src="/trato.jpeg"
                alt=""
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
          </div>
          <div
            className="cardhasfj"
            style={{ display: "flex", gap: "4%", marginTop: "30px" }}
          >
            <div className="sahdf" style={{ flex: "1", overflow: "hidden" }}>
              <img
                src="/expert.jpeg"
                alt=""
                style={{ objectFit: "cover", height: "100%", width: "100%" }}
              />
            </div>
            <div
              style={{
                flex: "1",
                padding: "10px 0px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2
                className="staticHeading"
                style={{
                  color: "var(--bg-dark)",
                  marginBottom: "5px",
                  fontSize: "30px",
                }}
              >
                Meet Our Expert Psychic Master!
              </h2>
              <p style={{ fontSize: "20px" }}>
                Curious minds, listen up! Here's why our Psychic Master stands
                out from the cosmic crowd
              </p>
              <p style={{ fontSize: "20px", margin: "15px 0px" }}>
                Precision is key! Our Psychic Master is known for accurate
                predictions, providing you with the foresight you need to
                navigate life's twists and turns.
              </p>
              <p style={{ fontSize: "20px" }}>
                Beyond predictions, Our Expert Psychic Master offers guidance
                that can be truly transformative. Illuminate your path and
                unlock your full potential.
              </p>
            </div>
          </div>
          <div
            className="close800"
            style={{
              display: "flex",
              gap: "10px",
              background: "white",
              width: "800px",
              borderRadius: "50px",
              height: "80px",
              margin: "30px auto",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <p style={{ flex: "1", display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                so why you are waiting?
              </span>
              <span
                style={{
                  textAlign: "center",
                  fontSize: "17px",
                  textTransform: "capitalize",
                }}
              >
                just Go and Sign-Up
              </span>
            </p>
            <div
              onClick={() => navigate("/auth?sign-up=true")}
              style={{
                flex: "1",
                cursor: "pointer",
                height: "100%",
                width: "50%",
                borderRadius: "50px",
                backgroundColor: "var(--yellow)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              Sign-Up
            </div>
          </div>
        </div>
      </div>

      <Testimonial />

      <Faq />
      <Services />
      <Footer />
    </>
  );
}

export default Home;
