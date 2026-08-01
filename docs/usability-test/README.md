# Paket Usability Test OBTARA

Status: **rehearsal teknis lulus; dry run moderator-manusia masih wajib sebelum rekrutmen**
Versi prototype: Tahap 3 — onboarding pribadi, popup Tambah Obat, dan dashboard Hari Ini

## Tujuan

Paket ini membantu tim menilai apakah seseorang dapat memakai OBTARA untuk rutinitas obatnya sendiri:

- Menemukan jadwal yang membutuhkan tindakan.
- Menyelesaikan onboarding pribadi tanpa mengira caregiver wajib.
- Menambahkan obat latihan melalui popup tanpa memasukkan data kesehatan nyata.
- Mengenali pemilik, waktu, nama, dosis, lokasi, dan status obat.
- Memahami perbedaan Dikonfirmasi, Ditunda, Dilewati, Tidak Yakin, dan Belum Dikonfirmasi.
- Menyelesaikan tindakan dosis tanpa membuat catatan ganda.
- Memahami bahwa foto pada prototype adalah demo, bukan identifikasi obat.
- Memahami bahwa profil aktif adalah “Saya” dan dukungan keluarga tidak diwajibkan.

Pengujian ini menilai **antarmuka**, bukan pengetahuan medis peserta dan bukan kepatuhan pengobatan mereka.

## Target peserta

Untuk prototype personal-first saat ini, rekrut:

- 3–5 pengguna obat rutin.
- Sedapat mungkin mencakup peserta lanjut usia, pengalaman teknologi rendah, kebutuhan zoom/teks besar, atau pengguna keyboard.

Caregiver diuji pada studi terpisah setelah modul dukungan keluarga tersedia. Jangan meminta
peserta personal-first berperan sebagai caregiver pada prototype yang belum menyediakan alurnya.

Jangan merekrut peserta untuk memasukkan nama obat, diagnosis, jadwal, atau data kesehatan nyata ke prototype.

## Isi paket

1. [Panduan moderator](moderator-guide.md)
2. [Informasi peserta dan persetujuan](participant-information-and-consent.md)
3. [Skenario tugas](task-scenarios.md)
4. [Lembar observasi](observation-sheet.md)
5. [Kuesioner setelah tes](post-test-questionnaire.md)
6. [Template hasil dan severity](results-template.md)
7. [Checklist review internal](internal-review-checklist.md)
8. [Template laporan dry run internal](dry-run-report-template.md)
9. [Lembar pelaksanaan DRY-01 manusia](dry-runs/DRY-01-session-sheet.md)
10. [Hasil rehearsal teknis SIM-03](dry-runs/SIM-03-onboarding-popup-results.md)

## Persiapan sesi

- Jalankan prototype melalui `npm run dev`.
- Mulai first-run dengan `/onboarding?mode=fresh`; URL ini menghapus data lokal prototype dan membuka onboarding.
- Muat baseline dashboard dengan `/today?mode=demo`; URL ini mengganti data lokal dengan lima jadwal simulasi.
- Gunakan perangkat peserta bila memungkinkan; jangan meminta login atau data pribadi.
- Siapkan stopwatch, lembar observasi, dan participant ID pseudonim, misalnya `U-01`.
- Jika merekam, isi penanggung jawab, lokasi penyimpanan, akses, dan tanggal penghapusan pada dokumen persetujuan.
- Pastikan indikator “Mode prototype · Data simulasi” terlihat.

Sesi memiliki dua baseline terkontrol:

1. **First-run:** `/onboarding?mode=fresh`, tanpa profil atau obat buatan peserta sebelumnya.
2. **Dashboard demo:** `/today?mode=demo`, satu profil `Rizqie (Saya)` dan lima jadwal:

Amlodipine 07.00 Belum Dikonfirmasi, Allopurinol 08.00 Dikonfirmasi,
Salbutamol 12.00 Ditunda, Metformin 13.00 Jatuh Tempo, dan Metformin 19.00
Terjadwal. Jika profil atau baseline berbeda, jangan mulai sesi.

