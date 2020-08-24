import React from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Grid } from "@material-ui/core";
import { getMusicAsset } from "../../Redux/Actions/asset";
import "./style.css";

interface IProps {
    getMusicAsset: () => void;
    isOpen: boolean;
    toggle: () => void;
    musicAssets: [any];
    onPick: (image: any) => void;
}

class AssetPicker extends React.Component<IProps> {
    state = {
        assetUrl: "",
        currenSelection: null
    };
    componentDidMount() {
        this.props.getMusicAsset();
    }
    componentDidUpdate(prevProps: any) {
        if (this.props.isOpen !== prevProps.isOpen && this.props.isOpen) {
            this.setState({ assetUrl: "", currenSelection: null });
            this.props.getMusicAsset();
        }
    }
    onPick = () => {
        if (this.state.assetUrl === "") {
            toast.info("No asset selected");
            this.props.toggle();
            return;
        }
        this.props.onPick(this.state.assetUrl);
        this.props.toggle();
    };
    selectAsset = (url: any, i: any) => {
        this.setState({ assetUrl: url, currenSelection: i });
        toast.info("Asset selected, Click ok to proceed");
    };
    cancelSelection = () => {
        this.setState({ assetUrl: "", currenSelection: null }, () =>
            this.props.toggle()
        );
    };
    render() {
        const { musicAssets } = this.props;
        console.log("state", this.state);
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.toggle}
                wrapClassName="wrapperModalAsset"
            >
                <ModalHeader>
                    Select Music Asset
                </ModalHeader>
                <ModalBody>
                    <Grid container>
                        {musicAssets &&
                            musicAssets.map((asset: any, i) => (
                                <Grid item md={4} lg={4} sm={6} key={i} onClick={() => this.selectAsset(asset.url, i)}>
                                    <div>
                                        <h5 className={i === this.state.currenSelection ? "selectedMusicHeading" : "musicHeading"}>{asset.title}</h5>
                                        <audio src={asset.url} controls />
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        size="md"
                        style={{ width: "120px", marginRight: "5px" }}
                        onClick={this.cancelSelection}
                    >
                        Cancel
          </Button>
                    <Button
                        color="primary"
                        size="md"
                        style={{ width: "120px" }}
                        onClick={this.onPick}
                    >
                        OK
          </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        musicAssets: state.asset.musicAssets
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        getMusicAsset: () => dispatch(getMusicAsset())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssetPicker);