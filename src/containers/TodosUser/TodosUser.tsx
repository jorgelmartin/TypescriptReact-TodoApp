import { useState, useEffect } from 'react';
import { Todos } from '../../components/Todos/Todos';
import { Header } from '../../components/Header/Header';
import { ModalLoginRegister } from '../../components/ModalLoginRegister/ModalLoginRegister';
import { useTodosUser } from '../../../hooks/useTodosUser';
import { useSelector } from 'react-redux';
import { UserData } from '../../types/users';
import { Footer } from '../../components/Footer/Footer';
import { logout } from '../../userSlice';
import { Container } from 'react-bootstrap';
import { TodoButton } from '../../components/TodoButton/TodoButton';
import { useDispatch } from 'react-redux';
import '../../index.css';

export const TodosUser = (): JSX.Element => {
    const token = useSelector((state: UserData) => state.user.credentials.token);
    const username = useSelector((state: UserData) => state.user.data.username);
    const dispatch = useDispatch();
    const {
        todos,
        addTodo,
        updateCompleted,
        updateTodo,
        removeTodo,
        activeCount,
        completedCount,
        filterSelected,
        handleClearCompleted,
        handleFilterChange,
        errorMessage
    } = useTodosUser();

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [todosVisible, setTodosVisible] = useState(!!true);
    const [invertFilter, setInvertFilter] = useState(() => {
        // GET THE SAVED FILTER STATE FROM LOCALSTORAGE
        const savedFilter = localStorage.getItem('invertFilter');
        return savedFilter ? JSON.parse(savedFilter) : true;
    });

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

    // APPLY THE SAVED FILTER STATE WHEN THE COMPONENT MOUNTS
    useEffect(() => {
        const currentFilter = invertFilter ? 'invert(1)' : 'invert(0)';
        document.documentElement.style.filter = currentFilter;
    }, [invertFilter]);

    const handleFilterClick = () => {
        //TOGGLE THE INVERT FILTER STATE
        setInvertFilter((prevInvertFilter: boolean) => {
            const newInvertFilter = !prevInvertFilter;
            // SAVE THE NEW FILTER STATE TO LOCALSTORAGE
            localStorage.setItem('invertFilter', JSON.stringify(newInvertFilter));
            return newInvertFilter;
        });

        //GET THE CURRENT FILTER VALUE FROM THE DOCUMENT'S ROOT ELEMENT
        const currentFilter = getComputedStyle(document.documentElement).getPropertyValue('filter');
        //TOGGLE BETWEEN 'invert(0)' AND 'invert(1)' AND APPLY THE NEW FILTER
        document.documentElement.style.filter = currentFilter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
    };

    return (
        <Container style={{ backgroundColor: 'antiquewhite' }}>
            <div className='borderContainer'>

                {/* IF USER IS LOGIN SHOW LOGOUT BUTTON AND USERNAME */}
                <div style={{
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    marginTop: '-0.6em',
                    marginBottom: '0.7em'
                }}
                    onClick={handleFilterClick}
                ><div style={{
                    borderRadius: '2em',
                    border: '0.001em solid rgba(6, 95, 6, 0.435)',
                }}
                >🌙
                    </div>
                </div>
                {token ? (
                    <>
                        <div style={{
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

                            <div style={{
                                // marginTop: '1.3em',
                                padding: '0.3em',
                                marginLeft: '0.5em',
                            }}>
                                <h2 className='username'>{username}</h2>
                            </div>
                        </div>
                    </>
                ) : (
                    <>

                        {/* TODO BUTTON TO HANDLE LOGIN/REGISTER */}
                        <TodoButton
                            onClick={handleClick}
                            text='Login'
                        />
                    </>
                )}

                <div className='todoapp'>

                    {/* HEADER COMPONENT */}
                    <Header
                        addTodo={addTodo}
                        errorMessage={errorMessage}
                    />

                    {/* IF USER IS LOGIN SHOW TODOS */}
                    {todosVisible && (
                        <>
                            {/* TODOS COMPONENT */}
                            <Todos
                                todos={todos}
                                completedTodo={updateCompleted}
                                setTitle={updateTodo}
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
    );
};