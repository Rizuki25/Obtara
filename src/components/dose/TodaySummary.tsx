import { Check, Clock3, Plus } from 'lucide-react'

interface TodaySummaryProps {
  confirmed: number
  delayed: number
  resolved: number
  total: number
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function TodaySummary({
  confirmed,
  delayed,
  resolved,
  total,
}: TodaySummaryProps) {
  const progress = total === 0 ? 0 : Math.round((resolved / total) * 100)

  return (
    <section className="dashboard-hero" aria-labelledby="today-summary-title">
      <div className="hero-heading-row">
        <div className="hero-heading-copy">
          <div className="hero-kicker-row">
            <span className="hero-kicker">MODE PRIBADI</span>
            <span>{dateFormatter.format(new Date())}</span>
          </div>
          <h1 id="today-summary-title">Jadwal Obat Saya</h1>
          <p>
            Lihat jadwal pribadi dan catat statusnya. “Belum Dikonfirmasi”
            berarti OBTARA belum menerima catatan, bukan berarti obat pasti
            belum digunakan.
          </p>
        </div>
        <button
          className="add-medication-button"
          type="button"
          disabled
          title="Belum tersedia di prototype"
        >
          <Plus size={18} aria-hidden="true" />
          Tambah Obat
          <span className="demo-button-label">Demo</span>
        </button>
      </div>

      <div className="metric-grid">
        <article className="metric-card">
          <div>
            <span>Progres Catatan Hari Ini</span>
            <strong>{progress}% Tercatat</strong>
          </div>
          <div
            className="progress-ring"
            style={
              { '--progress': `${progress * 3.6}deg` } as React.CSSProperties
            }
            role="progressbar"
            aria-label="Progres catatan hari ini"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span>{progress}%</span>
          </div>
        </article>
        <article className="metric-card">
          <div>
            <span>Dosis Dikonfirmasi</span>
            <strong className="metric-confirmed">
              {confirmed} / {total} Jadwal
            </strong>
          </div>
          <span className="metric-icon metric-icon-success">
            <Check size={22} aria-hidden="true" />
          </span>
        </article>
        <article className="metric-card">
          <div>
            <span>Dilewati / Ditunda</span>
            <strong className="metric-delayed">{delayed} Dosis</strong>
          </div>
          <span className="metric-icon metric-icon-warning">
            <Clock3 size={22} aria-hidden="true" />
          </span>
        </article>
      </div>
    </section>
  )
}
