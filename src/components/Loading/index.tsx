import React, { FC } from 'react';
import ReactLoading from 'react-loading';
type IProps = {

};
const Loading: FC<IProps> = ({ }) => (
    <ReactLoading type={"spin"} color={"#0071BC"} height={'15%'} width={'15%'} />
);

export default Loading;