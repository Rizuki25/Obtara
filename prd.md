# OBTARA Web — Product Requirements Document

> **Tagline:** Obat tertata, keluarga terjaga.

| Atribut | Nilai |
|---|---|
| Versi | 0.2 — Web/PWA revision |
| Status | Draft untuk validasi |
| Tanggal | 31 Juli 2026 |
| Platform | Responsive web app berbasis React + Vite, dengan PWA sebagai progressive enhancement |
| Pasar awal | Indonesia |
| Pemilik produk | TBD |

## 1. Keputusan platform

OBTARA dapat dipindahkan dari Flutter mobile ke React + Vite web. Bentuk produk yang direkomendasikan adalah **responsive web app** yang dapat dibuka dari browser ponsel, tablet, dan desktop, dengan opsi instalasi PWA.

Perpindahan ini memberi dua keuntungan utama:

- Pengguna obat tetap dapat memakai tampilan mobile dari browser.
- Caregiver mendapatkan dashboard yang lebih nyaman di layar tablet atau desktop.

Namun, web memiliki batasan yang harus diperlakukan sebagai bagian dari desain:

- Pengingat browser memerlukan HTTPS, izin notifikasi, dan service worker.
- Pengguna yang menolak izin atau memakai browser yang tidak mendukung fitur tertentu tetap harus dapat memakai alur utama.
- Alert caregiver tidak boleh bergantung pada tab yang sedang terbuka. Backend harus menjadwalkan alert dan mengirimkannya melalui Web Push serta kanal fallback yang disetujui.
- OBTARA tidak boleh menjanjikan bahwa setiap browser akan memberikan notifikasi dengan reliabilitas seperti aplikasi native.

### 1.1 Rekomendasi arsitektur teknis

| Lapisan | Keputusan awal |
|---|---|
| UI | React dengan function components dan TypeScript |
| Build/dev | Vite |
| Routing | React Router atau router setara |
| Server state | Query/cache layer seperti TanStack Query atau solusi setara |
| UI state | Context atau state store ringan sesuai kebutuhan |
| Offline | Service worker, Cache Storage, dan IndexedDB untuk antrean event |
| PWA | Web App Manifest dan service worker melalui tooling PWA yang kompatibel dengan Vite |
| Push | Web Push/VAPID atau provider push yang mendukung browser |
| Backend | API terpisah untuk autentikasi, data, scheduler, alert, dan audit |
| Media | Object storage privat dengan URL berumur terbatas |
| Hosting | HTTPS, CDN/static hosting untuk frontend, backend terpisah |

React merupakan lapisan UI dan Vite merupakan build tool; keduanya tidak menggantikan backend, database, scheduler, atau push provider. Jika kelak OBTARA membutuhkan SEO, SSR, atau halaman publik yang kompleks, keputusan penggunaan framework React full-stack dapat dievaluasi tanpa mengubah domain data dan workflow produk.

## 2. Ringkasan produk

OBTARA adalah platform web untuk manajemen obat dan koordinasi perawatan keluarga. Produk ini menggabungkan kabinet obat visual, pengingat jadwal, konfirmasi penggunaan, eskalasi kepada caregiver, dan pemantauan stok/refill.

OBTARA tidak hanya mengingatkan waktu. Produk ini membantu menjawab:

1. Obat mana yang harus digunakan?
2. Kapan obat tersebut dijadwalkan?
3. Apakah status dosis sudah diketahui?
4. Apakah persediaannya cukup sampai waktu refill berikutnya?

## 3. Latar belakang dan masalah

Pengguna yang mengonsumsi beberapa obat dan keluarganya dapat mengalami:

- Obat yang tampak serupa sehingga mudah tertukar.
- Pengingat yang hanya menampilkan jam, tanpa menunjukkan obat fisik.
- Status dosis yang tidak diketahui caregiver.
- Alert yang terlambat atau terlalu banyak.
- Persediaan yang habis tanpa disadari.
- Data obat, jadwal, stok, dan komunikasi keluarga yang tersebar.
- Antarmuka yang sulit dipakai oleh lansia atau pengguna dengan keterbatasan penglihatan dan motorik.

## 4. Visi dan positioning

### 4.1 Visi

Menjadi kabinet obat digital keluarga yang membantu penggunaan obat berlangsung lebih teratur, mudah dikenali, dan terkoordinasi di berbagai perangkat.

### 4.2 Positioning

**Kategori:** Home medication safety and family care platform.

**Pernyataan positioning:**

> Bagi pengguna obat rutin dan keluarganya, OBTARA adalah pendamping pengelolaan obat yang menampilkan obat secara visual, memantau status dosis, menghubungkan caregiver saat bantuan dibutuhkan, dan memperkirakan kapan stok akan habis.

### 4.3 Janji utama

- Obat yang tepat.
- Pada waktu yang direncanakan.
- Statusnya diketahui.
- Persediaannya terpantau.
- Dapat diakses dari perangkat yang tersedia.

## 5. Sasaran produk

