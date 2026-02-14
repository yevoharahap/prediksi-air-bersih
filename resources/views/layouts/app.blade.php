<!DOCTYPE html>
<html lang="en">
<head>
    <title>Sistem Prediksi Air Bersih</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700,800,900&display=swap" rel="stylesheet">

    <!-- Font Awesome -->
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- FONT AWESOME (untuk ikon) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <style>
      /* Wrapper agar semua section rapi dan center */
      .container-section {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
      }
    </style>
</head>
<body>

<!-- HEADER & NAVBAR -->
<header class="header">
    <nav class="navbar">
        <div class="logo">
            <a href="#"><img src="{{ asset('images/Logoo.png') }}" alt="Logo"></a>
        </div>
        <div class="menu">
            <ul>
                <li><a href="#hero">Home</a></li>
                <li><a href="#about">Fitur</a></li>
                <li><a href="#dataset">Dataset</a></li>
                <li><a href="#analisis">Analisis</a></li>
            </ul>
        </div>
        <a href="#prediksi" class="prediksi-btn">Mulai Prediksi</a>
    </nav>
</header>

<!-- HERO SECTION -->
<section id="hero" class="section hero-section">
    <div class="container-section d-flex align-items-center justify-content-between">
        <div class="hero-text">
            <h3>Sistem Prediksi Kebutuhan Air Bersih</h3>
            <h1>Metode Multiple Linier Regression</h1>
            <p>Sistem ini dirancang untuk menganalisis dan memprediksi kebutuhan air bersih 
               berdasarkan data historis. Dengan menggunakan metode Regresi Linier Berganda, 
               sistem dapat memberikan gambaran tren kebutuhan air pada periode berikutnya, sehingga mendukung pengambilan 
               keputusan yang lebih tepat dalam perencanaan distribusi dan efisiensi operasional.</p>
            <div class="btn-group">
                <a href="#dataset" class="btn btn-primary">Unggah Dataset</a>
            </div>
        </div>
        <div class="hero-image">
            <img src="{{ asset('images/10.png') }}" alt="Hero Image">
        </div>
    </div>
</section>

<!-- ABOUT -->
<section id="about">
  <div class="container-section">
    <div class="section-title text-center mb-5">
      <h2>Fitur Statistik Sistem</h2>
      <p>
  Sistem ini menyajikan ringkasan hasil analisis dan prediksi dalam bentuk statistik yang mudah dipahami. 
  Pengguna dapat melihat nilai-nilai penting seperti koefisien regresi, tingkat akurasi model, serta indikator 
  kesalahan prediksi. Dengan adanya statistik ini, proses evaluasi hasil analisis menjadi lebih transparan 
  dan membantu dalam pengambilan keputusan yang tepat.
</p>
    </div>
    <ul class="about-list">
      <li>
        <img src="{{ asset('images/1.png') }}" alt="Analisis Regresi Linier">
        <h3>Analisis Regresi Linier</h3>
        <p>Sistem menyediakan analisis regresi linier berganda untuk memahami hubungan antar variabel Independen dan Dependen.</p>
      </li>
      <li>
        <img src="{{ asset('images/2.png') }}" alt="Prediksi Kebutuhan Air">
        <h3>Prediksi Kebutuhan Air</h3>
        <p>Pengguna dapat melakukan prediksi kebutuhan air bersih berdasarkan data historis. Sistem menghasilkan nilai prediksi untuk periode berikutnya.</p>
      </li>
      <li>
        <img src="{{ asset('images/3.png') }}" alt="Evaluasi Model Uji Akurasi">
        <h3>Evaluasi Model & Uji Akurasi</h3>
        <p>Sistem dilengkapi fitur evaluasi akurasi model menggunakan MAPE sehingga pengguna dapat mengetahui tingkat keandalan hasil prediksi.</p>
      </li>
    </ul>
  </div>
</section>

