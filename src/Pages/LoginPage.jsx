import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import '../assets/styles/login.css'
import { VALIDATION_MESSAGES } from "../constants/message";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import googleIcon from '../assets/icons/google-icon.svg';
import facebook from '../assets/icons/facebook.svg';
import twitter from '../assets/icons/twitter-icon.svg';
import linkedin from '../assets/icons/linkedin.svg';
import loginicon from '../assets/icons/login-icon.svg';


export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        userName: "",
        password: "",
        isSignedin: false
    })
    const [errObj, setErrObj] = useState({});


    const validateUserInput = () => {
        const errors = {};
        const input = userDetails.userName.trim();

        if (!input) {
            errors.userName = VALIDATION_MESSAGES.USERNAME_REQUIRED

        }
        else if (input.includes("@")) {
            if (!EMAIL_REGEX.test(input)) {
                errors.userName = VALIDATION_MESSAGES.INVALID_EMAIL;
            }
        }
        else if (!input.includes("@")) {
            if (input.length < 3)
                errors.userName = VALIDATION_MESSAGES.USERNAME_LENGTH;
        }



        if (!userDetails.password) {
            errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED
        }
        else if (!PASSWORD_REGEX.test(userDetails.password)) {
            errors.password = VALIDATION_MESSAGES.INVALID_PASSWORD;
        }
        setErrObj(errors);
        return Object.keys(errors).length === 0;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateUserInput()) return
        dispatch(login(userDetails.userName));

        navigate("/homepage");
    }

    const removeErr = (field) => {
        setErrObj((prev) => ({ ...prev, [field]: "" }));
    };

    return (
        <div className="login-section">
            <Container fluid className="login-container">


                <Row className="login-row">

                    <Col md={6} xs={12} className="input-section">
                        <div className="login-input-div form-wrapper">
                            <div className="text-container">
                            <h3 className="signIn-text"> Sign In</h3>
                            <p className="new-user-text">
                                New User? <span className="create-account-text">Create an account</span>
                            </p>
                            </div>
                            
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        className="custom-input"
                                        type="text"
                                        placeholder="Username or email"
                                        value={userDetails.userName}
                                        onChange={e => {
                                            setUserDetails({ ...userDetails, userName: e.target.value });
                                            removeErr("userName");
                                        }}

                                    />
                                    {errObj.userName && <div className="text-danger small">{errObj.userName}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        className="custom-input"
                                        type="password"
                                        placeholder="Password"
                                        value={userDetails.password}
                                        onChange={e => {
                                            setUserDetails({ ...userDetails, password: e.target.value });
                                            removeErr("password");
                                        }}

                                    />
                                    {errObj.password && <div className="text-danger small">{errObj.password}</div>}
                                </Form.Group>

                                <Form.Group className="mb-3 ">
                                    <Form.Check
                                        className="custom-checkbox"
                                        type="checkbox"
                                        label="Keep me signed in"
                                        checked={userDetails.isSignedin}
                                        onChange={e => setUserDetails({ ...userDetails, isSignedin: e.target.checked })}
                                    />
                                </Form.Group>


                                <Button
                                    type="button"
                                    className="signin-btn"
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </Button>

                            </Form>
                            <div className="divider">
                                <span className="line"></span>
                                <span className="or-text">Or Sign In With</span>
                                <span className="line"></span>
                            </div>

                            <div className="social-icons">
                                <img src={googleIcon} alt="google" />
                                <img src={facebook} alt="google" />
                                <img src={linkedin} alt="google" />
                                <img src={twitter} alt="google" />

                            </div>

                        </div>

                    </Col>
                    <Col md={6} className="illustration-section d-none d-md-block">
                        <img
                            src={loginicon}
                            alt="illustration"
                            className="illustration-img"
                        />
                    </Col>

                </Row>


            </Container>
        </div>
    )
}
