import { PropsFooterTodos } from "../../types/todos";
import { Filters } from "../Filters/Filters";

export const Footer: React.FC<PropsFooterTodos> = ({
    activeCount = 0,
    completedCount = 0,
    filterSelected,
    handleFilterChange,
    onClearCompleted
}) => {

    return (
        <footer className="footer" style={{ height: '4em' }}>

            {/* DISPLAY THE COUNT OF PENDING TASK */}
            <div className="todo-count mt-4">
                <strong>{activeCount} item left</strong>
            </div>

            {/* FILTERS COMPONENT FOR TASK FILTERING */}
            <Filters
                filterSelected={filterSelected}
                onFilterChange={handleFilterChange}
            />

            <div className="mt-4">
                {/* SHOW "Delete completed" BUTTON IF THERE ARE COMPLETED TASK */}
                {
                    completedCount > 0 && (
                        <button
                            className="clear-completed"
                            onClick={onClearCompleted}
                        >
                            Clear completed
                        </button>
                    )
                }
            </div>
        </footer>
    )
};