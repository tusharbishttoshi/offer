import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCalendarAlt } from "react-icons/bi";
import { FaFilter } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import {
  FcAreaChart,
  FcComboChart,
  FcDoughnutChart,
  FcLineChart,
  FcPieChart,
  FcMoneyTransfer,
} from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { TbRecharging } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers } from "../api/User";
import axios from "axios";
import Chart from "react-apexcharts";
import CustomLoader from "./Componets/CustomLoader";
function Dashboard() {
  const navigate = useNavigate();
  const [total_user, settotal_user] = useState([]);
  const [Month, setMonth] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [DashboarInfo, setDashboarInfo] = useState(null);
  const [frequency, setfrequency] = useState("daily");
  let id = localStorage.getItem("AstroAdminID");

  const { users } = useSelector((state) => state.userReducer);
  const a = useRef();
  const b = useRef();
  const chartDiv = useRef();
  const [chartHeight, setChartHeight] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setChartHeight(chartDiv.current.offsetHeight);
  }, [chartDiv]);
  useEffect(() => {
    dispatch(GetUsers());
    GraphDataApi();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setChartHeight(chartDiv.current.offsetHeight);
      window.innerWidth < 900 && console.log(b.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const GraphDataApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/user/graph`, {
        frequency,
      });
      let Data = response?.data?.response;
      let AllDashboardData = response?.data;

      if (response?.data?.success) {

        setDashboarInfo(AllDashboardData);
        let user = Data?.map((item) => item?.total_user);
        let UserregisterData = Data?.map((item) => item?.id);

        settotal_user(user);
        setMonth(UserregisterData);
        setLoader(false);
      }
    } catch (err) { }
  };

  useEffect(() => {
    GraphDataApi();
  }, [frequency]);

  return (
    <div ref={b} className="dashboard" style={{ flex: "1" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.5rem" }}>Home Dashboard </p>

        {/* <div style={{ display: "flex", gap: "20px" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              background: "var(--white)",
              padding: "10px 20px",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)",
              gap: "10px",
              fontWeight: "500",
            }}
          >
            <BiCalendarAlt size={25} />
            Monthly
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              outline: "none",
              background: "var(--white)",
              padding: "10px 20px",
              borderRadius: "5px",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, .5)",
              gap: "10px",
              fontWeight: "500",
            }}
          >
            <FaFilter size={25} />
            Select Date
          </button>
        </div> */}
      </div>

      <div
        style={{
          background: "white",
          margin: "20px",
          padding: "30px 20px",
          marginTop: "0px",
          display: "grid",
          gridGap: "40px",
          gridTemplateColumns: "repeat(auto-fit, minmax(27%, 1fr))",
          justifyContent: "center",
        }}
      >



        <div
          className="Dash-box"
          onClick={() => navigate("/users-report")}
          style={{
            backgroundColor: "#ccccff",
          }}
        >
          <FaUsers size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Users</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {/* {users.length} */}
              {DashboarInfo?.user}
            </p>
          </div>
        </div>

        <div
          onClick={() => navigate("/astrologer")}
          className="Dash-box"
          style={{
            backgroundColor: "#ffccfa",
          }}
        >
          <FcComboChart size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Astrologer</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {DashboarInfo?.astro}
            </p>
          </div>
        </div>

        <div
          className="Dash-box"
          style={{
            backgroundColor: "#ffccd7",
          }}
        >
          <TbRecharging size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Total Recharge</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {DashboarInfo?.recharge}
            </p>
          </div>
        </div> 
        <div
          onClick={() => navigate("/Wallet-Management")}
          className="Dash-box"
          style={{
            backgroundColor: "#ffccfa",
          }}
        >
          <RiMoneyDollarBoxFill size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Total Earning</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {DashboarInfo?.earning}
            </p>
          </div>
        </div>
   
           <div
          onClick={() => navigate("/chat-report")}
          className="Dash-box"
          style={{
            backgroundColor: "#fff4cc",
          }}
        >
          <AiFillMessage size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Total Chats</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {DashboarInfo?.chat}
            </p>
          </div>
        </div>
          <div
          onClick={() => navigate("/refund-list")}
          className="Dash-box"
          style={{
            backgroundColor: "#ffccfa",
          }}
        >
          <FaMoneyBillTransfer size={50} />
          <div>
            <p style={{ fontSize: "1.2rem" }}>Total Refunds</p>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "600",
                textTransform: "uppercase",
              }}
            >
              {DashboarInfo?.refund}
            </p>
          </div>
        </div>
      </div>

      <div
        ref={a}
        style={{ margin: "20px", padding: "30px 20px", marginTop: "0px" }}
      >
        <div
          ref={chartDiv}
          style={{
            background: "var(--white)",
            position: "relative",
            width: "100%",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
            aspectRatio: "16 / 6 ",
          }}
        >
          {/* <div
            className="chartTitle"
            style={{
              fontWeight: "600",
              fontSize: "1.2rem",
              position: "relative",
              top: "10px",
              left: "15px",
            }}
          >
            User Report
          </div> */}

          <div className="d-flex align-items-center justify-content-between my-3">
            <div className="page-title-box">
              <h4> Transaction Graph</h4>
            </div>

            <div className="w-25">
              {/* <label htmlFor="pageSize">Select </label> */}
              <select
                id="pageSize"
                onChange={(e) => setfrequency(e.target.value)}
                className="form-select"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Month</option>
                {/* <option value="weekly">Week</option> */}
                <option value="yearly">Year</option>
              </select>
            </div>
          </div>

          {/* <Barchart chartHeight={chartHeight} data={users} /> */}

          {Loader ? (
            <CustomLoader Loder={Loader} />
          ) : (
            <Chart
              type="bar"
              width={"100%"}
              height={400}
              series={[
                {
                  name: "User",
                  //   data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                  data: total_user,
                },
              ]}
              options={{
                plotOptions: {
                  bar: {
                    borderRadius: 5,
                    columnWidth: 40,
                    startingShape: "flat",
                    endingShape: "rounded",
                    dataLabels: {
                      position: "top",
                    },
                  },
                },

                title: {
                  //   text: "BarChar Developed by DevOps Team",
                  //   style: { fontSize: 30 },
                },

                subtitle: {
                  //   text: "This is BarChart Graph",
                  //   style: { fontSize: 18 },
                },

                colors: ["#3c7f8c"],
                theme: { mode: "light" },

                xaxis: {
                  tickPlacement: "on",
                  categories: Month,
                  //   categories: ["mon", "tru", 'web', "true", 'fri', 'stu', "sun"],
                },

                yaxis: {
                  labels: {
                    formatter: (val) => {
                      return `${val}`;
                    },
                    style: { fontSize: "15", colors: ["#3c7f8c"] },
                  },
                  title: {
                    // text: "User In (K)",
                    // style: { color: "#f90000", fontSize: 15 },
                  },
                },

                legend: {
                  show: true,
                  position: "right",
                },

                dataLabels: {
                  formatter: (val) => {
                    return `${val.toFixed(2)}`;
                  },
                  style: {
                    colors: ["white"],
                    fontSize: 10,
                    position: "top",
                  },
                },
              }}
            ></Chart>
          )}
        </div>

        {/* <div style={{ background: "var(--white)", position: "relative", width: `${chartDiv.current?.offsetWidth / 4}px`,aspectRatio:"1", padding: "30px", borderRadius: "10px", boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)" }}>
                    <RadialBarChart
                        width={450}
                        height={550}
                        innerRadius="50%"
                        outerRadius="100%"
                        data={data}
                        startAngle={360}
                        endAngle={5}
                        barGap={20}
                    >
                        <RadialBar minAngle={100} label={{ fill: '#66', position: 'insideStart' }} background clockWise={true} dataKey='data1' />
                        <Legend iconSize={10} width={70} height={10} layout='horizontal' verticalAlign='middle' align="right" />
                        <Tooltip />
                    </RadialBarChart>
                </div> */}
        {/* <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ffccfa", padding: "6px 15px", borderRadius: "6px" }}>
                    <FcComboChart size={50} />
                    <div>
                        <p style={{ fontSize: "1.2rem" }}>Users</p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "uppercase" }}>2734824+</p>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ffccd7", padding: "6px 15px", borderRadius: "6px" }}>
                    <FcDoughnutChart size={50} />
                    <div>
                        <p style={{ fontSize: "1.2rem" }}>Users</p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "uppercase" }}>2734824+</p>
                    </div>
                </div> <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ccffdd", padding: "6px 15px", borderRadius: "6px" }}>
                    <FcLineChart size={50} />
                    <div>
                        <p style={{ fontSize: "1.2rem" }}>Users</p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "uppercase" }}>2734824+</p>
                    </div>
                </div> <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#fff4cc", padding: "6px 15px", borderRadius: "6px" }}>
                    <FcPieChart size={50} />
                    <div>
                        <p style={{ fontSize: "1.2rem" }}>Users</p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "uppercase" }}>2734824+</p>
                    </div>
                </div> <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#ffd8cc", padding: "6px 15px", borderRadius: "6px" }}>
                    <FcAreaChart size={50} />
                    <div>
                        <p style={{ fontSize: "1.2rem" }}>Users</p>
                        <p style={{ fontSize: "1.2rem", fontWeight: "600", textTransform: "uppercase" }}>2734824+</p>
                    </div>
                </div> */}
      </div>
    </div>
  );
}
const Barchart = ({ chartHeight, data }) => {
  const month = [
    { label: "Jan" },
    { label: "Feb" },
    { label: "Mar" },
    { label: "Apr" },
    { label: "May" },
    { label: "Jun" },
    { label: "Jul" },
    { label: "Aug" },
    { label: "Sep" },
    { label: "Oct" },
    { label: "Nov" },
    { label: "Dec" },
  ];
  const [datac, setDatac] = useState([]);
  const [year, setYear] = useState(2023);
  useEffect(() => {
    setDatac(
      month.map((e, i) => {
        const obj = {
          label: e.label,
          user: data.filter((j) => {
            const d = new Date(j.createdAt);
            if (d.getMonth() === i && d.getFullYear() === year) {
              return j;
            }
          }).length,
        };
        return obj;
      })
    );
  }, [data]);

  return (
    <>
      <ResponsiveContainer
        height={chartHeight - 60}
        style={{ position: "absolute", left: "-20px", bottom: "0px" }}
      >
        <BarChart data={datac}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar dataKey="user" fill="#476bfa" />
          <Legend
            verticalAlign="top"
            height={36}
            align="right"
            iconType="circle"
          />
          <Bar dataKey="data2" fill="#0be7fb" />
          {/* 
                    <Tooltip />
                    <Bar dataKey="data3" fill="#fa916b" /> */}
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
export default Dashboard;
