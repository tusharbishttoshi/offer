import React, { useEffect, useState } from "react";
import BlogHeader from "./BlogHeader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomLoder from "../../Component/CustomLoder";
import Navbar from "../../Component/Navbar/Navbar";
import moment from "moment";
import { Helmet } from "react-helmet";
export default function AllBlogList() {
  const navigate = useNavigate();
  const [CategoryData, setCategoryData] = useState([]);
  const [blogData, setblogData] = useState([]);
  const [Loder, setLoder] = useState(true);

  const AllCategoryData = () => {
    axios
      .get(`/api/v1/category`)
      .then((response) => {
        let data = response.data;
        if (response.status) {
          if (data.status) {
            console.log({ data });
            setLoder(false);
            let CategoryDataForMap = data?.categories?.map((item) => ({
              value: item._id,
              label: item.category,
            }));

            console.log({ CategoryDataForMap });
            setCategoryData(CategoryDataForMap);
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AllBlogData = () => {
    axios
      .get(`/api/v1/blog`)
      .then((response) => {
        let data = response.data;
        let blogs = data?.blogs;

        if (response.status) {
          if (data.status) {
            console.log({ blogs });
            setblogData(blogs);
            setLoder(false);
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    AllCategoryData();
    AllBlogData();
  }, []);


  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter blog data based on search query
  const filteredBlogData = CategoryData?.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      {/* <BlogHeader /> */}

      <Helmet>
          <title>
            {
              "Dive into Insightful Articles | Unzziptruth.com"
            }
          </title>
          <meta
            name="description"
            content={
              " Delve into a treasure trove of knowledge and wisdom with captivating articles on various topics. Explore the Unzziptruth.com Blog for enlightening content."
            }
          />
          {/* <meta name="keywords" content={blogData?.keywords} /> */}
        </Helmet>

      <Navbar/>

      <main className="wapper blog_bg">
        <section
          className="container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            // padding: "50px 50px 20px 50px",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ fontSize: "30px", color: "var(--dark-blue)" }}>
            Latest Blog
          </h3>
        </section>
  {Loder?      <CustomLoder Loder={Loder} />:

        <div className="container p-0 p-sm-2 p-md-2 p-lg-2">
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              width: "100%",
            }}
          >
            <label
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Categories
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                outline: "none",
                position: "relative",
              }}
            >
              {CategoryData?.map((item) => (
                <>
                  <div
                    style={{
                      padding: "5px 15px",
                      alignItems: "center",
                      cursor: "pointer",
                      display: "flex",
                      gap: "8px",
                      borderRadius: "10px",
                      border: "1px solid green",
              
                      backgroundColor: "#c6ffc5",
                 
                    }}
                  >
                    {item?.label}
                  </div>
                </>
              ))}
            </div>
          </div> */}

          <div className="row m-2">
            <section className="col-lg-3 col-md-4 bg-white">
              <div className="as_blog_sidebar ">
                <div className="as_search_widget mt-2">
                  <input
                    type="text"
                    name=""
                    className="form-control"
                    id=""
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <a href="#" >
                    <img src="assets/images/svg/search.svg" alt="Search" />
                  </a>
                </div>

                <div className="as_service_widget as_padderBottom40">
                  <h3 className="as_heading">Categories</h3>
                  <ul>
                    {filteredBlogData?.map((item,index) => (
                      <li>
                        <Link to="javascript:;">
                          <span> {item?.label}</span>
                          {/* <span>( {index+index*2} )</span> */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="as_service_widget as_padderBottom40">
                  <h3 className="as_heading">Recent Posts</h3>
                  <ul className="as_recentposts">
                    {blogData?.slice(0,3)?.map((item) => (
                      <li key={item?._id}>
                        <Link
                          to={{
                            pathname: `/Blog-details/${item?._id}`,
                            state: { item },
                          }}
                        >
                          <div className="as_img" style={{ width: "120px" }}>
                            <img src={item?.banner.url} alt={item?.title} />
                          </div>
                          <div className="as_detail">
                            <h6 className="fs-7">
                              {item?.title?.slice(0, 50)}...
                            </h6>
                            <span>
                              <img
                                src="assets/images/svg/calender1.svg"
                                alt="calender"
                              />{" "}
                              {moment(item?.createdAt).format("MMMM Do YYYY")}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="col-lg-9 col-md-8">
              <div className="row m-2">
                {blogData?.map((item) => (
                  <div
                    onClick={() =>
                      navigate(`/Blog-details/${item?._id}`, {
                        state: item,
                      })
                    }
                    className="col-md-6"
                    key={item?._id}
                  >
                    <div
                      className="card mb-3 w-100"
                      style={{
                        width: "100%",
                        minHeight: "25rem",
                      }}
                    >
                      <img
                        src={item?.banner.url}
                        alt={item?.title}
                        className="card-img-top"
                        style={{
                          maxHeight: "200px",
                          maxWidth: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item?.title}</h5>

                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.description.length > 50
                                ? `${item?.description.substring(0, 50)}...`
                                : item?.description,
                          }}
                        ></div>

                        <div className="d-flex justify-content-between">
                          <p className="card-text">
                            <small className="text-muted">
                              {moment(item?.createdAt).format("MMMM Do YYYY")}
                            </small>
                          </p>

                          <button type="button" class="btn btn-link">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>}
      </main>
    </>
  );
}
