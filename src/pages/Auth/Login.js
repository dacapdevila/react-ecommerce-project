import React, { useState }  from 'react';
import { Container, Row, Col, Form } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import loginValidation from "../../validations/loginValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomButton, CustomField } from "../../ui/Form/Form";
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const initialState = {
    email : '',
    password : '',
}


const Login = () => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, loginValidation, login);

    const { email, password } = data;

    const [ sent, setSent ] = useState(0);

    const history = useHistory();

    async function login() {
        try {
            const usuario = await firebase.loginUser(email, password);

            toast.success('🦄 Iniciaste sesión correctamente, en breve serás redirigido', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(usuario);
            setSent(1);
            setTimeout( () => {
                history.push("/")
            }, 2500);
        } catch (error) {
            console.error('Hubo un error al iniciar sesión', error.message);
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

            <Title title="Iniciar sesión" />

            <Form onSubmit={handleSubmit} noValidate>

                <Row>

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
                            type="password"
                            id="password"
                            nameField="password"
                            label="Contraseña"
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
                            buttonValue="Iniciar sesión"
                            disabled={ !email || !password ||sent !== 0 }
                        />
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default Login;
