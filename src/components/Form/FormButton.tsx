import {Button} from "react-bootstrap";
import React from "react";

type Props = {
    name: string
}
const FormButton = (button: Props) => {
    return (
        <div className="d-flex justify-content-center">
            <Button className="align-middle mt-3 pl-4 pr-4 pt-2 pd-2 btn-grad"
                    type="submit">
                {button.name}
            </Button>
        </div>
    )
}
export default FormButton
