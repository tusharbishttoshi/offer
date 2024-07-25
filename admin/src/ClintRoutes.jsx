import React, { useState, useEffect } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaBarsStaggered, FaUserShield } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { BsAwardFill, BsFillLayersFill, BsFillMoonFill } from "react-icons/bs";
import { GrTransaction } from "react-icons/gr";
import { SiReasonstudios } from "react-icons/si";
import { FaWallet } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { IoIosTime, IoIosNotifications } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import SubMenu from "./SubMenu.jsx";
import { LoginAdminUser } from "./api/AdminUser.js";






// // Filter the routesArray based on the user's permissions
// const accessibleRoutes = routesArray.filter(route => {
//   // If the route has subRoutes, check permissions for subRoutes as well
//   if (route.subRoutes) {
//     route.subRoutes = route.subRoutes.filter(subRoute => userPermissions.includes(subRoute.permission));
//     return route.subRoutes.length > 0;
//   }

//   // Return true if the user has permission to access the route
//   return userPermissions.includes(route.permission);
// });

// Filter the routesArray based on the user's permissions



const showLinkAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
export const ClintRoutes = ({ children, title, rightComp }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");


  const [AllRouterPermission, setAllRouterPermission] = useState([
    {
      name: "Dashboard",
      permission: "DashboardManagement",
      icon: <AiFillDashboard size={25} />,
      path: "/",
    },
    {
      path: "/Wallet-Management",
      name: "Wallet",
      permission: "WalletManagement",
      icon: <FaWallet size={25} />,
    },
    {
      path: "/role",
      name: "Role",
      permission: "RollManagement",
      icon: <BsAwardFill size={25} />,
    },
    {
      path: "/Category",
      name: "Category",
      permission: "CategoryManagement",
      icon: <BsFillLayersFill size={25} />,
    },
    {
      path: "/manage-offer",
      name: "Offer",
      permission: "CategoryManagement",
      icon: <BsFillLayersFill size={25} />,
    },
    {
      path: "/admin-users",
      name: "Sub Admin",
      permission: "SubAdminManagement",
      icon: <BsFillLayersFill size={25} />,
    },
    {
      name: "Articles",
      permission: "ArticlesManagement",
      icon: <BsFillLayersFill size={25} />,
      subRoutes: [
        {
          path: "/blog-page",
          name: "Blog",
        },
      ],
    },
    {
      name: "All users",
      permission: "UserManagement",
      icon: <FaUserShield size={25} />,
      subRoutes: [
        {
          path: "/users-report",
          name: "User",
        },
        {
          path: "/astrologer",
          name: "Astrologer",
        },

        {
          path: "/astro-add",
          name: "Add Astrologer",
        },
      ],
    },
    {
      name: "Report",
      permission: "ReportManagement",
      icon: <FaUserShield size={25} />,
      subRoutes: [
        {
          path: "/Transaction-Management-list",
          name: "Transaction Report",
        },
        {
          path: "/chat-report",
          name: "Chat Report",
        },
        {
          path: "/invoice-report",
          name: "Invoice Report",
        },
      ],
    },
    {
      path: "/refund-list",
      name: "Refund",
      permission: "RefundManagement",
      icon: <GiPayMoney size={25} />,
    },
    {
      path: "/Session-list",
      name: "Session",
      permission: "SessionManagement",
      icon: <IoIosTime size={25} />,
    },
    // {
    //   path: "/Transaction-Management-list",
    //   name: "Transaction",
    //   permission: "Transaction",
    //   icon: <GrTransaction size={25} />,
    // },
    {
      path: "/Reason-Management-list",
      name: "Reason Management",
      permission: "ReasonManagement",
      icon: <SiReasonstudios size={25} />,
    },
    {
      path: "/Create-Notification",
      name: "Notification Management",
      permission: "NotificationManagement",
      icon: <IoIosNotifications size={25} />,
    },
  ]);


  let AstroAdminToken = localStorage.getItem("AstroAdminToken");

  const storedValue = localStorage.getItem("user_info");

  useEffect(() => {

    const userData = JSON.parse(storedValue);

    // Access the role property
    const userPermissions = userData?.role;
    const user_type = userData?.user_type;
    console.log({ user_type })
    if (user_type !== 'Admin') {
      const accessibleRoutes = AllRouterPermission?.filter((route) =>
        userPermissions?.includes(route.permission)
      );

      console.log({ userPermissions });

      setAllRouterPermission(accessibleRoutes)
    }

  }, [auth, storedValue])




  // const foundRoute = routesArray.filter(route => {
  //     if (route.subRoutes) {
  //         // const a = route.subRoutes.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
  //     } else {
  //         return route.name.toLowerCase().includes(search.toLowerCase())
  //     }
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { adminAuth } = useSelector((State) => State.admin)

  // const { roles } = useSelector((state) => state.role)
  // const { adminUser } = useSelector((state) => state.admin)
  // useEffect(() => {
  //     dispatch(GetRole())
  // }, [])
  const handleResize = () => {
    setIsOpen(window.innerWidth > 1250 ? true : false);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const handleLogout = () => {
    localStorage.removeItem("AstroAdminToken");
    localStorage.clear()

    window.location.reload();
  };

  const showLinkAnimation = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <>
      {storedValue ? (
        <>
          <div className="wrapper">
            {storedValue && <div className={isOpen ? "sideBar active mobile" : "sideBar"}>
              <div className="logo">
                {isOpen && <h1>LOGO</h1>}
                <div onClick={() => setIsOpen(!isOpen)}>
                  <FaBarsStaggered size={30} />
                </div>
              </div>

              {storedValue && <section className="routes">
                {AllRouterPermission?.map((route, i) => (
                  <React.Fragment key={i}>
                    {route.subRoutes ? (
                      <SubMenu
                        showLinkAnimation={showLinkAnimation}
                        isOpen={isOpen}
                        rotes={route}
                        setIsOpen={setIsOpen}
                      />
                    ) : (
                      // <div
                      //   className={`rotes ${isOpen ? "" : "close"}`}
                      //   onClick={() => navigate(route.path)}
                      // >
                      <NavLink
                        className={`rotes  link ${isOpen ? "" : "close"}`}
                        to={route.path}
                        key={i}
                        activeClassName="active"
                      >
                        <div className="icon">
                          {/* Use FontAwesomeIcon instead of plain icon */}
                          {route.icon}
                        </div>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              variants={showLinkAnimation}
                              initial="hidden"
                              animate="show"
                              exit="hidden"
                              className="rotesText"
                            >
                              {/* Use route.name instead of rotes.name */}
                              {route.name}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </NavLink>
                      // </div>
                    )}
                  </React.Fragment>
                ))}
              </section>}

              {/* <section className="routes">
                {routesArray.map((rotes, i) => (
                  <React.Fragment key={i}>
                    {rotes.subRoutes ? (
                      <SubMenu
                        showLinkAnimation={showLinkAnimation}
                        isOpen={isOpen}
                        rotes={rotes}
                        setIsOpen={setIsOpen}
                      />
                    ) : (
                      <>
                       
                        <div
                          className={isOpen ? "rotes " : "rotes close"}
                          onClick={() => navigate(rotes.path)}
                        >
                          <div className="icon">{rotes.icon} </div>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                variants={showLinkAnimation}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                                className="rotesText"
                              >
                                {rotes.name}{" "}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
             
                      </>
                    )}
                  </React.Fragment>
                ))}
              </section> */}
            </div>}
            <div className={isOpen ? "mobileBack" : ""} style={{}}></div>

            {storedValue && <div className="page" style={{ position: "relative" }}>
              <div className="pageTop">
                <div className="pageTopSearch" style={{ position: "relative" }}>
                  {/* <IoSearchOutline size={30} style={{ color: "var(--dark-active)" }} /> */}
                  {/* <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="" id="" placeholder='Search.......' /> */}
                  {/* <div className='searchResult' style={{ backgroundColor: "#f3f4f6", position: "absolute", top: "45px", left: "50px", width: "250px", borderRadius: "0px 0px 10px 10px", overflow: "hidden" }}>
                                    {foundRoute.map((e) => (
                                        <div style={{ borderBottom: "1px solid #a7a7a7", padding: "5px 10px", cursor: "pointer" }}>{e.name}</div>
                                    ))}
                                </div> */}
                </div>
                <div className="pageTopRight">
                  {/* <img width="40" height="40" src="https://img.icons8.com/color/48/india-circular.png" alt="india-circular" /> */}
                  {/* <BsFillMoonFill size={30} style={{ color: "var(--dark-active)", cursor: "pointer" }} /> */}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
              {storedValue && children}
            </div>}

          </div>
        </>
      ) : (
        <>
          <div className="wrapper login">
            <div className="loginForm">
              <div className="loginTop">Admin Panel</div>
              <div className="authLogin">
                <label htmlFor="name"> Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  id="name"
                  name="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="pass"> Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="pass"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(LoginAdminUser({ email: name, password })).then(
                    (e) => e.payload?.success && setAuth(e.payload.success)
                  );
                }}
                className="authButton btn"
              >
                Login
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
