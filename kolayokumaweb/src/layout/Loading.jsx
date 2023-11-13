import React from "react";
import { connect } from "react-redux";

const Loading = ({ loading, children }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

const mapStateToProps = (state) => ({
  loading: state.user.authloading,
});

export default connect(mapStateToProps)(Loading);
