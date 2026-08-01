# Checklist Review Internal Sebelum Peserta

Reviewer: __________  
Tanggal: __________  
Build/commit: __________

## Kejujuran prototype

- [ ] “Mode prototype · Data simulasi” terlihat sebelum interaksi utama.
- [ ] Push, kamera, dan sync dilabeli simulasi.
- [ ] Header menampilkan satu profil aktif “Saya” dan label mode pribadi.
- [ ] Navigasi default hanya memuat Hari Ini, Obat Saya, Stok, Riwayat, dan Pengaturan.
- [ ] Menu atau alert caregiver tidak tampil pada mode pribadi.
- [ ] Tema dan ukuran teks dinonaktifkan; Tambah Obat membuka formulir yang berfungsi.
- [ ] Kontrol nonaktif memiliki penjelasan “Belum tersedia di prototype”.
- [ ] Browser tanpa state membuka onboarding pribadi sebelum dashboard.
- [ ] Onboarding meminta persetujuan safety dan mengarahkan ke Tambah Obat.
- [ ] Tombol “Isi data contoh” mengisi formulir tanpa data kesehatan nyata.
- [ ] Obat tersimpan setelah reload dan “Mulai ulang prototype” memulihkan onboarding.
- [ ] Foto/modal menyatakan foto demo bukan identifikasi obat.
- [ ] Tidak ada data kesehatan nyata di mock data, URL, log, atau screenshot.

## Heuristic review

- [ ] Status sistem terlihat setelah tindakan.
- [ ] Istilah konsisten pada kartu, filter, dialog, dan feedback.
- [ ] Pencegahan tindakan final ganda tetap bekerja.
- [ ] Tunda tidak membuat status final.
- [ ] Lewati meminta alasan.
- [ ] Tidak Yakin menampilkan safety copy sebelum final.
- [ ] Error atau empty state memberi langkah berikutnya.
- [ ] Aksi utama mudah dibedakan dari aksi sekunder.

## Safety copy

- [ ] Belum Dikonfirmasi tidak disebut “pasti tidak diminum”.
- [ ] Konfirmasi dijelaskan sebagai pernyataan pengguna, bukan bukti konsumsi.
- [ ] Tidak Yakin tidak menyarankan dosis pengganti.
- [ ] Foto demo tidak disebut foto obat asli.
- [ ] Tidak ada instruksi diagnosis, resep, atau perubahan dosis.
- [ ] Copy tidak menyiratkan bahwa caregiver wajib.

## Keyboard

- [ ] Skip link menuju konten utama.
- [ ] Urutan Tab mengikuti urutan visual.
- [ ] Semua aksi yang aktif dapat dijalankan dengan Enter/Space.
- [ ] Focus ring terlihat.
- [ ] Escape menutup modal.
- [ ] Fokus kembali ke kontrol pembuka modal.
- [ ] Kontrol nonaktif tidak dapat diaktifkan.

## Responsive dan zoom

- [ ] Mobile 360–390px: tidak ada horizontal overflow.
- [ ] Tablet 768px: kartu dan aksi tetap terbaca.
- [ ] Desktop 1280px dan 1440px: sidebar, hero, dan row cards tidak bertabrakan.
- [ ] Zoom 200%: fungsi utama tidak hilang.
- [ ] Target sentuh mobile minimal 48×48px.
- [ ] Bottom sheet berakhir di bawah viewport dan dapat discroll.

## Visual dan screen reader

- [ ] Status memiliki teks/ikon, tidak hanya warna.
- [ ] Foto memiliki alt text yang menyatakan foto demo.
- [ ] Heading hierarchy logis.
- [ ] Dialog memiliki accessible name.
- [ ] Filter menyampaikan state aktif.
- [ ] Toast menggunakan live region.
- [ ] Kontras fokus, teks, badge, dan tombol diperiksa.

## Quality gate

- [ ] `npm run lint`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] Screenshot desktop dan mobile diperiksa manual.
- [ ] Tidak ada console error.

## Hasil dry run

- [ ] Dry run menggunakan rekan yang tidak terlibat langsung dalam implementasi.
- [ ] Participant ID dry run menggunakan `DRY-*`, bukan `U-*` atau `C-*`.
- [ ] Consent, observation sheet, questionnaire, dan laporan dry run memiliki salinan terpisah.
- [ ] Waktu mulai, selesai, dan durasi total tercatat.
- [ ] Semua reset/intervensi teknis tercatat.
- [ ] T01–T12 dapat dijalankan berurutan tanpa state yang tidak disengaja.
- [ ] Popup Tunda, Lewati, dan Tidak Yakin semuanya teruji.
- [ ] Moderator dapat mengisi lembar observasi sambil membacakan skenario.
- [ ] Rubrik skor 0/1/2 dapat diterapkan tanpa perdebatan.
- [ ] Rehearsal teknis otomatis lulus; hasilnya tidak dilaporkan sebagai peserta manusia.
- Dry run dilakukan oleh: __________
- Dokumen yang membingungkan: __________
- Perubahan sebelum peserta: __________
- Siap merekrut peserta: Ya / Tidak
