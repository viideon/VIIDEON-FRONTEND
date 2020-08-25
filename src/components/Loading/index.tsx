import React, { FC } from "react";
import ReactLoading from "react-loading";
type IProps = {
  height?: number;
  width?: number;
};
const Loading: FC<IProps> = ({ height, width }) => (
  <ReactLoading
    type={"spinningBubbles"}
    color={"#696969"}
    height={!height ? 50 : height}
    width={!width ? 50 : width}
  />
);

export default Loading;
