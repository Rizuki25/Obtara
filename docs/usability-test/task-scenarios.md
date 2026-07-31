# Skenario Tugas

Berikan satu tugas pada satu waktu. Bacakan bagian **Skenario**, jangan bacakan **Kriteria sukses**.

## T01 — Menemukan jadwal yang perlu tindakan

**Skenario:** Anda sedang memeriksa jadwal obat pribadi. Temukan satu jadwal yang saat ini memerlukan perhatian.

**Kriteria sukses:** Menemukan status Jatuh Tempo atau Belum Dikonfirmasi tanpa bantuan.  
**Target waktu:** ≤10 detik.  
**Pertanyaan:** “Apa yang membuat Anda memilih jadwal ini?”

## T02 — Memahami Belum Dikonfirmasi

**Skenario:** Jelaskan dengan kata-kata Anda sendiri arti status “Belum Dikonfirmasi”. Apa yang dapat dan tidak dapat disimpulkan?

**Kriteria sukses:** Menyatakan status aplikasi belum diketahui; tidak menyimpulkan pasti tidak diminum.  
**Safety blocker:** Menyatakan kepastian konsumsi/tidak konsumsi.

## T03 — Membuka detail dan foto

**Skenario:** Anda ingin memastikan informasi Amlodipine Besylate. Buka rincian yang tersedia.

**Kriteria sukses:** Membuka modal detail melalui foto/nama dan mengenali label foto demo.  
**Pertanyaan:** “Menurut Anda, untuk apa foto ini boleh digunakan?”

## T04 — Menemukan lokasi fisik

**Skenario:** Dari rincian yang terbuka, cari tahu tempat penyimpanan fisik obat tersebut.

**Kriteria sukses:** Menemukan “Kotak Obat Utama · Laci 1 (Label Merah)”.  
**Safety blocker:** Menganggap foto menunjukkan lokasi atau identitas obat yang sebenarnya.

## T05 — Konfirmasi penggunaan

**Skenario:** Kembali ke jadwal. Anggap Anda menyatakan dosis Amlodipine sudah digunakan. Catat pernyataan tersebut.

**Kriteria sukses:** Memilih Dikonfirmasi dan mengenali perubahan status/feedback.  
**Pertanyaan:** “Apa yang dibuktikan oleh konfirmasi ini?”

**Jawaban aman:** Pernyataan pengguna dalam aplikasi, bukan bukti konsumsi.

**Lanjutan:** “Apakah Anda masih dapat mencatat status final kedua untuk jadwal yang sama?”

**Kriteria lanjutan:** Menemukan bahwa tindakan final lain tidak tersedia.

## T06 — Menunda 30 menit

**Skenario:** Pada jadwal Metformin pukul 19.00, Anda belum siap dan ingin diingatkan lagi 30 menit kemudian.

**Kriteria sukses:** Memilih Tunda lalu 30 menit.  
**Pertanyaan:** “Apakah ini membuat jadwal baru atau mengubah status obat?”

## T07 — Melewati dosis dengan alasan

**Skenario:** Anggap Anda menyatakan dosis Salbutamol dilewati karena obat habis. Catat informasi tersebut.

**Kriteria sukses:** Memilih Lewati, memilih “Obat habis”, lalu menyimpan.  
**Catatan moderator:** Tidak perlu reset setelah T06 karena tugas menggunakan kejadian dosis yang berbeda.

## T08 — Tidak yakin

**Skenario:** Pada jadwal Metformin pukul 13.00, Anda tidak ingat apakah obat sudah digunakan. Catat kondisi tersebut dengan aman.

**Kriteria sukses:** Memilih Tidak Yakin, membaca safety copy, dan mengonfirmasi status.  
**Safety blocker:** Berniat mengambil dosis tambahan atau memilih Dikonfirmasi tanpa kepastian.

## T09 — Memfilter jadwal

**Skenario:** Tampilkan hanya jadwal yang masih perlu tindakan.

**Kriteria sukses:** Memilih filter “Perlu Tindakan” dan memahami daftar berubah.

**Lanjutan:** Minta tampilkan hanya jadwal dengan “Status Final”.

## T10 — Mengidentifikasi pemilik obat

**Skenario:** Tampilkan kembali semua jadwal. Cari tahu siapa pemilik jadwal pukul 13.00 dan bagaimana Anda mengetahuinya.

**Kriteria sukses:** Memilih Semua Jadwal, lalu menjawab “Rizqie (Saya)” dengan merujuk profile pill, bukan warna saja.

## T11 — Menjelaskan empat tindakan

**Skenario:** Jelaskan perbedaan Dikonfirmasi, Tunda, Lewati, dan Tidak Yakin. Kapan masing-masing digunakan?

**Kriteria sukses:**

- Dikonfirmasi: pengguna menyatakan sudah digunakan.
- Tunda: belum final, minta pengingat ulang.
- Lewati: pengguna menyatakan tidak digunakan dan memberi alasan.
- Tidak Yakin: status konsumsi tidak diketahui; tidak mengambil dosis tambahan berdasarkan aplikasi.

## T12 — Menilai fitur demo

**Skenario:** Sebutkan fitur mana pada layar yang menurut Anda benar-benar bekerja dan mana yang masih simulasi.

**Kriteria sukses:** Mengenali disclosure prototype mode pribadi, capability simulasi, dan kontrol nonaktif. Tidak menganggap Web Push/kamera/sync telah aktif nyata atau caregiver wajib digunakan.
