
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

    //BRING TOKEN AND USERNAME FROM REDUX
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
            //HIDE TODOS WHEN USER LOGOUT
            setTodosVisible(false);
        } else {
            //SHOW TODOS WHEN USER LOGIN
            setTodosVisible(true);
        }
    }, [token]);

    //HANDLE LOGOUT
    const handleLogout = () => {
        dispatch(logout());
        setTodosVisible(false);
    };

    //HANDLE CLICK LOGIN/REGISTER
    const handleClick = () => {
        setShowLoginModal(true);
    };

    const handleFilterClick = () => {

        //TOGGLE THE INVERT FILTER STATE
        setInvertFilter((prevInvertFilter) => !prevInvertFilter);

        //GET THE CURRENT FILTER VALUE FROM THE DOCUMENT'S ROOT ELEMENT
        const currentFilter = getComputedStyle(document.documentElement).getPropertyValue('filter');

        //TOGGLE BETWEEN 'invert(0)' AND 'invert(1)' AND APPLY THE NEW FILTER
        document.documentElement.style.filter = currentFilter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
    };

    return (
        <Container style={{ backgroundColor: 'antiquewhite' }}>
            <div className='borderContainer'>

                {/* IF USER IS LOGIN SHOW LOGOUT BUTTON AND USERNAME */}
                {token ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: '-1em'
                            }}>
                            <strong>
                                <TodoButton
                                    text="Logout"
                                    onClick={handleLogout}
                                />
                            </strong>
                            <div
                                style={{
                                    marginTop: '1.3em',
                                    padding: '0.3em',
                                    marginLeft: '0.5em',
                                }}>
                                <h2 className='userName'>{userName}</h2>
                            </div>
                        </div>

                        {/* BUTTON DARK/LIGHT MODE */}
                        <button
                            style={{ borderRadius: '2em' }}
                            onClick={handleFilterClick}
                        >🌙
                        </button>
                    </>
                ) : (
                    <>

                        {/* TODO BUTTON TO HANDLE LOGIN/REGISTER */}
                        <TodoButton
                            onClick={handleClick}
                            text='Login'
                        />

                        {/* BUTTON DARK/LIGHT MODE */}
                        <button
                            style={{ borderRadius: '2em', marginTop: '0.5em' }}
                            onClick={handleFilterClick}
                        >🌙
                        </button>
                    </>
                )}

                <div className='todoapp'>

                    {/* HEADER COMPONENT */}
                    <Header
                        addTodo={addTodo}
                    />

                    {/* IF USER IS LOGIN SHOW TODOS */}
                    {todosVisible && (
                        <>
                            {/* TODOS COMPONENT */}
                            <Todos
                                todos={todos}
                                completedTodo={updateCompleted}
                                setTitle={updateText}
                                removeTodo={removeTodo}
                            />

                            {/* FOOTER COMPONENT */}
                            <Footer
                                activeCount={activeCount}
                                completedCount={completedCount}
                                filterSelected={filterSelected}
                                onClearCompleted={handleClearCompleted}
                                handleFilterChange={handleFilterChange}
                            />
                        </>
                    )}

                    {/* MODAL LOGIN/REGISTER */}
                    <ModalLoginRegister show={showLoginModal} onClose={() => setShowLoginModal(false)} />
                </div>
            </div>
        </Container>
    )
}
