import React, { FC } from 'react';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import {Images} from '../../config';
import './styles.css';

type IProps = {
    image:any;
    title:any;
    url: any;
};
const VideoCard: FC<IProps> = ({
    image,
    title,
    url,
}) => {
  return (
    <>
        <Card className='VideoMain'>
        {/* <CardImg top width="100%" src={image} alt="Card image cap" /> */}
        <Player
                playsInline
                poster="/assets/poster.png"
                // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                src={url}
              />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    </>
  );
}
export default VideoCard;