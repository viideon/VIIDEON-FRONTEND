import React from 'react';
import './style.css';
import { FaInfoCircle } from "react-icons/fa";
import profileImg from '../../assets/profileImages/profileImg.png';
import {Label, Input } from 'reactstrap';


function ProfilePhoto() {
    return (
        <div>
            <div id="profilePhotoWrap">
                <div id="profilePhotoHead">
                    <h4>PROFILE PHOTO </h4><i><FaInfoCircle id="infoCircleStyle" /></i><p id="uploadProfilePara">Upload a profile photo of you to display on your video pages</p>
                </div>
                <hr />
                <div id="profileImgWrap">
                    <img src={profileImg} alt="profileImg" id="profileImgStyle" />
                </div>
                <div id="profileImgLabelWrap">
                   
                        <Label id="profileImgLabelStyle">SELECT NEW PHOTO
                            <Input type="file" id="profileSelectInput" />
                        </Label>
                   

                </div>
            </div>
        </div>
    );
}

export default ProfilePhoto;