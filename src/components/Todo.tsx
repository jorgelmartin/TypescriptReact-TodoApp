import { type Todo as TodoType, type TodoId } from '../types'

interface Props {
    id: string
    title: string
    completed: boolean
    completedTodo: (id: string, completed: boolean) => void
    onRemove: (id: string) => void
} 

export const Todo: React.FC<Props> = ({ 
    id, 
    title, 
    completed, 
    onRemove, 
    completedTodo 
}) => {


    return (
        <div className="view">
            <input 
            className="toggle"
            checked={completed}
            type="checkbox"
            onChange={(e) => { completedTodo(id, e.target.checked) }}
            />
            <label>{title}</label>
            <button
            className='destroy'
            onClick={() => { onRemove(id) }}
            >
            </button>
        </div>
    )
}