<!-- SECTION DATASET -->
<section id="dataset" class="section dataset-section">
  <div class="container-section">
    <div class="section-title text-center mb-5">
      <h2>Dataset</h2>
     <p>
  Fitur ini memungkinkan pengguna untuk mengunggah dan mengelola dataset kebutuhan air bersih yang akan 
  digunakan dalam proses analisis regresi linier dan prediksi. Dengan format data yang sesuai, sistem dapat 
  menampilkan isi dataset secara interaktif sehingga pengguna dapat memastikan data sudah benar sebelum 
  dilakukan analisis lebih lanjut.
      </p>
    </div>

    <div class="dataset-wrapper">
      <!-- FORM UPLOAD (Dalam Card) -->
      <div class="dataset-form card-style">
        <h3 class="mb-4">Upload Dataset</h3>
        <form id="uploadForm" enctype="multipart/form-data" class="mb-3">
          <!-- Input file -->
          <div class="mb-3">
            <input type="file" name="file" class="form-control" required>
          </div>

          <!-- Tombol upload & hapus -->
          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-success">Upload Dataset</button>
            <button type="button" id="deleteDataset" class="btn btn-danger">Hapus Dataset</button>
          </div>
        </form>

        <!-- TABEL (dinamis) -->
        <div id="datasetWrapper" style="display:none;">
          <div class="table-scroll">
            <table class="table table-bordered table-striped mb-0" id="datasetTable">
              <thead class="table-light">
                <tr></tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- INFO DATASET (tanpa card, hanya teks + ikon) -->
      <div class="dataset-info">
        <h3 class="mb-3">Informasi Dataset</h3>
      <div class="alur-item">
  <i class="fas fa-file-upload"></i>
  <p>
    <b>Unggah Dataset</b> kebutuhan air bersih dalam format <code>.csv</code> atau <code>.xlsx</code>.<br>
    Pastikan data historis distribusi, kehilangan, dan kebutuhan air per bulan lengkap dan konsisten.
  </p>
</div>

<div class="alur-item">
  <i class="fas fa-table"></i>
  <p>
    Dataset harus memiliki kolom <em>Bulan</em>, <em>Tahun</em>, <em>Distribusi Air</em>, <em>Kehilangan Air</em>, dan <em>Kebutuhan Air</em>.<br>
    Nilai numerik harus valid tanpa karakter tambahan.
  </p>
</div>

<div class="alur-item">
  <i class="fas fa-check-circle"></i>
  <p>
    Dataset valid akan otomatis tampil dalam tabel. Sistem menandai jika ada data hilang atau format tidak sesuai.
  </p>
</div>

<div class="alur-item">
  <i class="fas fa-chart-line"></i>
  <p>
    Dataset digunakan untuk <b>analisis regresi</b> dan <b>prediksi kebutuhan air</b>.<br>
    Hasil prediksi bisa dievaluasi menggunakan MAPE untuk menilai akurasi.
  </p>
</div>

      </div>
    </div>
  </div>
</section>

<!-- SECTION ANALISIS -->
<section class="analisis-section" id="analisis">
  <div class="container-section">
    <!-- Judul Section -->
     <div class="section-title text-center mb-5">
      <h2>Analisis Regresi Linier</h2>
      <p>Analisis regresi linier memungkinkan Anda memahami hubungan 
   antara variabel dependen dan independen dalam dataset. Pilih variabel yang sesuai 
   untuk memodelkan prediksi dan mengidentifikasi pola yang signifikan secara statistik. 
   Hasil analisis ini dapat membantu pengambilan keputusan berbasis data dengan lebih tepat.
  </p>
    <!-- Form + Gambar Interpretasi -->
    <div class="row g-4 analisis-wrapper">
      
      <!-- Form Analisis -->
      <div class="col-lg-6 analisis-form">
        <h3 class="mb-3">Analysis Tool</h3>
        <!-- Placeholder sebelum dataset -->
        <div id="analisisPlaceholder">
          <p id="analisisMessage">Silahkan Unggah Dataset Terlebih dahulu</p>
          <button id="showVarBtn" class="btn btn-secondary" disabled>Pilih Variabel</button>
        </div>

        <!-- Form input variabel (disembunyikan awalnya) -->
        <form id="analisisForm" style="display:none;">
          <div class="mb-3">
            <label for="y_var" class="form-label">Variabel Dependen (Y)</label>
            <select id="y_var" class="form-select"></select>
          </div>
          <div class="mb-3">
            <label class="form-label">Variabel Independen (X)</label>
            <div id="x_var_checkboxes" class="x-var-checkbox"></div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Jalankan Analisis</button>
        </form>
      </div>

      <!-- Gambar Interpretasi -->
      <div class="col-lg-6 analisis-image d-flex align-items-center">
        <img src="{{ asset('images/interpretasi.png') }}" 
            alt="Interpretasi Analisis" 
            class="img-fluid w-100" 
            style="border-radius: 12px; box-shadow:none; background:none;">
      </div>

    </div>

    <!-- Hasil Analisis -->
    <div class="row mt-5">
      <div class="col-12">
        <div class="analisis-result" id="analisisResult"></div>
      </div>
    </div>

  </div>
</section>

