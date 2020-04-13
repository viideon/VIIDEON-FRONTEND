import React, { FC } from "react";
import ReactLoading from "react-loading";
type IProps = {
  height?: string;
  width?: string;
};
const Loading: FC<IProps> = ({ height, width }) => (
  <ReactLoading
    type={"spin"}
    color={"red"}
    height={height ? height : "10%"}
    width={width ? width : "10%"}
  />
);

export default Loading;
