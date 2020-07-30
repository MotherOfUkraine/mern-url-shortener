import React, { useContext } from 'react'
import { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useEffect } from 'react'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect( () =>{
        window.M.updateTextFields()
    }, [])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
            message(data.message)
        }
        catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form })
            auth.login(data.token, data.userId)
        }
        catch (e) { }
    }
    return (
        <div className='row'>
            <div className="col s6 offset-s3">
                <h1>MERN</h1>
                <div className="card deep-purple darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Enter email"
                                    name='email'
                                    id="email"
                                    type="text"
                                    value={form.email}
                                    className="validate black-input"
                                    onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter password"
                                    name='password'
                                    id="password"
                                    value={form.password}
                                    type="password"
                                    className="validate black-input"
                                    onChange={changeHandler} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className='btn blue lighten-5 black-text'
                            style={{ marginRight: 25 }} disabled={loading} onClick={registerHandler}>
                            Sign up
                    </button>
                        <button className='btn blue darken-4' onClick={loginHandler} disabled={loading}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}