Reload biasa mempertahankan profil, obat, dan baseline yang sedang aktif. Jangan memakai reload
sebagai reset. Gunakan URL mode di atas atau “Mulai ulang prototype”.

## Dry run internal

- Gunakan participant ID `DRY-01`, bukan rentang `U-*` atau `C-*`.
- Pilih satu rekan yang tidak terlibat langsung dalam implementasi prototype.
- Salin lembar observasi, kuesioner, dan template laporan sebelum sesi.
- Catat waktu mulai/selesai, jumlah reset, intervensi teknis, dan setiap penjelasan moderator.
- Jalankan T01–T14 berurutan.
- Setelah T02, lakukan satu transisi terencana ke `/today?mode=demo`; jangan menilainya sebagai tugas peserta.
- Setelah baseline demo dimuat, T03–T14 tidak memerlukan reset antartugas.
- Bila terjadi reset tak terencana, catat setelah tugas mana dan alasan reset; jangan menyembunyikannya dari laporan dry run.
- Jangan gabungkan skor atau waktu dry run ke metrik peserta nyata.

Smoke test `npx playwright test tests/e2e/usability-dry-run.spec.ts --project=desktop`
memastikan kontrol dan transisi state tersedia berurutan. Hasil otomatis ini hanya bukti
teknis, bukan bukti bahwa instruksi, waktu, atau pemahaman peserta sudah tervalidasi.

## Durasi

- Pembukaan dan persetujuan: 4–5 menit.
- Tugas dan think-aloud: 24–28 menit.
- Kuesioner dan penutupan: 5–7 menit.
- Target total: 33–40 menit; dry run manusia harus memastikan batas atas tetap realistis.

## Skor tugas

- **2 — Berhasil mandiri:** selesai tanpa petunjuk moderator.
- **1 — Berhasil dengan bantuan:** selesai setelah probing/petunjuk tingkat 1–2 membantu peserta maju.
- **0 — Gagal/berhenti:** tidak selesai, salah status, perlu ditunjukkan kontrolnya, atau moderator menghentikan karena keselamatan.

Pertanyaan probing yang dibacakan setelah tugas berhasil tidak menurunkan skor. Jika ragu,
catat bantuan secara verbatim dan putuskan skor pada debrief moderator.

## Target kelulusan awal

- Minimal 80% tugas inti berhasil mandiri.
- Onboarding dan Tambah Obat selesai tanpa data kesehatan nyata.
- Peserta memahami bahwa form Tambah Obat adalah popup dan data tersimpan lokal.
- Jadwal yang perlu tindakan ditemukan dalam maksimal 10 detik.
- Seluruh peserta dapat membedakan empat tindakan dosis.
- Tidak ada peserta yang menyimpulkan “Belum Dikonfirmasi” berarti pasti tidak diminum.
- Tidak ada peserta yang menganggap foto demo sebagai verifikasi identitas obat.
- Tidak ada peserta yang berniat mengambil dosis tambahan setelah status ragu/terlambat.

## Safety blocker

Temuan berikut menghentikan keputusan menuju backend sampai diperbaiki dan diuji ulang:

- Salah memahami status hingga berpotensi mengambil dosis ganda.
- Menganggap foto demo dapat mengidentifikasi obat.
- Menganggap “Belum Dikonfirmasi” sebagai kepastian konsumsi/tidak konsumsi.
- Tidak menemukan atau tidak memahami opsi “Tidak Yakin”.

## Definition of done validasi

Tahap validasi baru boleh ditandai selesai ketika:

- Sesi target peserta telah dilakukan.
- Semua lembar observasi lengkap dan dipseudonimkan.
- Temuan dideduplikasi serta diberi severity.
- P0/P1 diperbaiki dan diuji ulang.
- Keputusan produk serta perubahan PRD/workflow dicatat.

Pembuatan paket ini sendiri **bukan** bukti bahwa prototype sudah tervalidasi.
