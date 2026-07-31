import { Camera, Cloud, FlaskConical, Smartphone, Wifi } from 'lucide-react'

export function CapabilityBar() {
  return (
    <div
      className="capability-bar"
      aria-label="Status simulasi kemampuan browser"
    >
      <div className="capability-inner">
        <span className="prototype-mode">
          <FlaskConical size={14} aria-hidden="true" />
          Mode prototype · Data simulasi
        </span>
        <span className="capability-product">
          <Smartphone size={15} aria-hidden="true" />
          OBTARA Web PWA
        </span>
        <span className="capability-divider" aria-hidden="true" />
        <span className="capability-pill capability-pill-success">
          <Cloud size={14} aria-hidden="true" />
          Web Push (simulasi)
        </span>
        <span className="capability-pill capability-pill-info">
          <Camera size={14} aria-hidden="true" />
          Kamera (simulasi)
        </span>
        <span className="capability-pill">
          <Wifi size={14} aria-hidden="true" />
          Online <strong>(sync simulasi)</strong>
        </span>
      </div>
    </div>
  )
}