### 5.1 Sasaran utama

- Mengurangi kebingungan saat memilih obat melalui foto obat dan kemasan asli.
- Membantu pengguna menyelesaikan rutinitas obat dengan interaksi sesederhana mungkin.
- Memberikan status yang jelas tanpa menyimpulkan bahwa obat pasti tertelan.
- Memberikan caregiver informasi yang dapat ditindaklanjuti, dengan persetujuan.
- Mengurangi kejadian stok obat habis tanpa disadari.
- Menyediakan pengalaman mobile untuk pengguna dan dashboard layar besar untuk caregiver.
- Tetap berguna ketika koneksi terputus atau kemampuan browser terbatas.

### 5.2 Bukan sasaran produk

OBTARA tidak:

- Mendiagnosis penyakit.
- Meresepkan obat atau menentukan dosis.
- Mengubah jadwal berdasarkan penilaian medis otomatis.
- Mengklaim bahwa membuka halaman, menekan tombol, atau membuka kotak membuktikan obat telah dikonsumsi.
- Menggantikan dokter, apoteker, perawat, atau layanan darurat.
- Memberikan keputusan interaksi obat tanpa sumber klinis tervalidasi.
- Menjadi marketplace atau layanan pengantaran obat pada MVP.
- Mengandalkan browser tertentu untuk menjadi satu-satunya jalur alert caregiver.

## 6. Pengguna sasaran

### 6.1 Pengguna obat

Individu yang mengonsumsi obat rutin, termasuk lansia, pasien penyakit kronis, atau pasien pascaperawatan. Umumnya memakai ponsel, tetapi tidak selalu mau atau mampu memasang aplikasi.

Kebutuhan:

- Melihat obat yang harus diambil.
- Mendapat pengingat yang tidak membingungkan.
- Mengonfirmasi, menunda, melewati, atau menandai “tidak yakin”.
- Melihat stok dan waktu perkiraan habis.

### 6.2 Caregiver

Anak, pasangan, saudara, pendamping, atau perawat informal. Umumnya membutuhkan dashboard yang dapat dibuka dari desktop atau tablet.

Kebutuhan:

- Melihat status beberapa profil tanpa terus menelepon.
- Mendapat alert yang relevan.
- Mengakui dan menyelesaikan alert.
- Membantu mengatur jadwal atau stok jika diberi izin.

### 6.3 Pengelola profil

Pihak yang diberi kewenangan mengatur obat, jadwal, stok, dan izin Care Circle. Pengelola dapat sama dengan pengguna obat atau anggota keluarga lain.

## 7. Jobs to be done

- Ketika jadwal tiba, saya ingin melihat foto obat yang benar agar tidak mengambil obat lain.
- Ketika belum siap menggunakan obat, saya ingin menunda pengingat tanpa kehilangan jadwal.
- Ketika saya melewati dosis, saya ingin mencatat alasannya tanpa merasa dihakimi.
- Ketika orang tua saya belum mengonfirmasi dosis, saya ingin menerima alert yang bisa saya tindak lanjuti.
- Ketika stok mulai sedikit, saya ingin mengetahui perkiraan tanggal habis.
- Ketika berkonsultasi dengan dokter, saya ingin menunjukkan ringkasan obat yang rapi.
- Ketika memakai perangkat berbeda, saya ingin status dan riwayat tetap tersinkron.

## 8. Prinsip pengalaman pengguna

1. **Responsive-first:** alur utama nyaman pada lebar layar ponsel, tablet, dan desktop.
2. **Visual-first:** foto obat dan kemasan tampil bersama nama serta dosis.
3. **Satu tindakan utama:** setiap layar memiliki satu aksi paling jelas.
4. **Tidak menghakimi:** gunakan “belum dikonfirmasi”, bukan “gagal”.
5. **Aman saat ragu:** sediakan pilihan “Saya tidak yakin”.
6. **Progressive enhancement:** fitur PWA, kamera, dan push memperkaya pengalaman tetapi tidak memblokir penggunaan dasar.
7. **Privacy by default:** informasi sensitif tidak tampil di notifikasi tanpa izin.
8. **Aksesibel:** informasi tidak bergantung pada warna, hover, atau pointer saja.
9. **Transparan:** pengguna tahu siapa yang menerima data dan alert.
10. **Dapat dikoreksi:** stok, status, dan jadwal dapat diperbaiki dengan jejak perubahan.

## 9. Ruang lingkup

### 9.1 MVP web/PWA

