import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import HeaderCard from "../../components/HeaderCards/Cards";
import VideoComponent from "../../components/VideosComponent/VideosComponent";
import Styles from "./styles";
import "./styles.css";

type IProps = {
  history: any;
};

class Home extends Component<IProps> {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <Container id="homeContainerWrap">
          <Row>
            <Col xs="3" md="3">
              <SideBar history={this.props.history} />
            </Col>
            <Col xs="9" md="9">
              <div id="headerCardWrap">
                <HeaderCard
                  styles={Styles.headerCardOne}
                  Video="14"
                  Title="Videos"
                />
                <HeaderCard
                  styles={Styles.headerCardTwo}
                  Video="0"
                  Title="Total Video Views"
                />
                <HeaderCard
                  styles={Styles.headerCardThree}
                  Video="3"
                  Title="Call to Action"
                />
                <HeaderCard
                  styles={Styles.headerCardFour}
                  Video="1"
                  Title="Team Members"
                />
              </div>
              <div>
                <Row>
                  <Col xs="12">
                    <VideoComponent history={this.props.history} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
