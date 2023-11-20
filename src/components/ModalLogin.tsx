import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Form, Modal } from "react-bootstrap";
import { InputText } from './InputText';
import '../index.css';
import { AkdemyButton } from './TodoButton';
import { useAuthUser } from '../../hooks/useAuthUser';
// import { useSelector } from 'react-redux';
// import { UserData } from '../types';

interface ModalLoginProps {
    show: boolean;
    onClose: () => void;
}


export const ModalLogin: React.FC<ModalLoginProps> = ({ show, onClose }) => {


//     const userrr = useSelector((state: UserData) => state); // Asegúrate de importar y utilizar useSelector correctamente

// useEffect(() => {
//   console.log('Estado del usuario:', userrr);
// }, [userrr]);

    const { user, setUser, userError, setUserError, submitHandler,submitHandlerRegister } = useAuthUser();
    const [mode, setMode] = useState<'login' | 'register'>('login');

    const handleRegisterClick = () => {
        setMode('register');
    };

    const handleLoginClick = () => {
        setMode('login');
    };

    const renderTitle = () => {
        if (mode === 'login') {
            return <Card.Title className="text-center mb-2 display-5"><strong>Iniciar sesión</strong></Card.Title>;
        } else {
            return <Card.Title className="text-center mb-2 display-5"><strong>Registro</strong></Card.Title>;
        }
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
{renderTitle()}
                            {/* LOGIN TITLE */}
                            {/* {showLoginButton && (
                                    <Card.Title className="text-center mb-2 display-5"><strong>Iniciar sesión</strong></Card.Title>
                                )}
                            
                            {showUserNameInput && (
                                <Card.Title className="text-center mb-2 display-5"><strong>Registro</strong></Card.Title>
                            )} */}

                            <Card.Body className="loginDataUser">
                                <Row className="justify-content-center align-items-center">
                                    <Col xs={10} md={6}>
                                        <Form as={Row}>
                                        {mode === 'register' && (
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
                                <AkdemyButton
                                    onClick={(e) => {
                                        mode === 'login' ? submitHandler(e, user) : submitHandlerRegister(e, user);
                                        setMode('login');
                                    }}
                                    text={mode === 'login' ? 'Entrar!' : 'Registrarme'}
                                />
                            </div>
                            <div className="d-flex">
                                <span onClick={handleRegisterClick} className='m-2 link'>Regístrate</span>
                                <span onClick={handleLoginClick} className='m-2 link'>Login</span>
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