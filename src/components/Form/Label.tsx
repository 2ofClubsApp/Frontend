import React from 'react'
import Form from "react-bootstrap/Form";
import {FormLabel} from "../../types/FormInfo";

const Label = (label: FormLabel) => {
    return (
        <Form.Group>
            <Form.Label>{label.placeholder}</Form.Label>
            <Form.Control
                type={label.type}
                name={label.name}
                placeholder={label.placeholder}
                value={label.values[label.name]}
                onChange={label.handleChange}
                isInvalid={!!label.errors[label.name]}
            />
            <Form.Control.Feedback type="invalid">
                {label.errors[label.name]}
            </Form.Control.Feedback>
        </Form.Group>
    )
};

export default Label
