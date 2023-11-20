import { CreateTodo } from "./CreateTodo";

interface Props {
    saveTodo: (id: string, text: string) => void;
}

export const Header: React.FC<Props> = ({ saveTodo  }) => {

    return (
        <header className="header">
            <h1>TODO<img
            style={{ 
                width: '0.6em',
                // height: 'auto'
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
            />
            </h1>
            <CreateTodo saveTodo={saveTodo } />
        </header>
    )
}