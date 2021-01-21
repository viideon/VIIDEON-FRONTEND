import React from "react";

const Sleek = ({ video }: any) => {
  let html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Style-Type" content="text/css">
    <title></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="Generator" content="Cocoa HTML Writer">
    <meta name="CocoaVersion" content="1894.6">
    <style type="text/css">
        .thumbnailWrapper {
            background-image: url(${video?.thumbnail});
        }
    </style>
</head>

<body ">
    <table align=" center" cellpadding="0" cellspacing="0" width="700">

    <tr>
        <td>
            <table align="center" cellpadding="0" cellspacing="0" width="100%">
                <tr align="left">
                    <td style="
                          padding-left: 20px;
                          background-color: white;
                          display: -webkit-box;
                          -webkit-box-align: center;
                          -webkit-box-pack: center;
                          min-width: 60%;
            height: 80%;
            
            border-bottom: 2px solid black;
                        ">
                        <img src=" https://videonpro.s3.amazonaws.com/assets/logo.png"
                            style="width: 40px; height: 40px; opacity: 1;margin-top: 50%;" />
                        <h1 style="
                            padding-bottom: 0px;
                            margin-left: 3%;
                            font-weight: bolder;
                            font-size: 30px;
                            color: black;
                          ">
                            VideonPRO 
                        </h1>
                    </td>
                </tr>
            </table>
        </td>
    </tr>

    <tr align="center">
        <p style="color: black;">Be a part of our growing team!</p>
    </tr>
    <tr align="center">
        <td>
            <table width=" 100%" cellspacing="0" cellpadding="0" width="70%"
                style="background: #4d4d4d;padding: 100px 0px 100px 0px;max-width: 400px;">
                <tr align="center">
                    <td>
                        <img style="width: 100%"
                           src="${video?.thumbnail}" />
                        <p style="color: white">${video?.title}</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr align="center">
        <td align="center" style="padding: 30px 0px 30px 0px">
            <p style="margin: 0px;color: black;">
                VideonPRO is a video communication platform design for sale
            </p>
            <p style="margin: 0px;color: black;">
                and marketing leaders. Learn more at
                <a style="
                  text-decoration: none;
                  color: black;
                  font-weight: bold;
                  cursor: pointer;
                ">videonpro.com</a>
            </p>
        </td>
    </tr>
    <tr align="center">
        <td align="center">

            
                <p style="margin: 0px;color: black; font-size: 30px;
                font-weight: bold;
                margin-bottom: 5px;
                max-width: 300px;
                width: 100%;
                border-top: 1.5px solid black;
                border-bottom: 1.5px solid black;
                cursor: pointer;">Watch this Video!</p>
            </a>
        </td>
    </tr>
    <tr align="center">
        <td align="center" style="padding: 15px 0px 15px 0px">

            <img style="vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;" src="http://placeimg.com/80/80/sport">
            <p style="margin-bottom: 0;
            font-size: 16px;
            font-weight: bold;color: black;">Chris Cullen</p>
            <p style=" margin-top: 0;
            font-size: 14px;color: black;">Nature Lover</p>
        </td>
    </tr>
    <tr align="center">
        <td style="padding: 10px 0px 20px 0px;">
            <table width="180px" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="25%" align="center" style="border-right: 1.5px solid">
                        <img width="24px" height="24px"
                            src="https://videonpro.s3.us-west-1.amazonaws.com/1600681828680logo.jpeg" />
                    </td>
                    <td style="border-right: 1.5px solid" width="25%" align="center"><img width="24px" height="24px"
                            src="https://videonpro.s3.us-west-1.amazonaws.com/1600681828680logo.jpeg" /></td>
                    <td style="border-right: 1.5px solid" width="25%" align="center">
                        <img width="24px" height="24px"
                            src="https://videonpro.s3.us-west-1.amazonaws.com/1600681828680logo.jpeg" />
                    </td>
                    <td width="25%" align="center">
                        <img width="24px" height="24px"
                            src="https://videonpro.s3.us-west-1.amazonaws.com/1600681828680logo.jpeg" />
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td style="padding: 20px 0px 20px 0px;border-top: 2px solid black;">
            <table width="100%" cellspacing="0" cellpadding="0">
                <tr>
                    <td width="33%" align="center">
                        <p style=" font-size: 12px; padding-left: 5px;color: black;">
                            &copy; 2020 VideonPro All Rights Reserved
                        </p>
                    </td>
                    <td width="33%" align="center"></td>
                    <td width="33%" align="center">
                        <img src="https://videonpro.s3.amazonaws.com/assets/logo.png" style="
                width: 20px;
                opacity: 1;
                height: 20px;
                margin-right: 5px;
              " />
                        <span style="color: black;">Sent with VideonPro</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>




    </table>
</body>

</html>
  `;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Sleek;
