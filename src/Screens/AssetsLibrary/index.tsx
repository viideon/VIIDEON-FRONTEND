import React from "react";
import Home from "../Home/Home";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import "./style.css";

interface IProps {
  assets: [any];
}
class AssetsLibray extends React.Component<IProps> {
  render() {
    const { assets } = this.props;
    return (
      <Home>
        <h3 className="assetHeading">Your Assets</h3>
        <Grid container style={{ padding: "5px 20px 20px 20px" }}>
          {assets &&
            assets.map((asset: any) => (
              <Grid item xs={12} sm={12} md={3} lg={3} key={asset._id}>
                <Asset url={asset.url} />
              </Grid>
            ))}
        </Grid>
      </Home>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    assets: state.asset.assets
  };
};
export default connect(mapStateToProps)(AssetsLibray);

const Asset = ({ url }: any) => {
  return (
    <div className="wrapperImgLib">
      <img
        src={url}
        crossOrigin="anonymous"
        className="imgAssetLib"
        alt="asset"
      />
    </div>
  );
};
