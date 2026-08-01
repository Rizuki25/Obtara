# Hasil Rehearsal Teknis SIM-01

> Arsip historis: hasil ini berasal dari prototype multi-profil sebelum revisi
> personal-first. Gunakan SIM-03 sebagai baseline teknis terbaru.

Status: **Selesai untuk bukti teknis; dry run moderator-manusia belum dilakukan**  
Jenis sesi: Desk-check dan Playwright smoke test  
Tanggal: 31 Juli 2026  
Penanggung jawab: Codex

## Batas bukti

SIM-01 bukan peserta dan telah membaca implementasi. Tidak ada skor 0/1/2, waktu tugas,
rating, kutipan, atau kesimpulan UX yang dilaporkan. Hasil ini hanya membuktikan bahwa
instrumen dapat dipetakan ke kontrol prototype dan urutan state dapat dieksekusi.

## Cakupan

| Metrik                           | Hasil                             |
| -------------------------------- | --------------------------------- |
| Jumlah peserta manusia           | 0                                 |
| Skenario yang direhearsalkan     | 12 / 12                           |
| Popup tindakan yang diverifikasi | Tunda, Lewati, Tidak Yakin        |
| Reset baseline                   | Berhasil melalui reload penuh     |
| Console error                    | 0                                 |
| Safety misunderstanding          | Tidak dapat dinilai tanpa peserta |

## Temuan dan perbaikan

| ID        | Masalah                                                                            | Dampak                                                                 | Perubahan                                                                | Status                                 |
| --------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
| DRY-F-001 | T06 memakai Salbutamol yang sejak baseline sudah Ditunda                           | Feedback perubahan dapat ambigu dan T06 memengaruhi T07                | T06 dipindahkan ke Metformin 19.00                                       | Selesai                                |
| DRY-F-002 | T08 membolehkan salah satu Metformin                                               | Pilihan peserta dapat menentukan visibilitas target T10 setelah filter | T08 ditetapkan pukul 13.00; T10 mengembalikan Semua Jadwal               | Selesai                                |
| DRY-F-003 | Hubungan level bantuan dan skor belum deterministik                                | Moderator dapat memberi skor berbeda untuk perilaku sama               | Rubrik bantuan→skor ditambahkan                                          | Selesai; verifikasi manusia diperlukan |
| DRY-F-004 | Lembar observasi tidak mencatat durasi, reset, baseline, dan evaluasi instrumen    | Masalah operasional dry run mudah hilang                               | Field dan log khusus dry run ditambahkan                                 | Selesai                                |
| DRY-F-005 | Kuesioner menilai koreksi yang tidak tersedia dan fitur caregiver yang belum diuji | Peserta harus menebak                                                  | Item diselaraskan dengan guard tindakan ganda dan opsi `N/A` ditambahkan | Selesai                                |

## Verifikasi teknis

Perintah:

```text
npx playwright test tests/e2e/usability-dry-run.spec.ts --project=desktop
```

Hasil: 1 test lulus; T01–T12 dapat dijalankan berurutan, state T05–T10 konsisten,
reload mengembalikan baseline, dan tidak ada console error.

## Keputusan

- Paket siap untuk `DRY-01` moderator-manusia: **Ya**.
- Siap merekrut peserta `U-*`/`C-*`: **Belum**.
- Syarat sebelum rekrutmen: satu rekan yang tidak terlibat implementasi harus menyelesaikan
  alur consent, think-aloud, T01–T12, observation sheet, questionnaire, dan laporan dry run
  dalam target 30–40 menit tanpa masalah instrumen yang belum diselesaikan.
