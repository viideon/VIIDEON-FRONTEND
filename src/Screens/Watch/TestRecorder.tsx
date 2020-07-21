import React from "react";
import { Grid } from "@material-ui/core";
import ImagePicker from "react-image-picker";
import AssetPicker from "../../components/AssetPicker";

class TestRecorder extends React.Component {
  state = {
    isOpen: false
  };
  togglePickerModal = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div style={{ paddingTop: "100px" }}>
        <Grid container>
          <Grid item xs={1} sm={1} lg={2}></Grid>
          <Grid item xs={10} sm={10} lg={8}>
            {/* <AssetPicker
              isOpen={this.state.isOpen}
              toggle={this.togglePickerModal}
            /> */}
            <button onClick={this.togglePickerModal}>open asset picker</button>
          </Grid>
          <Grid item xs={1} sm={1} lg={2}></Grid>
        </Grid>
      </div>
    );
  }
}

export default TestRecorder;
