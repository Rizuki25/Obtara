# Template Ringkasan Hasil Usability Test

Status: Draft / Sedang dianalisis / Selesai / Perlu retest  
Jenis sesi: Peserta nyata / Dry run internal
Tanggal pengujian: __________  
Penanggung jawab: __________

> Jangan mencampur skor, waktu, atau jawaban dry run dengan metrik peserta nyata.
> Gunakan `dry-run-report-template.md` untuk evaluasi integrasi instrumen.

## Cakupan

| Metrik                                 | Hasil |
| -------------------------------------- | ----- |
| Jumlah peserta pengguna pribadi        |       |
| Peserta memahami caregiver tidak wajib |       |
| Mobile / Desktop / Tablet              |       |
| Keyboard / Touch / Mouse               |       |
| Sesi direkam                           |       |
| P0/P1 ditemukan                        |       |

## Ringkasan eksekutif

- Keputusan: Lanjut / Perbaiki lalu retest / Hentikan
- Tiga temuan utama: 1. 2. 3.
- Safety blocker:
  -

## Metrik tugas

| Tugas | Mandiri | Dibantu | Gagal | Success rate mandiri | Median waktu | Target tercapai |
| ----- | ------: | ------: | ----: | -------------------: | -----------: | --------------- |
| T01   |         |         |       |                      |              |                 |
| T02   |         |         |       |                      |              |                 |
| T03   |         |         |       |                      |              |                 |
| T04   |         |         |       |                      |              |                 |
| T05   |         |         |       |                      |              |                 |
| T06   |         |         |       |                      |              |                 |
| T07   |         |         |       |                      |              |                 |
| T08   |         |         |       |                      |              |                 |
| T09   |         |         |       |                      |              |                 |
| T10   |         |         |       |                      |              |                 |
| T11   |         |         |       |                      |              |                 |
| T12   |         |         |       |                      |              |                 |

Rumus success rate mandiri:

```text
jumlah peserta dengan skor 2 / jumlah peserta yang menjalankan tugas × 100%
```

## Rubrik severity

| Level | Definisi                                                    | Respons                                        |
| ----- | ----------------------------------------------------------- | ---------------------------------------------- |
| P0    | Potensi bahaya langsung/dosis ganda/identifikasi obat salah | Hentikan kelanjutan; perbaiki dan retest wajib |
| P1    | Alur inti gagal atau salah paham keselamatan serius         | Perbaiki sebelum backend; retest wajib         |
| P2    | Friction signifikan tetapi ada jalur aman                   | Jadwalkan pada iterasi terdekat                |
| P3    | Polish, wording, atau konsistensi minor                     | Backlog dengan bukti                           |

## Log temuan

| ID    | Ringkasan | Bukti/peserta | Skenario | Dampak | Severity | Rekomendasi | Owner | Status | Retest |
| ----- | --------- | ------------- | -------- | ------ | -------- | ----------- | ----- | ------ | ------ |
| F-001 |           |               |          |        |          |             |       |        |        |

## Pola pemahaman keselamatan

| Guardrail                                | Jumlah salah paham | Participant IDs | Keputusan |
| ---------------------------------------- | -----------------: | --------------- | --------- |
| Belum Dikonfirmasi ≠ pasti tidak diminum |                    |                 |           |
| Konfirmasi ≠ bukti konsumsi              |                    |                 |           |
| Foto demo ≠ identifikasi obat            |                    |                 |           |
| Tidak Yakin ≠ mengambil dosis tambahan   |                    |                 |           |
| Mode pribadi ≠ wajib memakai caregiver   |                    |                 |           |

## Hasil kuesioner

Laporkan median/rentang, bukan hanya rata-rata, terutama bila peserta sedikit.

| Pernyataan                      | Median | Rentang | Catatan |
| ------------------------------- | -----: | ------- | ------- |
| Menemukan jadwal perlu tindakan |        |         |         |
| Memahami empat tindakan         |        |         |         |
| Memahami Belum Dikonfirmasi     |        |         |         |
| Mengetahui foto adalah demo     |        |         |         |
| Kemudahan keseluruhan           |        |         |         |

## Keputusan perubahan

| Keputusan | Dasar bukti | PRD/workflow terdampak | Dilakukan kapan |
| --------- | ----------- | ---------------------- | --------------- |
|           |             |                        |                 |

## Retest

- Temuan yang wajib diretest: __________
- Profil peserta retest: __________
- Kriteria lulus: __________
- Tanggal target: __________

> Jangan mengisi template dengan hasil contoh dan melaporkannya sebagai hasil peserta nyata.
