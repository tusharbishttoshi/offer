import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";

function SubMenu({ isOpen, showLinkAnimation, rotes, setIsOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const MenuAnimation = {
    hidden: {
      height: 0,
      opacity: 0,
      padding: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.2,
        when: "beforChildren",
      },
    },
  };
  const MenuItemAnimation = {
    hidden: (i) => ({
      padding: 0,
      x: "-100%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
    show: (i) => ({
      x: "0%",
      transition: {
        duration: (i + 1) * 0.1,
      },
    }),
  };
  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);
  return (
    <>
      <div className={isOpen ? "rotes subRotes " : "rotes subRotes close"}>
        <div
          className="rotesItem"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setIsOpen(true);
          }}
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
          {isOpen && (
            <motion.div
              className="rotesIcon"
              animate={isMenuOpen ? { rotate: 0 } : { rotate: -90 }}
            >
              <FaAngleDown size={20} />
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={MenuAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="subRote"
            >
              {/* {rotes.subRoutes.map((subRote, i) => (
                        <React.Fragment key={i}>
                            <motion.div
                                variants={MenuItemAnimation}
                                custom={i}
                                initial="hidden"
                                animate="show"
                                exit="hidden"
                            >

                                <div onClick={() => navigate(subRote.path)}>
                                    <div className="icon" style={{ color: "white" }}>{subRote.icon} </div>
                                    <AnimatePresence>
                                        {isOpen && <motion.div
                                            variants={showLinkAnimation}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                            className='link_Text'>{subRote.name} </motion.div>}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </React.Fragment>
                    ))} */}

              {rotes.subRoutes.map((subRote, i) => (
                <motion.div variants={MenuItemAnimation} key={i} custom={i}>
                  <NavLink to={subRote.path} className="">
                    <div className="icon">{subRote.icon}</div>
                    <motion.div className="link_text">
                      {subRote.name}
                    </motion.div>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default SubMenu;
