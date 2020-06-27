import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosArrowBack, IoIosSend } from 'react-icons/io';

import Button from '../shared/button';
import Modal from '../shared/modal';

const Comment = styled.div`
    color: #060909;
    border-bottom: 1px solid #aaaaaa;
    margin: 8px;
    padding: 8px;
    display: flex;
    flex-direction: column;

    .name{
        font-family: 'Open sans', sans-serif;
        font-size: 26px;
        margin: 8px;

        @media (max-width: 500px){
            font-size: 22px;
        }

        @media (max-width: 400px){
            font-size: 20px;
        }
    }

    .body{
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        margin: 8px;

        @media (max-width: 500px){
            font-size: 18px;
        }

        @media (max-width: 400px){
            font-size: 16px;
        }
    }
`

const AddComment = styled(Comment)`
    .title{
        font-family: 'Roboto', sans-serif;
        font-size: 26px;
        color: #060909;
        margin: 8px;

        @media (max-width: 500px){
            font-size: 22px;
        }

        @media (max-width: 400px){
            font-size: 20px;
        }
    }

    .input{
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        color: #060909;
        
        border: 2px solid #060909;
        border-radius: 10px;
        padding: 8px;
        margin: 8px;

        @media (max-width: 500px){
            font-size: 18px;
        }

        @media (max-width: 400px){
            font-size: 16px;
        }
        
        :focus{
            outline: none;
        }
    }
`

const CommentsInfo = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    text-align: center;
    color: #060909;
    width: 100%;
    margin: 8px;
`

const Comments = ({post, open, setOpen}) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [body, setBody] = useState("")

    const GetComments = () => {
        axios.get(`https://gorest.co.in/public-api/comments?post_id=${post.id}&access-token=qcFi9luQcJOhsmpcwknZeSgR19eCoZybd-LD`)
        .then(res => {
            setComments(res.data.result);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
            setLoading(false);
        })
    }

    const SendComment = () => {
        if(name && email && body){
            setSending(true);
            axios.post(`https://gorest.co.in/public-api/comments`, 
                        {post_id: post.id, name, email, body}, 
                        {headers: { Authorization: `Bearer qcFi9luQcJOhsmpcwknZeSgR19eCoZybd-LD`}})
            .then(res => {
                setSending(false);
                setComments([]);
                setLoading(true);
                GetComments();
            })
        }
    }

    useEffect(() => {
        setComments([]);
        setLoading(true);
        GetComments();
    }, [open])

    return(
        <Modal open={open}>
            <Button
                onClick={() => setOpen(false)}
            >
                <IoIosArrowBack className="icon" />
                <span className="text">
                    Go Back
                </span>
            </Button>
            <AddComment>
                <span className="title">Add new comment</span>
                <input 
                    className="input"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="input"
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                    className="input"
                    placeholder="Comment..."
                    onChange={(e) => setBody(e.target.value)}
                    rows="4"
                />
                <Button
                    onClick={() => !sending && SendComment()}
                >
                    <IoIosSend className="icon" />
                    <span className="text">{sending ? "Sending..." : "Send"}</span>
                </Button>
            </AddComment>
            {comments.length > 0 ?
                comments.map(comment => {
                    return(
                        <Comment>
                            <span className="name">
                                {comment.name}
                            </span>
                            <span className="body">
                                {comment.body}
                            </span>
                        </Comment>
                    )
                })
                :
                <div>
                    {loading ? <CommentsInfo>Loading...</CommentsInfo> : <CommentsInfo>No comments...</CommentsInfo>}
                </div>
            }
        </Modal>
    )
}


export default Comments;