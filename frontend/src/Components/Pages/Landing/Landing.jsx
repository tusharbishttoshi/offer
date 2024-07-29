import React from 'react'
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import "./a.css"
function Landing() {
    const navigate = useNavigate()
    return (
        <div className={styles.wrapper} >
            <div className="opening hide-UI view-2D zoom-large data-close controls-close">
                <div id="universe" className="scale-stretched">
                    <div id="galaxy">
                        <div id="solar-system" className="earth">
                            <div id="mercury" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Mercury</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="venus" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Venus</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="earth" className="orbit">
                                <div className="pos">
                                    <div className="orbit">
                                        <div className="pos">
                                            <div className="moon"></div>
                                        </div>
                                    </div>
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Earth</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="mars" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Mars</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="jupiter" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Jupiter</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="saturn" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <div className="ring"></div>
                                        <dl className="infos">
                                            <dt>Saturn</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="uranus" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Uranus</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="neptune" className="orbit">
                                <div className="pos">
                                    <div className="planet">
                                        <dl className="infos">
                                            <dt>Neptune</dt>
                                            <dd><span></span></dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div id="sun">
                                <dl className="infos">
                                    <dt>Sun</dt>
                                    <dd><span></span></dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.logo}>
                <img src="/icon.png" alt="" onClick={() => navigate("/")} />
            </div>
            <div className={styles.main}>

                <div style={{ flex: "1", marginLeft: "50px", display:"flex",justifyContent:"center" }}>
                    <div className={styles.textarea2}>
                        <h2>What you will get </h2>
                        <ul>
                            <li>get 7.5$ on registration.</li>
                            <li>daily free horoscope.</li>
                            <li>receive accurate and personalized guidance.</li>
                        </ul>
                    </div>

                </div>
                <div style={{ flex: "1", marginLeft: "50px" }}>
                    <div className={styles.textarea}>
                        <h2>Get Clarity in your future with our Psychic Masters </h2>
                        <h3>How can our Psychic Masters help you?</h3>
                        <div onClick={() => navigate("/auth?sign-up=true")} style={{ width: "60%", marginTop: "10px", background: "var(--yellow)", padding: "5px 20px", borderRadius: "20px" }}>
                            <p style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Find about your ex<FaArrowRight /></p>
                        </div>
                        <div onClick={() => navigate("/auth?sign-up=true")} style={{ width: "60%", marginTop: "10px", background: "var(--yellow)", padding: "5px 20px", borderRadius: "20px" }}>
                            <p style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Give advise for your Love life<FaArrowRight /></p>
                        </div>
                        <div onClick={() => navigate("/auth?sign-up=true")} style={{ width: "60%", marginTop: "10px", background: "var(--yellow)", padding: "5px 20px", borderRadius: "20px" }}>
                            <p style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>Give guidance on your future<FaArrowRight /></p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Landing
