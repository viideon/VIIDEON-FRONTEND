import React, { FC } from 'react';
import { Card, CardTitle, CardImg, CardBody } from 'reactstrap';
import {Images} from '../../config';
import './styles.css';

type IProps = {
    image:any;
    title:any;
};
const VideoCard: FC<IProps> = ({
    image,
    title
}) => {
  return (
    <>
        <Card className='VideoMain'>
        <CardImg top width="100%" src={image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
        </CardBody>
      </Card>
    </>
  );
}
export default VideoCard;