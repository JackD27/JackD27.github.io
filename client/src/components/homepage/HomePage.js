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
                    <span className='username'> @{username}</span>
                </h2>

                <h2>
                    Your userId is
                    <span className='userId'> {user_id}</span>
                </h2>
                <h2>
                    Your email is
                    <span className='email'> {email}</span>
                </h2>
                <h2>
                    Your password is
                    <span className='password'> {password} ( hashed )</span>
                </h2>
                <h2>
                    Your income is
                    <span className='income'> {income}</span>
                </h2>
                <h2>
                    Your Trading Type is
                    <span className='tradingType'> {tradingType}</span>
                </h2>
            </div>
        </>
    )
}

export default HomePage