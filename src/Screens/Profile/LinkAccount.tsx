import React from 'react';
import { GoInfo } from "react-icons/go";
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';



function LinkAccount() {
    return (
        <div id="linkAccountWrap">
            <h4 id="linkAccountHead">
                LINK DUBB ACCOUNTS <i><GoInfo /></i>
            </h4> <hr />
            <Row>
                <Col className="col-md-6 m-auto">
                    <Form id="formInput">
                        <FormGroup>
                            <Label for="exampleEmail">Email</Label>
                            <Input type="email" name="email" id="typeInput" placeholder="" />
                        </FormGroup>
                        <Button id="linkAccountSendBtn">Send</Button>
                    </Form>
                </Col>
            </Row>


        </div>
    );
}

export default LinkAccount;