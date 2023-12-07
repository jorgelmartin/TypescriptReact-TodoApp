
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
    const [invertFilter, setInvertFilter] = useState(true);
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

    const handleFilterClick = () => {
        setInvertFilter((prevInvertFilter) => !prevInvertFilter);
        const currentFilter = getComputedStyle(document.documentElement).getPropertyValue('filter');
        document.documentElement.style.filter = currentFilter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
      };
    
    return (

        <>
        <Container style={{backgroundColor:'antiquewhite'}}>
            <div className='borderContainer'>
                {token ? (
                    <>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:'space-between',
                            marginTop: '-1em'
                        }}><strong>
                            <TodoButton
                                text="Logout"
                                onClick={handleLogout}
                            /></strong>
                            <div style={{
                                // color: 'white',
                                // backgroundColor: 'red',
                                marginTop: '1.3em',
                                padding: '0.3em',
                                // borderRadius: '0.3em',
                                marginLeft: '0.5em',
                            }}>
                                {/* <h2 className='border'>{userName}</h2> */}
                                <h2 className='wave'>{userName}</h2>
                            </div>
                        </div>
                        <button style={{borderRadius:'2em'}} onClick={handleFilterClick}>🌙</button>
                    </>
                ) : (
                    <>
                    <TodoButton
                        onClick={handleClick}
                        text='Login'
                    />
                    <button style={{borderRadius:'2em',  marginTop:'0.5em'}} onClick={handleFilterClick}>🌙</button>
                    </>
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
            </div>
            </Container>
        </>
    )
}
