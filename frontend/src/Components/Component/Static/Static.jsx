import React from 'react'
import Carousel from 'react-multi-carousel';

export const Testimonial = () => {


    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 600 },
            items: 2
        }, mobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        },

    }


    return (
        <>
            <div style={{ backgroundColor: "var(--bg-dark)", width: "100vw", display: "flex", flexDirection: "column", padding: "0px 0px 60px 0px", marginTop: "40px" }}>
                <h2 style={{ color: "var(--bg-yellow)", marginLeft: "20px", marginTop: "30px", fontSize: "40px", textAlign: "center", marginBottom: "60px" }}>
                    what our clients say </h2>
                <div className='container' style={{ width: "100%" }}>
                    <Carousel responsive={responsive}
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
                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>Absolutely amazed by the accuracy of the readings! The astrologer provided deep insights that resonated with my life. A truly gifted guide on my spiritual journey. Highly recommended!</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/five.jpg" style={{ height: "100%", width: "100%" }} alt="" />

                                </div>
                                <div style={{}}>Jackson Patel</div>

                            </div>
                        </div>





                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>Incredible astrological insights! The astrologer's wisdom brought clarity to my path. The personalized reading was spot-on. Grateful for the guidance and positive energy. Thank you</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/one.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />

                                </div>
                                <div style={{}}>Emma Gonzalez</div>

                            </div>





                        </div>
                        
                        
                        
                        
                        
                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>A transformative experience! The astrologer's compassionate approach and detailed analysis made me feel understood. The reading was insightful and empowering. I trust their expertise for future guidance.</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/two.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />
                                </div>
                                <div style={{}}>Harper Davis</div>

                            </div>
                        </div>
                        
                        
                        
                        
                        
                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>Exceptional service! The astrologer's attention to detail and professionalism exceeded my expectations. The reading was not only accurate but also delivered with a caring touch. Truly gifted!</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/three.jpg" style={{ height: "100%", width: "100%" }} alt="" />

                                </div>
                                <div style={{}}>Ethan Adams</div>

                            </div>
                        </div>
                        
                        
                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>Enlightening and accurate readings! The astrologer's deep understanding of astrology brought a new perspective to my life. A trustworthy guide for anyone seeking cosmic wisdom. Thank you for the enlightenment!</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/fore.jpg" style={{ height: "100%", width: "100%" }} alt="" />

                                </div>
                                <div style={{}}>Daniel Perez</div>

                            </div>
                        </div>
                        <div style={{ padding: "0 10px", height: "100%" }}>
                            <div style={{ backgroundColor: "var(--bg-yellow) ", minHeight: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", borderRadius: "10px", width: "100%", height: "100%" }}>
                                {/* <TbZodiacAquarius size={40} color='var(--bg-dark)' /> */}
                                <div style={{ textAlign: "center" }}>An astrologer with profound insight! The reading provided a roadmap for my personal and spiritual growth. The astrologer's wisdom and warmth create a truly transformative experience. Grateful for the guidance!</div>
                                <div style={{ height: "60px", aspectRatio: "1", borderRadius: "50%", backgroundColor: "red", marginTop: "10px", overflow: "hidden" }}>
                                    <img src="/six.jpg" style={{ height: "100%", width: "100%", objectFit: "cover" }} alt="" />

                                </div>
                                <div style={{}}>Madison Evans </div>

                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export const Services = () => {
    return (
        <>
            <div style={{ width: "100vw", paddingBottom: "50px" }}>
                <div className='container'>
                    <h2 className='astroListHeading' >
                        Explore top psychic reading topics
                    </h2>
                    <p className='astroListSubHeading' >Dive into the Mysteries: Discover Your Psychic Path</p>
                    <div className='tem' style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 30%))", width: "100%", gridColumnGap: "20px", gridRowGap: "30px", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px", }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/love.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>love</p>
                                <p style={{ marginTop: "5px" }}>Discover compatibility, soulmate connections, and love's celestial secrets. Our Psychic Masters guide you on your romantic journey.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/taro.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>medium</p>
                                <p style={{ marginTop: "5px" }}> Discover guidance, healing, and the possibility of communicating with departed loved ones. Explore the mysteries of mediumship and the unseen world.</p>
                            </div>
                        </div> <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/tarot.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Tarot</p>
                                <p style={{ marginTop: "5px" }}> Explore the ancient art of Tarot card reading, a practice that uses a deck of special cards to gain insights into the past, present, and future. Tarot readings can offer guidance and reflection on various aspects of life.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/wedding.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Fortune</p>
                                <p style={{ marginTop: "5px" }}> Delve into the mysteries of fortune-telling, where practitioners use various methods, such as divination tools or intuitive abilities, to provide insights into future events. Discover your potential paths and receive guidance on making informed decisions.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/hourglass.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Past Time</p>
                                <p style={{ marginTop: "5px" }}>Journey into the exploration of past events and experiences. Past time practices may include past life regression, historical analysis, or other methods aimed at understanding the impact of the past on the present.</p>
                            </div>
                        </div><div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/pentagram.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Astrology</p>
                                <p style={{ marginTop: "5px" }}> Unlock the celestial secrets of astrology, a discipline that studies the positions and movements of celestial bodies to interpret their influence on human affairs and natural events.</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/telepathy.png" alt="" style={{ height: "100%", width: "100%", backgroundBlendMode: "darken" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Dream Analysis</p>
                                <p style={{ marginTop: "5px" }}> Dive into dream analysis, decoding the subconscious language of nightly visions. Uncover hidden messages, gaining insights to navigate waking life with newfound awareness. Explore your mind's landscapes.</p>
                            </div>
                        </div><div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/user.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Mind Reading</p>
                                <p style={{ marginTop: "5px" }}> Embark on the intriguing journey of mind reading, unlocking the mysteries of thoughts and emotions. Explore the art of understanding minds, fostering connection, and gaining insights into the human experience.</p>
                            </div>
                        </div><div style={{ display: "flex", alignItems: "flex-start", gap: "20px", backgroundColor: "var(--yellow)", padding: "20px 20px", borderRadius: "10px" }}>
                            <div style={{ background: "var(--dark)", height: "50px", width: "50px !important", padding: "5px", borderRadius: "4px", aspectRatio: "1", cursor: "pointer" }}>
                                <img src="/img/numerology.png" alt="" style={{ height: "100%", width: "100%" }} />
                            </div>
                            <div style={{ width: "100%" }}>
                                <p style={{ fontSize: "25px", textTransform: "uppercase", fontWeight: "700" }}>Numerology</p>
                                <p style={{ marginTop: "5px" }}> Explore the captivating world of numerology, unraveling the secrets held in numbers. Gain insights into your life path, personality, and destiny. Decode the language of numbers and discover hidden meanings.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

