import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";

type FormDefinition = {
    title: string
    children: React.ReactNode
}

const FormContainer = (form: FormDefinition) => {
    return (
        <Container className="form d-flex justify-content-center align-items-center"
                   style={{width: "350px"}}>
            <Row>
                <Col xs lg="12">
                    <h2 className="text-center mb-4">{form.title}</h2>
                        {form.children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer;