- Registrasi, login, dan pengelolaan sesi browser.
- Responsive shell untuk mobile, tablet, dan desktop.
- Web App Manifest dan service worker.
- Install prompt PWA yang tidak memblokir browser biasa.
- Profil pengguna dan beberapa profil dalam satu keluarga.
- Penambahan obat secara manual.
- Upload foto obat depan/belakang dan foto kemasan.
- Capture dari kamera perangkat bila browser mendukung.
- Kabinet obat visual.
- Jadwal harian, hari tertentu, dan interval sederhana.
- In-app reminder dan Web Push jika izin tersedia.
- Fallback email untuk alert yang membutuhkan tindakan.
- Status dosis: dikonfirmasi, tunda, dilewati, tidak yakin, dan belum dikonfirmasi.
- Pencegahan konfirmasi dosis ganda.
- Care Circle dan undangan caregiver.
- Caregiver dashboard desktop/responsive.
- Eskalasi alert bertingkat berbasis backend.
- Stok otomatis berkurang dari dosis yang dikonfirmasi.
- Ambang stok minimum dan perkiraan tanggal habis.
- Riwayat dosis dan ringkasan dasar.
- Offline app shell dan antrean event dasar melalui IndexedDB.
- Pengaturan aksesibilitas.
- Kontrol privasi, persetujuan, audit log, dan penghapusan akun.

### 9.2 Setelah MVP

- Pemindaian label atau resep dengan OCR dan verifikasi manual.
- Jadwal tapering, siklus kompleks, dan obat bila diperlukan.
- Jurnal efek samping dan tanda vital.
- Doctor Visit Mode dan ekspor PDF.
- Tanggal kedaluwarsa dan nomor batch.
- Medication reconciliation.
- Travel mode dan perubahan zona waktu.
- Widget browser atau integrasi calendar sesuai batas browser.
- Kanal SMS/WhatsApp melalui provider resmi dan consent.
- Dukungan admin/operasional untuk menangani undangan dan akun.

### 9.3 Eksplorasi jangka panjang

- Pencocokan visual obat dengan kamera sebagai alat bantu, bukan identifikasi final.
- QR/NFC pada kabinet fisik.
- Smart pillbox.
- Integrasi apotek dan refill.
- Pemeriksaan alergi, duplikasi kandungan aktif, dan interaksi melalui sumber tervalidasi.
- Struktur serta integrasi data berbasis FHIR/SATUSEHAT sesuai akses resmi.

## 10. Kebutuhan fungsional

### FR-WEB-01 — Entry point, browser capability, dan PWA

#### Persyaratan

- OBTARA dapat dibuka di browser modern tanpa instalasi.
- Aplikasi menggunakan HTTPS pada staging yang menguji service worker dan production.
- Aplikasi mendaftarkan service worker hanya jika browser mendukung.
- App shell, manifest, ikon, warna tema, dan nama aplikasi disiapkan untuk PWA.
- Install prompt bersifat opsional dan tidak muncul sebelum pengguna memahami manfaatnya.
- Aplikasi melakukan feature detection untuk Push, Notifications, Camera, IndexedDB, Background Sync, dan media upload.
- Jika suatu fitur tidak didukung, aplikasi menampilkan fallback yang jelas.
- Deep link ke route internal tetap bekerja setelah refresh melalui konfigurasi hosting.

#### Kriteria penerimaan

- Pengguna dapat menyelesaikan alur dasar dari browser tanpa memasang PWA.
- Install PWA tidak mengubah data akun atau membuat profil duplikat.
- Pengguna dapat membuka route langsung setelah login.
- Service worker tidak menyimpan data kesehatan privat dalam cache publik.

### FR-WEB-02 — Akun, profil, dan Care Circle

#### Persyaratan

- Pengguna dapat membuat akun dengan email atau nomor telepon.
- Sesi disimpan menggunakan mekanisme cookie/token yang aman dan memiliki expiry.
- Satu akun dapat mengelola beberapa profil.
- Profil memiliki nama panggilan, zona waktu, dan preferensi aksesibilitas.
- Pengelola dapat mengundang caregiver melalui tautan atau kode sekali pakai.
- Izin setiap caregiver dapat dipilih dan dicabut.
- Semua perubahan izin dicatat dalam audit log.

#### Kriteria penerimaan

- Caregiver harus menerima undangan sebelum data profil terlihat.
- Token undangan memiliki masa berlaku dan tidak dapat digunakan dua kali.
- Logout membersihkan sesi browser dan data sementara sensitif.

### FR-WEB-03 — Responsive shell dan navigasi

#### Breakpoint perilaku

| Lebar layar | Perilaku awal |
|---|---|
| <640 px | Navigasi bawah atau menu ringkas, satu kolom, kartu besar |
| 640–1023 px | Dua kolom bila ruang cukup, toolbar adaptif |
| ≥1024 px | Sidebar, tabel/dashboard, panel detail, dan keyboard shortcut opsional |

#### Persyaratan

- Layar Hari Ini menjadi landing page setelah login.
- Caregiver dapat berpindah profil tanpa kehilangan filter penting.
- Tidak ada fungsi inti yang hanya dapat dijalankan melalui hover.
- Modal dan drawer dapat ditutup dengan Escape serta tombol yang terlihat.
- Layout tetap usable pada zoom browser 200%.

### FR-WEB-04 — Upload foto dan kamera

#### Persyaratan

