import React, {useState, useContext, Fragment} from 'react';
import { Col, Container, Form, Row } from "react-bootstrap";
import CartContext from "../../globals/cartContext";
import { FirebaseContext } from '../../firebase';
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomButton, CustomField, CustomButtonWithLink } from "../../ui/Form/Form";
import useValidation from "../../hooks/useValidation";
import checkOutValidation from "../../validations/checkOutValidation";

const initialState = {
    name : '',
    phone : '',
    email : '',
    email_confirmation : ''
}

const CheckOut = () => {

    const { cart, setCart, setQnt } = useContext(CartContext);
    const { firebase, user } = useContext( FirebaseContext );
    const [ error, setError ] = useState(false);
    const [ orderId, setOrderId ] = useState(null);
    const [ sent, setSent ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, checkOutValidation, createOrder);

    const { name, phone, email, email_confirmation } = data;

    const updateStock = (items) => {
        items.forEach(product => {
            const item = firebase.db.collection('products').doc(product.id);

            item.get().then(doc => {
                if(!doc.exists){
                    setError("No existe el producto.");
                    return false;
                }
                const stock = doc.data().stock;
                if(product.quantity > stock){
                    setError("Stock insuficiente.");
                    return false;
                }
                item.update({stock: stock - product.quantity});
            }).catch((error) => {
                console.log("Error: ", error);
                return false;
            }).finally(() => {
            })
        });
        return true;
    }

    async function createOrder() {
        setSent(true);

        // User Info
        const userInfo = { name, phone, email };

        // Items
        const items = cart.map((p) => ({
            id: p.id,
            name: p.name,
            quantity: p.quantity,
            subtotal: p.price * p.quantity,
        }));

        // Total
        const totalPrice = cart.reduce(
            (total, product) => total + product.quantity * product.price,
            0
        );

        const orders = firebase.db.collection("orders");
        const newOrder = {
            userInfo,
            items,
            date: new Date(),
            total: totalPrice,
        };

        function clean() {
            setCart([]);
            setQnt(0);
        }

        try {
            const { id } = await orders.add(newOrder);
            setOrderId(id);
            clean();
        } catch (err) {
            console.error('Ha ocurrido un error creando la orden de compra', err.message);
            setError(err.message);
        }

        updateStock(items);
    }

    if ( orderId ) {
        return (
            <>
                <div className="container">
                    <div className="my-5 text-center">
                        <h3 className="mt-5">
                            Muchas gracias por tu compra
                        </h3>
                        <h4 className="my-5">
                            La compra se ha realizado exitosamente.
                        </h4>
                        <p className="success">
                            Tu compra tiene el <strong>ID: {orderId}</strong>
                        </p>
                        <CustomButtonWithLink
                            variant="primary"
                            type="submit"
                            to="/"
                            buttonValue="Ir al inicio"
                        />
                    </div>
                </div>
            </>
        );
    }

    return (
        <Fragment>
            {
                user === null ? (
                    <Container>
                        <Title title="Completa los siguientes datos para confirmar la compra" />

                        <Form onSubmit={handleSubmit} noValidate>

                            <Row>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="text"
                                        id="name"
                                        nameField="name"
                                        label="Nombre y Apellido"
                                        placeholder="Ingresa tu nombre"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.name && <Error message={errors.name}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="text"
                                        id="phone"
                                        nameField="phone"
                                        label="Teléfono"
                                        placeholder="Ingresa tu teléfono"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.phone && <Error message={errors.phone}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="email"
                                        id="email"
                                        nameField="email"
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.email && <Error message={errors.email}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="email"
                                        id="email_confirmation"
                                        nameField="email_confirmation"
                                        label="Reingresa tu email"
                                        placeholder="Reingresa tu email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.email_confirmation && <Error message={errors.email_confirmation}></Error> }

                                    { error && <Error>{error}</Error> }

                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col sm={12} md={6} lg={6} xl={6}>
                                    <CustomButton
                                        variant="primary"
                                        type="submit"
                                        buttonValue="Confirmar"
                                        disabled={ !name || !phone || !email || email !== email_confirmation || sent }
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                ) : (
                    <Container>
                        <Title title={`${user.displayName}, estás por comprar como ${user.email}`} />

                        <Form onSubmit={handleSubmit} noValidate>

                            <Row>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="text"
                                        id="name"
                                        nameField="name"
                                        value={user.displayName}
                                        label="Nombre y Apellido"
                                        placeholder="Ingresa tu nombre"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.name && <Error message={errors.name}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="text"
                                        id="phone"
                                        nameField="phone"
                                        label="Teléfono"
                                        placeholder="Ingresa tu teléfono"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.phone && <Error message={errors.phone}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="email"
                                        id="email"
                                        nameField="email"
                                        value={user.email}
                                        label="Email"
                                        placeholder="Ingresa tu email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.email && <Error message={errors.email}></Error> }

                                </Col>

                                <Col sm={12} md={6} lg={6} xl={6}>

                                    <CustomField
                                        type="email"
                                        id="email_confirmation"
                                        nameField="email_confirmation"
                                        value={user.email}
                                        label="Reingresa tu email"
                                        placeholder="Reingresa tu email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />

                                    { errors.email_confirmation && <Error message={errors.email_confirmation}></Error> }

                                    { error && <Error>{error}</Error> }

                                </Col>
                            </Row>

                            <Row className="justify-content-center">
                                <Col sm={12} md={6} lg={6} xl={6}>
                                    <CustomButton
                                        variant="primary"
                                        type="submit"
                                        buttonValue="Confirmar"
                                        disabled={ !name || !phone || !email || email !== email_confirmation || sent }
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                )
            }
        </Fragment>
    );

}

export default CheckOut;
