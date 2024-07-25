import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function WalletManagement() {
  const navigate = useNavigate();
  const [WalletData, setWalletData] = useState(null);
  const [Loader, setLoader] = useState(true);
  let id = localStorage.getItem("AstroAdminID");
  const AllWalletListApi = async () => {
    setLoader(true);
    try {
      const response = await axios.post(`/api/v1/admin-profile`, { id });
      let Data = response?.data?.adminUsers;
      console.log(response?.data?.success);
      if (response?.data?.success) {
        setWalletData(Data);

        setLoader(false);
      }
    } catch (err) {}
  };

  useEffect(() => {
    AllWalletListApi();
  }, []);

  return (
    <div className="container p-2">
      <div className="row  m-2">
        <div className="col-md-10">
          <div className="page-title-box">
            <h4>Wallet Management</h4>
            <ol className="breadcrumb m-0">
              {/* <li className="breadcrumb-item active">Wallet Management</li> */}
            </ol>
          </div>
        </div>
        <div className="col-md-2 text-end">
          <Link to="#"  className="text-white" onClick={() => navigate(-1)}>
            <button
              type="button"
              className="btn btn-dark  text-white"
            >
              Back
            </button>
          </Link>
        </div>
      </div>

      <div className="card bg-white mb-5 mb-xxl-8">
        <div className="card-body pt-9 pb-0">
          {/*begin::Details*/}
          <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
            {/*begin: Pic*/}
            <div className="me-7 mb-4">
              <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                <img src={"assets/profile.png"} alt="image" />
               
              </div>
            </div>
            {/*end::Pic*/}
            {/*begin::Info*/}
            <div className="flex-grow-1">
              {/*begin::Title*/}
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                {/*begin::User*/}
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <a
                      href="#"
                      className="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                    >
                      {WalletData?.name}
                    </a>
                    <a href="#">
                      <i className="ki-duotone ki-verify fs-1 text-primary">
                        <span className="path1" />
                        <span className="path2" />
                      </i>
                    </a>
                  </div>

                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone fad fa-user ki-address-book fs-4 me-1">
                        <span className="path1" />
                        <span className="path2" />
                        <span className="path3" />
                      </i>{" "}
                      Admin
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary me-5 mb-2"
                    >
                      <i className="ki-duotone  fad fa-mobile-alt ki-sms fs-4 me-1">
                        <span className="path1" />
                        <span className="path2" />
                      </i>{" "}
                      {WalletData?.number}
                    </a>
                    <a
                      href="#"
                      className="d-flex align-items-center text-gray-500 text-hover-primary mb-2"
                    >
                      <i className="ki-duotone fad fa-envelope ki-sms fs-4 me-1">
                        <span className="path1" />
                        <span className="path2" />
                      </i>{" "}
                      {WalletData?.email}
                    </a>
                  </div>
                </div>
              </div>
              {/*end::Title*/}
              {/*begin::Stats*/}
              <div className="d-flex flex-wrap justify-content-between">
                {/*begin::Info*/}
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div onClick={()=>navigate('/Transaction-Management-list')} className="border border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div
                        className="fs-1 fw-bold counted"
                        data-kt-countup="true"
                        data-kt-countup-value="6,840"
                        data-kt-countup-prefix="$"
                        data-kt-initialized={1}
                      >
                        ${parseFloat(WalletData?.balance?.toFixed(2))}
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Total Earnings
                      </div>
                    </div>
                    
                    <div className="border border-dashed rounded min-w-125px py-2 px-4 me-6 mb-3">
                      <div
                        className="fs-1 fw-bold counted"
                        data-kt-countup="true"
                        data-kt-countup-value={WalletData?.totalIncome}
                        data-kt-initialized={1}
                      >
                      ${WalletData?.totalIncome}
                      </div>
                       <div className="fw-semibold fs-6 text-gray-500">
                        Total TurnOver
                      </div> 
                    </div>

                    {/* <div className="border border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div
                        className="fs-1 fw-bold counted"
                        data-kt-countup="true"
                        data-kt-countup-value={WalletData?.user_count}
                        data-kt-initialized={1}
                      >
                        {WalletData?.user_count}
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Total User
                      </div>
                    </div> */}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="separator" />
        </div>
      </div>
    </div>
  );
}