- Pengguna dapat memilih file dari perangkat.
- Jika tersedia, pengguna dapat mengambil foto dari kamera perangkat melalui browser.
- Aplikasi menampilkan preview, rotasi, crop, dan retake sebelum upload.
- Foto dikompresi dengan batas ukuran yang dapat dikonfigurasi.
- Metadata EXIF lokasi dan metadata yang tidak dibutuhkan dihapus sebelum penyimpanan.
- Foto disimpan privat dan diakses melalui URL berumur terbatas.
- Upload memiliki progress, retry, dan status gagal yang jelas.
- Input file tetap tersedia jika izin kamera ditolak.
- Alt text foto memuat konteks, bukan menebak identitas obat.

#### Kriteria penerimaan

- Foto tidak menjadi publik melalui URL permanen.
- Pengguna dapat menyelesaikan penambahan obat tanpa kamera.
- Browser yang tidak mendukung capture tetap memiliki upload file.

### FR-WEB-05 — Data obat

#### Data wajib

- Nama obat.
- Kekuatan/dosis pada label bila tersedia.
- Bentuk sediaan.
- Jumlah per penggunaan.
- Jadwal atau penandaan “tanpa jadwal”.
- Profil pemilik.

#### Data opsional

- Nama generik dan merek.
- Produsen.
- Tulisan/imprint.
- Warna dan bentuk.
- Foto sisi depan dan belakang.
- Foto kemasan/label.
- Instruksi sebelum/sesudah makan.
- Prescriber atau catatan apoteker.
- Tanggal mulai dan selesai.
- Lokasi fisik kabinet.
- Stok, unit, ambang refill, dan tanggal kedaluwarsa.

#### Persyaratan

- Pengguna dapat menambah, mengubah, menjeda, menyelesaikan, atau mengarsipkan obat.
- Perubahan jadwal hanya memengaruhi kejadian masa depan.
- Riwayat lampau tidak ditulis ulang ketika jadwal berubah.
- Foto diposisikan sebagai alat bantu visual, bukan verifikasi medis final.
- Nama dan dosis tetap tampil bersama foto.
- Duplikasi nama/kekuatan yang mungkin sama harus memicu pemeriksaan manual.

### FR-WEB-06 — Kabinet obat visual

#### Persyaratan

- Layar Hari Ini menampilkan dosis menurut waktu.
- Kartu obat menampilkan foto, nama, dosis, waktu, lokasi, dan status.
- Foto kemasan dapat dibuka dalam lightbox yang aksesibel.
- Pengguna dapat mengelompokkan obat berdasarkan waktu, lokasi, atau profil.
- Placeholder tersedia jika foto belum diunggah.
- Warna tidak boleh menjadi satu-satunya penanda.
- Pada desktop, pengguna dapat membuka panel detail tanpa kehilangan daftar kabinet.
- Pada mobile, panel detail berubah menjadi halaman atau bottom sheet yang mudah ditutup.

### FR-WEB-07 — Jadwal dan kejadian dosis

#### Jenis jadwal MVP

- Setiap hari pada satu atau beberapa waktu.
- Hari tertentu dalam seminggu.
- Setiap sejumlah hari.
- Rentang tanggal aktif.
- Label sebelum/sesudah makan.

#### Status kejadian dosis

| Status | Arti |
|---|---|
| Terjadwal | Waktu belum tiba |
| Jatuh tempo | Berada dalam jendela konfirmasi |
| Ditunda | Pengguna meminta pengingat ulang |
| Dikonfirmasi | Pengguna menyatakan obat sudah digunakan |
| Dilewati | Pengguna menyatakan dosis tidak digunakan |
| Tidak yakin | Pengguna membutuhkan pemeriksaan sebelum tindakan berikutnya |
| Belum dikonfirmasi | Jendela berakhir tanpa status final |
| Dibatalkan | Jadwal dibatalkan karena obat dijeda/diubah |

#### Persyaratan

- Setiap kejadian memiliki ID unik dan idempotency key.
- Timestamp tindakan, timezone, perangkat, dan status sinkronisasi disimpan.
- Web tidak boleh mengubah status menjadi “dikonfirmasi” otomatis.
- Konfirmasi kedua memunculkan peringatan dan tidak mengurangi stok lagi.
- “Tidak yakin” tidak menampilkan anjuran mengambil dosis pengganti.
- Perubahan jadwal memiliki versi dan hanya membentuk ulang kejadian masa depan.

### FR-WEB-08 — Reminder web dan push

#### Persyaratan

- Scheduler backend membuat reminder berdasarkan timezone profil.
- Web Push digunakan bila pengguna telah memberi izin dan memiliki subscription aktif.
- Service worker menerima push dan menampilkan notifikasi menggunakan `showNotification`.
- Klik notifikasi membuka route dosis melalui deep link.
- Subscription yang kedaluwarsa atau invalid dibersihkan.
- Jika izin ditolak atau browser tidak mendukung push, aplikasi menampilkan fallback in-app dan kanal yang diizinkan, misalnya email.
- Timer JavaScript di tab terbuka hanya menjadi enhancement, bukan sumber kebenaran jadwal.
- Pengguna dapat mengatur quiet hours dan kanal sesuai kebijakan produk.

