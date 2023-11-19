import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { InputText } from './InputText';
import '../index.css';
import { AkdemyButton } from './TodoButton';
import { useAuthUser } from '../../hooks/useAuthUser';


interface ModalLoginProps {
    show: boolean;
    onClose: () => void;
}


export const ModalLogin: React.FC<ModalLoginProps> = ({ show, onClose }) => {


    const { user, setUser, userError, setUserError, submitHandler,submitHandlerRegister } = useAuthUser();
    const [showUserNameInput, setShowUserNameInput] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const handleRegisterClick = () => {
        setShowUserNameInput(true);
        setShowLoginButton(false);
    };
    return (

        <Modal show={show} onHide={onClose}>
            {/* <Modal.Header closeButton> */}
            {/* <Modal.Title className='text-center'>Login </Modal.Title> */}
            {/* </Modal.Header> */}
            <Modal.Body>
                <Container className="d-flex justify-content-center align-items-center mt-4">
                    <Row>
                        <Card
                            style={{
                                backgroundColor: '#9f512121',
                                border: '0.1em solid #614a1971',
                                borderRadius: '2em'
                            }}>

                            {/* LOGIN TITLE */}
                            {showLoginButton && (
                                    <Card.Title className="text-center mb-2 display-5"><strong>Iniciar sesión</strong></Card.Title>
                                )}
                            
                            {showUserNameInput && (
                                <Card.Title className="text-center mb-2 display-5"><strong>Registro</strong></Card.Title>
                            )}

                            <Card.Body className="loginDataUser">
                                <Row className="justify-content-center align-items-center">
                                    <Col xs={10} md={6}>
                                        <Form as={Row}>
                                            {showUserNameInput && (
                                                <Form.Group className="">
                                                    <div className="labelLogin">Nombre usuario:</div>
                                                    <Col>
                                                        <InputText
                                                            type={"text"}
                                                            name={"userName"}
                                                            placeholder={"TuNombreDeUsuario"}
                                                            state={setUser}
                                                            errorState={setUserError}
                                                        />
                                                    </Col>
                                                    <div className="errorText">{userError.emailError}</div>
                                                </Form.Group>
                                            )}

                                            {/* EMAIL LOGIN */}
                                            <Form.Group className="">
                                                <div className="labelLogin">Email:</div>
                                                <Col>
                                                    <InputText
                                                        type={"email"}
                                                        design={userError.emailError ? 'errorInput' : 'normalInput'}
                                                        name={"email"}
                                                        placeholder={"user@user.com"}
                                                        state={setUser}
                                                        errorState={setUserError}
                                                    />
                                                    <div className="errorText">{userError.emailError}</div>
                                                </Col>
                                            </Form.Group>

                                            {/* PASSWORD LOGIN */}
                                            <Form.Group className="mb-3">
                                                <div className="labelLogin">Contraseña:</div>
                                                <Col>
                                                    <InputText
                                                        type={"password"}
                                                        design={userError.passwordError ? 'errorInput' : 'normalInput'}
                                                        name={"password"}
                                                        placeholder={"Hola1234"}
                                                        state={setUser}
                                                        errorState={setUserError}
                                                    />
                                                    <div className="errorText">{userError.passwordError}</div>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                </Row>
                            </Card.Body>
                            {/* {userError?.credentials ? (
                        <div>{userError.credentials}</div>
                    ) : (
                        <></>
                    )} */}
                            <div className="d-flex justify-content-center">
                                {showLoginButton && (
                                    <AkdemyButton
                                        onClick={(e) => {
                                            submitHandler(e, user);
                                            setShowUserNameInput(false);
                                        }}
                                        text={"Entrar!"}
                                    />
                                )}
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                {showUserNameInput && (
                                    <AkdemyButton
                                        onClick={(e) => {
                                            submitHandlerRegister(e, user);
                                        }}
                                        text={"Registrarme"}
                                    />
                                )}
                            </div>
                            <div className='d-flex'>
                            <a onClick={handleRegisterClick} className='m-2'>Registrate</a>
                            <a onClick={() => { setShowUserNameInput(false); setShowLoginButton(true); }} className='m-2'>Login</a>
                            </div>
                            
                        </Card>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};