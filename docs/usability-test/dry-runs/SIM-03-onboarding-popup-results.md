# Hasil Rehearsal Teknis SIM-03 — Onboarding dan Popup Tambah Obat

Tanggal: 1 Agustus 2026  
Jenis: Rehearsal otomatis, bukan peserta manusia  
Viewport: Desktop Chromium 1280×800  
Instrumen: T01–T14

> SIM-03 hanya memverifikasi bahwa kontrol, route riset, popup, dan state dapat dijalankan
> sesuai urutan instrumen. Tidak ada skor 0/1/2, waktu manusia, rating, kutipan, consent,
> atau klaim usability dalam dokumen ini.

## Perintah

```text
npx playwright test tests/e2e/usability-dry-run.spec.ts --project=desktop
```

Hasil: **1 test lulus**; tidak ada console error.

## Cakupan yang berhasil direhearsalkan

| Bagian             | Pemeriksaan teknis                                                                                             | Hasil |
| ------------------ | -------------------------------------------------------------------------------------------------------------- | ----- |
| Reset first-run    | `/onboarding?mode=fresh` menghapus state lokal dan membuka onboarding                                          | Lulus |
| T01                | Alias `Naya`, zona WIB, dan persetujuan safety dapat diselesaikan                                              | Lulus |
| T02                | Popup Tambah Obat terbuka di atas Hari Ini, data contoh dapat dimuat, stok/refill terlihat, dan obat tersimpan | Lulus |
| Transisi moderator | `/today?mode=demo` mengganti state menjadi profil Rizqie dan lima jadwal demo                                  | Lulus |
| T03–T06            | Status perlu tindakan, arti Belum Dikonfirmasi, detail foto, dan lokasi tersedia                               | Lulus |
| T07–T10            | Dikonfirmasi, Tunda, Lewati, dan Tidak Yakin menghasilkan state yang diharapkan                                | Lulus |
| T11–T12            | Filter serta identifikasi pemilik bekerja setelah tindakan sebelumnya                                          | Lulus |
| T13–T14            | Empat tindakan, disclosure, capability simulasi, dan kontrol nonaktif tersedia untuk dibahas                   | Lulus |
| Reload             | Baseline demo aktif tetap tersedia setelah reload biasa                                                        | Lulus |

## Temuan integrasi teknis

1. Asumsi lama bahwa reload mereset prototype tidak lagi benar karena profil dan obat kini disimpan di `localStorage`.
2. Dua URL riset ditambahkan agar moderator dapat memulihkan first-run dan baseline demo tanpa DevTools.
3. Instrumen diperluas dari 12 menjadi 14 tugas; total skor maksimum berubah dari 24 menjadi 28.
4. Satu transisi baseline setelah T02 diperlukan agar tugas status tetap memiliki lima keadaan demo yang terkontrol.

Semua temuan tersebut sudah diterapkan pada README, panduan moderator, skenario tugas,
lembar observasi, kuesioner, template hasil, checklist, dan template laporan dry run.

## Hal yang belum dapat dinilai

- Apakah instruksi T01–T02 membocorkan lokasi kontrol.
- Apakah peserta memahami penyimpanan lokal dan perbedaan preset foto dengan upload/kamera.
- Apakah moderator dapat menjalankan transisi baseline sambil mencatat tanpa kehilangan konteks.
- Apakah popup mudah digunakan dengan touch, keyboard, zoom, atau teknologi bantu pada sesi manusia.
- Apakah 14 tugas tetap selesai dalam 30–40 menit.
- Apakah rubrik 0/1/2 konsisten ketika perilaku peserta ambigu.

## Keputusan

Paket **siap untuk satu dry run manusia `DRY-01`**, tetapi belum siap dinyatakan tervalidasi
dan belum menjadi dasar rekrutmen pengguna nyata. Gunakan `DRY-01-session-sheet.md` dan
isi seluruh artefak dengan data sesi yang benar-benar terjadi.
