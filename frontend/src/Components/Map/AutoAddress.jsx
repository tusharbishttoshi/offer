import React, { useEffect } from "react";

export default function AutoAddress({ user, setUser }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCdkMLmt8vv54OmKcp4c174eK4t7J1Xgzk&libraries=places&v=weekly&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <>
      <div class="" id="pac-card">
        <div></div>
        <div className="row mb-6" id="pac-container p-0">
          <div className="col-lg-8 fv-row">
            <input
              type="text"
              name="bp"
              id="searchInput"
              autoComplete="off"
              //   className="form-control form-control-lg form-control-solid"
              placeholder="Birth Place"
              required
              onChange={(e) => setUser({ ...user, bp: e.target.value })}
            />
          </div>
        </div>
      </div>
      <div id="map" className="mb-5"></div>

      {/* <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Full Address</label>
                    <div className="col-lg-6">
                    <span id="location" class="form-control form-control-lg  form-control-solid mb-3 mb-lg-0"></span>
                    </div>
                </div> */}

      {/* <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Postal Code</label>
                    <div className="col-lg-6">
                    <span id="postal_code" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                   
                </div> */}
      {/* 
                
                <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Country</label>
                    <div className="col-lg-6">
                    <span id="country" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div>
                
                <div className="row mb-5" >
               
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Latitude</label>
                    <div className="col-lg-6">
                    <span id="lat" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div>
                <div className="row mb-5" >
                    <label className="col-lg-6 col-form-label  fw-semibold fs-6">Longitude</label>
                    <div className="col-lg-6">
                    <span id="lon" class="form-control form-control-lg col-lg-6 form-control-solid mb-3 mb-lg-0"></span>
                </div>
                </div> */}
    </>
  );
}
