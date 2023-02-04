import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import './homepage.css'
const HomePage = () => {
    const [user, setUser] = useState({})


    useEffect(() => {
        setUser(getUserInfo())
        console.log("Info: ",user)
    }, [])


    if (!user) return (<div><h3>You are not authorized to view this page, Please Login in <Link to={'/login'}><a href='#'>here</a></Link></h3></div>)
    const { user_id, email, username, password, income, tradingType } = user
    return (
        <>
            <div>
                <h2>
                    Welcome
                    <a className='username'> @{username}</a>
                </h2>

                <h2>
                    Your userId is
                    <a className='userId'> {user_id}</a>
                </h2>
                <h2>
                    Your email is
                    <a className='email'> {email}</a>
                </h2>
                <h2>
                    Your password is
                    <a className='password'> {password} ( hashed )</a>
                </h2>
                <h2>
                    Your income is
                    <a className='income'> {income}</a>
                </h2>
                <h2>
                    Your Trading Type is
                    <a className='tradingType'> {tradingType}</a>
                </h2>
            </div>
        </>
    )
}

export default HomePage