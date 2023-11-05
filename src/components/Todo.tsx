import { type Todo as TodoType, type TodoId } from '../types'

interface Props extends TodoType {
    onToggleCompleteTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemove: ( {id}: TodoId ) => void
} 

export const Todo: React.FC<Props> = ({ id, title, completed, onRemove, onToggleCompleteTodo }) => {
    return (
        <div className="view">
            <input 
            className="toggle"
            checked={completed}
            type="checkbox"
            onChange={(e) => {
                onToggleCompleteTodo({ id, completed: e.target.checked })
            }} 
            />
            <label>{title}</label>
            <button
            className='destroy'
            onClick={() => {
                onRemove({id})
            }}
            >
            </button>
        </div>
    )
}