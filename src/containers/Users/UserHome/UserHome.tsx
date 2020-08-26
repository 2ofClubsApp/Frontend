import React, { useState, useEffect } from 'react'
import {Container} from "react-bootstrap";
import '../../../app.css';
// import {useHistory} from 'react-router-dom'
import NavBar from "../../../components/NavBar/NavBar"
import { RootState } from '../../../store/reducers';
import { connect, MapDispatchToProps } from 'react-redux';
import {setLogin, setToken, setUsername, setExpiry} from "../../../store/actions/actions";
import axios from "../../../axios";
import ClubCard from '../../../components/ClubCard/ClubCard';
import { Club } from '../../../types/DataResponses';
import styles from "./UserHome.module.css"; 

const Home = (props: any) => {
    // const history = useHistory();
    // const changeRoute = (path: string) => {
    //     history.replace({pathname: path})
    // };

    // const [state, setState] = React.useState({
    //     username: "",
    //     password: "",
    // });

    // const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     const value = event.target.value
    //     const id = event.target.id
    //     setState({
    //         ...state,
    //         [id]: value
    //     })
    // }

    const [userTags, setUserTags] = useState([{"id": -1, "name": "", "isActive": true}]);
    const [tagFilteredClubs, setTagFilteredClubs] = useState([{ id: -100, name: '', email: '', bio: '', logo: '', size: 1, tags: [], hosts: []}]);
    const [index, setIndex] = useState(-1);
    const [club, setClub] = useState({ id: -100, name: '', email: '', bio: '', logo: '', size: 1, tags: [], hosts: []})
    const [cards, setCards] = useState([<ClubCard username={props.username} token={props.token} key={1} clubObject={{ id: -1, name: '', email: '', bio: '', logo: '', size: 1, tags: [], hosts: []}} index={0}/>]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${props.username}`,
                headers: {
                Authorization: `Bearer ${props.token}`
                },
                })
            let arr = result.data.data.tags.map((items: any) => {return items.name});
            setUserTags(result.data.data.tags);
            const result2 = await axios({
                method: 'get', //you can set what request you want to be
                url: `/users/${props.username}/clubs`,
                headers: {
                    Authorization: `Bearer ${props.token}`
                },
                data: {
                    "tags": arr
                }
                }).then((result2: any) => {
                    let arr2 = result2.data.data;
                    setTagFilteredClubs(result2.data.data);
                    
                })
        };
        fetchData();
        
    }, [props.username, props.token]);

    useEffect(() => {
        let arrOfClubCard = tagFilteredClubs.map((item: Club, index: number) => {return <ClubCard key={item.id}  username={props.username} token={props.token} clubObject={item} index={index+1}/>});
        arrOfClubCard.push(<ClubCard key={-1} username={props.username} token={props.token} clubObject={{ id: -1, name: '', email: '', bio: '', logo: '', size: 1, tags: [], hosts: []}} index={0} />)
        setCards(arrOfClubCard);
    }, [tagFilteredClubs, userTags])
    


    return (
        <>
           <NavBar isSiteAdmin={false} userUsername={props.username} userToken={props.token} setLogin={props.onSetLogin} setToken={props.setToken}/>
            <div className={"justify-content-center p-5 " + styles.dgrid}>
                {cards}
            </div>
        </> 
    )
}

const mapStateToProps = (state: RootState) => {
    // console.log("islogged in is " + state.system.isLoggedIn);
    // console.log("token is " + state.system.token);
    return {
        isLogged: state.system.isLoggedIn,
        token: state.system.token,
        username: state.system.username
    }
};

const mapDispatchToProps = (dispatch: MapDispatchToProps<any, null>) => {
    return {
        onSetLogin: (isLogged: boolean) => dispatch(setLogin(isLogged)),
        setToken: (token: string) => dispatch(setToken(token)),
        setUsername: (username: string) => dispatch(setUsername(username)),
        setExpiry: (date: number) => dispatch(setExpiry(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);