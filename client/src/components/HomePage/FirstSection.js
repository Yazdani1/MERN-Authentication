import React,{useContext} from "react";
import { UserContext } from "../UserContext";

const FirstSection = () => {

  const [user,setUser] = useContext(UserContext);

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
            <h1>{user && user.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstSection;
