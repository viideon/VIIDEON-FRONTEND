import React from "react";
import { FormGroup, Label, Input, Col, Form } from "reactstrap";
import { GoInfo } from "react-icons/go";
import * as Constants from "../../constants/components/videotab";

function Detail() {
  return (
    <div>
      <Form>
        <FormGroup row style={{ margin: "30px" }}>
          <Col xs={1}>
            <Label for="exampleText" id="descriptionLabel">
              {Constants.DESCRIPTION}
            </Label>
          </Col>
          <Col>
            <Input
              type="textarea"
              name="text"
              id="exampleTextAdd"
              style={{ minHeight: "150px" }}
            />
            <p>
              {Constants.ADD_TEXT}{" "}
              <i>
                <GoInfo />
              </i>
            </p>
          </Col>
        </FormGroup>
        <FormGroup row style={{ margin: "30px" }}>
          <Col xs={1}>
            <Label for="exampleText" id="descriptionLabel">
              {Constants.TAG}
            </Label>
          </Col>
          <Col>
            <Input type="text" name="text" id="exampleTextAddTags" />
            <p>
              {Constants.ADD_TAGS}{" "}
              <i>
                <GoInfo />
              </i>
            </p>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
export default Detail;
