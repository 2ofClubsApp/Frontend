import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from "react-bootstrap";
import '../../app.css';
// import {useHistory} from 'react-router-dom'
import NavBar from "../../components/NavBar/NavBar"
import { RootState } from '../../store';
import { connect } from 'react-redux';
import EventCard from '../../components/EventCard/EventCard';
import axios from "../../axios";
import { eventGET } from '../../types/DataResponses';

const YourEvents = (props: any) => {

    let [counter, setCounter] = useState(0);
    const [allEventRows, setAllEventRows] = useState([<></>]);

    useEffect(() => {
        let eventRows:JSX.Element[] = [];
        const fetchData = async () => {
            await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${props.username}`,
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
                }).then((result: any) => {
                    console.log(result.data.data.attends);
                    let allEvents = result.data.data.attends;
                    let numOfRows = ( (allEvents.length%3 === 0) ? (allEvents.length/3) : (allEvents.length/3) + 1);

                    for (let i = 0; i < numOfRows; i++) {
                        eventRows.push(createRow(allEvents, i));
                    }
                    setAllEventRows(eventRows);
                    // return (response.data.data.Events)
            }).catch(err => {
                console.log(err + " submission failed");
            });
        };
        fetchData();
    }, []);

    const createRow = (allEvents: eventGET[], row: number) => {
        let arr: JSX.Element[] = [];
        const maxColumns = counter + 3;
        console.log(counter)
        for (let i = counter; i < maxColumns; i++){
            if ( i < allEvents.length) {
                arr.push(<Col sm={12} md={4} key={row + i}><EventCard eventObject={allEvents[i]} token={props.token} isAttending={true}/></Col>);
                setCounter(counter++);
            }
        }
        
        console.log(arr);

        return (
            <Row className="m-5" key={row}> 
                {arr}    
            </Row>
        )
    }  

    return (
        <>
           <NavBar isSiteAdmin={false}></NavBar>
            <Container className={"w-100"}>
                {allEventRows}
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

export default connect(mapStateToProps)(YourEvents);