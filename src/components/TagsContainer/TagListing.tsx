import {Form} from "react-bootstrap";
import React, { useState} from "react";

type FormDefinition = {
    id: string
    label: string
    checked: boolean
    myVar: string[]
    setMyVar: any;
}

const TagListing = (input: FormDefinition) => {

    /*{data.map((item: any) => (
                        <Form.Check 
                        type={"checkbox"}
                        id={item}
                        label={item}
                    />
                        ))}*/
    const [check, setCheck] = useState(false);

    const handleClick = (e: any) => {
        const checked = e.target.checked;
        setCheck(!check);
        
        if (checked) {
            const newTagsList = input.myVar.concat(input.id);
            console.log(input.id);
            input.setMyVar(newTagsList);
        }
        else {
            const newTagsList = input.myVar.filter(item => item !== input.id);
            input.setMyVar(newTagsList);
        }
    };

    
    return (
        <Form.Check type={"checkbox"} key={input.id} id={input.id} label={input.label} checked={input.checked} onChange={handleClick}/>
    )
}

export default TagListing;