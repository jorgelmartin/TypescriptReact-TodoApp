import { type filterValue } from "../../types"
import { Filters } from "../Filters/Filters"

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
                height: '4em'
            }}>
            <div className="todo-count mt-4">
                <strong>{activeCount} Pending Tasks</strong>
            </div>

            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

<div className="mt-4">
            {
                completedCount > 0 && (
                    <button
                        className="clear-completed"
                        onClick={onClearCompleted}
                    >
                        Delete completed
                    </button>
                )
            }
</div>
        </footer>
    )
}