#### Urutan default produk

Nilai berikut adalah default workflow dan dapat diubah; bukan petunjuk medis:

- T0: reminder kepada pengguna.
- T+10 menit: reminder kedua.
- T+30 menit: reminder terakhir kepada pengguna.
- Setelah batas caregiver: evaluasi eskalasi.

#### Kriteria penerimaan

- Aplikasi tidak menjanjikan push jika permission belum diberikan.
- Reminder tidak mengandung nama obat di lock screen secara default.
- Pengguna melihat status subscription dan cara mengaktifkannya kembali.
- Notifikasi duplikat untuk event yang sama dicegah.

### FR-WEB-09 — Caregiver alert dan eskalasi

#### Persyaratan

- Eskalasi hanya aktif setelah consent pemilik/pengelola profil.
- Aturan dapat diaktifkan per obat atau per jadwal.
- Aturan berisi batas waktu, caregiver utama, caregiver cadangan, kanal, dan quiet hours.
- Backend mengirim alert jika event masih “belum dikonfirmasi”.
- Caregiver dapat mengakui, menghubungi pengguna, dan mencatat hasil.
- Alert berhenti jika pengguna memberi status final, obat dijeda, atau caregiver menyelesaikan kasus.
- Jika caregiver utama tidak mengakui, alert dapat diteruskan.
- Pengiriman, acknowledgement, delivery failure, dan resolusi diaudit.
- UI memakai istilah “belum dikonfirmasi”, bukan “pasti tidak diminum”.

#### Fallback kanal

| Kondisi | Jalur |
|---|---|
| Push aktif | Web Push ke subscription caregiver |
| Push tidak aktif | Email atau kanal resmi yang diaktifkan |
| Email gagal | Status gagal terlihat di dashboard dan retry sesuai kebijakan |
| Semua kanal gagal | Alert tetap terlihat pada dashboard saat caregiver membuka web |

### FR-WEB-10 — Stok dan refill

#### Persyaratan

- Pengguna memasukkan stok awal dan unit.
- Unit minimum: tablet, kapsul, mL, tetes, puff, patch, sachet, dan kustom.
- Dosis dikonfirmasi menghasilkan satu transaksi konsumsi.
- Dosis dilewati, belum dikonfirmasi, atau tidak yakin tidak mengurangi stok.
- Pembatalan konfirmasi membuat transaksi kompensasi.
- Refill menambah stok melalui ledger baru.
- Koreksi stok memerlukan alasan.
- Estimasi tanggal habis dihitung dari stok dan jadwal aktif bila datanya cukup.
- Alert stok dapat ditujukan ke pengguna dan caregiver sesuai izin.
- Stok negatif memerlukan konfirmasi eksplisit.

### FR-WEB-11 — Riwayat, laporan, dan dashboard caregiver

- Riwayat dapat difilter berdasarkan profil, obat, tanggal, status, dan device.
- Dashboard caregiver dapat membandingkan beberapa profil.
- Card status menunjukkan umur data terakhir tersinkron.
- Ringkasan membedakan tepat waktu, terlambat, dilewati, tidak yakin, dan belum dikonfirmasi.
- Caregiver dapat melihat alert yang belum diakui, sedang ditangani, dan selesai.
- Ringkasan harian/mingguan dapat dikirim melalui kanal yang disetujui.
- Doctor Visit Mode dan ekspor laporan menjadi prioritas setelah MVP.

### FR-WEB-12 — Offline dan sinkronisasi

- Service worker melakukan precache terhadap app shell yang tidak sensitif.
- IndexedDB menyimpan event pending secara lokal.
- Tindakan dosis offline diberi timestamp perangkat dan status “menunggu sinkronisasi”.
- Saat online kembali, event dikirim dengan idempotency key.
- Caregiver alert berbasis server hanya dibuat setelah backend mengetahui status terbaru.
- UI membedakan “belum dikonfirmasi” dan “belum tersinkron”.
- Konflik antar-tab atau antar-device tidak boleh ditimpa diam-diam.
- Browser yang tidak mendukung Background Sync tetap melakukan retry saat aplikasi dibuka atau koneksi pulih.

### FR-WEB-13 — Aksesibilitas

- Mendukung keyboard penuh untuk dashboard caregiver.
- Fokus terlihat dan urut.
- Semua modal/drawer dapat ditutup dengan Escape dan kontrol terlihat.
- Target sentuh minimal 48 × 48 px.
- Mendukung zoom browser 200% tanpa kehilangan fungsi utama.
- Semua status menggunakan teks/ikon selain warna.
- Alt text gambar memiliki konteks yang jelas.
- Screen reader dapat membaca nama obat, dosis, waktu, dan status.
- Mode teks besar dan kontras tinggi tersedia.
- Copy menggunakan Bahasa Indonesia yang singkat.

### FR-WEB-14 — Privasi, keamanan, dan web hardening

