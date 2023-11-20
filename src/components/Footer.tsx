import { type filterValue } from "../types"
import { Filters } from "./Filters"

interface Props {
    activeCount: number,
    completedCount: number,
    filterSelected: filterValue,
    onClearCompleted: () => void
    handleFilterChange: (filter: filterValue) => void
}
export const Footer: React.FC<Props> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted
}) => {

    return (
        <footer className="footer"
            style=
            {{
                height: '2.4em'
            }}>
            <span className="todo-count">
                <strong>{activeCount}Tareas Pendientes</strong>
            </span>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

            {
                completedCount > 0 && (
                    <button
                        className="clear-completed"
                        onClick={onClearCompleted}
                    >
                        Borrar completadas
                    </button>
                )
            }

        </footer>
    )
}