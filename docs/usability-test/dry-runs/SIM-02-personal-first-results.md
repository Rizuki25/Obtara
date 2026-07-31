# Hasil Rehearsal Teknis SIM-02 — Personal-First

Status: **Selesai untuk bukti teknis; pemahaman manusia belum diuji**  
Jenis sesi: Desk-check, visual review, dan Playwright smoke test  
Tanggal: 31 Juli 2026  
Penanggung jawab: Codex

## Batas bukti

SIM-02 bukan peserta manusia. Tidak ada skor 0/1/2, waktu tugas, rating, atau kutipan
peserta. Hasil ini hanya membuktikan bahwa prototype dan instrumen telah dipindahkan ke
alur penggunaan pribadi yang konsisten.

## Perubahan yang diverifikasi

| Area         | Baseline personal-first                                                                  |
| ------------ | ---------------------------------------------------------------------------------------- |
| Profil       | Seluruh jadwal milik `Rizqie (Saya)`                                                     |
| Header       | Menampilkan profil aktif dan label `Pribadi`                                             |
| Navigasi     | Hari Ini, Obat Saya, Stok, Riwayat, Pengaturan                                           |
| Caregiver    | Tidak ada family selector, alert, atau menu caregiver pada mode default                  |
| Heading      | `Jadwal Obat Saya`                                                                       |
| Progres      | `Progres Catatan Hari Ini`, bukan penilaian kepatuhan                                    |
| Filter       | `Perlu Tindakan` hanya memuat due, snoozed, dan unconfirmed                              |
| Status final | Dikonfirmasi, Dilewati, dan Tidak Yakin berada pada `Status Final`                       |
| Safety       | Belum Dikonfirmasi dijelaskan sebagai belum ada catatan, bukan belum diminum             |
| Dukungan     | Copy bantuan memakai “orang yang Anda percaya”; caregiver tetap opsional di PRD/workflow |

## Rehearsal T01–T12

- Detail foto dan lokasi dapat dibuka.
- Konfirmasi final mencegah tindakan final kedua.
- Tunda Metformin 19.00, Lewati Salbutamol, dan Tidak Yakin Metformin 13.00 tetap independen.
- Filter Perlu Tindakan dan Status Final bekerja pada state hasil tugas.
- T10 mengidentifikasi pemilik pukul 13.00 sebagai `Rizqie (Saya)`.
- Reload mengembalikan lima jadwal pribadi ke baseline.
- Disclosure dan capability simulasi tetap terlihat.

## Keputusan

- Prototype dan instrumen konsisten secara teknis dengan personal-first: **Ya**.
- Dukungan keluarga menjadi syarat penggunaan: **Tidak**.
- Siap dinilai manusia sebagai mode pribadi: **Ya**.
- Usability personal-first telah tervalidasi manusia: **Belum**.
