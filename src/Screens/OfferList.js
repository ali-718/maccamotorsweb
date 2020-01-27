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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const [emptyError, setEmptyError] = useState(false);
  const [axiosError, setAxiosError] = useState(false);
  const [data, setData] = useState([]);

  const Search = validOffer => {
    if (startDate == "" || endDate == "") {
      setEmptyError(true);
    } else {
      setEmptyError(false);
      axios
        .get(
          `${url}/GetOfferList?ShowValidOffer=${validOffer}&StartDate=${
            validOffer == "Y" ? "-" : moment(startDate).format("DD-MMM-YYYY")
          }&EndDate=${
            validOffer == "Y" ? "-" : moment(endDate).format("DD-MMM-YYYY")
          }`
        )
        .then(res => {
          setData(res.data);
        })
        .catch(e => {
          setAxiosError(true);
        });
    }
  };

  useEffect(() => {
    if (!props.auth.isLogin) {
      props.history.push("/");
    }
  });

  return (
    <Container component="main" maxWidth="lg">
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

          {emptyError ? (
            <h3 style={{ color: "red" }}>Please fill all fields</h3>
          ) : axiosError ? (
            <h3 style={{ color: "red" }}>
              Some error occoured please try again later
            </h3>
          ) : null}

          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                Search("N");
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress color="red" /> : "Show date wise"}
            </Button>
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => {
                e.preventDefault();
                Search("Y");
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress color="red" />
              ) : (
                "show valid offer"
              )}
            </Button>
          </div>
        </form>

        {/* body starts */}
        {/* body ends */}
      </div>
      {data.length > 0 ? (
        <Table
          className={classes.table}
          aria-label="a dense table"
          size="medium"
        >
          <TableHead>
            <TableRow style={{ backgroundColor: "#3F51B5", color: "white" }}>
              <TableCell style={{ color: "white" }} align="center">
                Offer Id
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Offer Type
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Notification Text
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Notification Last Line
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Full Message
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Full Message Lastline
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Start Date
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                End Date
              </TableCell>
              <TableCell style={{ color: "white" }} align="center">
                Image
              </TableCell>
              <TableCell style={{ color: "white" }} align="center"></TableCell>
              <TableCell style={{ color: "white" }} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <TableRow key={row.PromId}>
                <TableCell padding="none" align="center">
                  {row.PromId}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.Rmk}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.Dsc}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.DscLst}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.OfferDsc}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.OfferDscLst}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.StrtDate.slice(0, 10)}
                </TableCell>
                <TableCell padding="none" align="center">
                  {row.EndDate.slice(0, 10)}
                </TableCell>
                <TableCell padding="none" align="center">
                  <img src={row.ImgURL} style={{ width: 100, height: 100 }} />
                </TableCell>
                <TableCell padding="default" align="center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => {
                      e.preventDefault();
                      Search("Y");
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress color="red" /> : "Resend"}
                  </Button>
                </TableCell>
                <TableCell padding="default" align="center">
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => {
                      e.preventDefault();
                      Search("Y");
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress color="red" /> : "Close"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Offers);
