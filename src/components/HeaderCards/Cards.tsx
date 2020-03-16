import React, { FC } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import './styles.css';

type IProps = {
  color:any;
};
const HeaderCard: FC<IProps> = ({
  color
}) => {
  return (
    <>
        <Card className='CardMain' inverse style={{ backgroundColor: color, borderColor: color }}>
          <CardText className='Title'>14</CardText>
          <CardText className='Description'>Videos</CardText>
        </Card>
    </>
  );
}
export default HeaderCard;