import {Button, Row, Col, Container} from "react-bootstrap";
import React from "react";
import {useHistory} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faScroll, faUsers } from '@fortawesome/free-solid-svg-icons'
import styles from "./AdminButton.module.css"
import { RootState } from "../../store";
import { connect } from "react-redux";


library.add(faCog, faScroll, faUsers)

type AdminButtonsSetDefinition = {
    newToken: string
}

const AdminButtonsSet = (input:AdminButtonsSetDefinition, props:any) => {
    
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
const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(AdminButtonsSet);
