# Skenario Tugas

Berikan satu tugas pada satu waktu. Bacakan bagian **Skenario**, jangan bacakan **Kriteria sukses**, **Safety blocker**, atau instruksi transisi moderator.

## Bagian A — First-run pribadi

Mulai dari `/onboarding?mode=fresh`. Bagian ini memakai profil dan obat latihan, bukan data kesehatan peserta.

## T01 — Menyiapkan profil pribadi

**Skenario:** Bayangkan ini pertama kali Anda membuka OBTARA. Atur aplikasi untuk diri sendiri menggunakan nama samaran `Naya` dan zona waktu WIB. Lanjutkan tanpa memasukkan data kesehatan nyata.

**Kriteria sukses:** Mengisi nama panggilan, mempertahankan zona waktu WIB, membaca serta menyetujui guardrail data simulasi, lalu mencapai Hari Ini dengan popup Tambah Obat terbuka.

**Safety blocker:** Memasukkan nama lengkap atau data kesehatan nyata; mengira keluarga/caregiver wajib dibuat.

**Pertanyaan:** “Menurut Anda, data profil ini tersimpan di mana?”

## T02 — Menambahkan obat latihan

**Skenario:** Tambahkan satu obat latihan untuk profil Anda. Gunakan data contoh yang sudah disediakan di dalam prototype. Sebelum menyimpan, tinjau pemilik, foto, jadwal, stok, satuan, dan ambang refill.

**Kriteria sukses:** Menyelesaikan tugas melalui popup tanpa meninggalkan Hari Ini, mengenali pemilik otomatis `Naya (Saya)`, menggunakan data/preset foto demo, meninjau nilai stok dan refill, lalu memilih “Simpan Obat ke Kabinet”. Satu jadwal Vitamin Contoh tampil setelah popup menutup.

**Target waktu:** ≤3 menit.

**Pertanyaan:** “Bagian mana yang benar-benar bekerja dan bagian mana yang masih simulasi?”

**Safety blocker:** Memasukkan obat atau foto nyata; menganggap preset foto mengidentifikasi obat.

### Transisi moderator — tidak dinilai

Setelah T02 dicatat, buka `/today?mode=demo`. Tunggu hingga profil `Rizqie (Saya)` dan lima kartu baseline terlihat. Jelaskan hanya:

> Sekarang kita beralih ke kumpulan data latihan yang memiliki lebih banyak keadaan jadwal.

Jangan menjelaskan letak status atau tindakan. Catat transisi ini sebagai reset terencana, bukan error peserta. Jika baseline tidak tampil dalam ≤30 detik, catat sebagai intervensi teknis.

## Bagian B — Jadwal Hari Ini

Baseline terdiri dari Amlodipine 07.00 Belum Dikonfirmasi, Allopurinol 08.00 Dikonfirmasi, Salbutamol 12.00 Ditunda, Metformin 13.00 Jatuh Tempo, dan Metformin 19.00 Terjadwal.

## T03 — Menemukan jadwal yang perlu tindakan

**Skenario:** Anda sedang memeriksa jadwal obat pribadi. Temukan satu jadwal yang saat ini memerlukan perhatian.

**Kriteria sukses:** Menemukan status Jatuh Tempo atau Belum Dikonfirmasi tanpa bantuan.

**Target waktu:** ≤10 detik.

**Pertanyaan:** “Apa yang membuat Anda memilih jadwal ini?”

## T04 — Memahami Belum Dikonfirmasi

**Skenario:** Jelaskan dengan kata-kata Anda sendiri arti status “Belum Dikonfirmasi”. Apa yang dapat dan tidak dapat disimpulkan?

**Kriteria sukses:** Menyatakan status aplikasi belum diketahui; tidak menyimpulkan pasti tidak diminum.

**Safety blocker:** Menyatakan kepastian konsumsi/tidak konsumsi.

## T05 — Membuka detail dan foto

**Skenario:** Anda ingin memastikan informasi Amlodipine Besylate. Buka rincian yang tersedia.

**Kriteria sukses:** Membuka popup detail melalui foto/nama dan mengenali label foto demo.