- HTTPS wajib pada staging yang menguji worker dan production.
- Sesi memakai cookie aman/HttpOnly bila arsitektur memungkinkan.
- Proteksi CSRF/XSS dan Content Security Policy diterapkan.
- Data kesehatan tidak disimpan di URL query, log, atau referrer tanpa alasan kuat.
- Media privat memakai signed URL yang berumur terbatas.
- Cache browser dan IndexedDB tidak menyimpan data lebih lama dari kebijakan retensi.
- Role/permission divalidasi di backend, bukan hanya disembunyikan di UI.
- Audit log mencatat perubahan obat, jadwal, stok, consent, dan akses caregiver.
- Pengguna dapat mengunduh dan menghapus data sesuai kebijakan.
- Review hukum diperlukan untuk perlindungan data dan klasifikasi produk kesehatan.

### FR-WEB-15 — Observabilitas

- Memantau error runtime React dan kegagalan API tanpa mengumpulkan data kesehatan mentah.
- Memantau registrasi worker, push subscription, delivery failure, dan sinkronisasi.
- Menyediakan correlation ID untuk support tanpa menampilkan detail obat.
- Memberi status outage jika scheduler/push provider bermasalah.
- Memisahkan error pengguna, error browser, error jaringan, dan error server.

## 11. Arsitektur informasi dan route

### 11.1 Route pengguna obat

- `/login`
- `/onboarding`
- `/today`
- `/cabinet`
- `/medications/new`
- `/medications/:id`
- `/stock`
- `/history`
- `/care-circle`
- `/settings`

### 11.2 Route caregiver

- `/caregiver/overview`
- `/caregiver/alerts`
- `/caregiver/profiles/:profileId`
- `/caregiver/reports`
- `/caregiver/settings`

### 11.3 Navigasi responsive

Mobile:

- Hari Ini
- Kabinet
- Riwayat
- Care Circle
- Profil

Desktop caregiver:

- Overview
- Alerts
- Profiles
- Stock
- Reports
- Settings

## 12. Entitas data inti

| Entitas | Fungsi |
|---|---|
| Account | Identitas login dan keamanan |
| Session | Sesi browser dan perangkat |
| Profile | Individu pemilik obat |
| CareCircleMembership | Hubungan, peran, dan izin |
| Medication | Identitas dan detail obat |
| MedicationImage | Foto obat, kemasan, dan label |
| MedicationSchedule | Aturan pembentukan jadwal |
| DoseOccurrence | Satu kejadian dosis pada waktu tertentu |
| DoseEvent | Event tindakan terhadap kejadian |
| PushSubscription | Endpoint browser dan metadata device |
| ReminderJob | Job reminder yang dibuat scheduler |
| AlertRule | Aturan eskalasi caregiver |
| CaregiverAlert | Alert dan status tindak lanjut |
| StockLedgerEntry | Transaksi stok yang dapat diaudit |
| RefillRecord | Penambahan stok |
| Consent | Persetujuan pembagian data dan alert |
| AuditEvent | Jejak perubahan sensitif |

## 13. User stories prioritas

| ID | Prioritas | User story |
|---|---|---|
| US-W01 | Must | Sebagai pengguna, saya ingin membuka OBTARA dari browser ponsel tanpa instalasi. |
| US-W02 | Must | Sebagai pengguna, saya ingin melihat foto obat pada jadwal agar tidak mengambil obat yang salah. |
| US-W03 | Must | Sebagai pengguna, saya ingin mengonfirmasi dosis dengan satu tindakan yang jelas. |
| US-W04 | Must | Sebagai pengguna, saya ingin menunda atau melewati dosis dengan alasan. |
| US-W05 | Must | Sebagai pengguna, saya ingin memilih “tidak yakin” agar tidak mengambil dosis kedua secara tidak sengaja. |
| US-W06 | Must | Sebagai caregiver, saya ingin menerima alert meski tab dashboard tidak sedang terbuka, jika push saya aktif. |
| US-W07 | Must | Sebagai caregiver, saya ingin melihat dashboard beberapa profil di layar desktop. |
| US-W08 | Must | Sebagai pengguna, saya ingin stok berkurang otomatis setelah konfirmasi. |
| US-W09 | Must | Sebagai pengguna, saya ingin mendapat peringatan sebelum stok habis. |
| US-W10 | Must | Sebagai pemilik profil, saya ingin mengatur detail data yang boleh dilihat caregiver. |
| US-W11 | Must | Sebagai pengguna, saya ingin status offline tidak dianggap sebagai status dosis yang salah. |
| US-W12 | Should | Sebagai pengguna, saya ingin mengambil foto obat melalui kamera browser. |
| US-W13 | Should | Sebagai caregiver, saya ingin melihat ringkasan beberapa profil dan waktu sinkronisasi terakhir. |
| US-W14 | Should | Sebagai pengguna, saya ingin melihat riwayat tepat waktu, terlambat, dan dilewati. |
| US-W15 | Should | Sebagai pengguna, saya ingin aplikasi dapat dipasang sebagai PWA jika perangkat mendukung. |
| US-W16 | Could | Sebagai pengguna, saya ingin memindai label agar input obat lebih cepat. |
| US-W17 | Could | Sebagai pengguna, saya ingin mengekspor ringkasan untuk konsultasi dokter. |

