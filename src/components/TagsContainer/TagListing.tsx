import {Form} from "react-bootstrap";
import React, { useState} from "react";

type FormDefinition = {
    id: string
    label: string
    checked: boolean
    myVar: string[]
    setMyVar: any
    myVar2: string[]
    setMyVar2: any
    admin: boolean
}

type tag = {
    id: number,
    name: string,
    isActive: boolean
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
    const [switchCheck, setSwitchCheck] = useState(true);


    if (!input.admin) {
        const handleClick = (e: any) => {
            const checked = e.target.checked;
            setCheck(!check);
            
            if (checked) {
                const newTagsList = input.myVar.concat(input.label);
                input.setMyVar(newTagsList);
            }
            else {
                const newTagsList = input.myVar.filter(item => item !== input.label);
                input.setMyVar(newTagsList);
            }
        };
        return (
            <Form.Check type={"checkbox"} key={input.id} id={input.id} label={input.label} checked={input.checked} onChange={handleClick}/>
        )
    }
    else {
        const handleClick = (e: any) => {
            const checked = e.target.checked;
            setSwitchCheck(!check);
            
            if (checked) {
                const newTagsList = input.myVar.concat(input.label);
                input.setMyVar(newTagsList);
                const toggledTagsList = input.myVar2.concat(input.label);
                input.setMyVar2(toggledTagsList);
                console.log("toggled Tags List is now " + toggledTagsList);
                console.log(input.label + "on")
            }
            else {
                const newTagsList = input.myVar.filter(item => item !== input.label);
                input.setMyVar(newTagsList);
                const toggledTagsList = input.myVar2.concat(input.label);
                input.setMyVar2(toggledTagsList);
                console.log("toggled Tags List is now " + toggledTagsList);
                console.log(input.label + "off")
            }
        };
        
        return (
            <Form.Check type={"switch"} key={input.id} id={input.id} label={input.label} checked={input.checked} onChange={handleClick}/>
        )
    }
}

export default TagListing;