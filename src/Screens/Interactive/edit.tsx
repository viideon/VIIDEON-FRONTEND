import React, { Component } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { config } from "../../config/aws";
import AWS from "aws-sdk";

import { updateJump } from "../../Redux/Actions/chatvid";
import { VideoState } from "../../Redux/Types/videos";
import { AuthState } from "../../Redux/Types/auth";
import "react-tabs/style/react-tabs.css";

import Header from "../../components/Header/Header";
import Thankyou from "./steps/Thankyou";
import { Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import "./style.css";

// stepper
import StepButton from "@material-ui/core/StepButton";

import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { ChatvidRedirectionLogics } from "../../components/SearchBar";
// end stepper

var month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const s3 = new AWS.S3(config);
type IProps = {
  auth: AuthState;
  history: any;
  videoUser: VideoState;
  chatvids: any;
  chatvid: any;
  updateStepJump: (step: any) => void;
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
  };

  componentDidMount() {
    let pathname = this.props.history.location.pathname.split("/");
    if (pathname[1] === "chatvid" && pathname[2] === "step") {
      this.setState({
        isAddStep: true,
        chatvidId: pathname[3],
        title: this.props.chatvids.selectedChatvid.name,
      });
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
              "linear-gradient(-90deg, rgb(97, 181, 179), rgb(97, 181, 179), rgb(252, 179, 23))",
          }}
        />
        <Grid container className="EditChatvidMainContainer">
          <div className="finalTabHeader">
            <CancelIcon
              className="finalCancel cursorPointer"
              onClick={() => this.props.history.push(`/chatvids/form/${_id}`)}
            />
            <Typography variant="subtitle1">{`${name} - ${date}`} </Typography>
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
      width: "100%",
      overflow: "scroll",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    completed: {
      display: "inline-block",
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const makemeSteps = (chatvid: any) => {
  var stpArray: any = [...Array(chatvid.steps.length * 2).keys()];
  var ind = 0;
  const newStepArray: any = stpArray.map((item: any, index: number) => {
    if (!(index % 2)) {
      item = chatvid.steps[ind];
      ind++;
    }
    return item;
  });
  // console.log(newStepArray)

  return newStepArray;
};

function HorizontalNonLinearStepper(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const [steps, setSteps]: any = React.useState(makemeSteps(props.chatvid));
  const [editSteps, setEditSteps]: any = React.useState({});
  // const { steps } = props.chatvid;
  const upperCaseAlp = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

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

  const handleStep = (step: number) => () => {
    console.log("steps in handle with props ", props?.chatvid?.steps);

    const index = steps.findIndex((x: any) => x == step);
    // console.log("index is ", index);
    const obj = steps[index - 1];
    // console.log("obj is ", obj);
    const newIndex = props?.chatvid?.steps.findIndex(
      (x: any) => x._id === obj._id
    );

    setActiveStep(step);
    props.history.push(`/chatvid/step/${props.chatvid._id}/${newIndex + 2}`);
  };

  const handleJump = async (stepId: any, index: number, jumpTo: number) => {
    editSteps[stepId] = { jumpTo: jumpTo };
    await setEditSteps({ ...editSteps });
    let step: any = {
      _id: stepId,
      jumpTo,
    };
    props.updateStepJump(step);
  };
  const handleChoiceJump = async (
    stepId: string,
    choiceId: string,
    choiceInd: number,
    stepInd: number,
    value: number
  ) => {
    if (!editSteps[stepId]) editSteps[stepId] = {};
    editSteps[stepId][choiceId] = {};
    editSteps[stepId][choiceId] = { jumpTo: value };
    await setEditSteps((oldSteps: any) => {
      return { ...oldSteps, ...editSteps };
    });
    let step: any = {
      _id: stepId,
      jumpChoice: {},
    };
    step.jumpChoice[choiceId] = value;
    props.updateStepJump(step);
  };

  const renderLogic = (step: any, length: number, index: number) => {
    return (
      <>
        {step.responseType === "Multiple-Choice" ? (
          step.choices.map((choice: any, ind: number) => {
            return (
              <ChatvidRedirectionLogics
                text={`If option ${upperCaseAlp[ind]} jump to`}
                onChange={(event: number) =>
                  handleChoiceJump(step._id, choice._id, ind, index, event)
                }
                choiceInd={ind}
                length={length}
                index={index}
              />
            );
          })
        ) : (
          <ChatvidRedirectionLogics
            text="Always move to "
            onChange={(event: number) => handleJump(step._id, index, event)}
            length={length}
            index={index}
          />
        )}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {/* {console.log("steps in edit", steps)} */}

        {steps &&
          steps.map((step: any, index: number) => (
            <Step key={index} style={{ marginRight: !isNaN(step) ? "4%" : "" }}>
              {console.log("step is ", step)}
              {step?.videoId?.thumbnail ? (
                <div className="thumbnaiForStepper">
                  <img
                    src={step?.videoId?.thumbnail}
                    alt="thumbnail"
                    className="thumbnail"
                  />
                </div>
              ) : (
                <>
                  <div className="stepLogicContainer">
                    {renderLogic(
                      steps[index - 1],
                      props.chatvid.steps.length,
                      index - 1
                    )}
                  </div>
                </>
              )}

              {!isNaN(step) ? (
                <StepButton
                  children={"ADD STEP"}
                  icon={<AddCircleIcon />}
                  onClick={handleStep(index)}
                  completed={true}
                />
              ) : (
                <StepButton completed={true} />
              )}
            </Step>
          ))}
        <div className="thumbnaiForStepper">
          <img
            src="/images/thankyou.png"
            alt="thumbnail"
            className="thumbnail"
          />
        </div>
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
    updateStepJump: (step: any) => dispatch(updateJump(step)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatVid);
