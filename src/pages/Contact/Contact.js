import React, {useContext, useState} from 'react';
import { Container, Row, Col, Form } from "react-bootstrap";
import { FirebaseContext } from '../../firebase';
import useValidation from "../../hooks/useValidation";
import contactValidation from "../../validations/contactValidation";
import Title from "../../ui/Title/Title";
import Error from "../../ui/Error/Error";
import { CustomButton, CustomField, CustomTextArea } from "../../ui/Form/Form";
import { toast } from "react-toastify";

const initialState = {
    nombre : '',
    apellido : '',
    email : '',
    mensaje : ''
}

const Contact = () => {

    const [ error, setError ] = useState(false);

    const { data, errors, handleSubmit, handleChange, handleBlur } = useValidation( initialState, contactValidation, saveContact);

    const { nombre, apellido, email, mensaje } = data;

    const [ sent, setSent ] = useState(0);

    const { firebase } = useContext( FirebaseContext );

    async function saveContact() {
        try {
            const contact = { nombre, apellido, email, mensaje, created_at: Date.now() }
            firebase.db.collection('contacts').add(contact);
            toast.success('🦄 Mensaje recibido correctamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSent(1);
        } catch (error) {
            console.error('Hubo un error al enviar el mensaje', error.message);
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

            <Title title="Escribinos tu consulta" />

            <Form onSubmit={handleSubmit} noValidate>

                <Row>

                    <Col sm={12} md={6} lg={6} xl={6}>

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

                    <Col sm={12} md={6} lg={6} xl={6}>

                        <CustomField
                            type="text"
                            id="apellido"
                            nameField="apellido"
                            label="Apellido"
                            value={apellido}
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
                            value={email}
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

                    </Col>

                </Row>

                <Row>

                    <Col sm={12} md={12} lg={12} xl={12}>

                        { error && <Error message={error}></Error> }

                    </Col>

                </Row>

                <Row className="justify-content-center">
                    <Col sm={12} md={6} lg={6} xl={6}>
                        <CustomButton
                            variant="primary"
                            type="submit"
                            buttonValue="Enviar mensaje"
                            disabled={ !nombre || !apellido || !email || !mensaje || sent !== 0 }
                        />
                    </Col>
                </Row>

            </Form>
        </Container>
    )
}

export default Contact;
