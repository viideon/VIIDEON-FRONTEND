import React from 'react';

function Editing() {
  return (
    <div className="video-container">

      <iframe
        title="primaryWorkVideo"
        id="videoStyle"
        src={"https://dubb.sfo2.digitaloceanspaces.com/videos/2019-12-14/3c415fc72253774eb51c19f956057cf0/720p_PWvT.mp4"}
        frameBorder="0"
        allow="fullscreen"
        style={{ background: 'transparent', width: '100%', padding: '10%', paddingTop: '2%', height: '80%' }}>
      </iframe>
    </div>
  );
}
export default Editing;