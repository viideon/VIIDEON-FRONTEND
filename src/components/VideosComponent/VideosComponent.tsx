import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import VideoCard from '../VideoCard/VideoCard';
import { Images } from '../../config';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";

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
                url="http://techslides.com/demos/sample-videos/small.mp4"
              />
            </Col>
            <Col sm="4">
              <VideoCard
                image={Images.cardtwo}
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                title='Sample Use Case - Sales Prospecting'
              />
            </Col>
            <Col sm="4">
              <VideoCard
                image={Images.card}
                title='Sample Use Case - Screen Recording'
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default VedioComponent