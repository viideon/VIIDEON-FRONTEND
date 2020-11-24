import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/aws";
import AWS from "aws-sdk";

import { saveChatvid, addStepToChatvid } from "../../Redux/Actions/chatvid";
import { toggleSendVariable } from '../../Redux/Actions/videos';
import { VideoState } from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Header/Header";
import { Grid, Typography } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import "./style.css";


// stepper
import StepButton from '@material-ui/core/StepButton';


import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import { StepIconProps } from '@material-ui/core/StepIcon';
// end stepper


var month = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const s3 = new AWS.S3(config);
type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  chatvids: any;
  chatvid: any;
  toggleSendVariable: () => void;
  saveVideo: (video: any) => void;
  addStepToChatvid: (step: any) => void;
};

class ChatVid extends Component<IProps> {
  state = {
    step: -1,
    video: 0,
    thumbnailBlob: 0,
    thumbnailUrl: "",
    videoProgress: false,
    text: "",
    textColor: "#fff",
    fontSize: 5,
    vAlign: "top",
    align: "left",
    fitvideo: true,
    responseType: "Open-ended",
    calendar: "",
    urlRecord: "",
    title: "",
    choices: [],
    isAddStep: false,
    chatvidId: "",
  }

  componentDidMount() {
    let pathname = this.props.history.location.pathname.split('/');
    if (pathname[1] === "chatvid" && pathname[2] === "step") {
      this.setState({ isAddStep: true, chatvidId: pathname[3], title: this.props.chatvids.selectedChatvid.name })
    }
  }

  render() {
    const { name, createdAt, _id, steps } = this.props.chatvid;
    var date: any = new Date(createdAt);
    date = `${month[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
    return (
      <>
        <Header
          styles={{
            backgroundImage:
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))"
          }}
        />
        <Grid container className="EditChatvidMainContainer">
          <div className="finalTabHeader">
            <CancelIcon className="finalCancel cursorPointer" onClick={() => this.props.history.push(`/chatvids/form/${_id}`)} />
            <Typography variant="subtitle1" >{`${name} - ${date}`} </Typography>
          </div>
          <div className="stepperWrapperContainer">
            {/* {
              steps.map((step: any, ind: number) => {
                return (
                  <div className="thumbnaiForStepper">
                    <img src={step?.videoId?.thumbnail} alt="thumbnail" className="thumbnail" />
                  </div>
                )
              })
            } */}
            <HorizontalNonLinearStepper {...this.props} />
          </div>
        </Grid>
      </>
    );
  }
}

// Stepper  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: 'inline-block',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);


const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}


const makemeSteps = (chatvid: any) => {
  var stpArray: any = [...Array((chatvid.steps.length * 2 + 1)).keys()]
  var ind = 0
  const newStepArray: any = stpArray.map((item: any, index: number) => {
    if (!(index % 2)) {
      item = chatvid.steps[ind];
      ind++;
    }
    return item;
  })
  console.log(newStepArray)

  return newStepArray
}

function HorizontalNonLinearStepper(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});
  const [steps, setSteps]: any = React.useState(makemeSteps(props.chatvid))
  // const { steps } = props.chatvid;

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step: any, i: number) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps && steps.map((step: any, index: number) => (
          <Step key={index}>
            {step?.videoId?.thumbnail &&
              <div className="thumbnaiForStepper">
                <img src={step?.videoId?.thumbnail} alt="thumbnail" className="thumbnail" />
              </div>
            }
            {!isNaN(step) ?
              <StepButton icon={<VideoLabelIcon />} onClick={handleStep(index)} completed={true} />
              :
              <StepButton children={index} completed={true} />

            }
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
    videoUser: state.video,
    savedVideoId: state.video.savedVideoId,
    progressEmail: state.video.progressEmail,
    chatvids: state.chatvids,
    chatvid: state.chatvids.selectedChatvid,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    saveVideo: (chatvid: any) => dispatch(saveChatvid(chatvid)),
    addStepToChatvid: (step: any) => dispatch(addStepToChatvid(step)),
    toggleSendVariable: () => dispatch(toggleSendVariable()),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatVid);
