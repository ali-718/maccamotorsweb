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

function Offers(props) {
  const classes = useStyles();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!props.auth.isLogin) {
      props.history.push("/");
    }
  });

  return (
    <Container component="main" maxWidth="md">
      {/* <CssBaseline /> */}
      <div style={{ marginTop: 0 }} className={classes.paper}>
        <form className={classes.form} noValidate>
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
          </Grid>

          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              //   onClick={e => {
              //     e.preventDefault();
              //     Save();
              //   }}
              disabled={isLoading}
            >
              {/* {isLoading ? <CircularProgress color="red" /> : "Save"} */}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Offers);
