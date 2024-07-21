import { PropsHeaderTodos } from "../../types/todos";
import { CreateTodo } from "../CreateTodo/CreateTodo";

export const Header: React.FC<PropsHeaderTodos> = ({ addTodo, errorMessage }) => {
    return (
        <header className="header">

            {/* TITLE WITH TYPESCRIPT LOGO */}
            <h1 className="d-flex justify-content-center" 
            style={{ 
                userSelect: 'none',
                fontFamily:'bold', 
                fontSize:'4em',
                marginTop:'1.16em'
                }}>
                <div>TO-DO</div>
                <img
                    style={{ width: '0.6em' }}
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
                    alt="Typescript Logo"
                />
            </h1>

            {/* CreateTodo COMPONENT FOR ADDING NEW TASK */}
            <CreateTodo
                addTodo={addTodo}
                errorMessage={errorMessage}
            />
        </header>
    );
};