import React from "react";
import { useNavigate } from "react-router-dom";

function Salary() {
  const navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div
          className={`styles.wrapper p-3`}
          // className="container"
          style={{ height: "calc(100vh - 55px)" }}
        >
          <div
            className="chatsdjs"
            style={{ height: "100%", flex: "1", width: "95%", margin: "auto" }}
          >
            <div className="row mx-1">
              <div className="col-md-10">
                <div className="page-title-box my-3">
                  <h4> Transaction Management</h4>
{/* 
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item active">
                      Transaction Management
                    </li>
                    <li className="breadcrumb-item">Transaction List</li>
                  </ol> */}
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-success"
                >
                  Back
                </button>
              </div>
            </div>

            <div
              id="workflow"
              style={{
                background: "var(--white)",
                marginTop: "20px",
                flexWrap: "wrap",
                padding: "0px 20px",
                gap: "2%",
                display: "flex",
                height: "auto",
              }}
            >
              <div
                onClick={() => navigate("/Transition")}
                style={{
                  cursor: "pointer",
                  flex: "1",
                  minWidth: "200px",
                  background: "#f9b0b0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                  borderRadius: "10px",
                  maxWidth: "400px",
                }}
              >
                Transition
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Salary;
