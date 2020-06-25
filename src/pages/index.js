import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

//Custom components
import AppTitle from '../components/Index/appTitle';
import UsersSelect from '../components/Index/usersSelect';
import SelectedUser from '../components/Index/selectedUser';

const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`

const Index = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [completeSelectedUser, setCompleteSelectedUser] = useState({});

    useEffect(() => {
        GetUsers();
    }, [])

    useEffect(() => {
        GetPosts();
    }, [selectedUser])

    const GetPosts = () => {
        if(Object.keys(selectedUser).length > 0){
            axios.get(`https://gorest.co.in/public-api/posts?user_id=${selectedUser.id}&access-token=qcFi9luQcJOhsmpcwknZeSgR19eCoZybd-LD`)
            .then(res => {
                let _selectedUser = selectedUser;
                _selectedUser.posts = res.data.result;
                setCompleteSelectedUser(_selectedUser);
            })
        }
    }

    const GetUsers = () => {
        axios.get("https://gorest.co.in/public-api/users?access-token=qcFi9luQcJOhsmpcwknZeSgR19eCoZybd-LD")
        .then(res => {
            setUsers(res.data.result);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <Container>
            <AppTitle />
            <UsersSelect 
                users={users} 
                placeholder="Search for users by last name..." 
                setSelectedUser={setSelectedUser} 
            />
            <SelectedUser user={completeSelectedUser} />
        </Container>
    )
}

export default Index;