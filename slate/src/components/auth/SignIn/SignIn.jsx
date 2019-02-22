import React, { Component } from 'react'
import { Button, Form, Message } from 'semantic-ui-react'
import './signin.css'
import { connect } from 'react-redux'
import { signIn } from '../../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class SignIn extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { authError, auth } = this.props;

        // ROUTE GUARD -- if the user isn't logged in yet and tries to access this component, redirect.
        if (auth.uid) return <Redirect to='/home' />
        return (
            <div className="signin-main">
                <div className="sg">
                    <h1 className="signin-logo"><a href="/">slate</a></h1>
                    <div className="signin-card">
                        <div className="signin-form">
                            <h1 className="create-your-acc">Log in</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="email" id="email" placeholder='Email' />
                                </Form.Field>
                                <Form.Field required onChange={this.handleChange}>
                                    <input type="password" id="password" placeholder='Password' />
                                </Form.Field>

                                <div className="form-buttons">
                                    <div className="login-instead">
                                        <a href="/register">Create account</a>
                                    </div>

                                    <div className="submit-btn">
                                        <Button inverted color="orange" type='submit'>Log in</Button>
                                    </div>
                                </div>
                            </Form>

                            <div className="message-negative">
                                { 
                                    authError ? 
                                    <Message negative>
                                        <Message.Header>Oof. Login Failed</Message.Header>
                                        <p>The email/password used was incorrect.</p>
                                    </Message>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    // state > auth in rootReducer > authError in authReducer
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
