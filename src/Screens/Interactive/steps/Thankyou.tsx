import React from "react";
import whiteLogo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import atom from "../../../assets/atom.png";
import { useHistory } from "react-router";

const Thankyou = () => {
  const history = useHistory();
  const handleBack = () => {
    history.push("/");
  };
  return (
    <div>
      <div className="firstLayoutContainer">
        <div className="firstLayoutMainContainer">
          {/* <img src={whiteLogo} alt="logo" /> */}
          <h1 style={{ fontSize: "8rem" }}></h1>
          <h2 style={{ fontSize: "3rem" }}>Thank You for your response!</h2>
          <h4>
            If you are not a member, consider trying Viideon by creating a free
            account at
          </h4>
          <p
            style={{ fontSize: "1rem", fontWeight: "normal" }}
            onClick={handleBack}
          >
            app.viideon.com
          </p>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "-13%",
            left: "-3%",
            opacity: "0.5",
            width: "48%",
          }}
        >
          <img style={{ width: "30%" }} src={atom} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
