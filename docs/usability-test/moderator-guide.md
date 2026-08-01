# Panduan Moderator

## Prinsip moderator

- Uji antarmuka, bukan peserta.
- Jangan menjelaskan letak tombol sebelum peserta mencoba.
- Jangan memuji jawaban tertentu; gunakan respons netral.
- Hentikan tugas bila peserta menunjukkan niat melakukan tindakan medis berdasarkan prototype.
- Jangan meminta nama obat, diagnosis, atau data kesehatan nyata.

## Sebelum sesi

- Participant ID: __________
- Peran: Pengguna obat untuk diri sendiri / Lainnya: __________
- Versi/build prototype: __________
- Perangkat dan browser: __________
- Kebutuhan aksesibilitas: __________
- Rekaman diizinkan: Ya / Tidak / Tidak diminta
- First-run `/onboarding?mode=fresh` sudah dimuat: Ya / Tidak
- Tautan baseline `/today?mode=demo` siap: Ya / Tidak
- Waktu mulai: __________

## Skrip pembukaan

> Terima kasih sudah membantu menguji OBTARA. Hari ini kita menguji prototype antarmuka, bukan kemampuan Anda. Semua nama, obat, foto, waktu, dan status pada layar adalah data simulasi. Prototype ini bukan nasihat medis dan tidak boleh digunakan untuk memilih atau mengidentifikasi obat. Silakan jangan membagikan data kesehatan pribadi. Anda dapat berhenti kapan saja tanpa perlu memberi alasan.

> Selama tes, mohon ceritakan apa yang Anda lihat, pikirkan, dan harapkan terjadi. Saya mungkin diam agar tidak memengaruhi pilihan Anda. Jika ada bagian yang membingungkan, itu adalah temuan penting bagi kami.

> Prototype ini menggunakan satu profil “Saya”. Fitur pendamping atau caregiver tidak
> diperlukan untuk menyelesaikan tugas dan belum menjadi bagian dari alur yang diuji.

Konfirmasi:

- Apakah peserta memahami bahwa data/foto adalah simulasi? Ya / Tidak
- Apakah peserta memahami bahwa pengujian ini menggunakan mode pribadi? Ya / Tidak
- Apakah peserta bersedia melanjutkan? Ya / Tidak
- Apakah persetujuan rekaman sudah dicatat bila relevan? Ya / Tidak / N/A

## Latihan think-aloud

> Sebelum mulai, ceritakan dengan suara keras bagaimana Anda biasanya mencari informasi cuaca untuk besok. Tidak perlu benar; kami hanya ingin terbiasa mendengar proses berpikir Anda.

## Aturan bantuan

Tunggu minimal 10 detik setelah peserta tampak berhenti. Gunakan petunjuk bertingkat:

1. “Apa yang sedang Anda cari?”
2. “Bagian layar mana yang mungkin berkaitan?”
3. “Silakan periksa kembali informasi yang tersedia.”

Catat tingkat bantuan. Jangan mengatakan nama atau lokasi kontrol yang benar.

### Hubungan bantuan dan skor

| Kondisi                                                                                        | Skor tugas |
| ---------------------------------------------------------------------------------------------- | ---------: |
| Selesai sebelum bantuan; probing diberikan sesudahnya                                          |          2 |
| Selesai setelah bantuan tingkat 1 atau 2 membantu peserta maju                                 |          1 |
| Memerlukan bantuan tingkat 3, memilih status salah, berhenti, atau dihentikan demi keselamatan |          0 |

Jika probing tingkat 1 tidak memengaruhi jalur peserta, catat verbatim dan putuskan saat
debrief. Jangan mengubah skor hanya karena moderator membacakan pertanyaan tindak lanjut
yang memang tercantum setelah kriteria sukses tercapai.

## Probing netral

