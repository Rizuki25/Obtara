import type { DoseStatus } from '../../domain/types'

const statusLabels: Record<DoseStatus, string> = {
  scheduled: 'Terjadwal',
  due: 'Jatuh tempo',
  snoozed: 'Ditunda',
  confirmed: 'Dikonfirmasi',
  skipped: 'Dilewati',
  unsure: 'Tidak yakin',
  unconfirmed: 'Belum dikonfirmasi',
}

export function getStatusLabel(status: DoseStatus) {
  return statusLabels[status]
}
