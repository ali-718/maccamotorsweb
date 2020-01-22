import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    if (!this.props.auth.isLogin) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
