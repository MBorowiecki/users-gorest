import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const Name = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    color: #060909;
    text-align: center;
`

const Posts = styled.div`
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15%;
    justify-content: space-evenly;
    row-gap: 32px;
    margin: 16px 0px 32px 0px;
`

const Post = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 10px #00000066;
    padding: 16px;
    display: flex;
    flex-direction: column;

    .title{
        font-family: 'Open sans', sans-serif;
        font-size: 18px;
        color: #060909;
        font-weight: 600;
        margin: 0px 0px 8px 0px;
    }

    .body{
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: #060909;
        font-weight: 300;
    }
`

const ShowMorePosts = styled.input`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #060909;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    border: none;
    transition: background-color 150ms;

    :hover{
        cursor: pointer;
        background-color: #eeeeee;
    }
`

const SelectedUser = ({user}) => {
    const [showMorePosts, setShowMorePosts] = useState(false);

    useEffect(() => {
        setShowMorePosts(false);
    }, [user])

    return(
        <>
            {Object.keys(user).length > 0 && 
                <Container>
                    <Name>{user.first_name} {user.last_name}</Name>
                    {user.posts !== undefined && 
                        <Posts>
                            <Post>
                                <span className="title">{user.posts[0].title}</span>
                                <span className="body">{user.posts[0].body}</span>
                            </Post>
                            {!showMorePosts &&
                                <ShowMorePosts 
                                    type="button" 
                                    value="Show more posts..." 
                                    onClick={() => setShowMorePosts(true)} 
                                />
                            }
                            {user.posts.map(post => {
                                if(showMorePosts){
                                    return(
                                        <Post>
                                            <span className="title">{post.title}</span>
                                            <span className="body">{post.body}</span>
                                        </Post>
                                    )
                                }
                            })}
                        </Posts>
                    }
                </Container>
            }
        </>
    )
}

export default SelectedUser;