import React, { Component } from "react";
// import { Row, Col, Container } from "reactstrap";
import { Grid } from "@material-ui/core";
// import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import HeaderCard from "../../components/HeaderCards/Cards";
import VideoSection from "../../components/VideosSection/VideoSection";
import Styles from "./styles";
import "./styles.css";

type IProps = {
  history: any;
};

class Home extends Component<IProps> {
  render() {
    return (
      <div>
        <SideBar history={this.props.history} />
        <div className="wrapperHomeContent">
          <Grid container spacing={1}>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardOne}
                Video="14"
                Title="Videos"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardTwo}
                Video="0"
                Title="Total Video Views"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardThree}
                Video="3"
                Title="Call to Action"
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <HeaderCard
                styles={Styles.headerCardFour}
                Video="1"
                Title="Team Members"
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <VideoSection history={this.props.history} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Home;

/* <div>
<Header history={this.props.history} />
<Container id="homeContainerWrap">
  <Row>
    <Col xs="4" md="3">
      <SideBar history={this.props.history} />
    </Col>
    <Col xs="8" md="9">
      <Row>
        <Col xs="6" md="3">
          <HeaderCard
            styles={Styles.headerCardOne}
            Video="14"
            Title="Videos"
          />
        </Col>
        <Col xs="6" md="3">
          <HeaderCard
            styles={Styles.headerCardTwo}
            Video="0"
            Title="Total Video Views"
          />
        </Col>
        <Col xs="6" md="3">
          <HeaderCard
            styles={Styles.headerCardThree}
            Video="3"
            Title="Call to Action"
          />
        </Col>
        <Col xs="6" md="3">
          <HeaderCard
            styles={Styles.headerCardFour}
            Video="1"
            Title="Team Members"
          />
        </Col>
      </Row>
      <div>
        <Row>
          <Col xs="12">
            <VideoSection history={this.props.history} />
          </Col>
        </Row>
      </div>
    </Col>
  </Row>
</Container>
</div> */
