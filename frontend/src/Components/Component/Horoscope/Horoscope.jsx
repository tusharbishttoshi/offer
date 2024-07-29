import React, { useEffect, useState } from "react";
import styles from "./Horoscope.module.css";
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
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Horoscopy } from "../../../api/userLogInReducer";
function Horoscope() {
  const [horoscope, setHoroscope] = useState({});
  const [zodiac, setZodiac] = useState("Aries");
  const dispatch = useDispatch();
  useEffect(() => {
    zodiac &&
      dispatch(Horoscopy({ sign: zodiac })).then((e) => {
        e.payload?.success && setHoroscope(e.payload?.data?.prediction);
      });
  }, [zodiac]);
  const navigate = useNavigate();
  return (
    <div className={styles.horoscope}>
      <div className={styles.main}>
        <div>
          <h2>Choose Your sun sign</h2>
          <div className="as-line">

</div>

        </div>
        <div className={styles.zodiac}>
          <div>
            <ul className={styles.left}>
              <li className={styles.sunSing} onClick={() => setZodiac("Aries")}>
                <div className={styles.sing}>
                  <GiAries color="white" />
                </div>
                <div className={styles.singName}>Aries</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Taurus")}
              >
                <div className={styles.sing}>
                  <GiTaurus color="white" />
                </div>
                <div className={styles.singName}>Taurus</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Gemini")}
              >
                <div className={styles.sing}>
                  <GiGemini color="white" />
                </div>
                <div className={styles.singName}>Gemini</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Cancer")}
              >
                <div className={styles.sing}>
                  <GiCancer color="white" />
                </div>
                <div className={styles.singName}>Cancer</div>
              </li>
              <li className={styles.sunSing} onClick={() => setZodiac("Leo")}>
                <div className={styles.sing}>
                  <GiLeo color="white" />
                </div>
                <div className={styles.singName}>Leo</div>
              </li>
              <li className={styles.sunSing} onClick={() => setZodiac("Virgo")}>
                <div className={styles.sing}>
                  <GiVirgo color="white" />
                </div>
                <div className={styles.singName}>Virgo</div>
              </li>
            </ul>
          </div>
          <div className={styles.image}>
            <img src="/zodiac.png" alt="" />
          </div>
          <div>
            <ul className={styles.right}>
              <li className={styles.sunSing} onClick={() => setZodiac("Libra")}>
                <div className={styles.sing}>
                  <GiLibra color="white" />
                </div>
                <div className={styles.singName}>Libra</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Scorpio")}
              >
                <div className={styles.sing}>
                  <GiScorpio color="white" />
                </div>
                <div className={styles.singName}>Scorpio</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Sagittarius")}
              >
                <div className={styles.sing}>
                  <GiSagittarius color="white" />
                </div>
                <div className={styles.singName}>Sagittarius</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Capricorn")}
              >
                <div className={styles.sing}>
                  <GiCapricorn color="white" />
                </div>
                <div className={styles.singName}>Capricorn</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Aquarius")}
              >
                <div className={styles.sing}>
                  <GiAquarius color="white" />
                </div>
                <div className={styles.singName}>Aquarius</div>
              </li>
              <li
                className={styles.sunSing}
                onClick={() => setZodiac("Pisces")}
              >
                <div className={styles.sing}>
                  <GiPisces color="white" />
                </div>
                <div className={styles.singName}>Pisces</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <div>
          <h2>Today's {zodiac} Horoscope</h2>
        </div>
        <div
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "var(--white)",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)",
          }}
        >
          <h3
            className="staticHeading"
            style={{
              color: "var(--bg-dark)",
              textAlign: "center",
              marginTop: "0px",
              marginBottom: "10px",
              fontSize: "25px",
              textTransform: "uppercase",
            }}
          >
            Personal
          </h3>
          <p style={{ fontSize: "20px", textAlign: "center" }}>
            {horoscope.personal}
          </p>
        </div>
        <div
          // onClick={() => navigate("/auth?login=true")}
          onClick={() =>   navigate("/horoscopy",{state:zodiac})}
        
          style={{
            display: "flex",
            boxShadow: "0px 0px 4px rgba(128, 128, 128, 0.5)",
            overflow: "hidden",
            gap: "10px",
            background: "white",
            width: "22rem",
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
              Read More
            </span>
          </p>
          <div
            style={{
              cursor: "pointer",
              height: "100%",
              aspectRatio: "1",
              borderRadius: "50%",
              backgroundColor: "var(--yellow)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "500",
            }}
          >
            <FaArrowRight size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Horoscope;
