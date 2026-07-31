# Lembar Observasi Rehearsal Teknis SIM-01

> Arsip historis: rehearsal ini memakai prototype multi-profil sebelum revisi
> personal-first. Gunakan SIM-02 dan instrumen terbaru untuk baseline saat ini.

> Ini adalah desk-check dan smoke test otomatis oleh agen yang telah membaca implementasi.
> Tidak ada peserta manusia. Skor, waktu, kemudahan, dan kutipan di bawah tidak boleh
> digabungkan dengan hasil `U-*`, `C-*`, atau `DRY-*`.

## Metadata sesi

| Atribut                 | Isi                                                  |
| ----------------------- | ---------------------------------------------------- |
| Participant ID          | SIM-01                                               |
| Peran umum              | Rehearsal teknis, bukan peserta                      |
| Versi/build prototype   | Commit dasar `6999219` + perubahan paket dry run     |
| Perangkat/browser       | Desktop Chrome, viewport 1280 × 800                  |
| Input                   | Playwright automation + desk-check dokumen           |
| Zoom/ukuran teks        | Default; zoom manusia tidak diuji pada rehearsal ini |
| Rekaman                 | Tidak                                                |
| Moderator               | Codex                                                |
| Tanggal                 | 31 Juli 2026                                         |
| Waktu mulai / selesai   | N/A untuk metrik peserta                             |
| Durasi total            | N/A; kecepatan otomasi bukan durasi usability        |
| Consent lengkap         | N/A — tidak ada peserta manusia                      |
| Baseline sudah di-reset | Ya, melalui `page.goto` dan reload penuh             |

## Hasil tugas teknis

| ID  | Skor/waktu | Jalur yang diverifikasi                                            | Hasil rehearsal                                        |
| --- | ---------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| T01 | N/A        | Status Jatuh Tempo terlihat                                        | Dapat dijalankan                                       |
| T02 | N/A        | Safety copy membedakan Belum Dikonfirmasi dari pasti tidak diminum | Copy tersedia; pemahaman manusia belum diuji           |
| T03 | N/A        | Detail Amlodipine dan label foto demo                              | Dapat dijalankan                                       |
| T04 | N/A        | Lokasi fisik tampil di dialog                                      | Dapat dijalankan                                       |
| T05 | N/A        | Konfirmasi Amlodipine lalu cek tindakan final kedua                | Status final tercatat dan tombol tindakan hilang       |
| T06 | N/A        | Tunda Metformin 19.00 selama 30 menit                              | Dapat dijalankan tanpa memengaruhi T07                 |
| T07 | N/A        | Lewati Salbutamol dengan alasan Obat habis                         | Validasi alasan dan penyimpanan berfungsi              |
| T08 | N/A        | Tidak Yakin untuk Metformin 13.00                                  | Safety copy tampil sebelum status final                |
| T09 | N/A        | Filter Perlu Tindakan lalu Selesai                                 | State hasil T05–T08 terfilter dengan benar             |
| T10 | N/A        | Kembali ke Semua Jadwal dan cari pukul 13.00                       | Ibu Sumarni terlihat melalui teks profile pill         |
| T11 | N/A        | Keempat kontrol pada baseline                                      | Semua kontrol tersedia; penjelasan manusia belum diuji |
| T12 | N/A        | Disclosure, capability simulasi, dan kontrol nonaktif              | Label simulasi dan disabled state tersedia             |

## Pemeriksaan safety

Tidak ada perilaku peserta yang dapat diamati. Rehearsal hanya memastikan empat guardrail
memiliki copy atau kontrol yang dapat diuji: Belum Dikonfirmasi, batas makna konfirmasi,
foto demo, dan Tidak Yakin. Kemampuan peserta memahami guardrail tetap harus diuji pada
`DRY-01` moderator-manusia.

## Log reset dan intervensi teknis

| Setelah/sebelum tugas | Kejadian atau alasan                                  |         Durasi | Dampak pada tugas berikutnya        |
| --------------------- | ----------------------------------------------------- | -------------: | ----------------------------------- |
| Sebelum T01           | Memuat baseline                                       | Tidak dihitung | Lima kejadian sesuai baseline       |
| Setelah T10           | Reload untuk memverifikasi reset dan baseline T11–T12 | Tidak dihitung | Seluruh state kembali ke nilai awal |

- Jumlah reload/reset: 1 reset verifikasi yang disengaja setelah alur state selesai.
- State awal sesuai baseline: Ya.
- State akhir dapat di-reset dalam ≤30 detik: Ya secara teknis.

## Observasi aksesibilitas terbatas

- Accessible role/name untuk dialog dan tombol: terdeteksi oleh Playwright.
- Status dipahami tanpa warna: teks status tersedia.
- Focus return, zoom, touch, dan screen reader manusia: tidak dinilai dalam SIM-01.

## Evaluasi instrumen

- T06 sebelumnya menargetkan Salbutamol yang sudah Ditunda; target dipindahkan ke Metformin 19.00.
- T08 sebelumnya membolehkan salah satu Metformin dan dapat mengubah visibilitas T10; kini ditetapkan pukul 13.00 dan T10 mengembalikan Semua Jadwal.
- Popup Tunda, Lewati, dan Tidak Yakin semuanya dapat diuji: Ya.
- Skor 0/1/2 kini memiliki aturan terhadap level bantuan: Ya secara dokumen; perlu dicoba moderator manusia.
- Reset, durasi total, baseline, consent, dan evaluasi instrumen kini memiliki field: Ya.
- Durasi 30–40 menit serta kemudahan mengisi lembar sambil memoderasi: belum dapat dinilai.

## Ringkasan

- Skor peserta: Tidak dihitung.
- Temuan paling serius: dependensi state instrumen, sudah diperbaiki.
- Rekomendasi: jalankan `DRY-01` dengan rekan yang tidak terlibat implementasi sebelum merekrut `U-*`/`C-*`.
