import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { MdAccountBox } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";

function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  var userOpinion = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);

  //get users opinion

  const [opinion, setOpinion] = useState(null);

  const getOpinion = async () => {
    await axios
      .get("/auth/opinion")
      .then((res) => {
        setOpinion(res.data.mypostdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //for pagination

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataItem.slice(indexOfFirstItem, indexOfLastItem);

  //to set pagination per page

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
  };

  const [user, setUser] = useState([]);

  const getUser = async () => {
    axios.get("/auth/allusers").then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    axios.get("/auth/getpost").then((res) => {
      setData(res.data.resultGet);
      console.log(res.data);
    });

    axios.get("/auth/latestpost").then((res) => {
      setLatestpost(res.data);
      console.log(res.data);
    });

    getUser();
    getOpinion();
  }, []);

  const renderData = (dataItem) => {
    return (
      <div class="dd">
        <div class="text-center my-5">{/* <h1>Blog App</h1> */}</div>

        {/* //mainpost section */}
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                {dataItem.map((item) => (
                  <div className="col-lg-4">
                    <div className="desing_home card mb-5 shadow-sm">
                      <Link
                        to={"/userprofile/" + item.postedBy._id}
                        className="name_design"
                      >
                        <p>Posted by: {item.postedBy.name}</p>
                      </Link>
                      <img src={item.photo} className="images" />
                      <p className="date_color">
                        {moment(item.date).format("MMMM Do YYYY")}
                      </p>
                      <h4>{item.title.substring(0, 15)}</h4>
                      <p>{item.des.substring(0, 20)}</p>
                      <Link to={"/details/" + item._id}>
                        <button className="btn btn-primary">Reade More</button>
                      </Link>

                      {/* <span className="read_more_button">Read More</span> */}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleLoadMore}
                className="btn btn-primary loadmore"
              >
                Load More Posts
              </button>
            </div>
            <div className="col-md-3 card userdetails">
              <h1>Hello Youttube</h1>
            </div>
          </div>
        </div>
        <div className="container allusers">
          <h5>All Users</h5>

          <Slider {...settings}>
            {user.map((item) => (
              <div className="useritems">
                <div className="desing_home card mb-5 shadow-sm">
                  <div className="profile_pic">NA</div>

                  <h4>{item.name}</h4>

                  <p className="date_color">
                    Member Since:
                    {moment(item.date).format("MMMM Do YYYY")}
                  </p>

                  <Link to={"/userprofile/" + item._id}>
                    <button className="btn btn-success profile_button">
                      View Profile
                    </button>
                  </Link>

                  {/* <span className="read_more_button">Read More</span> */}
                </div>
              </div>
            ))}
          </Slider>

          <>
            {opinion ? (
              <div class="text-center my-5 userwords">
                <h5 className="usersopinion_text">Users Words</h5>
                <div className="container">
                  <div className="row">
                    <Slider {...userOpinion}>
                      {opinion.map((opinionitem) => (
                        <div className="card allopinion">
                          <h3>{opinionitem.postedBy.name}</h3>
                          <h4>{opinionitem.des}</h4>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : (
              <h1>Loading..</h1>
            )}
          </>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="container first_section">
        <img
          src="https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          height="600px"
          width="100%"
        />

        <div class="top-left">
          <div className="card first_Section_data">
            <h5>Welcome to this Blog App</h5>
            <p>Learn from others and share your pots with others</p>
          </div>
        </div>
      </div>

      <div className="second_section">
        <div className="row">
          <div className="col-md-6">
            <div className="items_ofhome">
              <h1>
                <MdAssessment />
              </h1>
              <h4>Published Post</h4>
              <h1>{dataItem.length}</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className="items_ofhome">
              <h1>
                <MdAccountBox />
              </h1>
              <h4>Active Users</h4>
              <h1>{user.length}</h1>
            </div>
          </div>
        </div>
      </div>
      {renderData(currentItems)}
    </>
  );

  // <div className="container">
  //   <div className="row">
  //     <div className="col-md-8">
  //       {dataItem.map((item) => (
  //         <div className="card top">
  //           <img src={item.photo} className="img-fluid"  height="200px"/>
  //           {/* <h3>{item.postedBy.name}</h3>
  //           <h3>{item.postedBy.email}</h3> */}
  //           <p>Published on:{moment(item.date).format("MMMM Do YYYY")}</p>
  //           <h5>{item.title}</h5>
  //           <p>{item.des.substring(0, 50)}</p>
  //           <Link to={"/userprofile/" + item.postedBy._id}>
  //             <p>Posted by: {item.postedBy.name}</p>
  //           </Link>
  //           <span className="read">Read More ...</span>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="col-md-4">
  //       <h5 className="title lstestpostTitle">New Posts</h5>
  //       {latestPost.map((item) => (
  //         <div className="card latestPosts">
  //           <h5>{item.title}</h5>
  //           <p>{item.des.substring(0, 50)}</p>
  //           <p>Posted by: {item.postedBy.name}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </div>
}
export default Home;
