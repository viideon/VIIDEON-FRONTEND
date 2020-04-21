import React from "react";
import { GoInfo } from "react-icons/go";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import * as Constants from "../../constants/constants";

function LinkAccount() {
  return (
    <div id="linkAccountWrap">
      <h4 id="linkAccountHead">
        {Constants.LINK_DUBB_ACCOUNT}{" "}
        <i>
          <GoInfo />
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
            <Button id="linkAccountSendBtn">{Constants.SEND}</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
export default LinkAccount;
