import React from "react";
import { GoInfo } from "react-icons/go";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import * as Constants from "../../constants/constants";
import { FaInfoCircle } from "react-icons/fa";
function LinkAccount() {
  return (
    <div id="linkAccountWrap">
      <h4 id="linkAccountHead">
        {Constants.LINK_DUBB_ACCOUNT}{" "}
        <i>
          <FaInfoCircle id="infoCircleStyle" />
        </i>
      </h4>{" "}
      <hr />
      <Row>
        <Col className="col-md-6 m-auto">
          <Form id="formInput">
            <FormGroup>
              <Label for="exampleEmail">{Constants.EMAIL}</Label>
              <Input type="email" name="email" id="typeInput" placeholder="" />
            </FormGroup>
            <Button className="profileBtn" id="linkAccountSendBtn">
              {Constants.SEND}
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default LinkAccount;
