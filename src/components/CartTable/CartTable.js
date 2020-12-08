import React, { useEffect, useContext } from "react";
import CartContext from "../../globals/cartContext";
import { Container, Row, Col, Table } from 'react-bootstrap';
import Swal from "sweetalert2";
import Title from "../../ui/Title/Title";

const CartTable = ({order, title}) => {
    const { cart, setCart, setQnt } = useContext(CartContext);
    const items = order.items;

    const deleteProduct = (index) => {
        setCart(cart.filter((product, i) => i !== index));
    }

    const confirmDelete = (index) => {
        return (
            Swal.fire({
                title: '¿Estás seguro de eliminar el producto del carrito?',
                text: "Podrás agregar el producto nuevamente en caso de error.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteProduct(index);
                    Swal.fire(
                        'Eliminado',
                        'El producto se quito correctamente de tu carrito.',
                        'success'
                    )
                }
            })
        )
    };

    useEffect(() => {
        if ( order === null ) {
            setQnt(
                cart
                    .map((product) => product.quantity)
                    .reduce((total, valor) => total + valor)
            );
        }
    }, [cart, setQnt]);

    console.log('orden!!');
    console.log(items);

    console.log('caty!!');
    console.log(cart);

    return (
        <Container>

            <Title title={title} />

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
                        {
                            Object.keys( cart ).length > 0 ? (
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
                                                onClick={() => confirmDelete(index)}
                                            >
                                                Eliminar producto del carrito
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            ) : (
                                <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">
                                            {item.quantity}
                                        </th>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>
                                            ${item.subtotal}.-
                                        </td>
                                        <td>
                                            ${item.quantity * item.subtotal}.-
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            )
                        }
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default CartTable;
