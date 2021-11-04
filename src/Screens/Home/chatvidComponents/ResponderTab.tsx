import React, { Component } from "react";

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import PermMediaIcon from "@material-ui/icons/PermMedia";

function sortByResponse(data: any) {
  let chatvidsorted: any = data?.sort((a: any, b: any) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
  return chatvidsorted;
}
const ResponderTab = (props: any) => {
  const [stp, setStp]: any = React.useState(undefined);
  const [stpIndex, setIndex]: any = React.useState(0);
  const [resPerson, setPerson] = React.useState("");
  const [activeType, setActiveType] = React.useState(0);
  const handlecheck = (_id: any) => {
    setPerson(_id);
    const step = props.chatvid?.steps[0];

    console.log("stp", stp);
    // console.log("responsePerson", responsePerson);
    // console.log("single chatvid", props.chatvid);

    props.chatvid?.steps.map((step: any) => {
      if (step.responseType === "Multiple-Choice") {
        if (step.replies.length > 0) return setStp((step = step || undefined));
      }
      if (step.responseType === "Open-ended") {
        const responsePerson = step?.replies?.filter(
          (reply: any) => reply?.peopleId?._id === resPerson
        );
        console.log("responsePerson", responsePerson);
        responsePerson?.map((reply: any) => {
          console.log("reply", reply);
          if (reply.type == "text") return setActiveType(1);
          if (reply.type == "audio") return setActiveType(2);
          if (reply.type == "video") return setActiveType(3);
        });
      }
    });
    setStp(step);
  };

  const renderCard = (
    chatName: string,
    userName: string,
    date: any,
    _id: string
  ) => {
    date = new Date(date);
    return (
      <Grid
        container
        key={_id}
        className={`respondersCardWrapper ${resPerson === _id &&
          "activeResponder"}`}
        style={{ background: "#f2f2f2" }}
        onClick={() => {
          handlecheck(_id);
        }}
      >
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="avatarWrapper">
            <PersonOutlineIcon />
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={10} lg={10} className="resCardBody">
          <Typography variant="subtitle1" className="responderName">
            {userName || "Maisha Pace"}
          </Typography>
          <Typography variant="subtitle1" className="resDetials">
            {`${chatName} - ${date.toLocaleString()}`}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const handleTabChange = (number: number) => {
    setActiveType(number);
  };

  const renderResponse = (tab: number) => {
    const type = tab === 1 ? "text" : tab === 2 ? "audio" : "video";
    const res = stp.replies?.filter(
      (reply: any) => reply?.peopleId?._id === resPerson && reply.type === type
    );
    return (
      <>
        {res.map((r: any, i: number) => {
          return (
            <>
              {type === "text" ? (
                <div style={{ padding: "1%" }}>
                  <Typography variant="body2">{r.text}</Typography>
                </div>
              ) : type === "audio" ? (
                <div>
                  <audio controls>
                    <source src={r.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div style={{ padding: "1%" }}>
                  <video src={r.url} controls width={"100%"} />
                </div>
              )}
            </>
          );
        })}
      </>
    );
  };

  const renderChoices = (choice: any, ind: number, repl: any) => {
    const { replies } = choice;
    let isActive = false;
    replies?.filter((reply: any) => {
      if (reply.peopleId === resPerson) {
        isActive = true;
      }
      return reply;
    });
    return (
      <div className={`_choiceOption ${isActive && "chosed"}`} key={ind}>
        <Typography variant="h5"> {choice.text} </Typography>
      </div>
    );
  };
  const handleStep = (step: any, ind: any) => {
    // console.log("resPerson in step", resPerson);
    setStp(step);
    setIndex(ind);
    if (step.responseType === "Open-ended") {
      const responsePerson1 = step?.replies?.filter(
        (reply: any) => reply?.peopleId?._id === resPerson
      );
      responsePerson1?.map((reply: any) => {
        // console.log(reply);
        if (reply.type == "text") return setActiveType(1);
        if (reply.type == "audio") return setActiveType(2);
        if (reply.type == "video") return setActiveType(3);
      });
    }
  };
  let unique: any = {};
  const responders: any = props.chatvid.people?.filter(
    (person: any, index: number) => {
      if (!unique[person._id]) {
        unique[person._id] = person;
        return person;
      }
    }
  );
  return (
    <>
      <Grid item className="responderWrapper" xs={12} sm={12} md={4} lg={4}>
        <Paper
          style={{
            ...classes.root,
            overflow: "hidden",
            height: "36px",
            border: "none",
            marginBottom: "3%",
            background: "#f2f2f2",
            width: "90%",
          }}
        >
          <IconButton
            type="submit"
            style={{ ...classes.iconButton, background: "grey" }}
            aria-label="search chatvid..."
          >
            <LocalOfferIcon />
          </IconButton>
          <InputBase
            style={{ ...classes.input, background: "#f2f2f2" }}
            inputProps={{ "aria-label": "search chatvids" }}
          />
          <IconButton
            type="submit"
            style={{
              ...classes.iconButton,
              background: "#f2f2f2",
              color: "grey",
            }}
            aria-label="search chatvid..."
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Paper>
        {/* {console.log("responder length", responders)} */}
        {sortByResponse(responders)?.map((person: any, ind: number) => {
          return renderCard(
            props.chatvid.name,
            person.name,
            person.updatedAt,
            person._id
          );
        })}
      </Grid>
      <Grid item className="_responseWrapper" xs={12} sm={12} md={8} lg={8}>
        {resPerson && (
          <div className="_stepsCirclesWrapper">
            {props.chatvid?.steps?.map((step: any, ind: number) => {
              return (
                <>
                  <div
                    className="stepAvatarWrapper"
                    style={{ opacity: step === stp ? 1 : 0.6 }}
                    onClick={() => {
                      handleStep(step, ind);
                    }}
                  >
                    <Typography variant="h4"> STEP </Typography>
                    <Typography variant="h1"> {ind + 1} </Typography>
                  </div>
                </>
              );
            })}
          </div>
        )}
        {stp && (
          <Grid container className="_stepsDetailsWrapper">
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              className="_stepsDetailsHeader"
            >
              <div className="_stepTYPEandIcon">
                <PermMediaIcon />
                <Typography variant="h3"> {stp.responseType} </Typography>
              </div>
              <div className="_step_NO">
                <div className="_whiteCircle"> {stpIndex + 1} </div>
              </div>
            </Grid>
            <Grid container className="_stepsDetailsBody">
              {stp.responseType === "Open-ended" && (
                <Grid
                  item
                  xs={12}
                  sm={2}
                  md={2}
                  lg={2}
                  className="optionDiv"
                  style={{ overflow: "unset" }}
                >
                  <div
                    className={`IconWrapper ${activeType === 1 &&
                      "activeIcon"}`}
                    onClick={() => {
                      handleTabChange(1);
                    }}
                  >
                    <Typography variant="h1">Tt</Typography>
                    <Typography variant="subtitle1"> Text </Typography>
                  </div>
                  <div
                    className={`IconWrapper ${activeType === 2 &&
                      "activeIcon"}`}
                    onClick={() => {
                      handleTabChange(2);
                    }}
                  >
                    <VolumeUpRoundedIcon />
                    <Typography variant="subtitle1"> Audio </Typography>
                  </div>
                  <div
                    className={`IconWrapper ${activeType === 3 &&
                      "activeIcon"}`}
                    onClick={() => {
                      handleTabChange(3);
                    }}
                  >
                    <VideocamRoundedIcon />
                    <Typography variant="subtitle1"> Video </Typography>
                  </div>
                </Grid>
              )}

              {/*  */}
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={8}
                className="_stepsDetailsResWrapper"
              >
                {stp.responseType === "Open-ended"
                  ? renderResponse(activeType)
                  : stp.responseType === "Multiple-Choice"
                  ? stp.choices.map((choice: any, index: number) => {
                      return renderChoices(choice, index, stp.replies);
                    })
                  : ""}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};
const classes = {
  root: {
    display: "flex",
    marginTop: "1em",
    alignItems: "center",
    width: "100%",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#fdb415",
  },
  input: {
    flex: 1,
    marginLeft: "1em",
    color: "#406c7f",
    fontFamily: "Open Sans",
  },
  iconButton: {
    padding: 10,
    borderRadius: 0,
    background: "#fdb415",
    color: "white",
  },
};
export default ResponderTab;
