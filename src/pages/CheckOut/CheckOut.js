import React, { useState, useContext } from 'react';
import { Col, Container, Form, Row } from "react-bootstrap";
import firebase from "../../firebase";
import CartContext from "../../globals/cartContext";
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
    const [ error, setError ] = useState(false);
    const [ orderId, setOrderId ] = useState(null);
    const [ sent, setSent ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, checkOutValidation, createOrder);

    const { name, phone, email, email_confirmation } = data;

    const updateDataFirebase = async () => {
        const db = firebase.db;
        const itemsToUpdate = db.collection("items").where(
            firebase.firestore.FieldPath.documentId(),
            "in",
            cart.map((i) => i.id)
        );

        const query = await itemsToUpdate.get();
        const batch = db.batch();

        const outOfStock = [];
        query.docs.forEach((docSnapShot, idx) => {
            if (docSnapShot.data().stock >= cart[idx].quantity) {
                batch.update(docSnapShot.ref, {
                    stock: docSnapShot.data().stock - cart[idx].quantity,
                });
            } else {
                outOfStock.push({ ...docSnapShot.data(), id: docSnapShot.id });
            }
        });

        if (outOfStock.length === 0) {
            await batch.commit();
        }
    };

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

        const db = firebase.db;
        const orders = db.collection("orders");
        const newOrder = {
            userInfo,
            items,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
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

        updateDataFirebase();
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
    );

}

export default CheckOut;
