import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import HeaderCard from '../../components/HeaderCards/Cards';
import VedioComponent from '../../components/VideosComponent/VideosComponent';
import { VideoUser } from '../../Redux/Actions/videos';
import { VideoState } from '../../Redux/Types/videos';
import { Video } from '../../Redux/Types/videos';
import Styles from './styles';
// import requireAuthentication from '../../authentication';

import S3 from 'aws-s3';
import AWS from 'aws-sdk';

import './styles.css';

type IProps = {
  navigation: any;
  videoUser: VideoState;
  addVideo: (video: Video) => void;
};
// type File={
//   name:string
//   type:string
//   size:any
// }
type IState = {
  file: any;
  url: string
};
// const config = {
//   keyPrefix: "test/",
//   bucket: "paractice",
//   ACL: 'public-read',
//   region: "us-east-1",
//   accessKey: "AKIAIK4LMUMBSKO7CYAQ",
//   secretKey: "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",
//   successActionStatus: 201
// }
const config = {
  bucketName: 'paractice',
  dirName: 'nafeel',
  region: "us-east-1",
  ACL: 'public-read',
  accessKeyId: 'AKIAIK4LMUMBSKO7CYAQ',
  secretAccessKey: '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',
}
const S3Client = new S3(config);
const newFileName = 'my-awesome-file';
class Home extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: {},
      url: '',
    };
  }
  fileHandler = (e: any) => {
    const that = this;
    const file = {
      name: e.target.files[0].name,
      type: e.target.files[0].type,
      size: e.target.files[0].size
    }
    this.setState({ file })
    let s3 = new AWS.S3(config)
    var options = {
      Bucket: config.bucketName,
      ACL: config.ACL,
      Key: Date.now().toString(),
      Body: e.target.files[0]
    };
    s3.upload(options, function (err: any, data: any) {
      if (err) {
        throw err;
      }
      console.log(`File uploaded successfully. ${data.Location} ${err}`)
      that.setState({ url: data.Location })
    });
    // S3Client.uploadFile(file, newFileName)
    // .then((data:any) => console.log("The Response",data))
    // .catch((err:any) => console.error('THe Error Message is',err))
  }
  saveVideo = () => {
    const { name } = this.state.file;
    const title = name;
    const url = this.state.url;
    const thumbnail = 'dummy';
    const userId = '5e592c5bac9cd60024085779'
    const video = {
      url,
      thumbnail,
      title,
      userId,
    }
    this.props.addVideo(video)
  }
  render() {
    return (
      <div>
        <Header navigation={this.props.navigation} />
        <Container id="homeContainerWrap" >
          <Row>
            <Col xs="3" md="3">
              <SideBar navigation={this.props.navigation} />
            </Col>
            <Col xs="9" md="9" >
              <div id="headerCardWrap">
                <HeaderCard
                  styles={Styles.headerCardOne}
                />
                <HeaderCard
                  styles={Styles.headerCardTwo}
                />
                <HeaderCard
                  styles={Styles.headerCardThree}
                />
                <HeaderCard
                  styles={Styles.headerCardFour}
                />
              </div>
              <div>
                <Row>
                  <Col xs="9">
                    <VedioComponent navigation={this.props.navigation} />
                  </Col>
                  <Col xs="3">
                    <input type='file' onChange={this.fileHandler} id="videoTypeInput" />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    videoUser: state.video
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addVideo: (video: Video) => dispatch(VideoUser(video))
  };
};
// export default requireAuthentication(connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
