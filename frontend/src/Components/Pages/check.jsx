import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'
import { checkDateRange } from './Profile/ProfileSideBar'
import { Month, Taro, UMonth, UWeek, UYear, Week, Year, myHoroscopy, userTaro } from '../../api/userLogInReducer'
import { Footer } from '../..'
import { NavBar } from '../Component/All'

function Blog() {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userLog)
  const [zodiac, setZodiac] = useState("")
  const [horoscope, setHoroscope] = useState({})
  const [taro, setTaro] = useState({})
  const [x, setX] = useState("Today")
  const [c, setc] = useState("")
  function isTimeGapMoreThan24Hours(date1) {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    if (!date1) return true
    const d1 = new Date(date1);
    const d2 = new Date();
    const timeDifference = Math.abs(d2.getTime() - d1.getTime());
    return timeDifference > ONE_DAY_IN_MS;
  }
  useEffect(() => {
    // !user?._id && navigate("/")
    // user?._id && setZodiac(checkDateRange(user.dob))
    setZodiac(checkDateRange(user.dob))
  }, [user])

  useEffect(() => {
    zodiac && dispatch(myHoroscopy({ sign: zodiac})).then((e) => setHoroscope(e.payload.data.prediction))
  }, [zodiac])

  useEffect(()=>{
    dispatch(myHoroscopy({ sign: zodiac })).then((e) => setHoroscope(e.payload.data.prediction))
  },[])


  useEffect(()=>{
    setZodiac(location.state)
  },[location.state])

  return (<>
    <NavBar />
    <div style={{ backgroundColor: "var(--bg-yellow)" }}>
      <div className='conta' style={{ maxWidth: "1200px", width: "95%", margin: "auto", display: "flex", gap: "20px", flexDirection: "column", alignItems: "center", padding: "20px 0px" }}>
        <div className='ajf' style={{ width: "100%", backgroundColor: "var(--bg-yellow)" }}>
          <h1 style={{ textAlign: "center", fontSize: "35px", color: "black", paddingBottom: "15px", textTransform: "uppercase" }}>{user.zodiac || zodiac}</h1>
          <div style={{ display: "flex", gap: "20px", width: "100%", paddingBottom: "20px" }}>
            <div onClick={() => {
              setX("Today")
              dispatch(myHoroscopy({ sign: zodiac })).then((e) => setHoroscope(e.payload.data.prediction))
            }} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Today</div>
            <div onClick={() => {
              setX("Week")
              dispatch(Week({ sign: zodiac|| 'Scorpio' })).then((e) => {
                setHoroscope(e.payload.data.weekly_horoscope)
              })
            }} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Week</div>
            <div onClick={() => {
              setX("Month")

              dispatch(Month({ sign: zodiac })).then((e) => {
                setHoroscope(e.payload.data.monthly_horoscope)
              })
            }} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Month</div>
            <div onClick={() => {
              setX("Year")
              dispatch(Year({ sign: zodiac })).then((e) => setHoroscope(e.payload.data.yearly_horoscope))
            }} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Year</div>
          </div>

          {
            x === "Today" ? <div style={{ width: "100%", padding: "20px", backgroundColor: "var(--white)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)" }}>
              <div style={{ margin: "auto", paddingBottom: "15px", textAlign: "center", fontWeight: "900", fontSize: "30px", textTransform: "capitalize" }}>
                {x} Horoscope
              </div>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Personal</h2>
              <p style={{ fontSize: "20px" }}>

                {horoscope?.personal}
              </p>

              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase", marginTop: "20px" }}>Health</h2>
              <p style={{ fontSize: "20px", }}>

                {horoscope?.health}
              </p>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Profession</h2>
              <p style={{ fontSize: "20px", }}>

                {horoscope?.profession}
              </p>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Emotions</h2>
              <p style={{ fontSize: "20px", }}>
                {horoscope?.emotions}
              </p>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Travel</h2>
              <p style={{ fontSize: "20px", }}>
                {horoscope?.travel}
              </p>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Luck</h2>
              <ul style={{ paddingLeft: "30px" }}>
                {
                  horoscope?.luck?.map((e) => (
                    <li key={e} style={{ fontSize: "20px", listStyle: "disc", }}>{e}</li>
                  ))
                }
              </ul>
            </div >
            
            
            : x === "Week" ?
              <div style={{ width: "100%", padding: "20px", backgroundColor: "var(--white)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)" }}>
                <div style={{ margin: "auto", paddingBottom: "15px", textAlign: "center", fontWeight: "900", fontSize: "30px", textTransform: "capitalize" }}>
                  {x} Horoscope
                </div>
                {(() => {
                  const a = new Date();
                  const b = new Date(user?.week);
                  // !user?.week || a > b
                  // this condition  free chat 
                  if (user?.week || a > b) {
                    return (<>
                      <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                        <h2 style={{ fontSize: "22px" }}>open weekly horoscope in just $8</h2>
                        <button style={{ background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }} onClick={(e) => {
                          e.preventDefault()
                          if (user?.balance >= 8) {
                            dispatch(UWeek({ id: user._id }))
                          }
                          else {
                            alert("Your Balance is low please recharge")
                            navigate(`/profile/${user._id}/wallet?p=addmoney`)
                          }
                        }}>Unlock</button>
                      </div>
                    </>)
                  } else {
                    return (
                      <>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Personal</h2>
                        <p style={{ fontSize: "20px" }}>

                          {horoscope?.personal}
                        </p>

                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase", marginTop: "20px" }}>Health</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.health}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Profession</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.profession}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Emotions</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.emotions}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Travel</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.travel}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Luck</h2>
                        <ul style={{ paddingLeft: "30px" }}>
                          {
                            horoscope?.luck?.map((e) => (
                              <li key={e} style={{ fontSize: "20px", listStyle: "disc", }}>{e}</li>
                            ))
                          }
                        </ul>
                      </>
                    );
                  }
                })()}

              </div >
              
              
              
              : x === "Month" ? <div style={{ width: "100%", padding: "20px", backgroundColor: "var(--white)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)" }}>
                <div style={{ margin: "auto", paddingBottom: "15px", textAlign: "center", fontWeight: "900", fontSize: "30px", textTransform: "capitalize" }}>
                  {x} Horoscope
                </div>
                {(() => {
                  const a = new Date();
                  // !user?.month || user.month === a.getMonth() + 1
                  // free chat 
                  if (user?.month || user.month === a.getMonth() + 1) {
                    return (<>
                      <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                        <h2 style={{ fontSize: "22px" }}>open Monthly horoscope in just $16</h2>
                        <button style={{ background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }} onClick={(e) => {
                          e.preventDefault()
                          if (user?.balance >= 16) {
                            dispatch(UMonth({ id: user._id }))
                          }
                          else {
                            alert("Your Balance is low please recharge")
                            navigate(`/profile/${user._id}/wallet?p=addmoney`)
                          }
                        }}>Unlock</button>
                      </div>
                    </>)
                  } else {
                    return (
                      <>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Personal</h2>
                        <p style={{ fontSize: "20px" }}>

                          {horoscope?.personal}
                        </p>

                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase", marginTop: "20px" }}>Health</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.health}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Profession</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.profession}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Emotions</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.emotions}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Travel</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.travel}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Luck</h2>
                        <ul style={{ paddingLeft: "30px" }}>
                          {
                            horoscope?.luck?.map((e) => (
                              <li key={e} style={{ fontSize: "20px", listStyle: "disc", }}>{e}</li>
                            ))
                          }
                        </ul>
                      </>
                    );
                  }
                })()}

              </div > : <div style={{ width: "100%", padding: "20px", backgroundColor: "var(--white)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)" }}>
                <div style={{ margin: "auto", paddingBottom: "15px", textAlign: "center", fontWeight: "900", fontSize: "30px", textTransform: "capitalize" }}>
                  {x} Horoscope
                </div>
                {(() => {
                  const a = new Date();
                  // !user?.year || user.year === a.getFullYear()
                  // free chat 
                  if (user?.year || user.year === a.getFullYear()) {
                    return (<>
                      <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "10px" }}>
                        <h2 style={{ fontSize: "22px" }}>open Yearly horoscope in just $27</h2>
                        <button style={{ background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }} onClick={(e) => {
                          e.preventDefault()
                          if (user?.balance >= 27) {
                            dispatch(UYear({ id: user._id }))
                          }
                          else {
                            alert("Your Balance is low please recharge")
                            navigate(`/profile/${user._id}/wallet?p=addmoney`)
                          }
                        }}>Unlock</button>
                      </div>
                    </>)
                  } else {
                    return (
                      <>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Personal</h2>
                        <p style={{ fontSize: "20px" }}>

                          {horoscope?.personal}
                        </p>

                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase", marginTop: "20px" }}>Health</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.health}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Profession</h2>
                        <p style={{ fontSize: "20px", }}>

                          {horoscope?.profession}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Emotions</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.emotions}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Travel</h2>
                        <p style={{ fontSize: "20px", }}>
                          {horoscope?.travel}
                        </p>
                        <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Luck</h2>
                        <ul style={{ paddingLeft: "30px" }}>
                          {
                            horoscope?.luck?.map((e) => (
                              <li key={e} style={{ fontSize: "20px", listStyle: "disc", }}>{e}</li>
                            ))
                          }
                        </ul>
                      </>
                    );
                  }
                })()}
              </div >
          }

          {/* <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Select your Tarot card</h2> */}
          {/* {
            !taro.card && isTimeGapMoreThan24Hours(user.taro) &&
            <div style={{ display: "flex", gap: "20px", width: "100%" }}>
              <div onClick={() => setc("love")} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Love</div>
              <div onClick={() => setc("finance")} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Finance</div>
              <div onClick={() => setc("carrer")} style={{ flex: "1", background: "var(--yellow)", borderRadius: "6px", cursor: "pointer", border: "2px solid black", textAlign: "center", color: "black", padding: "10px" }}>Career</div>
            </div>
          } */}

          {
            c && !taro.card && <>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "20px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>Get Tarot for {c}</h2>
              <div onClick={() => {
                dispatch(Taro()).then((e) => setTaro(e.payload.data))
                dispatch(userTaro({ id: user._id }))
              }} style={{ border: "2px solid black", padding: "6px 30px", color: "var(--bg-dark)", marginTop: "0px", marginBottom: "10px", fontSize: "20px", textTransform: "uppercase", borderRadius: "5px", cursor: "pointer" }}>Get</div>
            </>
          }
          {
            taro.card && <>
              <div style={{ height: "500px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <img src={taro.image} alt="" style={{ height: "100%" }} />
                <img src={taro.image2} alt="" style={{ height: "100%" }} />
              </div>
              <h2 className='staticHeading' style={{ color: "var(--bg-dark)", marginTop: "5px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>{taro.card}</h2>

              <div style={{ width: "100%", padding: "20px", backgroundColor: "var(--white)", borderRadius: "10px", boxShadow: "0px 0px 10px 0px rgba(128, 128, 128, .5)" }}>
                <h2 className='staticHeading' style={{ color: "var(--bg-dark)", textAlign: "center", marginTop: "0px", marginBottom: "10px", fontSize: "25px", textTransform: "uppercase" }}>{c}</h2>
                <p style={{ fontSize: "20px", textAlign: "center" }}>

                  {c === "career" ? taro.career : c === "love" ? taro.love : taro.finance}
                </p>
              </div>

            </>
          }
          {!isTimeGapMoreThan24Hours(user.taro) && <>
            <div>
              <div style={{ height: "70px", background: "var(--yellow)" }}>
              </div>
            </div>
          </>}
        </div >
      </div >
    </div>

    <Footer />
  </>

  )
}

export default Blog
