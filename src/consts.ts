export const TodoFilters = {
    all: 'all',
    active: 'active',
    completed: 'completed'
} as const

export const FiltersButton = {
    [TodoFilters.all]: {
        literal: 'Todos',
        href: `/?filter=${TodoFilters.all}`
    },
    [TodoFilters.active]: {
        literal: 'Activos',
        href: `/?filter=${TodoFilters.active}`
    },
    [TodoFilters.completed]: {
        literal: 'Completados',
        href: `/?filter=${TodoFilters.completed}`
    }
} as const

