import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swal from 'sweetalert2';
function Bloagpage() {
  const navigate = useNavigate();
  const [blogData, setblogData] = useState([]);

  const AllBlogData = () => {
    axios
      .get(`/api/v1/blog`)
      .then((response) => {
        let data = response.data;
        let blogs = data?.blogs;
        console.log({ blogs });
        setblogData(blogs);
        if (response.status) {
          if (data.status) {
            // console.log({blogs})
            // setblogData(blogs)
          } else {
          }
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };






  const DeleteBlog = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this blog post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/v1/blog/${_id}`)
          .then((response) => {
            let data = response.data;
  
            if (data.status) {
              AllBlogData();
              Swal.fire(
                'Deleted!',
                'Your blog post has been deleted.',
                'success'
              );
            } else {
              Swal.fire(
                'Error!',
                data.msg,
                'error'
              );
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the blog post.',
              'error'
            );
          });
      }
    });
  };
  


  useEffect(() => {
    AllBlogData();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="container p-2">
        <div className="row  m-2">
          <div className="col-md-10">
            <div className="page-title-box">
              <h4>Blog Management</h4>
              {/* <ol className="breadcrumb m-0">
                <li className="breadcrumb-item active">Blog Management</li>
              </ol> */}
            </div>
          </div>
          <div className="col-md-2 text-end">
            <Link to="/Create-Blog">
              <button type="button" className="btn btn-dark btn text-white">
                Create Blog
              </button>
            </Link>
          </div>
        </div>

        {/* blog show  */}
        <div className="row m-2">
          {blogData?.map((item) => (
            <div className="col-md-4" key={item?._id}>
              <div
                className="card bg-white mb-3 "
                style={{
                  width: "100%",
                  minHeight: "30rem",
                }}
              >
                <img
                  src={item?.banner?.url}
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

                  <p className="card-text">
                    <small className="text-muted">
                      Last updated {new Date(item?.createdAt).toLocaleString()}
                    </small>
                  </p>
                  <div  style={{position:"relative", bottom:"0rem"}}   className="d-flex align-items-center justify-content-end edit-delete-icons">
                    <div
                      className="edit-icon w-25"
                      onClick={() =>
                        navigate(`/Update-Blog/${item?._id}`, {
                          state: item,
                        })
                      }
                    >
                      <i className="fas fa-edit fs-4"></i>
                    </div>
                    <div
                      className="delete-icon"
                      onClick={() => DeleteBlog(item?._id)}
                    >
                      <i
                        className="fas fa-trash fs-4"
                        style={{ color: "#ff7300" }}
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bloagpage;
