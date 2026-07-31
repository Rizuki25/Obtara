import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AppShell } from './AppShell'

describe('AppShell prototype disclosures', () => {
  it('menjelaskan data dan capability yang masih simulasi', () => {
    render(<AppShell><p>Konten</p></AppShell>)

    expect(screen.getByText('Mode prototype · Data simulasi')).toBeInTheDocument()
    expect(screen.getByText('Web Push (simulasi)')).toBeInTheDocument()
    expect(screen.getByText('Kamera (simulasi)')).toBeInTheDocument()
    expect(screen.getByText(/Semua nama, jadwal, foto, status, dan angka/i)).toBeInTheDocument()
  })

  it('menonaktifkan kontrol yang belum memiliki workflow', () => {
    render(<AppShell><p>Konten</p></AppShell>)

    expect(screen.getByRole('button', { name: /Semua Keluarga/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Alert Caregiver/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Tema gelap/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Ukuran teks/i })).toBeDisabled()
  })
})
