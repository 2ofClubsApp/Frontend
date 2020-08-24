import {Button, Row, Col, Container} from "react-bootstrap";
import React from "react";
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faScroll, faUsers } from '@fortawesome/free-solid-svg-icons'
import styles from "./AdminButton.module.css"

/**
 * Creates the buttons displayed on the AdminPanel container
 */
const AdminButtonsSet = () => {
    
    const history = useHistory();

    const changeRoute = (path: string) => {
        history.replace({pathname: path})
    };
    
    return (
        <>
            <Container className={"d-flex justify-content-center align-items-center w-100"}>
                <Row>
                    <Col xs={12} lg={4}>
                        <Button className={styles.adminbtn} onClick={() => changeRoute('/admin/requests/clubs')}> 
                            <FontAwesomeIcon icon={faScroll} className={styles.icon}/>
                            Club Requests
                        </Button>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Button className={styles.adminbtn} onClick={() => changeRoute('/admin/requests/users')}> 
                            <FontAwesomeIcon icon={faUsers} className={styles.icon}/>
                            User Requests
                        </Button>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Button className={styles.adminbtn} onClick={() => changeRoute('/admin/settings')}>
                            <FontAwesomeIcon icon={faCog} className={styles.icon}/>
                            Settings
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AdminButtonsSet;