- “Apa yang Anda harapkan terjadi setelah memilih itu?”
- “Apa arti status ini menurut Anda?”
- “Informasi apa yang membuat Anda yakin?”
- “Apakah ada sesuatu yang membuat Anda ragu?”
- “Apa yang akan Anda lakukan jika ini terjadi dalam kehidupan nyata?”

Jangan gunakan: “Tombolnya jelas, kan?” atau “Bukankah Anda seharusnya memilih…?”

## Pelaksanaan tugas

Bacakan satu skenario dari [task-scenarios.md](task-scenarios.md) pada satu waktu. Jangan memperlihatkan kriteria sukses atau instruksi transisi moderator. Setelah tugas selesai:

- Catat skor 0/1/2.
- Catat waktu.
- Tanyakan tingkat kemudahan 1–5.
- Catat kutipan penting secara verbatim.
- Reset hanya jika skenario berikutnya memerlukan status awal.

Mulai stopwatch setelah skenario selesai dibacakan. Hentikan ketika kriteria sukses
tercapai, peserta berhenti, atau moderator menghentikan tugas. Untuk tugas verbal, waktu
berakhir setelah peserta menyelesaikan jawabannya.

## Urutan state dan reset

Urutan T01–T14 memiliki dua bagian dan satu transisi moderator yang direncanakan:

1. Buka `/onboarding?mode=fresh` sebelum T01.
2. T01 membuat profil samaran `Naya` dan otomatis membuka popup Tambah Obat.
3. T02 menyimpan Vitamin Contoh dan memastikan popup menutup kembali ke Hari Ini.
4. Catat reset terencana, lalu buka `/today?mode=demo` tanpa meminta peserta melakukannya.
5. Verifikasi lima kartu baseline dan profil `Rizqie (Saya)` sebelum membacakan T03.
6. T07 memfinalkan Amlodipine 07.00 sebagai Dikonfirmasi.
7. T08 menunda Metformin 19.00 selama 30 menit.
8. T09 memfinalkan Salbutamol 12.00 sebagai Dilewati.
9. T10 memfinalkan Metformin 13.00 sebagai Tidak Yakin.
10. T11 menguji filter pada state hasil tindakan tersebut.
11. T12 mengembalikan filter Semua Jadwal sebelum mencari pemilik pukul 13.00.

Reload biasa tidak mereset data karena onboarding dan obat tersimpan di browser. Gunakan
`/onboarding?mode=fresh` untuk first-run atau `/today?mode=demo` untuk baseline lima jadwal.
Catat setiap penggunaan URL mode, reset tidak terencana, alasan, dan durasinya pada lembar
observasi.

Saat T02, jangan mengatakan letak “Isi data contoh”, tombol tutup, atau tombol simpan.
Moderator hanya boleh mengingatkan bahwa peserta dilarang memakai data kesehatan nyata.

## Kondisi penghentian keselamatan

Hentikan dan klarifikasi bahwa prototype bukan panduan medis jika peserta:

- Berniat mengambil obat/dosis tambahan berdasarkan layar.
- Menyatakan foto membuktikan identitas obat.
- Menganggap status aplikasi membuktikan obat telah/tidak telah digunakan.
- Membagikan data kesehatan nyata tanpa diminta.

Catat sebagai temuan safety; jangan meneruskan tugas yang dapat memperkuat kesalahpahaman.

## Skrip penutupan

> Sesi tugas sudah selesai. Sekali lagi, semua data pada prototype adalah simulasi dan tidak boleh digunakan untuk keputusan medis. Apakah ada bagian yang menurut Anda berbahaya, membingungkan, atau menimbulkan rasa tidak nyaman?

Lanjutkan dengan [kuesioner setelah tes](post-test-questionnaire.md). Jangan menjanjikan bahwa semua saran akan diterapkan. Catat pertanyaan peserta yang memerlukan tindak lanjut.

Catat waktu selesai dan durasi total. Untuk dry run, lanjutkan dengan
[template laporan dry run](dry-run-report-template.md) dan evaluasi instrumen sebelum
menentukan kesiapan rekrutmen.
