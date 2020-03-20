import React from 'react';
import { FormGroup, Label, Input, Col } from 'reactstrap';
import { GoInfo } from "react-icons/go";


function Detail() {
    return (
        <div>
            <FormGroup row style={{ margin: '30px' }}>
                <Label for="exampleText" id="descriptionLabel" >Description</Label>
                <Col>
                    <Input type="textarea" name="text" id="exampleText" style={{ minHeight: '150px' }} />
                    <p>Add text under your video <i><GoInfo /></i></p>
                </Col>
            </FormGroup>


            <FormGroup row style={{ margin: '30px' }}>
                
                <Label for="exampleText" id="descriptionLabel" >Tag</Label>
                <Col>
                    <Input type="text" name="text" id="exampleText" />
            <p>Add tags for internal organization <i><GoInfo /></i></p>

                </Col>
            </FormGroup>

        </div>
    );
}

export default Detail;