import React from "react";

const Spread = ({ video }: any) => {
  let spreadHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta http-equiv="Content-Style-Type" content="text/css">
      <title></title>
      <meta name="Generator" content="Cocoa HTML Writer">
      <meta name="CocoaVersion" content="1894.6">
      <style type="text/css">
        .mainWrapper {
          text-align: -webkit-center;      
          width: 720px;
        }
        .bodyWrapper {
          width: 100%;
          min-width: 80%;
          height:40vh;
          background-color: darkgoldenrod;
        }
        .headerWrapper {
          background :darkgoldenrod
          width: 100%;
          min-width: 60%;
          height: 240px;
          background-position: center;
          opacity: 0.9;
        }
        .headerWrapper1{
            background :darkgoldenrod
        }
        .thumbnailWrapper {
           background:red;
           z-index:-1;
          width: 100%;
          min-width: 60%;
          min-height: 512px;
          max-height: 720px;
          background-position: center;
        }
        .headerImage {
          width: 120px;
          height: 120px;
          opacity: 1;
        }
        .headerH1 {
          font-weight: bolder;
          color: white;
          font-size: 60px;
          margin: 0px;
          padding-bottom: 0px;
        }
        .headerP {
          margin-top: 0px;
          color: white;
          font-weight: bolder;
          font-size: 20px;
        }
        .footerWrapper {
          background: lightgray;
          padding: 2.5em;
        }
        .watchVideoBtn {
          color: white;
          background-color: goldenrod;
          border: none;
          border-radius: 23px;
          min-height: 40px;
          min-width: 200px !important;
          width: 225px;
          font-weight: bolder;
          outline: none;
          font-size: 18px;
          cursor: pointer !important;
        }
        .copyRightWrapper {
          margin-top: 1em;
        }
        .copyRightWrapper p {
          padding-left: 15px;
          font-size: 16px;
          font-weight: bold;
          color: goldenrod;
        }
        .socialBtn {
          border: none;
          border-radius: 50px;
          background: goldenrod;
          color: white;
          font-size: 30px;
          overflow: hidden;
          height: 35px;
          width: 35px;
          margin: 8px;
          outline: none;
          cursor: pointer !important;
        }
        a {
          cursor: pointer !important;
          color: transparent;
          text-decoration: none;
        }
      </style>
    </head>
    <body style="text-align: -webkit-center;">
      <div class="mainWrapper">
      <div class="headerWrapper1">
      <img src="https://videonpro.s3.amazonaws.com/assets/logo.png" class="headerImage"/>
      <h1 class="headerH1">VideonPRO</h1>
      <p class="headerP">Join our movement</p>
            
          </div>
        <div class="bodyWrapper">

          
        <img style="width: 100%; height: 40vh;"
        src="${video?.thumbnail}" />
     <p style="color: white">${video?.title}</p>
            <div class="thumbnailWrapper">
              <img style="width: 80px;margin-top: 29%" src="https://videonpro.s3.amazonaws.com/assets/logo.png" /> 
            </div>
          </a>
        </div>
    
        <div class="footerWrapper w3-row w3-center">
          <div class="w3-third">
              <a href="videonpro.com">
                <button class="btn watchVideoBtn">VideoPro.com</button>
              </a>
            <div class="w3-row w3-center copyRightWrapper">
              <span class="w3-third">
                <a href="videonpro.com">
                  <img style="width: 45px; height: 45px;" src="https://videonpro.s3.amazonaws.com/assets/logo.png">
                </a>
              </span>
              <span class="w3-twothird">
                <p>Sent using VideonPRO</p>
              </span>
            </div>
          </div>
          <div class="w3-twothird w3-center">
            <p>VideonPRO is a video communication platform design for sale and marketing leaders. Learn more at videonpro.com</p>
            <div>
              <a href="https://www.facebook.com/">
                <button class="fbBtn socialBtn">F</button>
              </a>
              <a href="https://twitter.com/">
                <button class="twitterBtn socialBtn">T</button>
              </a>
              <a href="https://youtube.com/">
                <button class="youTubBtn socialBtn">Y</button>
              </a>
              <a href="https://www.linkedin.com/">
                <button class="linkedInBtn socialBtn">L</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

  return <div dangerouslySetInnerHTML={{ __html: spreadHtml }} />;
};

export default Spread;
// background-image: url('https://videonpro.s3.amazonaws.com/assets/spreadHeader.jpg');
