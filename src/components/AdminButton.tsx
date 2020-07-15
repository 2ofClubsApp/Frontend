import {Button, Row, Col, Container} from "react-bootstrap";
import React from "react";
import {useHistory, Link} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faScroll } from '@fortawesome/free-solid-svg-icons'
import styles from "./AdminButton.module.css"


library.add(faCog, faScroll)

const AdminButton = () => {
    
    const history = useHistory();
    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };

    return (
        <>
            <Container className={"d-flex justify-content-center align-items-center w-100"}>
                <Row>
                    <Col xs={12} lg={6}>
                        <Button className={styles.adminbtn}>
                            <FontAwesomeIcon icon={faScroll} className={styles.icon}/>
                            Requests
                        </Button>
                    </Col>
                    <Col xs={12} lg={6}>
                        <Button className={styles.adminbtn}>
                            <FontAwesomeIcon icon={faCog} className={styles.icon}/>
                            Settings
                        </Button>
                    </Col>
                </Row>
                
            </Container>
            
        </>
    )
}
export default AdminButton
