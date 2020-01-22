import React, { Component } from "react";
import axios from "axios";
import { Grid, Container } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Logo from "../assets/Logo.jpeg";
import { Link } from "react-router-dom";

export default class SplashScreen extends Component {
  render() {
    return (
      <Container
        style={{
          width: "100%",
          margin: 0,
          height: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        disableGutters={true}
      >
        <Grid
          container
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
          item
        >
          <img src={Logo} style={{ width: 100, height: 100 }} />
          <CircularProgress style={{ color: "red", marginTop: 40 }} />
        </Grid>
      </Container>
    );
  }
}
