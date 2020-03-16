import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import VideoCard from '../VideoCard/VideoCard';
import {Images} from '../../config';

import './styles.css';

type IProps = {
  navigation: any;
};
type IState = {

};
class VedioComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <div className='VideoComponent'>
          <h4 className='Header'>MY VIDEOS</h4>
          <Row>
            <Col sm="4">
              <VideoCard 
              image={Images.card}
              title='Dubb Account Setup'
              />
            </Col>
            <Col sm="4">
              <VideoCard 
              image={Images.cardtwo}  
              title='Sample Use Case - Sales Prospecting'
              />
            </Col>
            <Col sm="4">
              <VideoCard 
              image={Images.card}
              title='Sample Use Case - Screen Recording'
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default VedioComponent