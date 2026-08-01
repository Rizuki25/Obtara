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
- [ ] Dukungan keluarga opsional: Care Circle, undangan, caregiver dashboard, dan eskalasi alert.
- [ ] Stock ledger, refill, dan koreksi stok produksi.
- [ ] Riwayat serta laporan.
- [ ] PWA install flow dan manifest production-ready.
- [ ] Pengujian dengan calon pengguna nyata.

## Redesign dashboard berdasarkan referensi visual

**Status:** Selesai dan terverifikasi pada 31 Juli 2026

> Catatan historis: struktur multi-profil pada bagian ini kemudian digantikan oleh revisi
> personal-first. Referensi visual, row cards, modal, dan responsive shell tetap dipakai.

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

## Revisi personal-first

**Status:** Selesai dan terverifikasi pada 31 Juli 2026

- [x] PRD dan workflow dinaikkan ke versi 0.3 personal-first.
- [x] Alur default disederhanakan menjadi: profil Saya → tambah obat → Hari Ini → tindakan status → stok/riwayat.
- [x] Dukungan keluarga/caregiver dipindahkan menjadi ekspansi opsional setelah core pribadi stabil.
- [x] Seluruh lima jadwal demo menggunakan profil `Rizqie (Saya)`.
- [x] Header desktop menampilkan profil aktif dan label `Pribadi` tanpa family selector atau Alert Caregiver.
- [x] Navigasi default menjadi Hari Ini, Obat Saya, Stok, Riwayat, dan Pengaturan.
- [x] Heading berubah menjadi “Jadwal Obat Saya”; metrik “Kepatuhan” diganti “Progres Catatan”.
- [x] Label “Belum Diminum” dihapus; filter menjadi Perlu Tindakan dan Status Final.
- [x] Aksi “Sudah Minum” diganti “Sudah Digunakan” agar sesuai untuk tablet, inhaler, dan bentuk obat lain.
- [x] Filter Perlu Tindakan tidak lagi memasukkan jadwal masa depan yang masih Terjadwal.
- [x] Copy safety memakai bantuan “orang yang Anda percaya” tanpa mewajibkan caregiver.
- [x] Tagline diperbarui menjadi “Obat tertata, rutinitas terjaga.”
- [x] Instrumen usability diarahkan khusus ke penggunaan pribadi; studi caregiver ditunda sampai modul tersedia.
- [x] Rehearsal teknis personal-first dicatat sebagai `SIM-02`.

## Tahap 2 — Persiapan usability test

**Status:** Instrumen dan prototype siap untuk sesi; validasi peserta nyata belum dilakukan

- [x] Disclosure persisten “Mode prototype · Data simulasi”.
- [x] Web Push, kamera, dan sync dilabeli sebagai simulasi.
- [x] Profil aktif “Saya” terlihat; menu caregiver tidak tampil; tema dan ukuran teks dinonaktifkan, sedangkan Tambah Obat kini membuka alur yang berfungsi.
- [x] Panduan moderator dan aturan think-aloud.
- [x] Informasi peserta, persetujuan, dan opsi rekaman.
- [x] Dua belas skenario tugas beserta safety criteria.
- [x] Lembar observasi per peserta.
- [x] Kuesioner setelah tes.
- [x] Template hasil, severity P0–P3, keputusan, dan retest.
- [x] Checklist heuristic, keyboard, zoom 200%, mobile, desktop, serta quality gate.
- [x] Automated test untuk disclosure dan kontrol nonfungsional.
- [x] Dry run teknis desktop/mobile melalui Playwright; tidak ada console error.
- [x] Rehearsal teknis T01–T12 berurutan, termasuk transisi state dan reset baseline.
- [ ] Dry run moderator-manusia menggunakan seluruh dokumen.
- [ ] Sesi dengan 3–5 pengguna obat.
- [ ] Studi caregiver terpisah setelah modul dukungan keluarga tersedia.
- [ ] Analisis dan deduplikasi temuan peserta.
- [ ] Perbaikan serta retest seluruh P0/P1.
- [ ] Keputusan final apakah alur siap dihubungkan ke backend.

Paket tersedia di `docs/usability-test/`. Pembuatan paket dan automated test bukan bukti bahwa UX sudah tervalidasi.

### Perbaikan UI sebelum sesi peserta

- [x] Pilihan Tunda dipindahkan dari medication row ke action popup.
- [x] Form Lewati dipindahkan ke action popup dengan validasi alasan wajib.
- [x] Safety confirmation Tidak Yakin dipindahkan ke action popup khusus.
- [x] Popup desktop tampil sebagai modal terpusat dan mobile sebagai bottom sheet.
- [x] Popup mendukung Escape, tombol Tutup/Batal, accessible name, focus trap native, serta focus return.
- [x] Tinggi medication row tetap stabil ketika popup terbuka; daftar tidak lagi bergeser.

