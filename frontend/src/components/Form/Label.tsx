import React from 'react'
import Form from "react-bootstrap/Form";
import {FormLabel} from "../../types/FormInfo";

const Label = (label: FormLabel) => {
    return (
        <Form.Group controlId={label.info.controlId}>
            <Form.Label>{label.info.label}</Form.Label>
            <Form.Control
                onChange={label.onChange}
                type={label.info.type} placeholder={label.info.placeholder}/>
        </Form.Group>
    )
};

export default Label
