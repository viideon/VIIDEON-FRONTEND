import React, { Component } from 'react';
import styles from './style';
import { FormGroup, Label, Col, Input } from 'reactstrap';
import * as Constants from '../../constants/components/videotab';

type IProps = {

};

type IState = {

};
class VideoReplies extends Component<IProps, IState>  {
  render() {
    return (
      <div style={{ marginTop: '10%', marginLeft: '4%' }}>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>{Constants.COMMENTS}</Label>
          <Col sm={10}>
            <Input type="select" name="select" id="exampleSelect" style={{ width: '70%', marginRight: '5%' }}>
              <option>{Constants.OPTION_1}</option>
              <option>{Constants.OPTION_2}</option>
              <option>{Constants.OPTION_3}</option>
            </Input>
          </Col>
        </FormGroup>
      </div>
      // <div style={styles.recorder}>
      //   <VideoRecorder
      //     onRecordingComplete={(videoBlob: any) => {

      //       // Do something with the video...
      //       console.log('videoBlob', videoBlob)
      //     }}
      //   />
    );
  }
}
export default VideoReplies;