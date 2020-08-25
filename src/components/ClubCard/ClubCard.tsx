import React, {useState, Component} from 'react';
import data from "./testdata";
import {Button, Col, Row, Card} from "react-bootstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import axios from "../../axios";
import styles from "./ClubCard.module.css";

import "./style.css"


type values = {
    i: number,
    x: number,
    y: number,
    scale: number,
    trans: any,
    bind: any,
}

type info = {
    name: string,
    tags: any[]
    text: string,
    socialMedia: any[],
    pics: any[]
}

type state = {
    count: number,
    info: any,
    render: boolean
}

// const findClub = async (values: any) => {
//     return axios.get("/clubs", JSON.stringify({
//         "Email": "hacklab@hl.com",
//         "Bio": "Hacklab is cool",
//         "Size": 20,
//         "Name": "Hacklab"
//     })).then(response => {
//         console.log(response);
//     }).catch(err => {
//         console.log(err + " failed to login");
//     });
// };


// export class Card extends Component {
//     i = 0;
//     // @ts-ignore
//     state: state = {
//         count: this.i, 
//         info: data[this.i],
//         render: true
//     }

//     liked = () => {
//         console.log("Liked!");
//         this.next();
//     }

//     skipped = () => {
//         console.log("Skipped!");
//         this.next();
//     }
    
//     next = () => {
//         if (this.state.count + 1 <= data.length) 
//             this.setState({ count: this.state.count + 1, info: data[this.state.count] })
//         else {
//             this.setState({ render: false })
//         }
//       }

//     componentWillMount() {
//     this.next();
//     }
      
//     render() {
//         const { render } = this.state;
//         if (this.state.render ) {
//             return (
//                 <>
//                     <div className="card w-50">
//                         <img src={this.state.info.pics[0]} className={"card-img-top"}></img>
//                         <div className="card-body pt-1">
//                             <Row className={"m-0 mb-0 mt-1"}>
//                                 <Col lg={9}>
//                                     <h1 className={"card-title m-0 p-0"}>{this.state.info.name}</h1>
//                                     <span className={"text-muted m-0"}>{this.state.info.tags[0]}, {this.state.info.tags[1]}, {this.state.info.tags[2]}</span>
                                    
//                                 </Col>
//                                 <Col lg={3} className={"d-flex align-items-center justify-content-end"}>
//                                     <span><FontAwesomeIcon icon={faUserFriends}/> 5</span>
//                                 </Col>
//                             </Row>
//                             <Row className={"m-0"}>
                                
//                             </Row>
                            
//                             <Row className={"d-flex justify-content-center align-items-center mt-2"}>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}} onClick={this.skipped}>X</Button>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}}>i</Button>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}} onClick={this.liked}>♥</Button>
//                             </Row>
//                         </div>
//                     </div>      
//                 </>
//                 )
            
//         }
//         else {
//             return (
//                 <>
//                 <div className="card w-50 h-75">
//                         <img src="https://p1.pxfuel.com/preview/798/199/684/dogs-cute-puppy-animal-pet-sad.jpg" className={"card-img-top"}></img>
//                         <div className="card-body pt-1">
//                             <h1 className={"card-title mb-0 mt-0"}>no more for you</h1>
//                             <p className={"card-text m-0"}>give us bananas + $0.99 and we'll give you more options</p>
//                             <Row className={"d-flex justify-content-center align-items-center mt-2"}>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}} onClick={this.skipped}>X</Button>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}}>i</Button>
//                                 <Button className={"mx-3"} style={{borderRadius: "50%", width: "50px", height: "50px"}} onClick={this.liked}>♥</Button>
//                             </Row>
//                         </div>
//                     </div>
//                 </>
//             )
//         }
//     }
// }
// export default 

type ClubCardDefinition = {

}

const ClubCard = (input: ClubCardDefinition) => {

    // const changePassword = async (values: any) => {
    //     return axios({
    //         method: 'post', //you can set what request you want to be
    //         url: `/changePassword/users/${input.username}`,
    //         headers: {
    //             Authorization: `Bearer ${input.userToken}`
    //         },
    //         data: {
    //             "oldPassword": values.password,
    //             "newPassword": values.newPassword
    //         }
    //         }).then((response: StatusResponse) => {
    //             console.log(JSON.stringify(response.data.Message));
    //             return (response.data)
    //     }).catch(err => {
    //         console.log(err + " submission failed");
    //     });
    // };
    
    // const [data, setData] = useState([{id: -1, name: "N/A", isActive: true}]);
    // const [userData, setUserData] = useState(["None"]);
    // const [saved, setSaved] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await axios({
    //             method: 'get', //you can set what request you want to be
    //             url: `/tags/active`})
    //         .then ( (result: any) => {
    //             setData(result.data.data);
    //             }
    //         )
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios({
    //             method: 'get', //you can set what request you want to be
    //             url: `/users/${input.username}`,
    //             headers: {
    //                 Authorization: `Bearer ${input.userToken}`
    //             },
    //         })
    //         const tagsArray = result.data.data.tags;
    //         if (tagsArray !== []){
    //             const tagNamesArray = tagsArray.map((item: tag) => item.name);
    //             setUserData(tagNamesArray);
    //         }
    //         else{
    //             return ["None"]
    //         }
            
    //     };
    //     fetchData();
    // }, [input.userToken, input.username]);

    const skipped = () => {
        console.log("skipp")
    }

    const liked = () => {
        console.log("like")
    }

    const showMoreInfo = () => {
        console.log("info")
    }

    return (
            <>
            <Card className={"w-50 h-75"}>
                <Card.Img variant="top" height="50%" src="https://vettedpetcare.com/vetted-blog/wp-content/uploads/2017/09/How-To-Travel-With-a-Super-Anxious-Cat-square.jpeg" alt="Image" />
                <Card.Body>
                    <Card.Title className={styles.title + " d-flex justify-content-between align-items-end"}>MCSS <span className={styles.size}><FontAwesomeIcon icon={faUserFriends}/> 5</span></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Computer Science, Computer Science,Computer Science, + more</Card.Subtitle>
                    <Card.Text>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.
                    </Card.Text>
                    <Row className={"d-flex justify-content-center align-items-center mt-2"}>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={skipped}>X</Button>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={showMoreInfo}>i</Button>
                        <Button className={"mx-3 " + styles.clubCardButton} onClick={liked}>♥</Button>
                    </Row>
                </Card.Body>
            </Card>
            </>
    )
};

export default ClubCard;

