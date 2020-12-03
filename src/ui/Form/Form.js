import React from "react";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export const CustomField = ({ type, id, nameField, label, placeholder, value, onChange, onBlur }) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label className="text-left">
                {label}
            </Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={nameField} value={value} onChange={onChange} onBlur={onBlur} />
        </Form.Group>
    );
}

export const CustomButton = ({ variant, type, buttonValue, disabled }) => {
    return (
        <Button className="btn btn-block mt-2" variant={variant} type={type} disabled={disabled}>
            {buttonValue}
        </Button>
    );
}

export const CustomButtonWithLink = ({ variant, type, to, buttonValue, disabled }) => {
    return (
        <Link to={to}>
            <Button className="btn btn-block mt-2" variant={variant} type={type} disabled={disabled}>
                {buttonValue}
            </Button>
        </Link>
    );
}

export const CustomTextArea = ({ id, label, rows }) => {
    return (
        <Form.Group controlId={id}>
            <Form.Label>
                {label}
            </Form.Label>
            <Form.Control as="textarea" rows={rows} />
        </Form.Group>
    );
}
