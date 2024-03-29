import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {

    const [ error, setError ] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useState()

    const handleLogout = async () =>{
        setError(" ")
        try{
            await logout()
            history.push("/login")
        }catch(err){
            setError(" Failed to Log Out ")
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    { error && <Alert variant="danger">{error}</Alert> }
                    <strong>Email: </strong>{currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary mt-3 w-100" >Update Profile</Link>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
               <Button variant="link" onClick={ handleLogout }> Log Out </Button>
            </div>
        </>
    )
}

export default Dashboard
