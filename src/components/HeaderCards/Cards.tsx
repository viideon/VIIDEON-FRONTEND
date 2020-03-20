import React from 'react';
import { Card, CardText } from 'reactstrap';
import './styles.css';

type IProps = {
  styles?: object;
  Video: string;
  Title: string
};
const HeaderCard: React.FC<IProps> = props => {
  return (
    <>
      <Card className='CardMain' inverse
        style={props.styles}>
        <CardText className='Title'>{props.Video}</CardText>
        <CardText className='Description'>{props.Title}</CardText>
      </Card>
    </>
  );
}
export default HeaderCard;