**Pertanyaan:** “Menurut Anda, untuk apa foto ini boleh digunakan?”

## T06 — Menemukan lokasi fisik

**Skenario:** Dari rincian yang terbuka, cari tahu tempat penyimpanan fisik obat tersebut.

**Kriteria sukses:** Menemukan “Kotak Obat Utama · Laci 1 (Label Merah)”.

**Safety blocker:** Menganggap foto menunjukkan lokasi atau identitas obat yang sebenarnya.

## T07 — Konfirmasi penggunaan

**Skenario:** Kembali ke jadwal. Anggap Anda menyatakan dosis Amlodipine sudah digunakan. Catat pernyataan tersebut.

**Kriteria sukses:** Memilih Dikonfirmasi dan mengenali perubahan status/feedback.

**Pertanyaan:** “Apa yang dibuktikan oleh konfirmasi ini?”

**Jawaban aman:** Pernyataan pengguna dalam aplikasi, bukan bukti konsumsi.

**Lanjutan:** “Apakah Anda masih dapat mencatat status final kedua untuk jadwal yang sama?”

**Kriteria lanjutan:** Menemukan bahwa tindakan final lain tidak tersedia.

## T08 — Menunda 30 menit

**Skenario:** Pada jadwal Metformin pukul 19.00, Anda belum siap dan ingin diingatkan lagi 30 menit kemudian.

**Kriteria sukses:** Memilih Tunda lalu 30 menit melalui popup.

**Pertanyaan:** “Apakah ini membuat jadwal baru atau mengubah status obat?”

## T09 — Melewati dosis dengan alasan

**Skenario:** Anggap Anda menyatakan dosis Salbutamol dilewati karena obat habis. Catat informasi tersebut.

**Kriteria sukses:** Membuka popup Lewati, memilih “Obat habis”, lalu menyimpan.

**Catatan moderator:** Tidak perlu reset setelah T08 karena tugas menggunakan kejadian dosis yang berbeda.

## T10 — Tidak yakin

**Skenario:** Pada jadwal Metformin pukul 13.00, Anda tidak ingat apakah obat sudah digunakan. Catat kondisi tersebut dengan aman.

**Kriteria sukses:** Memilih Tidak Yakin, membaca safety copy pada popup, dan mengonfirmasi status.

**Safety blocker:** Berniat mengambil dosis tambahan atau memilih Dikonfirmasi tanpa kepastian.

## T11 — Memfilter jadwal

**Skenario:** Tampilkan hanya jadwal yang masih perlu tindakan.

**Kriteria sukses:** Memilih filter “Perlu Tindakan” dan memahami daftar berubah.

**Lanjutan:** Minta tampilkan hanya jadwal dengan “Status Final”.

## T12 — Mengidentifikasi pemilik obat

**Skenario:** Tampilkan kembali semua jadwal. Cari tahu siapa pemilik jadwal pukul 13.00 dan bagaimana Anda mengetahuinya.

**Kriteria sukses:** Memilih Semua Jadwal, lalu menjawab “Rizqie (Saya)” dengan merujuk profile pill, bukan warna saja.

## T13 — Menjelaskan empat tindakan

**Skenario:** Jelaskan perbedaan Dikonfirmasi, Tunda, Lewati, dan Tidak Yakin. Kapan masing-masing digunakan?

**Kriteria sukses:**

- Dikonfirmasi: pengguna menyatakan sudah digunakan.
- Tunda: belum final, minta pengingat ulang.
- Lewati: pengguna menyatakan tidak digunakan dan memberi alasan.
- Tidak Yakin: status konsumsi tidak diketahui; tidak mengambil dosis tambahan berdasarkan aplikasi.

## T14 — Menilai fitur prototype

**Skenario:** Sebutkan fitur mana pada layar yang benar-benar bekerja dan mana yang masih simulasi atau belum tersedia.

**Kriteria sukses:** Mengenali onboarding, popup Tambah Obat, preset foto, pencatatan status, dan penyimpanan lokal sebagai fungsi prototype; mengenali upload foto, kamera live, Web Push, sync, serta menu nonaktif sebagai belum tersedia/simulasi. Tidak menganggap caregiver wajib digunakan.
