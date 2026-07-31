import { useMemo, useRef, useState } from 'react'
import { mockProfile } from '../data/mockData'
import { useDoses } from '../state/doseContext'
import { groupDoses, summarizeDoses } from '../state/selectors'
import { DoseDetailDialog } from '../components/dose/DoseDetailDialog'
import { DoseGroup } from '../components/dose/DoseGroup'
import { TodaySummary } from '../components/dose/TodaySummary'
import { Toast } from '../components/ui/Toast'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function TodayPage() {
  const { doses, state, dispatch } = useDoses()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const groups = useMemo(() => groupDoses(doses), [doses])
  const summary = useMemo(() => summarizeDoses(doses), [doses])
  const selectedDose = doses.find((dose) => dose.id === selectedId) ?? null

  const closeDialog = () => {
    setSelectedId(null)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }

  return (
    <>
      <header className="page-header">
        <p className="eyebrow">{dateFormatter.format(new Date()).toUpperCase()}</p>
        <h1 className="page-title">Selamat datang, {mockProfile.shortName}.</h1>
        <p className="page-lede">
          Berikut jadwal obat hari ini. Cocokkan ilustrasi, nama, dan dosis dengan obat fisik sebelum mencatat.
        </p>
      </header>

      <TodaySummary {...summary} />

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

      <DoseDetailDialog dose={selectedDose} onClose={closeDialog} />
      <Toast
        message={state.announcement}
        onDismiss={() => dispatch({ type: 'clearAnnouncement' })}
      />
    </>
  )
}
