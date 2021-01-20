import React from "react";
import "./sleek.css";

const Sleek = () => {
  return (
    <div>
      <table style={{ margin: "auto" }}>
        <tr>
          <td>
            <table
              style={{ alignItems: "center" }}
              //  cellpadding="0" cellspacing="0"
              width="100%"
            >
              <tr style={{ alignItems: "left" }}>
                <td className="td1">
                  <img
                    src=" https://videonpro.s3.amazonaws.com/assets/logo.png"
                    className="img2"
                  />
                  <h1 className="h1_1">VideonPRO</h1>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr style={{ alignItems: "center" }}>
          <p style={{ color: "black" }}>Be a part of our growing team!</p>
        </tr>
        <tr style={{ alignItems: "center" }}>
          <td>
            <table
              width=" 100%"
              // cellspacing="0" cellpadding="0"

              style={{
                background: "#4d4d4d",
                padding: "100px 0px 100px 0px",
                maxWidth: "400px",
              }}
            >
              <tr style={{ alignItems: "center" }}>
                <td>
                  <img
                    style={{ width: "80px" }}
                    src="https://vidionpro-backend.herokuapp.com/video/email/track?id=${id}"
                  />
                  <p style={{ color: "white" }}>VIDEO PLACEHOLDER</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style={{ alignItems: "center" }}>
          <td align="center" style={{ padding: "30px 0px 30px 0px" }}>
            <p style={{ margin: "0px", color: "black" }}>
              VideonPRO is a video communication platform design for sale
            </p>
            <p style={{ margin: "0px", color: "black" }}>
              and marketing leaders. Learn more at
              <a className="a2">videonpro.com</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Sleek;
