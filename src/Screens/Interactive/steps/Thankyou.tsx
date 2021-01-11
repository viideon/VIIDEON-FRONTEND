import React from "react";
import whiteLogo from "../../../assets/logo.png";
import atom from "../../../assets/atom.png";
import { useHistory } from "react-router";

const Thankyou = () => {
  const history = useHistory();
  const handleBack = () => {
    console.log("thanku back", history);
    history.push("/");
  };
  return (
    <div>
      <div className="firstLayoutContainer">
        <div className="firstLayoutMainContainer">
          {/* <img src={whiteLogo} alt="logo" /> */}
          <h1 style={{ fontSize: "8rem" }}>Thank You!</h1>
          <h3 style={{ fontSize: "3rem" }}>for your response.</h3>
          <p
            style={{ fontSize: "1rem", fontWeight: "normal" }}
            onClick={() => handleBack()}
          >
            Click to go Viideon
          </p>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "-13%",
            left: "-3%",
            opacity: "0.5",
          }}
        >
          <img style={{ width: "30%" }} src={atom} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
