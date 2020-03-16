import React from 'react';
// import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
// import 'style.css';


function Editing() {
    return (
        <div className="video-container">

            <iframe
                title="primaryWorkVideo"
                // height="200"
                id="videoStyle"
                src={"https://dubb.sfo2.digitaloceanspaces.com/videos/2019-12-14/3c415fc72253774eb51c19f956057cf0/720p_PWvT.mp4"}
                frameBorder="0"
                allow="fullscreen"
                style={{ background: 'transparent', width: '100%', padding: '10%', paddingTop: '2%', height: '80%' }}
            ></iframe>

            {/* <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                </Col>
            </Row> */}

        </div>
    );
}

export default Editing;