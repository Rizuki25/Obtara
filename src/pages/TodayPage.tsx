import { useMemo, useRef, useState } from 'react'
import type { DoseFilter } from '../domain/types'
import { useDoses } from '../state/doseContext'
import { filterDoses, groupDoses, summarizeDoses } from '../state/selectors'
import { DoseDetailDialog } from '../components/dose/DoseDetailDialog'
import { DoseFilters } from '../components/dose/DoseFilters'
import { DoseGroup } from '../components/dose/DoseGroup'
import { TodaySummary } from '../components/dose/TodaySummary'
import { Toast } from '../components/ui/Toast'

export function TodayPage() {
  const { doses, state, dispatch } = useDoses()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<DoseFilter>('all')
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const filteredDoses = useMemo(() => filterDoses(doses, filter), [doses, filter])
  const groups = useMemo(() => groupDoses(filteredDoses), [filteredDoses])
  const summary = useMemo(() => summarizeDoses(doses), [doses])
  const selectedDose = doses.find((dose) => dose.id === selectedId) ?? null
  const counts = useMemo(
    () => ({
      all: doses.length,
      'needs-action': filterDoses(doses, 'needs-action').length,
      resolved: filterDoses(doses, 'resolved').length,
    }),
    [doses],
  )

  const closeDialog = () => {
    setSelectedId(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  return (
    <>
      <TodaySummary {...summary} />
      <DoseFilters active={filter} counts={counts} onChange={setFilter} />

      {groups.length > 0 ? (
        <div className="dose-groups">
          {groups.map((group) => (
            <DoseGroup
              group={group}
              key={group.key}
              onOpen={(id, trigger) => {
                triggerRef.current = trigger
                setSelectedId(id)
              }}
            />
          ))}
        </div>
      ) : (
        <section className="empty-filter-state">
          <h2>Tidak ada jadwal pada filter ini</h2>
          <p>Pilih filter lain untuk melihat status jadwal hari ini.</p>
        </section>
      )}

      <DoseDetailDialog dose={selectedDose} onClose={closeDialog} />
      <Toast
        message={state.announcement}
        onDismiss={() => dispatch({ type: 'clearAnnouncement' })}
      />
    </>
  )
}
