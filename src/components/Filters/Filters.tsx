import { FiltersButton } from "../../consts"
import { filterValue } from "../../types"


interface Props {
    onFilterChange: (filter: filterValue) => void
    filterSelected: filterValue
}

export const Filters: React.FC<Props> = (
    { filterSelected, onFilterChange }
) => {

    // const handleClick = (filter: filterValue)
    return (
        <ul className="filters mb-3">
            {
                Object.entries(FiltersButton).map(([key, { href, literal }]) => {
                    const isSelected = key == filterSelected
                    const className = isSelected ? 'selected' : ''

                    return (
                        <li key={key}>
                            <a
                                href={href}
                                className={className}
                                onClick={(e) => {
                                    e.preventDefault()
                                    onFilterChange(key as filterValue)
                                }}
                            >
                                {literal}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

