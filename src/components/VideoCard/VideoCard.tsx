import React, { FC } from 'react';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css";
import { Images } from '../../config';
import './styles.css';

type IProps = {
  image: any;
  title: any;
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
        <Player 
          playsInline
          poster="/assets/poster.png"
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