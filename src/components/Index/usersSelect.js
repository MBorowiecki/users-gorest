import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDropdown } from 'react-icons/io';

const Select = styled.div`
    border-radius: 10px;
    border: 1px solid #666666;
    width: 300px;
    padding: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;

    transition: box-shadow 250ms;
    box-shadow: 0px 0px 5px ${props => props.isDropdownOpen ? "#1472c4bb" : "#1472c400"};
    
    .input{
        font-family: 'Roboto', sans-serif;
        font-size: 18px;

        width: 100%;
        height: 100%;
        border: none;
        background-color: transparent;
        border-right: 1px solid #aaaaaa;
        padding: 0px 8px 0px 0px;

        :focus{
            outline: none;
        }

        @media (max-width: 500px){
            font-size: 16px;
        }
    }

    .icon{
        color: #060909;
        font-size: 20px;
        margin: 0px 0px 0px 8px;

        transition: transform 250ms;
        transform: rotate(${props => props.isDropdownOpen ? "180deg" : "0deg"});

        :hover{
            cursor: pointer;
        }

        @media (max-width: 500px){
            font-size: 18px;
        }

        @media (max-width: 400px){
            font-size: 16px;
        }
    }
`

const Dropdown = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    border: 1px solid #666666;
    box-shadow: 0px 4px 10px #00000055;
    padding: 8px;
    width: 300px;
    overflow-y: scroll;
    position: absolute;
    top: 120px;

    transition: max-height 250ms 100ms, transform ${props => props.isDropdownOpen ? "0ms" : "150ms"} ${props => props.isDropdownOpen ? "100ms" : "350ms"};
    max-height: ${props => props.isDropdownOpen ? "200px" : "0px"};
    transform: scaleX(${props => props.isDropdownOpen ? "1" : "0"});
`

const User = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    margin: 8px;
    border-radius: 10px;

    :hover{
        background-color: #dddddd;
        cursor: pointer;
    }

    .active{
        width: 8px;
        height: 8px;
        border-radius: 8px;
        background-color: ${props => props.active ? "#2bab35" : "#060909"};
    }

    .name{
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        color: #060909;
        margin: 0px 0px 0px 8px;
    }
`

const SearchableSelect = ({users, placeholder, setSelectedUser}) => {
    const [searchText, setSearchText] = useState("");
    const [searchBoxFocused, setSearchBoxFocused] = useState(false);

    return(
        <>
            <Select
                onFocus={() => setSearchBoxFocused(true)}
                onBlur={() => setSearchBoxFocused(false)}
                isDropdownOpen={searchBoxFocused}
            >
                <input 
                    className="input"
                    type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder={placeholder}
                    ref={input => {
                            if(input && searchBoxFocused)
                                input.focus()
                        }}
                />
                <IoIosArrowDropdown 
                    className="icon" 
                    onClick={() => setSearchBoxFocused(!searchBoxFocused)} 
                />
            </Select>
            <Dropdown isDropdownOpen={searchBoxFocused}>
                {users.filter(user => user.last_name.includes(searchText)).map(user => {
                    return(
                        <User 
                            active={user.status === "active"}
                            key={user.id}
                            onClick={() => {
                                setSelectedUser(user)
                                setSearchText(user.last_name)
                            }}
                        >
                            <div className="active" />
                            <span className="name">
                                {user.first_name} {user.last_name}
                            </span>
                        </User>
                    )
                })}
            </Dropdown>
        </>
    )
}

export default SearchableSelect;