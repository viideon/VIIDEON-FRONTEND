import React from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';
import * as Constants from '../../constants/components/videotab';

const Privacy = () => {
  return (
    <div style={{ marginTop: '10%' }}>
      <FormGroup row>
        <Label for="exampleSelect" sm={2}>{Constants.PRIVACY}</Label>
        <Col sm={10}>
          <Input type="select" name="select" id="exampleSelect">
            <option>{Constants.OPTION_1}</option>
            <option>{Constants.OPTION_2}</option>
            <option>{Constants.OPTION_3}</option>
          </Input>
        </Col>
      </FormGroup>
    </div>
  );
}

export default Privacy;