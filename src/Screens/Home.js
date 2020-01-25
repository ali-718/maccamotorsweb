import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Login, ForgotPassword } from "../Actions/AuthActions";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import axios from "axios";
import { url } from "../config";
import moment from "moment";
import { ImagePicker } from "react-file-picker";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Home(props) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false);
  const [notificationId, setNotificationId] = useState("");
  const [axiosSuccess, setaxiosSuccess] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [messageType, setMessageType] = useState("");
  const [notificationTextMessage, setNotificationTextMessage] = useState("");
  const [fullTextMessage, setFullTextMessage] = useState("");
  const [notificationLastLine, setNotificationLastLine] = useState("");
  const [fullLastLine, setFullLastLine] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [axiosError, setAxiosError] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);

  const [textMessage, setTextMessage] = useState(85);
  const [fullMessage, setFullMessage] = useState(100);
  const [lastLine, setLastLine] = useState(50);
  const [fullLine, setFullLine] = useState(50);

  const ClearData = () => {
    setaxiosSuccess(false);
    setAxiosError(false);
    setImageUploadError(false);
    setImageUploadSuccess(false);
    setIsLoading(false);
    setShowImage(false);
    setImage("");
    setNotificationId("");
    setStartTime("");
    setEndTime("");
    setEndDate();
    setStartDate("");
    setMessageType("");
    setNotificationTextMessage("");
    setFullTextMessage("");
    setNotificationLastLine("");
    setFullLastLine("");
  };

  const SaveImage = () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("file", image);

    axios
      .post(`${url}/UploadFile?PromId=${notificationId}`, data)
      .then(res => {
        setaxiosSuccess(false);
        setAxiosError(false);
        setImageUploadError(false);
        setImageUploadSuccess(true);
        setIsLoading(false);
        console.log(res);
      })
      .catch(e => {
        setaxiosSuccess(false);
        setAxiosError(false);
        setImageUploadError(true);
        setImageUploadSuccess(false);
        setIsLoading(false);
        setEmptyError(false);
      });
  };

  const Save = () => {
    setIsLoading(true);
    if (
      startTime == "" ||
      endTime == "" ||
      startDate == "" ||
      endDate == "" ||
      messageType.trim() == "" ||
      notificationTextMessage.trim() == "" ||
      fullTextMessage.trim() == "" ||
      notificationLastLine.trim() == "" ||
      fullLastLine.trim() == ""
    ) {
      setEmptyError(true);
      setIsLoading(false);
    } else {
      setEmptyError(false);
      console.log(moment(startTime).local());
      console.log(moment(startTime).format("hh:mm:ss"));
      console.log(moment(startDate).format("DD-MMM-YYYY"));
      console.log(endDate);
      axios
        .post(
          `${url}/SaveOffer?NotiMsg=${notificationTextMessage}&NotiMsgLstLine=${notificationLastLine}&FullTextMsg=${fullTextMessage}&FullTextMsgLstLine=${fullLastLine}&StartDate=${moment(
            startDate
          ).format("DD-MMM-YYYY")}&StartTime=${moment(startTime).format(
            "hh:mm:ss"
          )}&EndDate=${moment(endDate).format("DD-MMM-YYYY")}&Endtime=${moment(
            endTime
          ).format("hh:mm:ss")}&PromType=${messageType}`
        )
        .then(res => {
          setIsLoading(false);
          setaxiosSuccess(true);
          setAxiosError(false);
          setImageUploadError(false);
          setImageUploadSuccess(false);
          console.log("saved successfully");
          console.log(res.data.MsgText);
          setNotificationId(res.data.MsgText);
          setShowImage(true);
        })
        .catch(e => {
          setAxiosError(true);
          setIsLoading(false);
        });
    }
  };

  const getDropDownList = () => {
    axios.get(`${url}/GetOfferTypeList`).then(res => {
      setDropDownList(res.data);
    });
  };

  useEffect(() => {
    if (!props.auth.isLogin) {
      props.history.push("/");
    }
    getDropDownList();
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Container component="main" maxWidth="md">
      {/* <CssBaseline /> */}
      <div style={{ marginTop: 0 }} className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="notification"
            label="Notification ID"
            name="Notification ID"
            autoFocus
            disabled={true}
            value={notificationId}
          />
          <FormControl
            ref={inputLabel}
            variant="outlined"
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Message Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={messageType}
              onChange={e => setMessageType(e.target.value)}
              labelWidth={labelWidth}
              autoFocus
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {dropDownList.map(item => (
                <MenuItem value={item.OfferTypeId}>
                  <em>{item.OfferTypeDsc}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Notification Text Message"
            name="message"
            value={notificationTextMessage}
            onKeyDown={e => {
              var key = e.keyCode || e.charCode;
              var char = textMessage;
              var minus = Math.abs(textMessage - 1);
              var plus = Math.abs(textMessage + 1);

              if (notificationTextMessage == "") {
                console.log("bakers");
              } else {
                if (key == 8) {
                  setTextMessage(plus);
                } else {
                  setTextMessage(minus);
                }
              }
            }}
            onChange={e => {
              if (e.target.value.length == 85) {
                console.log("hello");
              } else {
                setNotificationTextMessage(e.target.value);
              }
            }}
          />
          <FormHelperText>
            {textMessage - 1 == -1 ? 0 : textMessage - 1} characters
          </FormHelperText>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Notification Last Line"
            name="message"
            value={notificationLastLine}
            onKeyDown={e => {
              var key = e.keyCode || e.charCode;
              var char = lastLine;
              var minus = Math.abs(lastLine - 1);
              var plus = Math.abs(lastLine + 1);

              if (notificationLastLine == "") {
                console.log("bakers");
              } else {
                if (key == 8) {
                  setLastLine(plus);
                } else {
                  setLastLine(minus);
                }
              }
            }}
            onChange={e => {
              if (e.target.value.length == 50) {
                console.log("hello");
              } else {
                setNotificationLastLine(e.target.value);
              }
            }}
          />
          <FormHelperText>
            {lastLine - 1 == -1 ? 0 : lastLine - 1} characters
          </FormHelperText>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Full Text Message"
            name="message"
            value={fullTextMessage}
            onKeyDown={e => {
              var key = e.keyCode || e.charCode;
              var char = fullMessage;
              var minus = Math.abs(fullMessage - 1);
              var plus = Math.abs(fullMessage + 1);

              if (fullTextMessage == "") {
                console.log("bakers");
              } else {
                if (key == 8) {
                  setFullMessage(plus);
                } else {
                  setFullMessage(minus);
                }
              }
            }}
            onChange={e => {
              if (e.target.value.length == 100) {
                console.log("hello");
              } else {
                setFullTextMessage(e.target.value);
              }
            }}
          />
          <FormHelperText>
            {fullMessage - 1 == -1 ? 0 : fullMessage - 1} characters
          </FormHelperText>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="message"
            label="Full Message Last Line"
            name="message"
            value={fullLastLine}
            onKeyDown={e => {
              var key = e.keyCode || e.charCode;
              var char = fullLine;
              var minus = Math.abs(fullLine - 1);
              var plus = Math.abs(fullLine + 1);

              if (fullLastLine == "") {
                console.log("bakers");
              } else {
                if (key == 8) {
                  setFullLine(plus);
                } else {
                  setFullLine(minus);
                }
              }
            }}
            onChange={e => {
              if (e.target.value.length == 100) {
                console.log("hello");
              } else {
                setFullLastLine(e.target.value);
              }
            }}
          />
          <FormHelperText>
            {fullLine - 1 == -1 ? 0 : fullLine - 1} characters
          </FormHelperText>

          <Grid container lg={12}>
            <Grid style={{ margin: 10 }} md={2}>
              <p style={{ marginBottom: 0 }}>Start Date</p>
              <DatePicker
                selected={startDate}
                onChange={e => setStartDate(e)}
              />
            </Grid>
            <Grid style={{ margin: 10 }} md={2}>
              <p style={{ marginBottom: 0 }}>End Date</p>
              <DatePicker selected={endDate} onChange={e => setEndDate(e)} />
            </Grid>
            <Grid style={{ margin: 10 }} md={2}>
              <p style={{ marginBottom: 0 }}>Start Time</p>
              <TimePicker
                use12Hours
                value={startTime}
                onChange={e => setStartTime(e)}
                showSecond={false}
              />
            </Grid>
            <Grid style={{ margin: 10 }} md={2}>
              <p style={{ marginBottom: 0 }}>End Time</p>
              <TimePicker
                use12Hours
                onChange={e => setEndTime(e)}
                showSecond={false}
                value={endTime}
              />
            </Grid>
          </Grid>

          {showImage ? (
            <input
              style={{ fontSize: 20, marginTop: 20 }}
              onChange={e => {
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
              type="file"
              placeholder="Choose your image"
              id="file"
            />
          ) : null}

          {emptyError ? (
            <h3 style={{ color: "red" }}>Please fill all fields</h3>
          ) : axiosError ? (
            <h3 style={{ color: "red" }}>
              Some error occoured please try again later
            </h3>
          ) : axiosSuccess ? (
            <h3 style={{ color: "green" }}>
              Notification Id generated successfully
            </h3>
          ) : imageUploadSuccess ? (
            <h3 style={{ color: "green" }}>Image uploaded successfully</h3>
          ) : imageUploadError ? (
            <h3 style={{ color: "red" }}>
              Some error occoured please try again later
            </h3>
          ) : null}

          {image == "" ? (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  Save();
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress color="red" /> : "Save"}
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  ClearData();
                }}
                disabled={isLoading}
              >
                Clear Fields
              </Button>
            </div>
          ) : (
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  SaveImage();
                }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress color="red" /> : "upload"}
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={e => {
                  e.preventDefault();
                  ClearData();
                }}
                disabled={isLoading}
              >
                Clear Fields
              </Button>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
