import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import validateRegistration from "../../validations/registerValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";

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
                        <Form.Group controlId="formGroupNombre">
                            <Form.Label>
                                Nombre
                            </Form.Label>
                            <Form.Control type="text" placeholder="Ingresa tu nombre" name="nombre" value={nombre} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>

                        { errors.nombre && <Error message={errors.nombre}></Error> }

                    </Col>

                    <Col>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu email" name="email" value={email} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>

                        { errors.email && <Error message={errors.email}></Error> }

                    </Col>

                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>
                                Contraseña
                            </Form.Label>
                            <Form.Control type="password" placeholder="Ingresa tu contraseña" name="password" value={password} onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>

                        { errors.password && <Error message={errors.password}></Error> }

                        { error && <Error>{error}</Error> }

                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <Button className="btn btn-block mt-2" variant="primary" type="submit">
                            Crear cuenta
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}

export default Register;
