import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userLog);

  return (
    <>
      {/* <nav className={styles.nav}>
        <div>
          <div onClick={() => navigate("/")}  className={styles.logo}>
            <img src="/UnzipLogo.jpeg" alt="Logo" />
          </div>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li
              onClick={() =>
                navigate(user?._id ? "/search" : "/auth?login=true")
              }
            >
              Psychic Masters
            </li>
            <li
              onClick={() =>
                // navigate(user?._id ? "/horoscopy" : "/auth?login=true")
                navigate("/horoscopy")
              }
            >
              Horoscopy
            </li>
            <li onClick={() => navigate("/Blog")}>Blog</li>
            <li onClick={() => navigate("#faq")}>FAQ</li>
            <li onClick={() => navigate("/auth?login=true")}>Login</li>
          </ul>
          <div className={styles.option}>
            <div onClick={() => navigate("/auth?login=true")}>Login</div>
            <FaBars onClick={() => setActive(true)} />
          </div>
        </div>
      </nav> */}

      <section className="as_header_wrapper">
        <div className="as_logo w-25">
          <NavLink
            className="d-flex justify-content-center align-items-center w-100"
            style={{ height: "50px" }}
            to={"/"}
          >
            <img
              src="/UnzipLogo.jpeg"
              className="img-fluid rounded-circle"
              alt="Your Image"
              style={{ width: "60px", height: "50px",marginLeft: "-28%" }}
            />
          </NavLink>
        </div>
        <div className="as_header_detail">
          {/* <div className="as_info_detail">
              <ul style={{display:"contents"}}>
                <li>
                  <NavLink href="javascript:;">
                    <div className="as_infobox">
                      <span className="as_infoicon">
                        <img src="assets/images/svg/headphone.svg" alt="" />
                      </span>
                      <span className="as_orange">Talk to our Astrogers -</span>
                      +1800 326 3264
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink href="javascript:;">
                    <div className="as_infobox">
                      <span className="as_infoicon">
                        <img src="assets/images/svg/mail1.svg" alt="" />
                      </span>
                      <span className="as_orange">Talk to our Astrogers -</span>
                      support@website.com
                    </div>
                  </NavLink>
                </li>
              </ul>
         
            </div> */}

          <div className="as_menu_wrapper">
            <span
              onClick={() => setActive(true)}
              className="bg_overlay"
            >
              <img src="../assets/images/svg/menu.svg" alt="" />
            </span>
            <div className="as_menu">
              <ul>
                <li>
                  <NavLink to="/" className="uilink">
                    home
                  </NavLink>
                </li>
                <li>
                  <Link
                    className="uilink"
                    to={user?._id ? "/search" : "/auth?login=true"}
                  >
                    Psychic Masters
                  </Link>
                </li>
                <li>
                  {/* to={user?._id ? "/horoscopy" : "/auth?login=true"} */}
                  <Link className="uilink" to={"/horoscopy"}>
                    Horoscopy
                  </Link>
                </li>
                <li>
                  <NavLink
                    className="uilink"
                    onClick={() => navigate("/Blog")}
                    to="/Blog"
                  >
                    blog
                  </NavLink>
                </li>
                <li>
                <Link className="uilink" to={{ pathname: "/faq", state: "hello" }}>
                    FaQ
                  </Link>
                </li>
                <li>
                  <NavLink className="uilink" to="/auth?login=true">
                    Log in / Register
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <span className="as_body_overlay" />
        </div>
      </section>

      <div className={`${styles.mobileMenu} ${active && styles.active}`}>
        <div>
          <div style={{}}>
            <div className={styles.mobileLogo}>
              <img src="/UnzipLogo.jpeg" alt=""      style={{ width: "60px", height: "50px",marginLeft: "-28%" }}/>
            </div>
            <FaXmark  onClick={() => setActive(false)} />
          </div>
          <ul>
            <li
              onClick={() => {
                navigate("/");
                setActive(false);
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate(user?._id ? "/search" : "/auth?login=true");
                setActive(false);
              }}
            >
              Psychic Masters
            </li>
            <li onClick={() => navigate("/Blog")}>Blog</li>
            <li
              onClick={() => {
                // navigate(user?._id ? "/horoscopy" : "/auth?login=true");
                navigate("/horoscopy");
                setActive(false);
              }}
            >
              Horoscopy
            </li>
            <li
              onClick={() => {
                navigate("#faq");
                setActive(false);
              }}
            >
              FAQ
            </li>
            <li
              onClick={() => {
                navigate("/auth?login=true");
                setActive(false);
              }}
            >
              Login
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
