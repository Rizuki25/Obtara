# OBTARA — Progress Implementasi

Terakhir diperbarui: 31 Juli 2026

## Tahap 1 — Prototype pengguna obat

**Status:** Selesai dan terverifikasi

### Scope yang dikerjakan

- [x] React + Vite + TypeScript strict.
- [x] Halaman utama prototype pada `/today`.
- [x] Responsive application shell:
  - [x] Bottom navigation pada mobile.
  - [x] Sidebar pada desktop.
  - [x] Layout adaptif pada tablet.
- [x] Design system mengikuti `DESIGN-notion.md`:
  - [x] Warm paper canvas `#f6f5f4`.
  - [x] White card surface dan hairline border.
  - [x] Inter/system typography dengan hierarchy dan negative tracking.
  - [x] Biru `#0075de` sebagai satu-satunya structural accent.
  - [x] Sticker colors hanya digunakan untuk ilustrasi obat.
  - [x] Shadow ringan, radius, dan spacing sesuai token desain.
- [x] Mock profile, medication, stock, dan dose occurrences.
- [x] Jadwal dikelompokkan berdasarkan pagi, siang, sore, dan malam.
- [x] Kartu dosis menampilkan ilustrasi, nama, kekuatan, jumlah, waktu, petunjuk, dan status.
- [x] Detail dosis berupa dialog desktop dan bottom sheet mobile.
- [x] Empat tindakan dosis:
  - [x] Sudah digunakan.
  - [x] Ingatkan lagi 10/30/60 menit.
  - [x] Lewati dosis dengan alasan wajib dan catatan opsional.
  - [x] Saya tidak yakin dengan safety copy dan konfirmasi eksplisit.
- [x] Status final mencegah tindakan final kedua pada event yang sama.
- [x] Copy Indonesia yang singkat, tidak menghakimi, dan tidak memberi anjuran dosis pengganti.
- [x] Feedback status menggunakan teks dan ikon, tidak hanya warna.
- [x] Focus ring, skip link, Escape/tombol Tutup, focus return, reduced motion, dan target aksi minimal 48px.

### Pengujian

- [x] ESLint lulus tanpa error.
- [x] 12 unit/component tests lulus.
- [x] Production TypeScript build lulus.
- [x] Vite production bundle berhasil dibuat.
- [x] Playwright desktop flow lulus:
  - [x] `/` dinormalisasi ke `/today`.
  - [x] Sidebar desktop tampil.
  - [x] Detail obat dapat dibuka.
  - [x] Dosis dapat dikonfirmasi.
  - [x] Kontrol konfirmasi tidak tersedia setelah status final.
  - [x] Tidak ada console error.
- [x] Playwright mobile flow lulus:
  - [x] Bottom navigation tampil.
  - [x] Detail muncul sebagai bottom sheet.
  - [x] Alur “Saya tidak yakin” menampilkan safety copy.
  - [x] Tidak ada console error.
- [x] `npm audit --omit=dev` tidak menemukan kerentanan dependency produksi.
- [ ] `npm audit` masih melaporkan 6 advisory high pada rantai tooling development ESLint/minimatch/brace-expansion. Perbaikan otomatis saat ini meminta downgrade/breaking change; tidak memengaruhi bundle runtime, tetapi perlu ditinjau kembali ketika versi tooling kompatibel tersedia.

Perintah quality gate:

```bash
npm run verify
```

Hasil terakhir:

- Lint: lulus.
- Vitest: 3 file, 12 test lulus.
- Build: lulus.
- Playwright: 2 flow relevan lulus pada desktop dan mobile; 2 kombinasi yang tidak sesuai viewport dilewati secara sengaja.

### Keputusan prototype

- Data hanya disimpan dalam React state dan kembali ke nilai awal setelah refresh.
- Ilustrasi berwarna adalah placeholder yang secara eksplisit menyatakan foto asli belum tersedia.
- Stok hanya ditampilkan sebagai data simulasi; belum ada stock ledger.
- Route prototype dinormalisasi ke `/today` tanpa router dependency karena baru ada satu route fungsional. Router dapat ditambahkan kembali ketika route kedua mulai dibangun.

### Belum dikerjakan

