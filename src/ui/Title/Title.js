import React from "react";
import {Col, Row} from "react-bootstrap";

const Title = ({title}) => {

    return (
        <Row>
            <Col>
                <h3 className="my-5">
                    {title}
                </h3>
            </Col>
        </Row>
    );
}

export default Title;

