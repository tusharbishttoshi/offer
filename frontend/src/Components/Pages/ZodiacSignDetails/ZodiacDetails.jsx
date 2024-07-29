import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Footer } from "../../..";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  GiAquarius,
  GiAries,
  GiCancer,
  GiCapricorn,
  GiGemini,
  GiLeo,
  GiLibra,
  GiPisces,
  GiSagittarius,
  GiScorpio,
  GiTaurus,
  GiVirgo,

} from "react-icons/gi";
import { checkDateRange } from "../Profile/ProfileSideBar";

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
import Navbar from "../../Component/Navbar/Navbar";
import { NavBar } from "../../Component/All";

export default function ZodiacDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useParams();
  const { user } = useSelector((state) => state.userLog);
  const [horoscope, setHoroscope] = useState({});
  const [zodiac, setZodiac] = useState("");
  useEffect(() => {
    // !user?._id && navigate("/")
    // user?._id && setZodiac(checkDateRange(user.dob));
  }, [user]);

  useEffect(() => {
    dispatch(myHoroscopy({ sign: _id || "Scorpio" })).then((e) =>
      setHoroscope(e.payload.data.prediction)
    );
  }, []);

  useEffect(() => {
    dispatch(myHoroscopy({ sign: zodiac || _id || "Scorpio" })).then((e) =>
      setHoroscope(e.payload.data.prediction)
    );
  }, [zodiac, _id]);


  return (
    <>
      {user?._id ? <NavBar /> : <Navbar />}
    
      <div className="as_main_wrapper blog_bg">
        {/* <section className="as_breadcrum_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="text-black">Zodiac Details</h1>
                <ul className="breadcrumb">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>Zodiac Details</li>
                </ul>
              </div>
            </div>
          </div>
        </section> */}
        <section className="as_zodiac_single_wrapper seconde_bg as_padderTop80 as_padderBottom60">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12 col-sm-12">
                <div className="as_zodiac_single_inner">
                  <div className="as_zodiac_heading as_padderBottom50 text-center" style={{ color: 'black' }}>
                    {/* <span className="as_sign">
          
                    </span> */}
                    {zodiac || _id} Horoscope

                  </div>
                  <div className="">
                    <Tabs className="">
                      <TabList className="nav-item">
                        <Tab
                          onClick={() => {
                            dispatch(myHoroscopy({ sign: _id })).then((e) =>
                              setHoroscope(e.payload.data.prediction)
                            );
                          }}
                        >
                          Today
                        </Tab>
                        <Tab
                          onClick={() => {
                            dispatch(Week({ sign: _id })).then((e) => {
                              setHoroscope(e.payload.data.weekly_horoscope);
                            });
                          }}
                        >
                          Week
                        </Tab>
                        <Tab
                          onClick={() => {
                            dispatch(Month({ sign: _id })).then((e) => {
                              setHoroscope(e.payload.data.monthly_horoscope);
                            });
                          }}
                        >
                          Month
                        </Tab>
                        <Tab
                          onClick={() => {
                            dispatch(Year({ sign: _id })).then((e) =>
                              setHoroscope(e.payload.data.yearly_horoscope)
                            );
                          }}
                        >
                          Year
                        </Tab>
                      </TabList>

                      <TabPanel>
                        <div
                          className="tab-pane fade show active"
                          id="today"
                          role="tabpanel"
                          aria-labelledby="Today"
                        >
                          <div className="today">
                            <h1 className="fs-1 text-center" style={{ color: 'black' }}>
                              Today Horoscope
                            </h1>
                          </div>


                          <h3 className="as_subheading as_orange">Personal</h3>

                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }} >
                            {horoscope?.personal}
                          </p>
                          <h3 className="as_subheading as_orange">Health</h3>
                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.health}
                          </p>
                          <h3 className="as_subheading as_orange">
                            Profession
                          </h3>
                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.profession}
                          </p>
                          <h3 className="as_subheading as_orange">travel</h3>
                          <p className="as_font14 as_padderBottom10" style={{ color: 'black' }}>
                            {horoscope?.emotions}
                          </p>
                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.travel}
                          </p>
                          <h3 className="as_subheading as_orange">Luck</h3>
                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            <ul>
                              {horoscope?.luck?.map((luckItem, index) => (
                                <li
                                  className="as_font14 as_padderBottom20" style={{ color: 'black' }}
                                  key={index}
                                >
                                  {luckItem}
                                </li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div
                          className="tab-pane fade show active"
                          id="today"
                          role="tabpanel"

                        >

                          <div className=" m-auto">
                            <h1 className="fs-1 text-center" style={{ color: 'black' }} >
                              Week Horoscope
                            </h1>
                          </div>
                          <h3 className="as_subheading as_orange">Personal</h3>

                          <p className="as_font14   as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.personal}
                          </p>
                          <h3 className="as_subheading as_orange">Health</h3>
                          <p className="as_font14   as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.health}
                          </p>
                          <h3 className="as_subheading as_orange">
                            Profession
                          </h3>
                          <p className="as_font14   as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.profession}
                          </p>
                          <h3 className="as_subheading as_orange">travel</h3>
                          <p className="as_font14   as_padderBottom10" style={{ color: 'black' }}>
                            {horoscope?.emotions}
                          </p>
                          <p className="as_font14   as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.travel}
                          </p>
                          <h3 className="as_subheading as_orange">Luck</h3>
                          <p className="as_font14   as_padderBottom20" style={{ color: 'black' }}>
                            <ul>
                              {horoscope?.luck?.map((luckItem, index) => (
                                <li className="as_font14   as_padderBottom20" style={{ color: 'black' }} key={index}>{luckItem}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div
                          className="tab-pane fade show active"
                          id="today"
                          role="tabpanel"
                          aria-labelledby="Today"
                        >

                          <div className=" m-auto">
                            <h1 className="fs-1 text-center" style={{ color: 'black' }}>
                              Month Horoscope
                            </h1>
                          </div>

                          <h3 className="as_subheading as_orange">Personal</h3>

                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.personal}
                          </p>
                          <h3 className="as_subheading as_orange">Health</h3>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.health}
                          </p>
                          <h3 className="as_subheading as_orange">
                            Profession
                          </h3>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.profession}
                          </p>
                          <h3 className="as_subheading as_orange">travel</h3>
                          <p className="as_font14  as_padderBottom10" style={{ color: 'black' }}>
                            {horoscope?.emotions}
                          </p>
                          <p className="as_font14 as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.travel}
                          </p>
                          <h3 className="as_subheading as_orange">Luck</h3>
                          <p className="as_font14 text-black   as_padderBottom20" style={{ color: 'black' }}>
                            <ul>
                              {horoscope?.luck?.map((luckItem, index) => (
                                <li className="as_font14   as_padderBottom20" style={{ color: 'black' }} key={index}>{luckItem}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div
                          className="tab-pane fade show active"
                          id="today"
                          role="tabpanel"
                          aria-labelledby="Today"
                        >


                          <div className=" m-auto" > 
                            <h1 className="fs-1 text-center" style={{ color: 'black' }}>
                              Year Horoscope
                            </h1>
                          </div>


                          <h3 className="as_subheading as_orange">Personal</h3>

                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.personal}
                          </p>
                          <h3 className="as_subheading as_orange">Health</h3>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.health}
                          </p>
                          <h3 className="as_subheading as_orange">
                            Profession
                          </h3>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.profession}
                          </p>
                          <h3 className="as_subheading as_orange">travel</h3>
                          <p className="as_font14  as_padderBottom10" style={{ color: 'black' }}>
                            {horoscope?.emotions}
                          </p>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            {horoscope?.travel}
                          </p>
                          <h3 className="as_subheading as_orange">Luck</h3>
                          <p className="as_font14  as_padderBottom20" style={{ color: 'black' }}>
                            <ul>
                              {horoscope?.luck?.map((luckItem, index) => (
                                <li className="as_font14  as_padderBottom20" style={{ color: 'black' }} key={index}>{luckItem}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12">
                <div className="as_zodiac_sidebar">
                  <div className="as_sign_box" onClick={() => setZodiac("Aries")}>
                    <span className="as_sign">
                      <GiAries color="white" size={30} />
                    </span>
                    <div>
                      <h5>Aries</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Taurus")}>
                    <span className="as_sign">
                      <GiTaurus color="white" size={30} />
                    </span>
                    <div>
                      <h5>Taurus </h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Gemini")}>
                    <span className="as_sign">
                      <GiGemini color="white" size={30} />
                    </span>
                    <div>
                      <h5>Gemini</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Cancer")}>
                    <span className="as_sign">
                      <GiCancer color="white" size={30} />
                    </span>
                    <div>
                      <h5>Cancer</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Leo")}>
                    <span className="as_sign">
                      <GiLeo color="white" size={30} />
                    </span>
                    <div>
                      <h5>Leo</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Virgo")}>
                    <span className="as_sign">
                      <GiVirgo color="white" size={30} />
                    </span>
                    <div>
                      <h5>Virgo</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Libra")}>
                    <span className="as_sign">
                      <GiLibra color="white" size={30} />
                    </span>
                    <div>
                      <h5>Libra</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Scorpio")}>
                    <span className="as_sign">
                      <GiScorpio color="white" size={30} />
                    </span>
                    <div>
                      <h5>Scorpio</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Sagittarius")}>
                    <span className="as_sign">
                      <GiSagittarius color="white" size={30} />
                    </span>
                    <div>
                      <h5>Sagittarius</h5>

                    </div>
                  </div>

                  <div className="as_sign_box" onClick={() => setZodiac("Capricorn")}>
                    <span className="as_sign">
                      <GiCapricorn color="white" size={30} />
                    </span>
                    <div>
                      <h5>Capricorn</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Aquarius")}>
                    <span className="as_sign">
                      <GiAquarius color="white" />
                    </span>
                    <div>
                      <h5>Aquarius</h5>

                    </div>
                  </div>
                  <div className="as_sign_box" onClick={() => setZodiac("Pisces")}>
                    <span className="as_sign">
                      <GiPisces color="white" size={30} />
                    </span>
                    <div>
                      <h5>Pisces</h5>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
