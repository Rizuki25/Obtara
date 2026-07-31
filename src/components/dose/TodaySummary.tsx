interface TodaySummaryProps {
  resolved: number
  remaining: number
  total: number
}

export function TodaySummary({ resolved, remaining, total }: TodaySummaryProps) {
  const progress = total === 0 ? 0 : Math.round((resolved / total) * 100)

  return (
    <section className="summary-card" aria-labelledby="today-summary-title">
      <div className="summary-copy">
        <p className="eyebrow">RINGKASAN HARI INI</p>
        <h2 className="summary-title" id="today-summary-title">
          {remaining > 0
            ? `${remaining} jadwal masih perlu diperiksa`
            : 'Semua jadwal sudah memiliki status'}
        </h2>
        <p className="summary-meta">
          Periksa foto, nama, dan dosis sebelum mencatat status.
        </p>
      </div>
      <div>
        <div
          className="progress-track"
          role="progressbar"
          aria-label="Progres jadwal hari ini"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span className="progress-value" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="summary-numbers">
        <div className="summary-number">
          <strong>{total}</strong>
          <span>Total jadwal</span>
        </div>
        <div className="summary-number">
          <strong>{resolved}</strong>
          <span>Sudah berstatus</span>
        </div>
        <div className="summary-number">
          <strong>{remaining}</strong>
          <span>Perlu diperiksa</span>
        </div>
      </div>
    </section>
  )
}
