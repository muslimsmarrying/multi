import React from "react";
import Navbar from "../components/Navbar";
import Not from "../assets/images/404.png";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="mt-top"></div>
      <div className="page-not px-3 py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center">
              <h1 className="common-title text-dark">
                <div className="page-not-found-logo text-center "></div>
                Page Not Found
              </h1>
              <p className="common-text py-3 text-dark">
                Sorry! We could not find the page you are looking for. The page
                may be missing, removed or you have mistyped the URL. If you
                want to visit website, you could go to the{" "}
                <Link to={"/"} className="c-clr">
                  homepage
                </Link>{" "}
                .
              </p>
            </div>
            <div className="col-md-6">
              <img className="w-50" src={Not} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
