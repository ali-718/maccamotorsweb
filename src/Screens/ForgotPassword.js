import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Login, ForgotPassword } from "../Actions/AuthActions";
import { connect } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";

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

function SignIn(props) {
  const classes = useStyles();

  const [EmailError, SetEmailError] = useState(false);
  const [PasswordError, SetPasswordError] = useState(false);
  const [open, setOpen] = useState(false);
  const [Email, setEmail] = useState("");
  const [forgotPasswordSucess, setforgotPasswordSucess] = useState(false);

  useEffect(() => {
    if (props.auth.isLogin) {
      props.history.push("/");
    }
  });

  useEffect(() => {
    if (props.auth.Loading) {
      setOpen(true);
    }
    if (props.auth.forgotPasswordError) {
      SetPasswordError(true);
    }
    if (props.auth.isForgotSuccess) {
      setforgotPasswordSucess(true);
    }
    if (props.auth.Loading == false) {
      setOpen(false);
    }
  }, [props.auth.Loading]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        <form className={classes.form} noValidate>
          {forgotPasswordSucess ? (
            <h5 style={{ color: "green" }}>Email has been sent successfully</h5>
          ) : null}
          {PasswordError ? (
            <h5 style={{ color: "red" }}>Some Error Occoured</h5>
          ) : null}
          {EmailError ? (
            <h5 style={{ color: "red" }}>Please fill all fields</h5>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          {open ? (
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{ marginTop: 20 }}
            >
              <CircularProgress style={{ color: "red" }} />
            </Grid>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                setOpen(true);
                if (Email.trim() == "") {
                  SetEmailError(true);
                  setOpen(false);
                } else {
                  SetEmailError(false);
                  props.ForgotPassword(Email);
                  setOpen(false);
                }
              }}
              className={classes.submit}
            >
              Send
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { Login, ForgotPassword })(SignIn);
