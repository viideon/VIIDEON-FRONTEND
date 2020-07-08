import React, { FC } from "react";
import ReactLoading from "react-loading";
type IProps = {
  height?: string;
  width?: string;
};
const Loading: FC<IProps> = ({ height, width }) => (
  <ReactLoading
    type={"spinningBubbles"}
    color={"#696969"}
    height={50}
    width={50}
  />
);

export default Loading;
