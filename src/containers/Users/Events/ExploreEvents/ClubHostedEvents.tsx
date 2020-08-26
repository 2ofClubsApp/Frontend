import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import '../../../../app.css';
import NavBar from "../../../../components/NavBar/NavBar"
import { RootState } from '../../../../store/reducers';
import { connect, MapDispatchToProps } from 'react-redux';
import EventCard from '../../../../components/Event/EventCard/EventCard';
import axios from "../../../../axios";
import { eventGET } from '../../../../types/DataResponses';
import { setLogin, setToken, setUsername, setExpiry } from '../../../../store/actions/actions';
import { useParams } from 'react-router-dom';

const ClubHostedEvents = (props: any) => {

    let [counter, setCounter] = useState(0);
    const [eventCardRows, setEventCardRows] = useState([<span key="error"></span>]);

    let { id } = useParams();

    useEffect(() => {
        let eventRows: JSX.Element[] = [];
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/clubs/${id}/events`,
            }).then((result: any) => {
                let allEvents = result.data.data.hosts;
                let numOfRows = ((allEvents.length % 3 === 0) ? (allEvents.length / 3) : (allEvents.length / 3) + 1);

                for (let i = 0; i < numOfRows; i++) {
                    eventRows.push(createRow(allEvents, i));
                }
                setEventCardRows(eventRows);
            }).catch(err => {
                console.log(err + " submission failed");
            });
        };
        fetchData();
    }, []);

    const createRow = (allEvents: eventGET[], row: number) => {
        let arr: JSX.Element[] = [];
        const maxColumns = counter + 3;
        for (let i = counter; i < maxColumns; i++) {
            if (i < allEvents.length) {
                arr.push(<Col sm={12} md={4} key={row + i}><EventCard eventObject={allEvents[i]} token={props.token} isAttending={false} /></Col>);
                setCounter(counter++);
            }
        }

        return (
            <Row className="m-5" key={row}>
                {arr}
            </Row>
        )
    }

    return (
        <>
            <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken} />
            <Container className={"w-100"}>
                {eventCardRows}
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

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubHostedEvents);