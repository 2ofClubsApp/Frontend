import { Table } from "react-bootstrap";
import React from "react";
import EventListing from "./EventListing";
import { RootState } from "../../../store";
import { connect } from "react-redux";
import styles from "../../Club/ClubForm/ClubForm.module.css"
import { eventGET } from "../../../types/DataResponses";

type EventsOverviewDefinition = {
    userToken: string,
    clubID: number,
    myVar: eventGET[],
    setMyVar: any,
    deleteCommand: any,
    setIsNew: any,
    updateCommand: any,
    setEventID: any
}

function EventListingsTable(input: EventsOverviewDefinition) {
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
                         <EventListing key={item.id} clubID={input.clubID} eventID={item.id} active={false} title={item.name} overviewType={true} deleteCommand={input.deleteCommand} setIsNew={input.setIsNew} updateCommand={input.updateCommand} setEventID={input.setEventID}/>
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

export default connect(mapStateToProps)(EventListingsTable);