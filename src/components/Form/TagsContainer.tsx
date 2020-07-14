import {Form} from "react-bootstrap";
import React from "react";
import styles from "./ClubForm.module.css"

type FormDefinition = {
    children: React.ReactNode
}

const TagsContainer = (form: FormDefinition) => {
    return (
    <div className={styles.tagsContainer}>
        <Form>
            {["checkbox"].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                <Form.Check 
                    type={"checkbox"}
                    id={"0"}
                    label={"Art"}
                />
                <Form.Check 
                    type={"checkbox"}
                    id={"1"}
                    label={"Computer science"}
                />
                <Form.Check 
                    type={"checkbox"}
                    id={"2"}
                    label={"Math"}
                />
                <Form.Check 
                    type={"checkbox"}
                    id={"3"}
                    label={"Art"}
                />
                <Form.Check 
                    type={"checkbox"}
                    id={"4"}
                    label={"Computer science"}
                />
                <Form.Check 
                    type={"checkbox"}
                    id={"5"}
                    label={"Math"}
                />
                </div>
            ))}
        </Form>
        </div>
    )
}

export default TagsContainer;