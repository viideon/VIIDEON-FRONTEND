import React, { FC } from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import './styles.css';

type IProps = {
  // color: any;
  styles?: object;
};
const HeaderCard: React.FC<IProps> = props => {
  // const HeaderCard: React.FC<IProps> = props => {
  return (
    <>
      <Card className='CardMain' inverse
        style={props.styles} 

      // style={props.styles, {backgroundColor: props.color, borderColor: props.color}}
      >
        <CardText className='Title'>14</CardText>
        <CardText className='Description'>Videos</CardText>
      </Card>
    </>
  );
}
export default HeaderCard;