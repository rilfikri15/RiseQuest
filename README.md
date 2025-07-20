# **RISE QUEST**

### **DESKRIPSI**
To Do List yang menjadikan tugas atau kerjaan sebagai **quest dalam game**.
Setiap quest yang diselesaikan akan memberikan **poin experience (XP)** dan menaikkan **level user**.
Quest dibuat oleh user sendiri dengan menuliskan **judul Quest**, **deskripsi**, **tanggal mulai** dan **tanggal berakhir**, Setiap Quest akan **dikelompokkan per bulan**.
Pemain yang tidak mengerjakan quest selama seminggu akan mendapatkan **punishment**, yaitu **level akan di-reset kembali ke level 1**.

---

### **LATAR BELAKANG**
Di era modern, banyak individu menghadapi tantangan dalam mempertahankan **motivasi** dan **konsistensi** dalam menyelesaikan tugas.
Pendekatan **gamifikasi** menurut saya dapat dicoba melihat perkembangan saat ini.

RiseQuest bertujuan untuk **meningkatkan motivasi** pengguna dalam menyelesaikan tugas sehari-hari dengan **mengubahnya menjadi pengalaman bermain** (*gamified to-do list*).
Ini membantu pengguna membangun **kebiasaan positif** dan tetap **produktif** dengan **reward** berupa **level dan title**.

---

### **TUJUAN (RiseQuest)**
RiseQuest mengadopsi konsep **RPG (Role-Playing Game)**, di mana setiap tugas diubah menjadi **"quest"**.
Setelah diselesaikan, quest akan memberikan hadiah berupa **Experience Points (XP)** kepada pengguna.
Pengumpulan XP akan menaikkan **Level** dan membuka **Title baru**.
Diharapkan dengan konsep ini, pengguna dapat merasakan **pencapaian dan progres**.
Tampilan antarmuka didesain **futuristik**, menyerupai **HUD (Heads-Up Display)** dalam game.

---

### **TECH USED**
1. **HTML5**:
   Digunakan untuk struktur aplikasi. Seluruh elemen UI seperti judul, status bar, formulir, dan daftar quest dibangun menggunakan HTML.

2. **CSS3**:
   Digunakan untuk visual dan styling aplikasi. Termasuk:
   * Tata letak
   * Tema warna gelap dengan aksen **neon glow aqua/cyan**
   * Animasi seperti **scanline**
   * Penyesuaian tampilan elemen formulir

3. **JavaScript (ES6+)**:
   Digunakan untuk:
   * Sistem manajemen **level, XP, dan title**
   * Logika **perhitungan XP dinamis** berdasarkan durasi, deskripsi, dan prioritas (Normal, Penting, Mendesak)
   * Operasi **CRUD (Create, Read, Update, Delete)** quest
   * Penyimpanan data menggunakan **Local Storage**
   * Pengaturan **efek audio background**
   * Manajemen tugas: penambahan, penyelesaian, penghapusan quest

4. **Local Storage (Browser API)**:
   Menyimpan data pengguna seperti level, XP, timestamp terakhir, dan daftar quest.
   Data akan tetap ada meskipun browser ditutup.

5. **Google Fonts**:
   Digunakan untuk mengimpor font:
   * **Orbitron**
   * **Share Tech Mono**
     Memberikan nuansa **futuristik dan gaming**.

6. **Netlify (Deployment)**:
   Digunakan untuk **hosting aplikasi**, agar bisa diakses publik via URL.

---

### **FITUR**
#### **Manajemen Level dan XP**
* User mulai dari **Level 1** dengan title **"Villager"**
* XP ditampilkan dalam bentuk **progress bar**
* XP dikumpulkan dari penyelesaian quest

#### **Sistem Title Dinamis**
* Title user berubah otomatis sesuai level, dari **"Villager"** hingga **"Legend of the Realm"** untuk level maksimalnya

#### **Perhitungan XP Dinamis**
* Berdasarkan:
  * Durasi quest (dalam hari)
  * Apakah deskripsi diisi
  * Tingkat prioritas

#### **CRUD Quest**
* **Create**: Tambahkan quest baru dengan judul, deskripsi (opsional), tanggal mulai, berakhir, prioritas
* **Read**: Daftar quest yang terorganisir per bulan
* **Update**: Tandai quest sebagai *Complete* atau *Re-open*
* **Delete**: Hapus quest

#### **Sistem Hukuman (Penalty)**
* Jika user **tidak menyelesaikan quest dalam seminggu**, level akan **di-reset ke Level 1**

#### **Penyimpanan Data Lokal**
* Progres level, XP, title, dan quest disimpan di browser via **Local Storage**

#### **Pengalaman Audio**
* **Musik latar belakang (No Copyright)** diputar secara **looping** untuk meningkatkan suasana

---

### **AI SUPPORT**
#### **Peran AI dalam Proyek**
AI digunakan sebagai **asisten pengembangan utama**:
* **Menghasilkan Kode**: Memberikan potongan kode HTML, CSS, dan JS sesuai kebutuhan
* **Debugging & Pemecahan Masalah**: Mengidentifikasi & memperbaiki error seperti ikon tidak muncul, UI tidak berfungsi, dll
* **Revisi Iteratif**: Mengimplementasikan revisi berdasarkan feedback agar proyek sesuai visi

#### **Manfaat AI**
* Mempercepat proses pengembangan
* Memberikan solusi teknis dan kode yang optimal
* Membantu dalam penataan styling dan fungsi kompleks
* Memberikan **pemahaman langsung** melalui penjelasan teknis tiap hasil

