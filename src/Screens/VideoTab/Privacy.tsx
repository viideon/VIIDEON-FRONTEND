import React from 'react';
import { FormGroup, Label, Col, Input } from 'reactstrap';

const Privacy = () => {
    return (
        <div style={{marginTop:'10%'}}>

            <FormGroup row>
                <Label for="exampleSelect" sm={2}>Privacy</Label>
                <Col sm={10}>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Feature: Publicly visible on your profile page</option>
                        <option>Shareable: Send via link, email or social</option>
                        <option>Draft: Only visible in my account</option>
                    </Input>
                </Col>
            </FormGroup>


        </div>
    );
}

export default Privacy;