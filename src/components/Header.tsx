import { TodoTitle } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {



    return (
        <header className="header">
            <h1>TODO-APP<img
            style={{ 
                width: '1em',
                height: 'auto'
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
            />
            </h1>
            <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}