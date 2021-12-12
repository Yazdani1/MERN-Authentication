import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { UserContext } from "../UserContext";
import { AiFillLike } from "react-icons/ai";
import { addlikePost, addunlikePost } from "./Apihomepage";
import { latestPost } from "./Apihomepage";

const LatestPost = () => {
  const [latestpost, setLatestpost] = useState([]);

  const [user, setUser] = useContext(UserContext);

  const loadLatestpost = () => {
    latestPost()
      .then((data) => {
        setLatestpost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const loadLikepost = (postId) => {
    addlikePost(postId).then((result) => {
      const newItemData = latestpost.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setLatestpost(newItemData);
    });
  };

  const loadunLikepost = (postId) => {
    addunlikePost(postId).then((result) => {
      const newItemData = latestpost.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setLatestpost(newItemData);
    });
  };

  useEffect(() => {
    loadLatestpost();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {latestpost.map((item, index) => (
          <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
            <div className="card main-card-latest-post">
              <div className="item-card-design">
                <img src={item.photo} className="latest-post-image" />

                <div className="post-data">
                  <Link
                    to={"/userprofile/" + item.postedBy._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="profile-name-date">
                      <div className="profile-name-avatar">
                        <p>
                          {item.postedBy.name.substring(0, 2).toUpperCase()}
                        </p>
                      </div>
                      <div className="profile-name-post-date">
                        <p className="profile-name-size">
                          {item.postedBy.name}
                        </p>
                        <p>{moment(item.date).format("MMMM Do YYYY")}</p>
                      </div>
                    </div>
                  </Link>
                  <Link
                    to={"/details/" + item._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>{item.title}</p>
                  </Link>

                  <div className="like-comments">
                    <div className="like-button-design">
                      <div className="like-icons">
                        {item.likes.includes(user && user._id) ? (
                          <p onClick={() => loadunLikepost(item._id)}>
                            <AiFillLike size={20} />
                          </p>
                        ) : (
                          <p onClick={() => loadLikepost(item._id)}>
                            <AiOutlineLike size={20} />
                          </p>
                        )}
                      </div>
                      <p className="like-count"> {item.likes?.length} likes</p>
                    </div>

                    <div className="comment-button-design">
                      <div className="comment-icons">
                        <FaRegCommentDots size={20} />
                      </div>
                      <p className="comments-count">
                        {" "}
                        {item.comments?.length} comments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
