import React from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';
import { GoInfo } from "react-icons/go";
import * as Constants from '../../constants/components/videotab';

function Detail() {
  return (
    <div>
      <FormGroup row style={{ margin: '30px' }}>
        <Label for="exampleText" id="descriptionLabel" >{Constants.DESCRIPTION}</Label>
        <Col>
          <Input type="textarea" name="text" id="exampleText" style={{ minHeight: '150px' }} />
          <p>{Constants.ADD_TEXT} <i><GoInfo /></i></p>
        </Col>
      </FormGroup>
      <FormGroup row style={{ margin: '30px' }}>
        <Label for="exampleText" id="descriptionLabel" >{Constants.TAG}</Label>
        <Col>
          <Input type="text" name="text" id="exampleText" />
          <p>{Constants.ADD_TAGS} <i><GoInfo /></i></p>
        </Col>
      </FormGroup>
    </div>
  );
}
export default Detail;