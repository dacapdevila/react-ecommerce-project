import React, { useEffect, useContext } from "react";
import CartContext from "../../globals/cartContext";
import { Container, Row, Col, Table } from 'react-bootstrap';


const CartTable = () => {
    const { cart, setCart, setQnt } = useContext(CartContext);

    const deleteProduct = (index) => {
        setCart(cart.filter((product, i) => i !== index));
    };

    useEffect(() => {
        setQnt(
            cart
                .map((product) => product.quantity)
                .reduce((total, valor) => total + valor)
        );
    }, [cart, setQnt]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <h1>
                        Carrito
                    </h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>
                                Cantidad
                            </th>
                            <th>
                                Producto
                            </th>
                            <th>
                                Precio
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    {item.quantity}
                                </th>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    ${item.price}.-
                                </td>
                                <td>
                                    ${item.quantity * item.price}.-
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteProduct(index)}
                                    >
                                        Eliminar producto del carrito
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default CartTable;
