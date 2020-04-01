import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import VideoCard from '../VideoCard/VideoCard';
import "../../../node_modules/video-react/dist/video-react.css";
import RecordOption from '../../components/RecordOption';
import './styles.css';

type IProps = {
  history: any;
};
type IState = {
};
class VideoComponent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <>
        <div className='VideoComponent'>
          <div className='mainWrapperComponent'>
            <h4 className='Header'>MY VIDEOS</h4>
            <RecordOption history={this.props.history} />
          </div>
          <Row>
            <Col sm="4">
              <VideoCard
                title='Dubb Account Setup'
                url="http://techslides.com/demos/sample-videos/small.mp4"
              />
            </Col>
            <Col sm="4">
              <VideoCard
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                title='Sample Use Case - Sales Prospecting'
              />
            </Col>
            <Col sm="4">
              <VideoCard
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
export default VideoComponent