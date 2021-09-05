import React from "react";
import "../App.css";

function SignIn() {
  return (
    <div className="containe design card">
      <div className="row">
        <h1 className="toptest">Sign In to your account</h1>
        <form>
          <div className="form-group">
            <label for="exampleInputPassword1" className="form-label">
              E-mail
            </label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="text" className="form-control" />
          </div>
          <button type="submit" class="btn btn-primary custBtn">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
