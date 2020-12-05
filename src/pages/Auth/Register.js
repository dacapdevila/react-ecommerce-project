import React, { useState } from 'react';
import { Container, Row, Col, Form } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import validateRegistration from "../../validations/registerValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomField, CustomButton } from "../../ui/Form/Form";
import {toast, ToastContainer} from "react-toastify";
import { useHistory } from 'react-router-dom';

const initialState = {
    nombre : '',
    email : '',
    password : '',
}

const Register = () => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, validateRegistration, makeUser);

    const { nombre, email, password } = data;

    const [ sent, setSent ] = useState(0);

    const history = useHistory();

    async function makeUser() {
        try {
            await firebase.registerNewUser(nombre, email, password);
            toast.success('🦄 Usuario registrado correctamente!', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSent(1);
            setTimeout( () => {
                history.push("/")
            }, 2500);
        } catch (error) {
            console.log('Error al crear usuario', error.message);
            setError(error.message);
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSent(0);
        }

    }

    return (
        <Container>

            <ToastContainer />

            <Title title="Crear cuenta" />

            <Form onSubmit={handleSubmit} noValidate>

                <Row>

                    <Col>
                        <CustomField
                            type="text"
                            id="nombre"
                            nameField="nombre"
                            label="Nombre"
                            value={nombre}
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.nombre && <Error message={errors.nombre}></Error> }

                    </Col>

                    <Col>
                        <CustomField
                            type="email"
                            id="email"
                            nameField="email"
                            label="Email"
                            value={email}
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.email && <Error message={errors.email}></Error> }

                    </Col>

                </Row>

                <Row>
                    <Col>
                        <CustomField
                            type="password"
                            id="password"
                            nameField="password"
                            label="Contraseña"
                            value={password}
                            placeholder="Ingresa tu contraseña"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.password && <Error message={errors.password}></Error> }

                    </Col>
                </Row>

                <Row>
                    <Col sm={12} md={12} lg={12} xl={12}>
                        { error && <Error message={"Hubo un error"}></Error> }
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <CustomButton
                            variant="primary"
                            type="submit"
                            buttonValue="Crear cuenta"
                            disabled={ !nombre || !email || !password || sent !== 0 }
                        />
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}

export default Register;
