import React from "react";
import { FormGroup, Label, Col, Input, Form } from "reactstrap";
import * as Constants from "../../constants/constants";

const Privacy = () => {
  return (
    <div style={{ marginTop: "10%", marginLeft: "4%" }}>
      <Form>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>
            {Constants.PRIVACY}
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="select"
              id="exampleSelect"
              style={{ width: "70%", marginRight: "5%" }}
            >
              <option>{Constants.OPTION_1}</option>
              <option>{Constants.OPTION_2}</option>
              <option>{Constants.OPTION_3}</option>
            </Input>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Privacy;
