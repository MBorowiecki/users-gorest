import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosArrowBack, IoIosSend } from 'react-icons/io';

const Background = styled.div`
    background-color: #000000bb;
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;

    display: ${props => props.open ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Container = styled.div`
    background-color: #ffffff;
    padding: 8px;
    box-shadow: 0px 4px 10px #00000055;
    border-radius: 10px;
    max-height: 80%;
    overflow-y: scroll;
    width: 500px;
`

const Button = styled.button`
    font-family: 'Roboto', sans-serif;
    color: #1472c4;
    border-radius: 10px;
    border: 2px solid #1472c4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    padding: 8px;
    margin: 8px;

    :hover{
        cursor: pointer;
        background-color: #eeeeee;
    }

    :focus{
        outline: none;
    }

    .icon{
        font-size: 20px;
    }

    .text{
        font-size: 18px;
    }
`

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
    }

    .body{
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        margin: 8px;
    }
`

const AddComment = styled(Comment)`
    .title{
        font-family: 'Roboto', sans-serif;
        font-size: 26px;
        color: #060909;
        margin: 8px;
    }

    .input{
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        color: #060909;
        
        border: 2px solid #060909;
        border-radius: 10px;
        padding: 8px;
        margin: 8px;
        
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
        <Background open={open}>
            <Container>
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
            </Container>
        </Background>
    )
}


export default Comments;