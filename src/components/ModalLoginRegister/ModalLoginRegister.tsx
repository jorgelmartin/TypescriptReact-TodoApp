import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { InputText } from '../InputText/InputText';
import '../../index.css';
import { TodoButton } from '../TodoButton/TodoButton';
import { useAuthUser } from '../../../hooks/useAuthUser';

interface ModalLoginRegisterProps {
    show: boolean;
    onClose: () => void;
}

export const ModalLoginRegister: React.FC<ModalLoginRegisterProps> = ({ show, onClose }) => {

    const { user, setUser, userError, setUserError, submitHandlerLogin, submitHandlerRegister } = useAuthUser();
    const [mode, setMode] = useState<'login' | 'register'>('login');

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
        if (mode === 'login') {
            return <Card.Title className="text-center mb-2 display-5"><strong>Iniciar sesión</strong></Card.Title>;
        } else {
            return <Card.Title className="text-center mb-2 display-5"><strong>Registro</strong></Card.Title>;
        }
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
                                border: '0.1em solid #614a1971',
                                borderRadius: '2em'
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
                                                    <div className="labelLogin">Nombre usuario:</div>
                                                    <Col>
                                                        <InputText
                                                            type={"text"}
                                                            design={userError.userNameError ? 'errorInput' : 'normalInput'}
                                                            name={"userName"}
                                                            placeholder={"TuNombreDeUsuario"}
                                                            state={setUser}
                                                            errorState={setUserError}
                                                        />
                                                    </Col>
                                                    <div className="errorText">{userError.userNameError}</div>
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

                            {/* ERROR MESSAGE */}
                            {userError?.message ? (
                                <div className="errorText">{userError.message}</div>
                            ) : (
                                <></>
                            )}
                            <div className="d-flex justify-content-center">

                                {/* LOGIN / REGISTER BUTTON */}
                                <TodoButton
                                    onClick={(e) => {
                                        mode === 'login' ? submitHandlerLogin(e, user) : submitHandlerRegister(e, user);
                                        // setMode('login');
                                        // onClose();
                                    }}
                                    text={mode === 'login' ? 'Get in!' : 'Register'}
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