## 14. Kebutuhan nonfungsional

### 14.1 Kinerja web

- First meaningful screen ditargetkan tampil ≤3 detik pada jaringan 4G yang wajar.
- LCP, CLS, dan INP dipantau melalui performance monitoring.
- Foto lazy-loaded dan thumbnail digunakan pada daftar kabinet.
- Bundle route caregiver tidak perlu diunduh oleh pengguna obat sebelum dibutuhkan.
- Aplikasi menampilkan skeleton/loading state, bukan layar kosong.

### 14.2 Reliabilitas

- Backend menjadi source of truth untuk jadwal dan alert.
- Reminder lokal/in-tab hanya menjadi enhancement.
- Push job idempotent dan dapat di-retry.
- Operasi perubahan dosis dan stok aman jika request dikirim ulang.
- Backup dan pemulihan data diuji berkala.

### 14.3 Kompatibilitas

- Mendukung browser modern yang masih menerima pembaruan keamanan.
- Core flow diuji pada Chrome, Edge, Firefox, dan Safari versi target.
- Fitur enhanced menggunakan feature detection, bukan user-agent assumption.
- Desktop dan mobile diuji dengan keyboard, touch, dan screen reader.

### 14.4 Deploy dan cache

- Frontend di-deploy melalui HTTPS dan CDN/static hosting.
- Server hosting melakukan SPA fallback untuk route internal.
- Asset hashing digunakan untuk mencegah cache stale.
- Service worker memiliki strategi update dan tombol “Muat versi terbaru” jika ada update penting.
- Source map production dibatasi sesuai kebijakan keamanan.

## 15. Analitik dan metrik keberhasilan

### 15.1 North-star metric

**Resolved medication routines per active profile per week:** jumlah kejadian dosis yang memperoleh status jelas—dikonfirmasi, dilewati dengan alasan, atau diselesaikan melalui tindak lanjut—tanpa mendorong tindakan medis yang tidak aman.

### 15.2 Metrik produk

- Persentase pengguna yang menyelesaikan onboarding.
- Persentase pengguna yang mengaktifkan minimal satu obat.
- Persentase obat aktif yang memiliki foto.
- Persentase pengguna mobile browser yang berhasil membuka Hari Ini.
- Persentase push subscription yang berhasil dibuat.
- Tingkat reminder delivered, clicked, dan actioned.
- Tingkat konfirmasi tepat waktu dan terlambat.
- Persentase caregiver alert yang diakui.
- Median waktu dari alert ke acknowledgement.
- Persentase stok rendah yang diikuti pencatatan refill.
- Retensi pengguna dan caregiver hari ke-7 dan ke-30.

### 15.3 Guardrail metrics

- Alert duplikat.
- Push subscription invalid.
- Persentase browser permission denied.
- False alert dan resolusi manual.
- Konflik antar-tab/perangkat.
- Koreksi stok per profil.
- Laporan kebingungan dosis atau kemungkinan dosis ganda.
- Keluhan privasi.

## 16. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Notifikasi browser tidak konsisten | Dosis atau alert terlambat diketahui | Backend scheduler, Web Push, fallback email/kanal resmi, status permission yang jelas |
| Browser tidak mendukung fitur tertentu | Pengguna kehilangan alur | Progressive enhancement dan fallback browser |
| Pengguna tidak memasang PWA | Reminder mobile lebih terbatas | Core flow tetap berfungsi di browser, ajakan instalasi tidak memaksa |
| Pengguna mengandalkan warna/foto saja | Salah mengenali obat | Selalu tampilkan nama, dosis, kemasan, dan copy keselamatan |
| Konfirmasi ganda dari dua tab | Stok salah atau kemungkinan dosis ganda | Idempotency key, versioning, dan optimistic UI yang dapat direkonsiliasi |
| Alert palsu akibat offline | Beban caregiver dan hilang kepercayaan | Tampilkan umur data dan label belum tersinkron |
| Terlalu banyak alert | Alert fatigue | Eskalasi bertingkat, quiet hours, ringkasan, dan evaluasi guardrail |
| Foto besar/berisi EXIF | Lambat atau bocor lokasi | Kompresi, stripping EXIF, signed URL, dan batas ukuran |
| Data privat masuk cache/CDN | Pelanggaran data | Cache hanya app shell publik, media privat, header keamanan |
| Stok sistem berbeda dari fisik | Prediksi refill salah | Ledger, rekonsiliasi manual, alasan koreksi |
| Dashboard caregiver terlalu kompleks | Pengguna tidak bertindak | Tampilkan alert aktif terlebih dahulu dan gunakan progressive disclosure |
| Aplikasi dianggap nasihat medis | Risiko keselamatan/regulasi | Batas produk jelas, copy aman, dan review klinis/hukum |

