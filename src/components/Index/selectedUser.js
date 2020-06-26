import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Comments from './comments';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Name = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    color: #060909;
    text-align: center;

    margin: 16px 0px 0px 0px;
`

const Posts = styled.div`
    margin: 0px 0px 32px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Post = styled.article`
    border-radius: 10px;
    box-shadow: 0px 4px 10px #00000066;
    margin: 16px;
    width: 500px;
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

    .showComments{
        font-family: 'Roboto', sans-serif;

        border: 2px solid #1472c4;
        color: #1472c4;
        font-size: 16px;
        margin: 8px 0px 0px 0px;
        padding: 8px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        transition: background-color 150ms;

        :focus{
            outline: none;
        }

        :hover{
            cursor: pointer;
            background-color: #eeeeee;
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

const SelectedUser = ({user}) => {
    const [showMorePosts, setShowMorePosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [isCommentsSectionOpen, setIsCommentSectionOpen] = useState(false);

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
                                <input 
                                    type="button" 
                                    className="showComments" 
                                    value="Show comments" 
                                    onClick={() => {
                                        setSelectedPost(user.posts[0]);
                                        setIsCommentSectionOpen(true);
                                    }}
                                />
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
                                        <Post>
                                            <span className="title">{post.title}</span>
                                            <span className="body">{post.body}</span>
                                            <input 
                                                type="button" 
                                                className="showComments" 
                                                value="Show comments" 
                                                onClick={() => {
                                                    setSelectedPost(post);
                                                    setIsCommentSectionOpen(true);
                                                }}
                                            />
                                        </Post>
                                    )
                                }
                            })}
                        </Posts>
                    }
                </Container>
            }
            <Comments post={selectedPost} open={isCommentsSectionOpen} setOpen={setIsCommentSectionOpen} />
        </>
    )
}

export default SelectedUser;