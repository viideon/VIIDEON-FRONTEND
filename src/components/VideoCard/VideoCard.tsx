import React, { FC } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import { Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import "./styles.css";

type IProps = {
  title: string;
  url: string;
  onClick?: any;
  thumbnail?: string;
};
const VideoCard: FC<IProps> = ({ title, url, thumbnail, onClick }) => {
  return (
    <div onClick={onClick}>
      <Card className="VideoMain">
        <Player
          playsInline
          poster={thumbnail ? thumbnail : "/assests/poster"}
          src={url}
          fluid={false}
          height={230}
          width="100%"
        />
        <CardBody id="videoCardBody">
          <CardTitle className="text-truncate">{title}</CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};
export default VideoCard;

// import React, { FC } from "react";
// import { Card, CardTitle, CardBody } from "reactstrap";
// import { Player } from "video-react";
// import "../../../node_modules/video-react/dist/video-react.css";
// import "./styles.css";

// type IProps = {
//   title: string;
//   url: string;
//   onClick?: any;
//   thumbnail?: string;
// };
// const VideoCard: FC<IProps> = ({ title, url, thumbnail, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "100%",
//         marginBottom: "10px"
//       }}
//     >
//       <div style={{ height: "70%" }}>
//         <Player
//           playsInline
//           poster={thumbnail ? thumbnail : "/assests/poster"}
//           src={url}
//           width="100%"
//           height={220}
//           fluid={false}
//         />
//       </div>
//       <div style={{ height: "30%", border: "1px solid #d3d3d3" }}>
//         <CardTitle style={{ height: "100%" }}>{title}</CardTitle>
//       </div>
//     </div>
//   );
// };
// export default VideoCard;