## 17. Ketergantungan

- Browser Push API dan service worker.
- HTTPS serta konfigurasi hosting SPA.
- Backend API dan database.
- Scheduler server-side.
- Push/email provider.
- Object storage privat.
- Monitoring error dan delivery.
- Review UX dengan pengguna obat serta caregiver.
- Review klinis untuk copy keselamatan.
- Review hukum untuk perlindungan data dan klasifikasi produk.

## 18. Strategi validasi dan peluncuran

### Tahap 0 — Discovery web

- Wawancara pengguna obat yang tidak ingin memasang aplikasi.
- Uji apakah caregiver lebih nyaman memakai desktop.
- Uji pemahaman permission push dan fallback.
- Uji konsep kabinet visual pada lebar layar ponsel dan desktop.

### Tahap 1 — Prototype usability

- Prototype route `/today`, detail obat, tambah foto, konfirmasi, dan caregiver dashboard.
- Uji dengan ponsel browser dan desktop.
- Uji keyboard, touch, zoom, dan screen reader dasar.

### Tahap 2 — Pilot tertutup

- 20–50 keluarga.
- Browser matrix terbatas tetapi beragam.
- Fokus pada push delivery, fallback, offline, sinkronisasi, dan stok.

### Tahap 3 — Beta

- Tambah browser/device target.
- Uji install PWA dan update service worker.
- Uji revoke access, data deletion, dan deep link refresh.

### Tahap 4 — Rilis publik

- Rollout bertahap.
- Monitoring push failure dan false alert harian.
- Kanal dukungan pengguna.
- Prosedur rollback asset/service worker.

## 19. Definition of done MVP web

MVP dianggap siap bila:

- Semua user story prioritas Must lulus acceptance test.
- Core flow dapat diselesaikan dari mobile browser tanpa instalasi.
- Caregiver dashboard usable pada desktop dan tablet.
- PWA dapat dipasang pada browser yang mendukung tanpa membuat profil duplikat.
- Reminder tidak menjanjikan delivery jika permission belum aktif.
- Backend scheduler dan push retry telah diuji.
- Alert duplikat untuk event yang sama dicegah.
- Stok hanya berubah satu kali untuk satu konfirmasi.
- Deep link dan SPA fallback berfungsi setelah refresh.
- Offline event tersinkron dengan idempotency key.
- Conflict status tidak ditimpa tanpa audit.
- Uji keyboard, screen reader, zoom 200%, dan contrast selesai.
- Cache tidak menyimpan data kesehatan privat secara publik.
- Penghapusan akun dan pencabutan akses terverifikasi.
- Copy keselamatan, privasi, dan batasan browser telah direview.

## 20. Pertanyaan terbuka

- Backend dan push provider mana yang digunakan?
- Apakah kanal fallback MVP hanya email atau juga SMS/WhatsApp resmi?
- Apakah OBTARA memerlukan akun caregiver untuk menerima email alert?
- Berapa lama event disimpan di IndexedDB sebelum dihapus?
- Apakah camera capture masuk MVP atau setelah upload file stabil?
- Apakah pengguna desktop juga dapat menjadi pengguna obat utama?
- Apakah fitur PWA diprioritaskan sejak MVP atau setelah SPA core selesai?
- Apakah pengguna boleh mengubah jadwal dari banyak tab secara bersamaan?
- Browser dan versi minimum apa yang akan dijadikan target dukungan?

## 21. Keputusan produk awal

| Keputusan | Alasan |
|---|---|
| React + Vite untuk frontend | Cocok untuk SPA responsive dengan backend terpisah dan iterasi UI cepat |
| Browser-first dengan PWA opsional | Tidak memaksa instalasi dan tetap memberi pengalaman installable bila tersedia |
| Backend sebagai source of truth | Jadwal/alert tidak bergantung pada tab yang terbuka |
| Web Push + fallback | Menangani izin browser dan keterbatasan platform secara jujur |
| Dashboard caregiver desktop | Caregiver membutuhkan pemantauan beberapa profil dan tabel/ringkasan |
| Kabinet visual sebagai entry point | Pembeda utama dan membantu pemilihan obat |
| “Belum dikonfirmasi” menggantikan “tidak diminum” | Sistem hanya mengetahui status aplikasi, bukan konsumsi aktual |
| Stok berkurang hanya dari konfirmasi | Menghindari asumsi konsumsi |
| Riwayat lampau immutable | Menjaga audit dan kepercayaan data |

## 22. Referensi teknis

- [React — Installation and setup](https://react.dev/learn/installation)
- [React — Creating a React app](https://react.dev/learn/creating-a-react-app)
- [Vite — Getting Started](https://vite.dev/guide/)
- [MDN — Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [MDN — Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [web.dev — Progressive Web Apps](https://web.dev/learn/pwa/progressive-web-apps)

Dokumen alur terperinci tersedia di [workflow.md](./workflow.md).
