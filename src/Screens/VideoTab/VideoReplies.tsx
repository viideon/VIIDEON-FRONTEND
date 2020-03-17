import React from 'react';
import { ReactMediaRecorder } from "react-media-recorder";
import { render } from '@testing-library/react';

const VideoReplies = () => (
    <div>
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <video src={mediaBlobUrl!} controls loop />
          </div>
        )}
      />
    </div>
  );
export default VideoReplies;