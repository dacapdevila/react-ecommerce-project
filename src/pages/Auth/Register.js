import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import validateRegistration from "../../validations/registerValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomField, CustomButton } from "../../ui/Form/Form";

const initialState = {
    nombre : '',
    email : '',
    password : '',
}

const Register = ({ history }) => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, validateRegistration, makeUser);

    const { nombre, email, password } = data;

    async function makeUser() {
        try {
            await firebase.registerNewUser(nombre, email, password);
            this.prop.history.push('/');
        } catch (error) {
            console.log('Error al crear usuario', error.message);
            setError(error.message);
        }

    }

    return (
        <Container>

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

                        { error && <Error>{error}</Error> }

                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <CustomButton
                            variant="primary"
                            type="submit"
                            buttonValue="Crear cuenta"
                        />
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}

export default Register;
