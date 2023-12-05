import { CreateTodo } from "../CreateTodo/CreateTodo";

interface Props {
    addTodo: (text: string) => void;
}

export const Header: React.FC<Props> = ({ addTodo }) => {
    return (
        <header className="header">
            <h1 className="mt-5" >
                <strong>TODO</strong>
                <img
                    style={{ width: '0.6em' }}
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
                    alt="Typescript Logo"
                />
            </h1>
            <CreateTodo addTodo={addTodo} />
        </header>
    );
};