import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import HeaderCard from '../../components/HeaderCards/Cards';
import VedioComponent from '../../components/VideosComponent/VideosComponent';
import './styles.css';

type IProps = {
  navigation: any;
};
type IState = {

};
class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header navigation={this.props.navigation}
        />
        <Row>
          <Col sm="4">
            <SideBar navigation={this.props.navigation} />
          </Col>
          <Col sm="8" className='MianContainer'>
            <Row>
              <Col sm="3" className='CardComponent'>
                <HeaderCard
                  color='#3598DC'
                />
              </Col>
              <Col sm="3" className='CardComponent' >
                <HeaderCard
                  color='#e7505a'

                />
              </Col>
              <Col sm="3" className='CardComponent'>
                <HeaderCard
                  color='#32c5d2'

                />
              </Col>
              <Col sm="3" className='CardComponent'>
                <HeaderCard
                  color='#8e44ad'
                />
              </Col>
            </Row>
            <Row className='VideoCardComponent'>
              <Col sm="7">
              <VedioComponent navigation={this.props.navigation}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default Home