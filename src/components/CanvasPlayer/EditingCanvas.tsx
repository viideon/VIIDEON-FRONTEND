import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import canvasTxt from "canvas-txt";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
// import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
// import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import "./style.css";

interface IProps {
  muted: boolean;
  autoPlay: boolean;
  loop: boolean;
  src: string;
  logoProps: any;
  textProps: any;
  musicProps: any;
  thumbnail?: string;
  local?: boolean;
  preview?: boolean;
  watched?: () => void;
}
interface IState {
  playing: boolean;
  video: any;
  mute: boolean;
  volumeState: string;
  showThumbnail: boolean;
  videoLoaded: boolean;
  fullScreen: boolean;
  width: number;
  height: number;
  watched: boolean;
  musicVolume: number;
}
class EditingPlayer extends React.Component<IProps, IState> {
  canvasContext: any;
  edContainer: any;
  wrapperCanvas: any;
  edCanvas: any;
  tmpCanvas: any;
  volume: any;
  seek: any;
  seekTooltip: any;
  progressBar: any;
  canvasTmpCtx: any;
  video: any;
  backgroundMusic: any;
  logo: any;
  frameRate: any;
  handleAnimationFrame: any;
  handleEnded: any;
  handleLoadedMetaData: any;
  handleWindowResize: any;
  unmounted: any;
  timeElapsed: any;
  duration: any;
  logoPosition: any;
  constructor(props: any) {
    super(props);
    this.state = {
      playing: false,
      video: null,
      mute: false,
      volumeState: "up",
      showThumbnail: true,
      videoLoaded: false,
      fullScreen: false,
      width: 0,
      height: 0,
      watched: false,
      musicVolume: 0,
    };
    this.unmounted = false;
    this.canvasContext = null;
    this.canvasTmpCtx = null;
    this.frameRate = 60;
    this.logoPosition = {
      "top-left": () => {
        let logoDimension = 0.1 * this.edCanvas.width;
        this.canvasTmpCtx.drawImage(
          this.logo,
          20,
          20,
          logoDimension,
          logoDimension
        );
      },
      "top-right": () => {
        let logoDimension = 0.1 * this.edCanvas.width;
        this.canvasTmpCtx.drawImage(
          this.logo,
          this.edCanvas.width - logoDimension - 20,
          20,
          logoDimension,
          logoDimension
        );
      },
      "bottom-right": () => {
        let logoDimension = 0.1 * this.edCanvas.width;
        this.canvasTmpCtx.drawImage(
          this.logo,
          this.edCanvas.width - logoDimension - 20,
          this.edCanvas.height - logoDimension - 20,
          logoDimension,
          logoDimension
        );
      },
      "bottom-left": () => {
        let logoDimension = 0.1 * this.edCanvas.width;
        this.canvasTmpCtx.drawImage(
          this.logo,
          20,
          this.edCanvas.height - logoDimension - 20,
          logoDimension,
          logoDimension
        );
      },
    };
    this.handleAnimationFrame = this.onAnimationFrame.bind(this);
    this.handleEnded = this.onEnded.bind(this);
    this.handleLoadedMetaData = this.onLoadedMetaData.bind(this);
    this.handleWindowResize = this.onWindowResize.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
  }
  async componentDidMount() {
    this.edContainer = this.refs.edContainer;
    this.video = document.createElement("video");
    this.backgroundMusic = this.refs.backgroundMusic;
    this.edCanvas = this.refs.edCanvas;
    this.tmpCanvas = this.refs.tempCanvas;
    this.wrapperCanvas = await this.refs.wrapperCanvas;
    this.setCanvasDimensions();
    this.volume = this.refs.volume;
    this.timeElapsed = this.refs.timeElapsed;
    this.duration = this.refs.duration;
    this.seekTooltip = this.refs.seekTooltip;
    this.seek = this.refs.seek;
    this.progressBar = this.refs.progressBar;
    this.logo = this.refs.logo;
    this.logo.crossOrigin = "Anonymous";
    //setting video properties
    this.video.height = this.state.height;
    this.video.width = this.state.width;
    this.video.style.left = "-1000%";
    this.video.style.top = "-1000%";
    this.video.style.position = "absolute";
    this.video.crossOrigin = "Anonymous";
    const { musicProps, src } = this.props;
    if (this.props.local && this.props.local === true) {
      try {
        if (musicProps && musicProps.url) {
          let musicResponse = await fetch(musicProps.url);
          let musicBlob = await musicResponse.blob();
          const musicUrl = await window.URL.createObjectURL(musicBlob);
          this.backgroundMusic.src = musicUrl;
          this.setState({ musicVolume: musicProps.musicVolume }, () =>
            this.initializeVolume()
          );
        }
        this.video.src = this.props.src;
        document.body.appendChild(this.video);
        this.canvasContext = this.edCanvas.getContext("2d");
        this.canvasTmpCtx = this.tmpCanvas.getContext("2d");
        this.setState({ videoLoaded: true });
      } catch (err) {
        console.log("error in local canvas ", err);
      }
    } else {
      try {
        if (musicProps && musicProps.url) {
          let musicResponse = await fetch(musicProps.url);
          let musicBlob = await musicResponse.blob();
          const musicUrl = await window.URL.createObjectURL(musicBlob);
          this.backgroundMusic.src = musicUrl;
          this.setState({ musicVolume: musicProps.musicVolume }, () =>
            this.initializeVolume()
          );
        }
        let videoResponse = await fetch(src);
        let videoBlob = await videoResponse.blob();
        const videoUrl = await window.URL.createObjectURL(videoBlob);
        this.video.src = videoUrl;
        document.body.appendChild(this.video);
        this.canvasContext = this.edCanvas.getContext("2d");
        this.canvasTmpCtx = this.tmpCanvas.getContext("2d");
        this.setState({ videoLoaded: true });
      } catch (err) {
        console.log("error in editing canvas", err);
      }
    }
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
      window.removeEventListener("resize", this.handleWindowResize);
    } else {
      this.video.addEventListener("ended", this.handleEnded);
      this.video.addEventListener("loadedmetadata", this.handleLoadedMetaData);
      window.addEventListener("resize", this.handleWindowResize);
      this.video.addEventListener("timeupdate", this.updateProgress);
      this.video.addEventListener("volumechange", this.updateVolumeIcon);
      this.video.addEventListener("durationchange", this.handleLoadedMetaData);
      this.seek.addEventListener("mousemove", this.updateSeekTooltip);
    }
    if (this.props.preview) {
      this.playpause();
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
    if (this.video.currentTime >= 3 && this.state.watched === false) {
      this.props.watched && this.props.watched();
      this.setState({ watched: true });
    }
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
  formatTime = (timeInSeconds: any) => {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };
  toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      this.setCanvasDimensions();
    } else {
      this.wrapperCanvas.requestFullscreen();
      this.setState({
        width: window.screen.width,
        height: window.screen.height,
      });
    }
  };

  onAnimationFrame() {
    const render = () => {
      const { textProps, logoProps } = this.props;
      const { width, height } = this.state;
      this.canvasTmpCtx.drawImage(this.video, 0, 0, width, height);
      if (logoProps && logoProps.url) {
        this.logoPosition[logoProps.position].call();
      }
      if (textProps && textProps.text) {
        this.canvasTmpCtx.fillStyle = textProps.textColor;
        canvasTxt.fontSize = (textProps.fontSize / 100) * (width - 150);
        canvasTxt.vAlign = textProps.vAlign;
        canvasTxt.align = textProps.align;
        canvasTxt.lineHeight = 20;
        canvasTxt.drawText(
          this.canvasTmpCtx,
          textProps.text,
          50,
          50,
          width - 100,
          height - 100
        );
      }
      let idata = this.canvasTmpCtx.getImageData(0, 0, width, height);
      this.canvasContext.putImageData(idata, 0, 0);
    };
    if (this.video) {
      render();
      if (this.state.playing) {
        window.requestAnimationFrame(this.handleAnimationFrame);
      }
    }
  }
  onEnded(e: any) {
    this.setState({ playing: false });
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.seek.value = 0;
    this.progressBar.value = 0;
    if (this.props.preview) {
      this.play();
    }
  }
  onLoadedMetaData(e: any) {
    let videoDuration = Math.round(this.video.duration);
    const time = this.formatTime(videoDuration);
    this.seek.setAttribute("max", videoDuration);
    this.progressBar.setAttribute("max", videoDuration);
    this.duration.innerText = `${time.minutes}:${time.seconds}`;
    this.duration.setAttribute("datetime", `${time.minutes}m ${time.seconds}s`);
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
    this.setCanvasDimensions();
  }
  playpause = () => {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  };
  pause() {
    this.video.pause();
    this.backgroundMusic.pause();
    this.setState({ playing: false });
  }
  async play() {
    this.video.play();
    this.backgroundMusic.play().catch(() => {});
    this.setState({ playing: true, showThumbnail: false });
    this.requestAnimationFrame();
  }

  setCanvasDimensions = () => {
    const persistRect = JSON.parse(
      JSON.stringify(this.edContainer.getBoundingClientRect())
    );
    this.setState({
      width: persistRect.width,
      height: this.props.preview ? persistRect.height / 2 : persistRect.height,
    });
  };
  initializeVolume = () => {
    this.video.volume = 0.5;
    this.backgroundMusic.volume = (this.state.musicVolume / 100) * 50;
  };
  setVolume = (e: any) => {
    this.video.volume = e.target.value / 100;
    this.backgroundMusic.volume =
      (this.state.musicVolume / 100) * e.target.value;
  };
  skipAhead = (event: any) => {
    let skipTo = event.target.dataset.seek
      ? event.target.dataset.seek
      : event.target.value;
    if (this.backgroundMusic.duration >= this.video.duration) {
      this.video.currentTime = skipTo;
      this.backgroundMusic.currentTime = skipTo;
    } else {
      let skipPercentage = (skipTo * 100) % this.video.duration;
      let audioToSkip = skipPercentage / this.backgroundMusic.duration;
      this.backgroundMusic.currentTime = isNaN(audioToSkip) ? 0 : audioToSkip;
      this.video.currentTime = skipTo;
    }
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
    this.pause();
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
    const { playing, showThumbnail, videoLoaded, width, height } = this.state;
    const { thumbnail, logoProps } = this.props;
    return (
      <div ref="edContainer" style={{ width: "100%", height: "100%" }}>
        <div className="wrapperCanvas" ref="wrapperCanvas">
          <canvas height={height} ref="edCanvas" width={width} />
          {showThumbnail && (
            <div className="thumbnailWrapper">
              {thumbnail && (
                <img
                  style={{
                    objectFit: "contain",
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                  src={thumbnail}
                  alt="preview"
                />
              )}
            </div>
          )}
          {this.state.videoLoaded === false && (
            <div className="videoLoadingIcon">
              <CircularProgress color="primary" />
            </div>
          )}

          <div
            className="wrapperControls"
            style={{
              display: this.props.preview && this.props.preview ? "none" : "",
            }}
          >
            <button
              onClick={this.playpause}
              className="canvasBtn"
              disabled={!videoLoaded}
            >
              {playing ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <button
              className="canvasBtn"
              onClick={this.toggleMute}
              disabled={!videoLoaded}
            >
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
              disabled={!videoLoaded}
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
                disabled={!videoLoaded}
                id="seek"
                ref="seek"
                defaultValue="0"
                min="0"
                type="range"
                step="1"
                onChange={this.skipAhead}
              />
              <div className="seek-tooltip" ref="seekTooltip">
                00:00
              </div>
            </div>
            {/* <button
              className="canvasBtn"
              onClick={this.toggleFullScreen}
              disabled={true}
              style={{ marginLeft: "auto" }}
            >
              <FullscreenIcon />
            </button> */}
          </div>
        </div>

        <canvas
          ref="tempCanvas"
          height={height}
          width={width}
          style={{ display: "none" }}
        />
        <img
          alt="logo"
          src={logoProps && logoProps.url ? logoProps.url : null}
          style={{ display: "none" }}
          ref="logo"
        />
        <audio loop style={{ display: "none" }} ref="backgroundMusic" />
      </div>
    );
  }
}
export default EditingPlayer;
