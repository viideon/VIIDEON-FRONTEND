import React from "react";
import { connect } from "react-redux";
import "./style.css";

class AssetsLibray extends React.Component {
  render() {
    return <div></div>;
  }
}
const mapStateToProps = (state: any) => {
  return {
    assets: state.asset.assets
  };
};
export default connect(mapStateToProps)(AssetsLibray);
