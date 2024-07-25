import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import BlogHeader from "./BlogHeader";
import CustomLoader from "../../Component/CustomLoder";
import { Helmet } from "react-helmet";
import Navbar from "../../Component/Navbar/Navbar";

export default function BlogDetails() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [blogData, setblogData] = useState("");
  const [Loder, setLoder] = useState(true);

  const AllBlogData = () => {
    axios
      .get(`/api/v1/blog/${_id}`)
      .then((response) => {
        let data = response.data;

        if (data.status) {
          setLoder(false);
          let blogs = data.blog;
          console.log({ blogs });
          setblogData(blogs);
        } else {
          setLoder(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    AllBlogData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{blogData?.title}</title>
        <meta name="description" content={blogData?.metaDescription} />
        <meta name="keywords" content={blogData?.keywords} />
      </Helmet>

      {/* <BlogHeader title={new Date(blogData?.createdAt).toLocaleString()} /> */}
      <Navbar />
      <CustomLoader Loder={Loder} />

      {blogData && (
        <main className="container  view-blog">
          {/* <div className="row">
            <div className="col-md-9 col-9 m-3">
              <div className="card w-100 mb-3">
                <img
                  src={blogData?.banner?.url}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "35rem",
                    objectFit: "fill",
                  }}
                />
                <div className="card-body p-3">
                  <h5 className="card-title">{blogData?.title}</h5>

                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: blogData?.description,
                    }}
                  ></p>

                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated{" "}
                      {new Date(blogData?.createdAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-3  m-3">
              <div className="card w-100 mb-3">
                <img
                  src={blogData?.banner?.url}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "35rem",
                    objectFit: "fill",
                  }}
                />
                <div className="card-body p-3">
                  <h5 className="card-title">{blogData?.title}</h5>

                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: blogData?.description,
                    }}
                  ></p>

                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated{" "}
                      {new Date(blogData?.createdAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <section className="as_breadcrum_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h1 className="text-black">Blog Details</h1>
                <ul className="breadcrumb">
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>Blog Details</li>
                </ul>
              </div>
            </div>
          </div>
        </section> */}

          <section className="row mb-3">
            <div className="col-lg-12 text-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="as_btn"
              >
                {" "}
                Back
              </button>
            </div>
          </section>

          <section class="row g-5">
            <section className="col-sm-12  col-md-9">
              <div className="card special-card w-100 mb-3">
                <img
                  src={blogData?.banner?.url}
                  className="card-img-top"
                  style={{
                    width: "100%",
                    height: "35rem",
                    objectFit: "fill",
                  }}
                  alt="blog image"
                />
                <div className="card-body p-md-5 p-2">
                  <h5 className="card-title">{blogData?.title}</h5>

                  <p
                    className="card-text"
                    dangerouslySetInnerHTML={{
                      __html: blogData?.description,
                    }}
                  ></p>

                  <p className="card-text">
                    <small className="text-body-secondary">
                      Last updated{" "}
                      {new Date(blogData?.createdAt).toLocaleString()}
                    </small>
                  </p>
                </div>
              </div>
            </section>

            <section className="col-sm-12 col-md-3">
              <div className="card special-card">
                <div className="as_service_widget as_padderBottom40 p-4">
                  <h3 className="as_heading">Categories</h3>
                  <ul className="p-0">
                    {blogData?.category?.map((item, index) => (
                      <li className="my-3" key={index}>
                        <Link className="Categories-link" to="#javascript">
                          {item?.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="container p-4">
                  <h1 className="">Tags</h1>
                  <div className="row">
                    {blogData?.tags &&
                      blogData?.tags?.split(" ").map((tag, index) => (
                        <button
                          key={index}
                          className="btn col-5 col-md-5 btn-outline-danger btn-sm  m-1 ml-1"
                        >
                          {tag}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </section>
        </main>
      )}
    </>
  );
}
