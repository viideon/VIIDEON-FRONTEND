import React from 'react';
import { Row, Col, Button, Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import { FaMailBulk, FaPencilAlt, FaRegEnvelopeOpen, FaHandPointUp, FaEye, FaVideo, FaDownload } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";



const Header = () => {
    return (
        <div>
            <Row>
                <Col xs="12" sm="12" md="8" lg="8" xl="8" >
                    <Row>
                        <Col xs="12" sm="12" md="5">
                            <div id="headerVideo" >
                                <iframe src={"https://dubb.sfo2.digitaloceanspaces.com/videos/2019-12-14/3c415fc72253774eb51c19f956057cf0/720p_PWvT.mp4"}
                                    title="videoDetail"
                                    allow="fullscreen"
                                    height="100%"
                                    width="100%"
                                ></iframe>
                            </div>
                        </Col>
                        <Col xs="12" sm="12" md="7" id="headerText">
                            <h3 >Sample Use Case - Scheduling Meetings <i><FaPencilAlt style={{ fontSize: '15px' }} /></i> </h3>
                            <span>
                                0 <FaRegEnvelopeOpen />
                            </span>
                            <span style={{ marginLeft: '10px' }}>|
                                 0 <FaHandPointUp />
                            </span>
                            <span style={{ marginLeft: '10px' }}>|
                                 0 <FaEye />
                            </span>
                            <span style={{ marginLeft: '10px' }}>|
                                 0 <FaVideo />
                            </span>
                            <span style={{ marginLeft: '10px' }}>|
                                 0 <MdCheckBoxOutlineBlank />
                            </span>

                            <div style={{ marginTop: "20px" }}>
                                <span><FaDownload /> MP4</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4">
                    <Button size="lg" style={{ fontSize: '1.15rem', width: '100%', border: 'none', background: '#22b9ff' }}>Share & Send</Button>
                    <br />
                    <br />
                    <InputGroup>
                        <Input placeholder="https://dubb.com/v/TpvPri" />
                        <InputGroupAddon addonType="append">
                            <InputGroupText style={{ background: 'transparent' }}><FaMailBulk style={{ fontSize: '1.4rem' }} /></InputGroupText>
                            <InputGroupText style={{ background: 'transparent' }}><FiExternalLink style={{ fontSize: '1.4rem' }} /></InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </Col>
            </Row>

        </div>
    );
}

export default Header;