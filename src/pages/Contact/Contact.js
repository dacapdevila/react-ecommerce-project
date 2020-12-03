import React, { useState }  from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import firebase from '../../firebase';
import useValidation from "../../hooks/useValidation";
import contactValidation from "../../validations/contactValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomButton, CustomField, CustomTextArea } from "../../ui/Form/Form";

const initialState = {
    nombre : '',
    apellido : '',
    email : '',
    mensaje : ''
}

const Contact = ({ history }) => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, contactValidation, contact);

    const { nombre, apellido, email, mensaje } = data;

    async function contact() {
        try {
            // await firebase.loginUser(email, password);
            // history.push('/');
        } catch (error) {
            console.error('Hubo un error al enviar el mensaje', error.message);
            setError(error.message);
        }
    }

    return (
        <Container>

            <Title title="Escribinos tu consulta" />

            <Form onSubmit={handleSubmit} noValidate>

                <Row>

                    <Col sm={12} md={6} lg={6} xl={6}>

                        <CustomField
                            type="text"
                            id="nombre"
                            nameField="nombre"
                            label="Nombre"
                            placeholder="Ingresa tu nombre"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.nombre && <Error message={errors.nombre}></Error> }

                    </Col>

                    <Col sm={12} md={6} lg={6} xl={6}>

                        <CustomField
                            type="text"
                            id="apellido"
                            nameField="apellido"
                            label="Apellido"
                            placeholder="Ingresa tu apellido"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.apellido && <Error message={errors.apellido}></Error> }

                    </Col>

                </Row>

                <Row>

                    <Col sm={12} md={12} lg={12} xl={12}>

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

                </Row>

                <Row>

                    <Col sm={12} md={12} lg={12} xl={12}>

                        <CustomTextArea
                            id="mensaje"
                            nameField="mensaje"
                            label="Mensaje"
                            rows="6"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        { errors.mensaje && <Error message={errors.mensaje}></Error> }

                        { error && <Error>{error}</Error> }

                    </Col>

                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <CustomButton
                            variant="primary"
                            type="submit"
                            buttonValue="Enviar mensaje"
                        />
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}

export default Contact;
