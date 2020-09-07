import React from "react";
import { toast } from "react-toastify";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Grid, Radio } from "@material-ui/core";
import { getMusicAsset } from "../../Redux/Actions/asset";
import 'react-tabs/style/react-tabs.css';
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
                    <Tabs>
                        <TabList>
                            <Tab>Private Assets</Tab>
                            <Tab>Public Assets</Tab>
                        </TabList>

                        <TabPanel>
                            <Grid container>
                                {musicAssets &&
                                    musicAssets.map((asset: any, i) => (
                                        <Grid item md={4} lg={4} sm={6} key={i} >
                                            <div className="pickerHeaderMusic"><Radio
                                                checked={i === this.state.currenSelection}
                                                onChange={() => this.selectAsset(asset.url, i)}
                                                value={i}
                                                color="default"
                                                size="small"
                                            />
                                                <h5 className={i === this.state.currenSelection ? "selectedMusicHeading" : "musicHeading"}>{asset.title}</h5></div>
                                            <audio src={asset.url} controls style={{ outline: "none" }} />
                                        </Grid>
                                    ))}
                            </Grid>
                        </TabPanel>
                        <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel>
                    </Tabs>

                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        size="md"
                        style={{ width: "120px", marginRight: "5px" }}
                        onClick={this.cancelSelection}
                    >Cancel </Button>
                    <Button
                        color="primary"
                        size="md"
                        style={{ width: "120px" }}
                        onClick={this.onPick}
                    >Ok</Button>
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