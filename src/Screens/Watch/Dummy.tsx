import React from "react";
// import Dropzone from "react-dropzone";
// import { Video, Transformation, CloudinaryContext } from "cloudinary-react";
// import axios from "axios";

// const CLOUDINARY_UPLOAD_PRESET = "t5zxdlnc";
// const CLOUDINARY_UPLOAD_URL =
//   "https://api.cloudinary.com/v1_1/reactdev/video/upload";

interface IState {
  uploadedFile: any;
  uploadedFileCloudinaryUrl: any;
}
class Dummy extends React.Component<{}, IState> {
  //   onImageDrop: (files: any) => void;
  //   constructor(props: any) {
  //     super(props);
  //     this.state = {
  //       uploadedFile: null,
  //       uploadedFileCloudinaryUrl: ""
  //     };
  //     this.onImageDrop = (files: any) => {
  //       this.setState({
  //         uploadedFile: files[0]
  //       });

  //       this.handleImageUpload(files[0]);
  //     };
  //   }

  //   handleImageUpload(file: any) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  //     const config = {
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       }
  //     };
  //     axios
  //       .post(CLOUDINARY_UPLOAD_URL, formData, config)
  //       .then((res: any) => {
  //         console.log("url", res.data.secure_url);
  //         this.setState({ uploadedFileCloudinaryUrl: res.data.secure_url });
  //       })
  //       .catch(err => {
  //         console.log("error while uploading", err);
  //         alert(err);
  //       });
  //   }

  render() {
    return (
      <div>
        {/* <form style={{ marginTop: "150px" }}>
          <div className="FileUpload">
            <Dropzone
              onDrop={this.onImageDrop}
              accept="image/*,audio/*,video/*"
            >
              {({ getRootProps, getInputProps }) => (
                <div className="container">
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      margin: "auto",
                      width: 100
                    }}
                  >
                    <input {...getInputProps()} />
                    <img
                      src={require("../../assets/upload.png")}
                      style={{ width: 80, margin: "auto" }}
                      alt="upload"
                    />
                  </div>
                </div>
              )}
            </Dropzone>
          </div>

          <div>
            {this.state.uploadedFileCloudinaryUrl === "" ? null : (
              <div>
                <p>{this.state.uploadedFile.name}</p>
                <video
                  style={{ width: "150px" }}
                  src={this.state.uploadedFileCloudinaryUrl}
                />
              </div>
            )}
          </div>
        </form>
        <CloudinaryContext cloudName="reactdev">
          <div>
            <Video publicId="nqdrvpasoxfsatvf9bwi">
              <Transformation startOffset="10p" endOffset="80p" />
            </Video>
          </div>
        </CloudinaryContext>  */}
      </div>
    );
  }
}

export default Dummy;
