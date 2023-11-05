// import { FiltersButton, type TodoFilters } from "../consts"

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
        <footer className="footer">
            <div className="todo-count">
                <strong>{activeCount}Tareas pendientes</strong>
            </div>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />
        </footer>
    )
}