import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Comments from './comments';

import Button from '../shared/button';
import ChangeName from './changeName';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const LoadingMessage = styled.span`
    font-family: 'Roboto', sans-serif;
    font-size: 26px;
    color: #1472c4;
    text-align: center;
    margin: 16px;
`

const TopComponent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 16px 0px 0px 0px;

    .name{
        font-family: 'Roboto', sans-serif;
        font-size: 22px;
        color: #060909;
    }
`

const Posts = styled.div`
    margin: 0px 0px 32px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Post = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 10px #00000055;
    margin: 16px;
    width: 500px;
    padding: 16px;
    display: flex;
    flex-direction: column;

    @media (max-width: 500px){
        width: 400px;
    }

    @media (max-width: 400px){
        width: 300px;
    }

    .title{
        font-family: 'Open sans', sans-serif;
        font-size: 20px;
        color: #060909;
        font-weight: 600;
        margin: 0px 0px 8px 0px;

        @media (max-width: 500px){
            font-size: 18px;
        }

        @media (max-width: 400px){
            font-size: 16px;
        }
    }

    .body{
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        color: #262929;
        font-weight: 300;

        @media (max-width: 500px){
            font-size: 14px;
        }
    }
`

const ShowMorePosts = styled.input`
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    color: #060909;
    margin: 16px;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 10px;
    border: none;
    transition: background-color 150ms;

    :hover{
        cursor: pointer;
        background-color: #eeeeee;
    }

    :focus{
        outline: none;
    }
`

const SelectedUser = ({user, changeUserName, isLoadingUser}) => {
    const [showMorePosts, setShowMorePosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [isCommentsSectionOpen, setIsCommentSectionOpen] = useState(false); // Is comments modal open
    const [isNameChangeOpen, setIsNameChangeOpen] = useState(false); // Is name change modal open

    useEffect(() => {
        setShowMorePosts(false);
    }, [user])

    return(
        <>
            {isLoadingUser ? <Container><LoadingMessage>Loading...</LoadingMessage></Container> 
            :
            Object.keys(user).length > 0 && 
                <Container>
                    <TopComponent>
                        <span className="name">{user.first_name} {user.last_name}</span>
                        <Button
                            onClick={() => setIsNameChangeOpen(true)}
                        >
                            <span className="text">Change name</span>
                        </Button>
                    </TopComponent>
                    {user.posts !== undefined && 
                        <Posts>
                            <Post>
                                <span className="title">{user.posts[0].title}</span>
                                <span className="body">{user.posts[0].body}</span>
                                <Button 
                                    onClick={() => {
                                        setSelectedPost(user.posts[0]);
                                        setIsCommentSectionOpen(true);
                                    }}
                                >
                                    <span className="text">Show comments</span>
                                </Button>
                            </Post>
                            {!showMorePosts &&
                                <ShowMorePosts 
                                    type="button" 
                                    value="Show more posts..." 
                                    onClick={() => setShowMorePosts(true)} 
                                />
                            }
                            {user.posts.map((post, index) => {
                                if(showMorePosts && index > 0){
                                    return(
                                        <Post key={post.id}>
                                            <span className="title">{post.title}</span>
                                            <span className="body">{post.body}</span>
                                            <Button 
                                                onClick={() => {
                                                    setSelectedPost(post);
                                                    setIsCommentSectionOpen(true);
                                                }}
                                            >
                                                <span className="text">Show comments</span>
                                            </Button>
                                        </Post>
                                    )
                                }
                            })}
                        </Posts>
                }
                </Container>
            }
            <Comments 
                post={selectedPost} 
                open={isCommentsSectionOpen} 
                setOpen={setIsCommentSectionOpen} 
            />
            <ChangeName 
                user={user} 
                changeUserName={changeUserName} 
                open={isNameChangeOpen} 
                setOpen={setIsNameChangeOpen} 
            />
        </>
    )
}

export default SelectedUser;