import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'


const UpdateProfile = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser } = useAuth()
    const [errors, setErrors] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setErrors(" Passwords do not match! ")
        }

        const promises = []
        setLoading(true)
        setErrors("")

        if(emailRef.current.value !== currentUser.email){
            promises.push(currentUser.updateEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){
            promises.push(currentUser.updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setErrors("Failed to Update Profile")
        }).finally(() => {
            setLoading(false)
        })

        try{
            setErrors("")
            setLoading(true)
            // await signup(emailRef.current.value, passwordRef.current.value)
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
                    <h2 className="text-center mb-4">Update Profile</h2>
                    { errors && <Alert variant="danger">{errors}</Alert> }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    )
}

export default UpdateProfile
