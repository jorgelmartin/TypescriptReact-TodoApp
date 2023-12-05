
import { useState, useEffect } from 'react';
import { Todos } from '../../components/Todos/Todos';
import { Header } from '../../components/Header/Header';
import { ModalLoginRegister } from '../../components/ModalLoginRegister/ModalLoginRegister';
import { useTodosUser } from '../../../hooks/useTodosUser';
import { useSelector } from 'react-redux';
import { UserData } from '../../types';
import { Footer } from '../../components/Footer/Footer';
import { logout } from '../../userSlice';
import { Container } from 'react-bootstrap';
import { TodoButton } from '../../components/TodoButton/TodoButton';
import { useDispatch } from 'react-redux';
import '../../index.css';

export const TodosUser = (): JSX.Element => {
    const token = useSelector((state: UserData) => state.user.credentials.token);
    const userName = useSelector((state: UserData) => state.user.data.userName);


    console.log("UserName", userName);

    const dispatch = useDispatch();
    const {
        todos,
        addTodo,
        updateCompleted,
        updateText,
        removeTodo,
        activeCount,
        completedCount,
        filterSelected,
        handleClearCompleted,
        handleFilterChange
    } = useTodosUser()

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [todosVisible, setTodosVisible] = useState(!!true);
    useEffect(() => {
        if (!token) {
            setShowLoginModal(true);
            // Oculta los todos cuando el usuario cierra sesión
            setTodosVisible(false);
        } else {
            // Muestra los todos cuando el usuario inicia sesión
            setTodosVisible(true);
        }
    }, [token]);

    const handleLogout = () => {
        dispatch(logout());
        setTodosVisible(false);

    };
    const handleClick = () => {
        setShowLoginModal(true);
    };
    return (

        <>
            <Container>
                {token ? (
                    <>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '-1em'
                        }}>
                            <TodoButton
                                text="Logout"
                                onClick={handleLogout}
                            />
                            <div style={{
                                color: 'white',
                                backgroundColor: 'red',
                                marginTop: '1.3em',
                                padding: '0.3em',
                                borderRadius: '0.3em',
                                marginLeft: '0.5em'
                            }}>
                                <div>Hola {userName}</div>
                            </div>
                        </div>
                    </>
                ) : (
                    <TodoButton
                        onClick={handleClick}
                        text='Login'
                    />
                )}


                <div className='todoapp'>
                    <Header
                        addTodo={addTodo}
                    />

                    {todosVisible && (

                        <>
                            <Todos
                                todos={todos}
                                completedTodo={updateCompleted}
                                setTitle={updateText}
                                //  todos={filteredTodos}
                                removeTodo={removeTodo}
                            />

                            <Footer
                                activeCount={activeCount}
                                completedCount={completedCount}
                                filterSelected={filterSelected}
                                onClearCompleted={handleClearCompleted}
                                handleFilterChange={handleFilterChange}
                            />
                        </>
                    )}
                    <ModalLoginRegister show={showLoginModal} onClose={() => setShowLoginModal(false)} />
                </div>
            </Container>
        </>
    )
}
