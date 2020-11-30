import React from "react";
import ItemList from "../../components/ItemList/ItemList";
import { Container, Row, Col } from 'react-bootstrap';

const Home = ({ greeting }) => {
    return (
        <main>
            <Container fluid className="my-5">
                <Row className="mt-5">
                    <Col>
                        <h1>{greeting}</h1>
                    </Col>
                </Row>
            </Container>
            <ItemList />
        </main>
    );
};

export default Home;
