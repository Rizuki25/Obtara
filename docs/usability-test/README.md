# Paket Usability Test OBTARA

Status: **rehearsal teknis lulus; dry run moderator-manusia masih wajib sebelum rekrutmen**
Versi prototype: Tahap 1 — dashboard Hari Ini dengan data simulasi

## Tujuan

Paket ini membantu tim menilai apakah seseorang dapat memakai OBTARA untuk rutinitas obatnya sendiri:

- Menemukan jadwal yang membutuhkan tindakan.
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

## Persiapan sesi

- Jalankan prototype melalui `npm run dev`.
- Reset dengan reload penuh sebelum peserta berikutnya karena data hanya tersimpan pada React state.
- Gunakan perangkat peserta bila memungkinkan; jangan meminta login atau data pribadi.
- Siapkan stopwatch, lembar observasi, dan participant ID pseudonim, misalnya `U-01`.
- Jika merekam, isi penanggung jawab, lokasi penyimpanan, akses, dan tanggal penghapusan pada dokumen persetujuan.
- Pastikan indikator “Mode prototype · Data simulasi” terlihat.

Baseline setelah reset terdiri dari satu profil `Rizqie (Saya)` dan lima jadwal:
Amlodipine 07.00 Belum Dikonfirmasi, Allopurinol 08.00 Dikonfirmasi,
Salbutamol 12.00 Ditunda, Metformin 13.00 Jatuh Tempo, dan Metformin 19.00
Terjadwal. Jika profil atau baseline berbeda, jangan mulai sesi.

## Dry run internal

- Gunakan participant ID `DRY-01`, bukan rentang `U-*` atau `C-*`.
- Pilih satu rekan yang tidak terlibat langsung dalam implementasi prototype.
- Salin lembar observasi, kuesioner, dan template laporan sebelum sesi.
- Catat waktu mulai/selesai, jumlah reset, intervensi teknis, dan setiap penjelasan moderator.
- Jalankan T01–T12 berurutan. Dengan urutan terbaru, reset antartugas tidak diperlukan.
- Bila terjadi reset tak terencana, catat setelah tugas mana dan alasan reset; jangan menyembunyikannya dari laporan dry run.
- Jangan gabungkan skor atau waktu dry run ke metrik peserta nyata.

Smoke test `npx playwright test tests/e2e/usability-dry-run.spec.ts --project=desktop`
memastikan kontrol dan transisi state tersedia berurutan. Hasil otomatis ini hanya bukti
teknis, bukan bukti bahwa instruksi, waktu, atau pemahaman peserta sudah tervalidasi.

## Durasi

- Pembukaan dan persetujuan: 5 menit.
- Tugas dan think-aloud: 20–25 menit.
- Kuesioner dan penutupan: 5–10 menit.
- Total: 30–40 menit.

## Skor tugas

- **2 — Berhasil mandiri:** selesai tanpa petunjuk moderator.
- **1 — Berhasil dengan bantuan:** selesai setelah probing/petunjuk tingkat 1–2 membantu peserta maju.
- **0 — Gagal/berhenti:** tidak selesai, salah status, perlu ditunjukkan kontrolnya, atau moderator menghentikan karena keselamatan.

Pertanyaan probing yang dibacakan setelah tugas berhasil tidak menurunkan skor. Jika ragu,
catat bantuan secara verbatim dan putuskan skor pada debrief moderator.

## Target kelulusan awal

- Minimal 80% tugas inti berhasil mandiri.
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
