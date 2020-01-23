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

  const [messageType, setMessageType] = useState("");
  const [textMessage, setTextMessage] = useState(85);
  const [notificationTextMessage, setNotificationTextMessage] = useState("");

  useEffect(() => {
    if (!props.auth.isLogin) {
      props.history.push("/");
    }
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Manager Offer Page Control List
        </Typography>
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
          />
          <FormControl
            ref={inputLabel}
            variant="outlined"
            style={{ width: "100%" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={messageType}
              onChange={e => setMessageType(e.target.value)}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
            autoFocus
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
                  if (e.target.value.length == 85) {
                    console.log("ignore");
                  } else {
                    setTextMessage(minus);
                  }
                }
              }
            }}
            onChange={e => {
              if (e.target.value == 85) {
                console.log("hello");
              } else {
                setNotificationTextMessage(e.target.value);
              }
            }}
          />
          <FormHelperText>{textMessage - 1} characters</FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { Login, ForgotPassword })(Home);
