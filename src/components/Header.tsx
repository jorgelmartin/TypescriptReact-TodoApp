import { TodoTitle } from "../types";
import { CreateTodo } from "./CreateTodo";

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void;
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {



    return (
        <header className="header">
            <h1>todo<img
            style={{ 
                width: '30em',
                height: 'auto'
            }}
            src="https://es.wikipedia.org/wiki/TypeScript#/media/Archivo:Typescript_logo_2020.svg"/>
            </h1>
            <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}