### Rehearsal paket dry run internal

**Status:** Rehearsal teknis selesai; sesi dengan moderator dan peserta simulasi manusia belum dilakukan

- [x] Prototype dijalankan pada server Vite lokal.
- [x] Seluruh T01–T12 dipetakan ke kontrol dan state prototype aktual.
- [x] T06 dipindahkan ke Metformin pukul 19.00 agar tidak memakai Salbutamol yang sudah berstatus Ditunda dan tidak memengaruhi T07.
- [x] T08 ditetapkan pada Metformin pukul 13.00; T10 kini mengembalikan filter Semua Jadwal agar target selalu terlihat.
- [x] T05 menambahkan pemeriksaan pencegahan status final kedua.
- [x] Rubrik bantuan terhadap skor 0/1/2 diperjelas.
- [x] Lembar observasi menampung baseline, consent, durasi, reset, intervensi teknis, dan evaluasi instrumen.
- [x] Kuesioner menyediakan `N/A` dan tidak lagi meminta peserta menilai koreksi yang belum tersedia.
- [x] Template laporan dry run terpisah dari hasil peserta nyata.
- [x] Artefak historis `SIM-01` dan baseline personal-first `SIM-02` disimpan tanpa skor, waktu, atau kutipan peserta palsu.
- [x] Smoke test Playwright khusus memastikan 12 skenario dapat dijalankan berurutan dan baseline pulih setelah reload.

Temuan dan bukti tersedia di `docs/usability-test/dry-runs/`. SIM-02 bukan bukti usability
atau pengganti peserta internal yang tidak mengenal implementasi.

Hasil quality gate terbaru:

- ESLint: lulus.
- Vitest: 4 file, 18 test lulus.
- TypeScript/Vite build: lulus.
- Playwright: 3 flow relevan lulus, termasuk rehearsal T01–T12; 3 kombinasi viewport dilewati secara sengaja.
- Screenshot dashboard personal-first desktop/mobile, popup Tunda, Lewati, Tidak Yakin, dan bottom sheet mobile diperiksa secara visual.

## Tahap 3 — Onboarding pribadi dan Tambah Obat

**Status:** Selesai dan terverifikasi pada 1 Agustus 2026

- [x] Kunjungan pertama diarahkan ke `/onboarding` dan menjelaskan bahwa penggunaan pribadi tidak memerlukan keluarga atau caregiver.
- [x] Pengguna membuat satu profil “Saya” dengan nama panggilan dan zona waktu.
- [x] Persetujuan safety wajib sebelum melanjutkan; instrumen meminta data contoh dan melarang data kesehatan nyata.
- [x] Setelah onboarding, pengguna diarahkan ke `/medications/new` dengan pemilik otomatis profil “Saya”.
- [x] Form mencakup identitas obat, satu jadwal harian, petunjuk, lokasi, stok awal, dan catatan opsional.
- [x] Tombol “Isi data contoh” mempercepat simulasi tanpa meminta data nyata.
- [x] Obat dan occurrence baru disimpan pada `localStorage` terversi, tampil di Hari Ini, dan tetap tersedia setelah reload.
- [x] Baseline demo tidak bercampur dengan data yang dibuat melalui onboarding baru.
- [x] Foto/kamera ditandai transparan sebagai tahap berikutnya dan memakai placeholder visual sementara.
- [x] “Mulai ulang prototype” menghapus data lokal setelah konfirmasi dan mengembalikan pengguna ke onboarding.
- [x] Header memakai nama profil tersimpan; menu caregiver tetap tidak tersedia.
- [x] Automated test mencakup onboarding, obat pertama, persistence, baseline demo, dan tindakan dosis lama.

Hasil quality gate tahap ini:

- ESLint: lulus.
- Vitest: 5 file, 21 test lulus.
- TypeScript/Vite production build: lulus.
- Playwright: 5 flow relevan lulus; 3 kombinasi viewport dilewati secara sengaja.
- Screenshot onboarding dan formulir Tambah Obat pada desktop/mobile diperiksa secara visual.

## Tahap berikutnya yang direkomendasikan

Sesuaikan skenario dry run agar mencakup onboarding dan penambahan obat pertama, lalu lakukan
`DRY-01` dengan moderator serta peserta simulasi manusia yang tidak mengenal implementasi.
Pastikan durasi 30–40 menit, reset data lokal, pencatatan, scoring, serta pemahaman safety
lolos. Dukungan keluarga, backend, dan rekrutmen studi utama tetap ditunda sampai dry run ini
stabil.
