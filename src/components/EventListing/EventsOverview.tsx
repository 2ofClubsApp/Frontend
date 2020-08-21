import {Container, Table} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import "../ClubsOverviewTable/ClubsOverview.css";
import EventListing from "./EventListing";
import axios from "../../axios";
import { RootState } from "../../store";
import { connect } from "react-redux";
import styles from "../ClubForm/ClubForm.module.css"

type EventsOverviewDefinition = {
    newToken: any
    clubID: number
    myVar: event[]
    setMyVar: any
    deleteCommand: any
}

type event = {
    "id": number,
    "name": string,
    "description": string,
    "location": string,
    "fee": number
}

function EventsOverview(input: EventsOverviewDefinition) {
    return (
        <div className={styles.eventsContainer}>
             <Table hover striped>
                 <thead>
                 <tr className={"d-flex"}>
                     <td colSpan={3} className={"col-10"}>
                         <b>Event Name</b>
                     </td>
                     <td className={"col-2"}><b>Manage</b></td>
                 </tr>
                 </thead>
                 <tbody>
                     {input.myVar.map((item: any) => (
                         <EventListing key={item.id} clubID={input.clubID} eventID={item.id} active={false} title={item.name} overviewType={true} deleteCommand={input.deleteCommand}/>
                     ))}
                 </tbody>
             </Table>
        </div>
    );
  }

  const mapStateToProps = (state: RootState) => {
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username,
        date: state.system.date
    }
}

export default connect(mapStateToProps)(EventsOverview);