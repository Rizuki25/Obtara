import type { DoseFilter } from '../../domain/types'

interface DoseFiltersProps {
  active: DoseFilter
  counts: Record<DoseFilter, number>
  onChange: (filter: DoseFilter) => void
}

const filters: { key: DoseFilter; label: string }[] = [
  { key: 'all', label: 'Semua Jadwal' },
  { key: 'needs-action', label: 'Perlu Tindakan' },
  { key: 'resolved', label: 'Status Final' },
]

export function DoseFilters({ active, counts, onChange }: DoseFiltersProps) {
  return (
    <div className="dose-filters" role="group" aria-label="Filter jadwal dosis">
      {filters.map((filter) => (
        <button
          type="button"
          className="dose-filter"
          aria-pressed={active === filter.key}
          onClick={() => onChange(filter.key)}
          key={filter.key}
        >
          {filter.label}
          {filter.key === 'all' ? ` (${counts[filter.key]})` : ''}
        </button>
      ))}
    </div>
  )
}