- [ ] Backend API dan database.
- [ ] Registrasi, login, dan sesi.
- [ ] Upload/camera serta private object storage.
- [ ] Scheduler, Web Push, email fallback, dan service worker.
- [ ] IndexedDB, antrean offline, dan sinkronisasi multi-device.
- [ ] Care Circle, undangan, caregiver dashboard, dan eskalasi alert.
- [ ] Stock ledger, refill, dan koreksi stok produksi.
- [ ] Riwayat serta laporan.
- [ ] PWA install flow dan manifest production-ready.
- [ ] Pengujian dengan calon pengguna nyata.

## Redesign dashboard berdasarkan referensi visual

**Status:** Selesai dan terverifikasi pada 31 Juli 2026

- [x] Capability bar untuk status PWA, Web Push, kamera, dan auto-sync.
- [x] Header desktop dengan brand, family selector, alert caregiver, dan utility controls.
- [x] Sidebar desktop tujuh menu serta kartu Prinsip Keselamatan.
- [x] Hero dashboard dengan heading, CTA, tiga metric cards, dan circular progress.
- [x] Filter Semua Jadwal, Perlu Tindakan, dan Selesai.
- [x] Medication schedule diubah menjadi row cards satu kolom seperti referensi.
- [x] Time/profile/status pills, metadata dosis, lokasi, dan tindakan inline.
- [x] Dialog detail diubah menjadi modal foto dua kolom dengan panel informasi dan warning.
- [x] Tampilan mobile tetap responsive dengan bottom navigation dan modal bottom sheet.
- [x] Lima foto demo disimpan lokal; UI dan alt text menegaskan bahwa foto hanya contoh, bukan identifikasi obat.
- [x] Seluruh aksi dosis, safety copy, idempotency guard, dan focus return tetap dipertahankan.

Hasil verifikasi redesign:

- ESLint: lulus.
- Vitest: 3 file, 14 test lulus.
- TypeScript/Vite production build: lulus.
- Playwright desktop dan mobile: 2 flow relevan lulus, tanpa console error.
- Screenshot desktop dashboard, desktop modal, dan mobile modal diperiksa secara visual.

## Tahap 2 — Persiapan usability test

**Status:** Instrumen dan prototype siap untuk sesi; validasi peserta nyata belum dilakukan

- [x] Disclosure persisten “Mode prototype · Data simulasi”.
- [x] Web Push, kamera, dan sync dilabeli sebagai simulasi.
- [x] Family selector, Alert Caregiver, tema, ukuran teks, dan Tambah Obat dinonaktifkan serta diberi keterangan belum tersedia.
- [x] Panduan moderator dan aturan think-aloud.
- [x] Informasi peserta, persetujuan, dan opsi rekaman.
- [x] Dua belas skenario tugas beserta safety criteria.
- [x] Lembar observasi per peserta.
- [x] Kuesioner setelah tes.
- [x] Template hasil, severity P0–P3, keputusan, dan retest.
- [x] Checklist heuristic, keyboard, zoom 200%, mobile, desktop, serta quality gate.
- [x] Automated test untuk disclosure dan kontrol nonfungsional.
- [x] Dry run teknis desktop/mobile melalui Playwright; tidak ada console error.
- [ ] Dry run moderator-manusia menggunakan seluruh dokumen.
- [ ] Sesi dengan 3–5 pengguna obat.
- [ ] Sesi dengan 3–5 caregiver.
- [ ] Analisis dan deduplikasi temuan peserta.
- [ ] Perbaikan serta retest seluruh P0/P1.
- [ ] Keputusan final apakah alur siap dihubungkan ke backend.

Paket tersedia di `docs/usability-test/`. Pembuatan paket dan automated test bukan bukti bahwa UX sudah tervalidasi.

Hasil quality gate terbaru:

- ESLint: lulus.
- Vitest: 4 file, 16 test lulus.
- TypeScript/Vite build: lulus.
- Playwright: 2 flow relevan desktop/mobile lulus; 2 kombinasi viewport dilewati secara sengaja.

## Tahap berikutnya yang direkomendasikan

Lakukan dry run moderator-manusia menggunakan seluruh paket, lalu rekrut peserta. Backend tetap ditunda sampai temuan safety dan alur inti dianalisis serta P0/P1 selesai diretest.
