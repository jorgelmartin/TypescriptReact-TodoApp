export const TodoFilters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
} as const

export const FiltersButton = {
    [TodoFilters.all]: {
        literal: 'All',
        href: `/?filter=${TodoFilters.all}`
    },
    [TodoFilters.active]: {
        literal: 'Active',
        href: `/?filter=${TodoFilters.active}`
    },
    [TodoFilters.completed]: {
        literal: 'Completed',
        href: `/?filter=${TodoFilters.completed}`
    }
} as const