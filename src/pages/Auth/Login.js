import React, { useState }  from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import loginValidation from "../../validations/loginValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";

const initialState = {
    email : '',
    password : '',
}

const Login = ({ history }) => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, loginValidation, login);

    const { email, password } = data;

    async function login() {
        try {
            await firebase.loginUser(email, password);
            history.push('/');
        } catch (error) {
            console.error('Hubo un error al iniciar sesión', error.message);
            setError(error.message);
        }
    }

    return (
        <Container>

            <Title title="Iniciar sesión" />

            <Form onSubmit={handleSubmit} noValidate>

                <Row>

                    <Col sm={12} md={6} lg={6} xl={6}>

                        <Form.Group controlId="email">
                            <Form.Label className="text-left">
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Ingresa tu email" name="email" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>

                        { errors.email && <Error message={errors.email}></Error> }

                    </Col>

                    <Col sm={12} md={6} lg={6} xl={6}>

                        <Form.Group controlId="password">
                            <Form.Label className="text-left">
                                Contraseña
                            </Form.Label>
                            <Form.Control type="password" placeholder="Ingresa tu contraseña" name="password" onChange={handleChange} onBlur={handleBlur} />
                        </Form.Group>

                        { errors.password && <Error message={errors.password}></Error> }

                        { error && <Error>{error}</Error> }

                    </Col>

                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <Button className="btn btn-block mt-2" variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Login;
