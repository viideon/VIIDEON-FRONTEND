import React from "react";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
// import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import axios from "axios";
import canvasTxt from "canvas-txt";
import "./style.css";

interface IProps {
  width: any;
  height: any;
  muted: boolean;
  autoPlay: boolean;
  loop: boolean;
  src: string;
  logoProps: any;
  textProps: any;
  thumbnail?: string;
}
interface IState {
  playing: boolean;
  video: any;
  mobile: boolean;
  mute: boolean;
  volumeState: string;
  showThumbnail: boolean;
}
class Player extends React.Component<IProps, IState> {
  canvasContext: any;
  container: any;
  canvas: any;
  volume: any;
  seek: any;
  seekTooltip: any;
  progressBar: any;
  canvasTmpCtx: any;
  video: any;
  logo: any;
  frameRate: any;
  handleAnimationFrame: any;
  handleEnded: any;
  handleLoadedMetaData: any;
  handleWindowResize: any;
  timestamp: any;
  unmounted: any;
  timeElapsed: any;
  duration: any;
  logoPosition: any;
  constructor(props: any) {
    super(props);
    this.state = {
      playing: false,
      video: null,
      mobile: this.isMobile(),
      mute: false,
      volumeState: "up",
      showThumbnail: true
    };
    this.timestamp = null;
    this.unmounted = false;
    this.canvasContext = null;
    this.canvasTmpCtx = null;
    this.frameRate = 60;
    this.logoPosition = {
      "top-left": () => {
        this.canvasTmpCtx.drawImage(this.logo, 10, 10);
      },
      "top-right": () => {
        this.canvasTmpCtx.drawImage(
          this.logo,
          this.canvas.width - this.logo.width - 10,
          10
        );
      },
      "bottom-right": () => {
        this.canvasTmpCtx.drawImage(
          this.logo,
          this.canvas.width - this.logo.width - 10,
          this.canvas.height - this.logo.height - 10
        );
      },
      "bottom-left": () => {
        this.canvasTmpCtx.drawImage(
          this.logo,
          10,
          this.canvas.height - this.logo.height - 10
        );
      }
    };
    this.handleAnimationFrame = this.onAnimationFrame.bind(this);
    this.handleEnded = this.onEnded.bind(this);
    this.handleLoadedMetaData = this.onLoadedMetaData.bind(this);
    this.handleWindowResize = this.onWindowResize.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }
  componentDidMount() {
    this.video = document.createElement("video");
    this.canvas = this.refs.canvas;
    let tmpCanvas: any = this.refs.tempCanvas;
    this.volume = this.refs.volume;
    this.container = this.refs.container;
    this.timeElapsed = this.refs.timeElapsed;
    this.duration = this.refs.duration;
    this.seekTooltip = this.refs.seekTooltip;
    this.seek = this.refs.seek;
    this.progressBar = this.refs.progressBar;
    this.logo = this.refs.logo;
    this.logo.crossOrigin = "Anonymous";
    //setting height /width and hiding video element
    axios({
      url: this.props.src,
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      this.video.height = this.props.height;
      this.video.style.left = "-1000%";
      this.video.style.position = "absolute";
      this.video.style.top = "-1000%";
      this.video.width = this.props.width;
      this.video.src = url;
      this.video.crossOrigin = "Anonymous";
      document.body.appendChild(this.video);
      this.canvasContext = this.canvas.getContext("2d");
      this.canvasTmpCtx = tmpCanvas.getContext("2d");
    });

    setTimeout(() => {
      this.setupListeners();
    }, 0);
  }
  setupListeners(remove?: any) {
    if (remove || this.unmounted) {
      this.video.removeEventListener("ended", this.handleEnded);
      this.video.removeEventListener(
        "loadedmetadata",
        this.handleLoadedMetaData
      );
      this.seek.removeEventListener("mousemove", this.updateSeekTooltip);
      this.video.removeEventListener("timeupdate", this.updateProgress);
      this.video.removeEventListener("volumechange", this.updateVolumeIcon);
      this.video.removeEventListener(
        "durationchange",
        this.handleLoadedMetaData
      );
      // window.removeEventListener("resize", this.handleWindowResize);
    } else {
      this.video.addEventListener("ended", this.handleEnded);
      this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
      // window.addEventListener("resize", this.handleWindowResize);
      this.video.addEventListener("timeupdate", this.updateProgress);
      this.video.addEventListener("volumechange", this.updateVolumeIcon);
      this.video.addEventListener("durationchange", this.handleLoadedMetaData);
      this.seek.addEventListener("mousemove", this.updateSeekTooltip);
    }
  }
  updateSeekTooltip = (event: any) => {
    const skipTo = Math.round(
      (event.offsetX / event.target.clientWidth) *
        parseInt(event.target.getAttribute("max"), 10)
    );

    this.seek.setAttribute("data-seek", skipTo);
    const t = this.formatTime(skipTo);
    this.seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = this.progressBar.getBoundingClientRect();
    this.seekTooltip.style.left = `${event.pageX - rect.left}px`;
  };
  updateProgress = () => {
    let time = this.formatTime(Math.round(this.video.currentTime));
    this.timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    this.timeElapsed.setAttribute(
      "datetime",
      `${time.minutes}m ${time.seconds}s`
    );
    this.seek.value = Math.floor(this.video.currentTime);
    this.progressBar.value = Math.floor(this.video.currentTime);
  };
  updateVolumeIcon = () => {
    if (this.video.muted || this.video.volume === 0) {
      this.setState({ volumeState: "muted" });
    } else if (this.video.volume > 0 && this.video.volume <= 0.5) {
      this.setState({ volumeState: "down" });
    } else {
      this.setState({ volumeState: "up" });
    }
  };
  isMobile() {
    return window.innerWidth <= 768;
  }
  formatTime = (timeInSeconds: any) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2)
    };
  };
  toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.requestFullscreen();
    }
  };
  onAnimationFrame() {
    // const { mobile } = this.state;
    const render = () => {
      let { width, height, textProps, logoProps } = this.props;
      this.canvasTmpCtx.drawImage(this.video, 0, 0, width, height);

      if (logoProps.url !== "" && logoProps.url !== undefined) {
        this.logoPosition[logoProps.position].call();
      }
      //Draw text using canvas-txt
      if (textProps.text !== "" && textProps.text !== undefined) {
        this.canvasTmpCtx.fillStyle = textProps.textColor;
        canvasTxt.fontSize = textProps.fontSize;
        canvasTxt.vAlign = textProps.vAlign;
        canvasTxt.align = textProps.align;
        canvasTxt.lineHeight = 20;
        canvasTxt.drawText(
          this.canvasTmpCtx,
          textProps.text,
          5,
          5,
          width - 10,
          height - 10
        );
      }

      let idata = this.canvasTmpCtx.getImageData(0, 0, width, height);
      this.canvasContext.putImageData(idata, 0, 0);
    };
    if (this.video) {
      // if (mobile) {
      //   //   let timestamp = Date.now();
      //   //   let elapsed = (timestamp - this.timestamp) / 1000;
      //   //   this.timestamp = timestamp;
      //   //   if (elapsed >= 1 / this.frameRate) {
      //   //     if (this.video.currentTime >= this.video.duration) {
      //   //       if (this.props.loop) {
      //   //         this.video.currentTime = 0;
      //   //       } else {
      //   //         this.pause();
      //   //       }
      //   //     } else {
      //   //       this.video.currentTime = Math.min(
      //   //         this.video.currentTime + elapsed,
      //   //         this.video.duration
      //   //       );
      //   //     }
      //   render();
      // } else {
      //   render();
      // }
      render();
      if (this.state.playing) {
        window.requestAnimationFrame(this.handleAnimationFrame);
        // this.requestAnimationFrame();
      }
    }
  }
  onEnded(e: any) {
    if (!this.props.loop) {
      this.setState({ playing: false });
    }
    this.progressBar.value = 0;
  }
  onLoadedMetaData(e: any) {
    let videoDuration = Math.round(this.video.duration);
    const time = this.formatTime(videoDuration);
    this.seek.setAttribute("max", videoDuration);
    this.progressBar.setAttribute("max", videoDuration);
    this.duration.innerText = `${time.minutes}:${time.seconds}`;
    this.duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
    if (this.props.autoPlay) {
      this.play();
    }
  }
  requestAnimationFrame() {
    if (!this.unmounted) {
      if (typeof window.requestAnimationFrame == "function") {
        window.requestAnimationFrame(this.handleAnimationFrame);
      } else {
        setTimeout(() => {
          this.handleAnimationFrame();
        }, 5);
      }
    }
  }
  onWindowResize(e: any) {
    const mobile = this.isMobile();

    if (mobile && !this.state.mobile) {
      this.video.muted = "muted";
    } else if (!mobile && this.state.mobile) {
      if (!this.props.muted) {
        this.video.muted = null;
      }
    }
    this.setState({ mobile });
  }
  playpause = () => {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  };
  pause() {
    const { mobile } = this.state;
    if (!mobile) {
      this.video.pause();
    }
    this.setState({ playing: false });
  }
  play() {
    const { mobile } = this.state;
    if (!mobile) {
      this.video.play();
    }
    this.setState({ playing: true, showThumbnail: false });
    this.timestamp = Date.now();
    this.requestAnimationFrame();
  }
  setVolume = (e: any) => {
    this.video.volume = e.target.value / 100;
  };
  skipAhead = (event: any) => {
    let skipTo = event.target.dataset.seek
      ? event.target.dataset.seek
      : event.target.value;
    this.video.currentTime = skipTo;
    this.progressBar.value = skipTo;
    this.seek.value = skipTo;
  };
  toggleMute = () => {
    this.video.muted = !this.video.muted;

    if (this.video.muted) {
      this.volume.setAttribute("data-volume", this.volume.value);
      this.volume.value = 0;
      this.setState({ volumeState: "muted" });
    } else {
      this.volume.value = this.volume.dataset.volume;
    }
  };
  componentWillUnmount() {
    this.setupListeners(true);
  }
  renderVolumeBtn = () => {
    switch (this.state.volumeState) {
      case "muted":
        return <VolumeOffIcon />;
      case "up":
        return <VolumeUpIcon />;
      case "down":
        return <VolumeDownIcon />;
      default:
        return;
    }
  };
  render() {
    const { playing, showThumbnail } = this.state;
    const { thumbnail, logoProps } = this.props;
    return (
      <div ref="container">
        <div className="wrapperCanvas" style={{ width: this.props.width }}>
          <canvas
            height={this.props.height}
            ref="canvas"
            width={this.props.width}
          />
          {showThumbnail && (
            <div className="thumbnailWrapper">
              {thumbnail && (
                <img
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%"
                  }}
                  src={thumbnail}
                  alt="preview"
                />
              )}
            </div>
          )}
          <div className="wrapperControls">
            <button onClick={this.playpause} className="canvasBtn">
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <button className="canvasBtn" onClick={this.toggleMute}>
              {this.renderVolumeBtn()}
            </button>
            <input
              className="volume canvasVol"
              ref="volume"
              type="range"
              min="0"
              max="100"
              step="1"
              onChange={this.setVolume}
            ></input>

            <div className="time">
              <time ref="timeElapsed">00:00</time>
              <span className="slashTime"> / </span>
              <time ref="duration">00:00</time>
            </div>
            <div className="video-progress">
              <progress
                id="progress-bar"
                ref="progressBar"
                value="0"
              ></progress>
              <input
                className="seek"
                id="seek"
                ref="seek"
                value="0"
                min="0"
                type="range"
                step="1"
                onChange={this.skipAhead}
              />
              <div className="seek-tooltip" ref="seekTooltip">
                00:00
              </div>
            </div>
            <button className="canvasBtn" onClick={this.toggleFullScreen}>
              <FullscreenIcon />
            </button>
          </div>
        </div>

        <canvas
          ref="tempCanvas"
          height={this.props.height}
          width={this.props.width}
          style={{ display: "none" }}
        />
        <img
          alt="logo"
          src={logoProps.url ? logoProps.url : null}
          style={{ display: "none" }}
          ref="logo"
        />
      </div>
    );
  }
}
export default Player;
