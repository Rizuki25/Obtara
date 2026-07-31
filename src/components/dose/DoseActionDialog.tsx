import { type ReactNode, useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface DoseActionDialogProps {
  open: boolean
  title: string
  description?: string
  icon?: ReactNode
  tone?: 'default' | 'unsure'
  trigger: HTMLButtonElement | null
  children: ReactNode
  onClose: () => void
}

export function DoseActionDialog({
  open,
  title,
  description,
  icon,
  tone = 'default',
  trigger,
  children,
  onClose,
}: DoseActionDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  useEffect(() => {
    if (!open) return

    return () => {
      window.setTimeout(() => trigger?.focus(), 0)
    }
  }, [open, trigger])

  if (!open) return null

  return createPortal(
    <dialog
      ref={dialogRef}
      className="action-dialog"
      data-tone={tone}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="action-dialog-surface">
        <span className="action-dialog-handle" aria-hidden="true" />
        <header className="action-dialog-header">
          <span className="action-dialog-icon" aria-hidden="true">
            {icon}
          </span>
          <div>
            <h2 id={titleId}>{title}</h2>
            {description && <p id={descriptionId}>{description}</p>}
          </div>
          <button
            type="button"
            className="icon-button action-dialog-close"
            onClick={onClose}
            aria-label={`Tutup ${title}`}
          >
            <X size={21} aria-hidden="true" />
          </button>
        </header>
        <div className="action-dialog-body">{children}</div>
      </div>
    </dialog>,
    document.body,
  )
}
