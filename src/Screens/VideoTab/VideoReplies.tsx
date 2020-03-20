import React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";
import * as Constants from '../../constants/components/videotab';

const VideoReplies = () => (
  <div>
    <ReactMediaRecorder
      video
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          <p>{status}</p>
          <button onClick={startRecording}>{Constants.START_RECORDING}</button>
          <button onClick={stopRecording}>{Constants.STOP_RECORDING}</button>
          <video src={mediaBlobUrl!} controls loop />
        </div>
      )}
    />
  </div>
);
export default VideoReplies;