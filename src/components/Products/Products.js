import React, {Fragment} from "react";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import {Container, Row, Col} from "react-bootstrap";

const Products = ({products}) => {
    return(
        <Fragment>
            <h3 className="mb-3">
                Productos
            </h3>
            <Container fluid>
                <Row>
                    {products.map((product) => {
                        return (
                            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                                <ItemDetailContainer
                                    key={product.id}
                                    product={product}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </Fragment>
    )
}

export default Products;