<!-- SECTION PREDIKSI -->
<!-- SECTION PREDIKSI -->
<section class="prediksi-section" id="prediksi">
  <div class="container-section">
    <!-- Judul Section -->
    <div class="section-title text-center mb-5">
      <h2>Prediksi | Multiple Regression Linear</h2>
      <p>Gunakan model regresi linier berganda dari dataset untuk memprediksi nilai baru. 
         Dengan analisis ini, Anda dapat memperkirakan hasil yang mungkin dan mengevaluasi tren berdasarkan data historis. 
         Prediksi ini membantu dalam pengambilan keputusan yang lebih tepat dan perencanaan yang efektif.</p>
    </div>

    <!-- Form + Info -->
    <div class="prediksi-wrapper">
      <!-- Form Prediksi -->
      <div class="prediksi-form">
        <h3 class="mb-3">Forecasting Tool</h3>

        <!-- Placeholder sebelum dataset -->
        <div id="prediksiPlaceholder">
          <p id="prediksiMessage">Silahkan Unggah Dataset Terlebih dahulu</p>
          <button id="showPredBtn" class="btn btn-secondary" disabled>Isi Variabel</button>
        </div>

        <!-- Form input variabel prediksi (disembunyikan awalnya) -->
        <form id="prediksiForm" style="display:none;">
          <div class="row mb-3">
            <div class="col-md-6">
              <label for="pred_start_month" class="form-label">Bulan Mulai</label>
              <input type="month" id="pred_start_month" class="form-control">
            </div>
            <div class="col-md-6">
              <label for="pred_end_month" class="form-label">Bulan Akhir</label>
              <input type="month" id="pred_end_month" class="form-control">
            </div>
          </div>

          <div class="mb-3">
            <label for="pred_y_var" class="form-label">Variabel Dependen (Y)</label>
            <select id="pred_y_var" class="form-select"></select>
          </div>

          <div class="mb-3">
            <label class="form-label">Variabel Independen (X)</label>
            <div id="pred_x_inputs" class="pred-x-inputs"></div>
          </div>

          <button type="submit" class="btn btn-success w-100">Lakukan Prediksi</button>
        </form>
      </div>

      <!-- Info Alur -->
      <div class="prediksi-info">
        <h3 class="mb-3">Alur Forecasting Tool</h3>
        <div class="alur-item">
            <i class="fas fa-upload"></i> 
            <p><b>Unggah Dataset</b> kebutuhan air bersih dalam format <code>.csv</code> atau <code>.xlsx</code>. 
            Pastikan file sudah berisi data distribusi air, kehilangan air, serta kebutuhan air yang lengkap 
            sesuai periode yang ingin dianalisis.</p>
        </div>

        <div class="alur-item">
            <i class="fas fa-calendar-alt"></i> 
            <p><b>Pilih Bulan Mulai & Akhir</b> untuk menentukan rentang data yang akan digunakan. 
            Misalnya, Januari 2020 sampai Desember 2024. Rentang waktu ini akan menjadi dasar perhitungan regresi.</p>
        </div>

        <div class="alur-item">
            <i class="fas fa-bullseye"></i> 
            <p><b>Tentukan Variabel Y</b> (variabel terikat/hasil yang diprediksi). 
            Biasanya adalah <b>Kebutuhan Air Bersih</b> yang ingin dianalisis dan diproyeksikan ke periode berikutnya.</p>
        </div>

        <div class="alur-item">
            <i class="fas fa-project-diagram"></i> 
            <p><b>Pilih Variabel X</b> (variabel bebas/faktor yang memengaruhi). 
            Contohnya <b>Distribusi Air</b> dan <b>Kehilangan Air</b>. 
            Anda dapat memilih satu atau lebih variabel untuk membangun model regresi linier berganda.</p>
        </div>

        <div class="alur-item">
            <i class="fas fa-play-circle"></i> 
            <p><b>Klik Jalankan Prediksi</b> untuk memproses data. 
            Sistem akan menghitung koefisien regresi, menampilkan hasil prediksi, 
            serta menampilkan evaluasi akurasi model (misalnya MAPE dan grafik tren aktual vs prediksi).</p>
        </div>

      </div>
    </div>

    <!-- Hasil Prediksi -->
    <div class="row mt-5">
      <div class="col-12">
        <div id="prediksiResultWrapper" style="display:none;">
          <div class="card p-4 shadow-sm border-0">
            <div class="card-body prediksi-result" id="prediksiResult"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<!-- FOOTER -->
<footer class="footer">
  <div class="footer-main">
    <div class="container-section text-center">
      <p><strong>Sistem Prediksi Kebutuhan Air Bersih</strong> menggunakan metode <strong>Regresi Linier Berganda</strong> untuk membantu analisis dan perencanaan distribusi air.</p>
    </div>
  </div>
  <div class="footer-bottom text-center">
    <p>&copy; 2025 Sistem Prediksi Kebutuhan Air Bersih. All Rights Reserved.</p>
  </div>
</footer>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Parser Libraries -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>

<!-- Custom Script -->
<script src="{{ asset('js/dataset.js') }}"></script>
<script src="{{ asset('js/analisis.js') }}"></script>
<script src="{{ asset('js/prediksi.js') }}"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- Load Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</body>
</html>
