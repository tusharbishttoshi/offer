import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomLoader from "../Componets/CustomLoader";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import WalletManagement from "../Wallet/WalletManagement";
import ChatManagementList from "../ChatManagement/ChatManagementList";
import RefundListManagement from "../RefundListManagement";
import UserReacharge from "../UserReacharge/UserReacharge";

export default function UserManagement() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [Detail, setDetail] = useState(null);
  const [Loader, setLoader] = useState(true);
  const UserDetail = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/user/list`, {
        id: _id,
      });
      let Data = response?.data?.list[0];
      console.log("data", response?.data);

      if (response?.data?.success) {
        setDetail(Data);

        setLoader(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    UserDetail();
  }, []);

  return (
    <section>
      <div className="container py-5">
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>User Profile</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">User Management</li>
                <li className="breadcrumb-item active">User Profile</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="#" className="text-white" onClick={() => navigate(-1)}>
              <button type="button" className="btn text-white btn-dark">
                Back
              </button>
            </Link>
          </div>
        </div>

        {Loader ? (
          <CustomLoader Loder={Loader} />
        ) : (
          <div className="row">
            <div className="col-lg-4 rounded">
              <div className="card  bg-white mb-4">
                <div className="card-body text-center">
                  <img
                    src={Detail?.avatar?.url || "assets/profile.png"}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px", height: "150px" }}
                  />
                  <h5 className="my-3">{Detail?.name}</h5>
                  <p className="text-muted mb-1"> ID: {Detail?.id}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn p-0">
                      Balance ${" "}
                      <span
                        style={{
                          color: Detail?.balance >= 0 ? "#4fc9da" : "#f06445",
                        }}
                      >
                        {" "}
                        {Detail?.balance?.toFixed(2)}
                      </span>
                    </button>
                    <button type="button" className="btn p-0 ms-1">
                      {" "}
                      Bonus ${" "}
                      <span
                        style={{
                          color: Detail?.bonus >= 0 ? "#4fc9da" : "#f06445",
                        }}
                      >
                        {" "}
                        {Detail?.bonus?.toFixed(2)}
                      </span>
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="mb-0">Total Order</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted mb-0">
                        { 0}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="mb-0">Total Spend</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted mb-0">
                        {(Detail?.counting?.total) || 0}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-6">
                      <p className="mb-0">Total Minutes</p>
                    </div>
                    <div className="col-sm-6">
                      <p className="text-muted mb-0">
                        {(Detail?.counting?.time)/60|| 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 rounded">
              <div className="card bg-white  mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.name || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.email || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.number || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Date Of Birth</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.dob || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0"> Birth Time</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.bt || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0"> Birth Place</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.bp || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Zodiac</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.zodiac || "Not Provided"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Country</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {Detail?.country || "Not Provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-12 rounded card ">
              <Tabs>
                <TabList>
                  <Tab>Wallet Recharge</Tab>
                  <Tab>Chats History</Tab>
                  <Tab>Refund</Tab>
                </TabList>

                <TabPanel>
                  <h2>
                    <UserReacharge  user={_id}  />
                  </h2>
                </TabPanel>
                <TabPanel>
                  <h2>
                    <ChatManagementList user={_id} />
                  </h2>
                </TabPanel>
                <TabPanel>
                  <h2>
                    <RefundListManagement user={_id} />
                  </h2>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
