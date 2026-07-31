import type { DoseGroup as DoseGroupType } from '../../domain/types'
import { DoseCard } from './DoseCard'

interface DoseGroupProps {
  group: DoseGroupType
  onOpen: (doseId: string, trigger: HTMLButtonElement) => void
}

export function DoseGroup({ group, onOpen }: DoseGroupProps) {
  return (
    <section className="dose-group" aria-labelledby={`group-${group.key}`}>
      <div className="group-heading">
        <h2 id={`group-${group.key}`}>
          {group.label} <span>({group.range})</span>
        </h2>
        <span>({group.doses.length} dosis)</span>
      </div>
      <div className="dose-list">
        {group.doses.map((dose) => (
          <DoseCard
            dose={dose}
            onOpen={(trigger) => onOpen(dose.id, trigger)}
            key={dose.id}
          />
        ))}
      </div>
    </section>
  )
}
