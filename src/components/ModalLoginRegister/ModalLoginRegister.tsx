import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { InputText } from '../InputText/InputText';
import '../../index.css';
import { TodoButton } from '../TodoButton/TodoButton';
import { useAuthUser } from '../../../hooks/useAuthUser';
import { UserError } from '../../types/users';
import { ModalLoginRegisterProps } from '../../types/api';

export const ModalLoginRegister: React.FC<ModalLoginRegisterProps> = ({ show, onClose }) => {
    const { user, setUser, userError, setUserError, submitHandlerLogin, submitHandlerRegister } = useAuthUser();
    const [mode, setMode] = useState<'login' | 'register'>('login');

    //CLEAN ERRORS
    useEffect(() => {
        setUserError({} as UserError);
    }, [mode, setUserError, onClose]);

    //SHOW REGISTER 
    const handleRegisterClick = () => {
        setMode('register');
    };

    //SHOW LOGIN 
    const handleLoginClick = () => {
        setMode('login');
    };

    //RENDER LOGIN / REGISTER TITLE
    const renderTitle = () => {
        return (
            <div
                className="text-center mb-3 display-5"
                style={{
                    color: 'rgba(42, 190, 64, 0.66)',
                    textShadow: '-0.04em -0.04em 0 blue',
                    fontWeight: 'bold'
                }}>
                <div>{mode === 'login' ? 'Login' : 'Register'}</div>
            </div>
        );
    };

    return (
        //MODAL LOGIN / REGISTER
        <Modal show={show} onHide={onClose}>
            <Modal.Body>
                <Container className="d-flex justify-content-center align-items-center mt-4">
                    <Row>
                        <Card
                            style={{
                                backgroundColor: '#9f512121',
                                borderRadius: '1em'
                            }}>

                            {/* RENDER TITLE */}
                            {renderTitle()}

                            <Card.Body className="loginDataUser">
                                <Row className="justify-content-center align-items-center">
                                    <Col xs={10} md={6}>
                                        <Form as={Row}>
                                            {/* IF THE USER CLICKS ON REGISTER DISPLAY USERNAME */}
                                            {mode === 'register' && (
                                                <Form.Group className="">
                                                    <Form.Label
                                                        style={{ marginBlock: '0em', marginTop: '0.6em' }}
                                                        htmlFor="username"
                                                        className="labelLogin"
                                                    >Username:
                                                    </Form.Label>
                                                    <InputText
                                                        type={"text"}
                                                        design={userError.usernameError ? 'errorInput' : 'normalInput'}
                                                        name={"username"}
                                                        placeholder={"Welcome"}
                                                        state={setUser}
                                                        errorState={setUserError}
                                                        autoCompleteValue={"username"}
                                                    />
                                                    <div className="errorText">{userError.usernameError}</div>
                                                </Form.Group>
                                            )}

                                            {/* EMAIL LOGIN */}
                                            <Form.Group >
                                                <Form.Label
                                                    style={{ marginBlock: '0em', marginTop: '0.6em' }}
                                                    htmlFor="email"
                                                    className="labelLogin"
                                                >Email:
                                                </Form.Label>
                                                <InputText
                                                    type={"email"}
                                                    design={userError.emailError ? 'errorInput' : 'normalInput'}
                                                    name={"email"}
                                                    placeholder={"user@user.com"}
                                                    state={setUser}
                                                    errorState={setUserError}
                                                    autoCompleteValue={"email"}
                                                />
                                                <div className="errorText">{userError.emailError}</div>
                                            </Form.Group>

                                            {/* PASSWORD LOGIN */}
                                            <Form.Group className="mb-3">
                                                <Form.Label
                                                    style={{ marginBlock: '0em', marginTop: '0.6em' }}
                                                    htmlFor="password" className="labelLogin"
                                                >Contraseña:
                                                </Form.Label>
                                                <InputText
                                                    type={"password"}
                                                    design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                                    name={"password"}
                                                    placeholder={"******"}
                                                    state={setUser}
                                                    errorState={setUserError}
                                                    autoCompleteValue={"current-password"}
                                                />
                                                <div className="errorText">{userError.passwordError}</div>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>

                            {/* ERROR MESSAGE */}
                            {userError?.message ? (
                                <div className="errorText">{userError.message}</div>
                            ) : (
                                <></>
                            )}

                            <div className="d-flex justify-content-center mt-3">

                                {/* LOGIN / REGISTER BUTTON */}
                                <TodoButton
                                    onClick={(e) => {
                                        mode === 'login' ? submitHandlerLogin(e, user, onClose) : submitHandlerRegister(e, user, onClose);
                                    }}
                                    text={mode === 'login' ? 'Go!' : 'Register'}
                                />
                            </div>

                            {/* HANDLE LOGIN / REGISTER  */}
                            <div className="d-flex">
                                <div onClick={handleRegisterClick} className='m-2' style={{ cursor: 'pointer' }}>Register</div>
                                <div onClick={handleLoginClick} className='m-2' style={{ cursor: 'pointer' }}>Login</div>
                            </div>
                        </Card>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
};