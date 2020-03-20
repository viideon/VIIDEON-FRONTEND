import React from 'react';
import { Row, Col, Button, Input, InputGroupAddon, InputGroupText, InputGroup } from 'reactstrap';
import { FaMailBulk, FaPencilAlt, FaRegEnvelopeOpen, FaHandPointUp, FaEye, FaVideo, FaDownload } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import * as Constants from '../../constants/components/videotab';
import styles from './style';

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
              <h3 >{Constants.SAMPLE_USE} <i><FaPencilAlt style={{ fontSize: '15px' }} /></i> </h3>
              <span>
                {Constants.ZERO} <FaRegEnvelopeOpen />
              </span>
              <span style={styles.maincontainer}>{Constants.DASH}
                {Constants.ZERO}
                <FaHandPointUp />
              </span>
              <span style={styles.maincontainer}>{Constants.DASH}
                {Constants.ZERO}
                <FaEye />
              </span>
              <span style={styles.maincontainer}>{Constants.DASH}
                {Constants.ZERO}
                <FaVideo />
              </span>
              <span style={styles.maincontainer}>{Constants.DASH}
                {Constants.ZERO}
                <MdCheckBoxOutlineBlank />
              </span>
              <div style={styles.wrapper}>
                <span><FaDownload /> {Constants.MP4}</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs="12" sm="12" md="4" lg="4" xl="4">
          <Button size="lg" style={styles.buttonWrapper}>
            {Constants.SEND_SHARE}
          </Button>
          <br />
          <br />
          <InputGroup>
            <Input placeholder="https://dubb.com/v/TpvPri" />
            <InputGroupAddon addonType="append">
              <InputGroupText style={styles.inputContainer}><FaMailBulk style={styles.inputwrapper} /></InputGroupText>
              <InputGroupText style={styles.inputContainer}><FiExternalLink style={styles.inputwrapper} /></InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}
export default Header;