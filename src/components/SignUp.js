import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'


const SignUp = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setErrors(" Passwords do not match! ")
        }

        try{
            setErrors("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")

        }catch(err){
            setErrors("Failed to create an account")
        }
        setLoading(false)
        
    }

    return (
        <> 
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    { errors && <Alert variant="danger">{errors}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Already have an account? Log In</Link>
            </div>
        </>
    )
}

export default SignUp
