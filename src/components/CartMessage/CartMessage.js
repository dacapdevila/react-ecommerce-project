import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const CartMessage = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col sm={12} md={8} lg={8} xl={8}>
                    <div className="card my-5">
                        <div className="card-header">
                            El carrito esta vacio
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                Agrega productos y luego podrás finalizar la compra
                            </p>
                            <Link to="/" className="btn btn-primary">
                                Ir al home para continuar comprando
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CartMessage;
