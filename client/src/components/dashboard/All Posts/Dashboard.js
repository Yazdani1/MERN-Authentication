import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import renderHTML from "react-render-html";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import Allpost from "./Allpost";
import AllPostList from "./AllPostList";

function Dashboard() {
  const notify = () => {
    toast.info("Post Deleted Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [mypost, setData] = useState([]);
  //context api
  const [user, setUser] = useContext(UserContext);

  const getMypost = () => {
    fetch("/auth/mypost", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.mypostdata);
        console.log(result);
      });
  };

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    getMypost();
  }, []);

  //delete data item
  function deletePost(id) {
    axios.delete("/auth/delete/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    getMypost();
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="total_posts card">
              <h1>
                <MdAssessment />
              </h1>
              <h3>Total post</h3>
              <h3>{mypost.length}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mamber_sinces card">
              <h1>
                <MdCardMembership />
              </h1>
              <h3>Member Since</h3>
              <p>{moment(user && user.createdAt).format("MMMM Do YYYY")}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="profile_visitors card">
              <h3>Total post</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="card container main_container">

      <Allpost posts={mypost} />

   

        {/* table start */}

        {/* <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Photo</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th colspan="3">Action</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>
                 

                  </td>
              </tr>

          {mypost.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={item.photo} height="80px" width="80px"></img>
                </td>
                <td>{item.title.substring(0, 30)}</td>
                <td>{ReactHtmlParser(item.des.substring(0, 80))}</td>

                <td>
                  <Link to={"/editpost/" + item._id}>
                    <button className="btn btn-success">
                      <AiTwotoneEdit size={20} />
                      Edit
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deletePost(item._id);
                      notify();
                    }}
                  >
                    <MdDelete size={20} /> Delete
                  </button>
                </td>
              </tr>
            ))} 
          </tbody>
        </table> */}

        <ToastContainer autoClose={8000} />
      </div>
    </>
  );
}

export default Dashboard;
