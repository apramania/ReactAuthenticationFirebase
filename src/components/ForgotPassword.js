import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'



const ForgotPassword = () => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [errors, setErrors] = useState("")
    const [ message, setMessage ] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setMessage("")
            setErrors("")
            setLoading(true)
            await resetPassword(emailRef.current.value )
            setMessage("Check your email for further instruction")
        }catch(err){
            setErrors("Email could not be sent")
        }
        setLoading(false)
        
    }

    return (
        <> 
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    { message && <Alert variant="success">{message}</Alert> }
                    { errors && <Alert variant="danger">{errors}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword
