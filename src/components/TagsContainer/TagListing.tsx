import {Form} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "../ClubForm/ClubForm.module.css"


type FormDefinition = {
    id: string
    label: string
}


/*
{tags.map((value) => (
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
            ))}*/
const TagListing = (input: FormDefinition) => {

    /*{data.map((item: any) => (
                        <Form.Check 
                        type={"checkbox"}
                        id={item}
                        label={item}
                    />
                        ))}*/

    return (
        <Form.Check type={"checkbox"} key={input.id} label={input.label} checked/>
    )
}

export default TagListing;