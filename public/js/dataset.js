// IIFE → supaya variabel tidak bocor ke global scope
(() => {

  // ===============================
  // AMBIL ELEMEN DOM YANG DIBUTUHKAN
  // ===============================
  const form = document.getElementById('uploadForm');          // Form upload dataset
  const fileInput = form.querySelector('input[type="file"]'); // Input file
  const wrapper = document.getElementById('datasetWrapper');  // Wrapper tabel dataset
  const table = document.getElementById('datasetTable');      // Tabel dataset
  const tbody = table.querySelector('tbody');                 // Body tabel

  // =========================================
  // FUNGSI UNTUK MENAMPILKAN DATASET KE TABEL
  // =========================================
  function renderTable(data, columns) {

    // Ambil baris header tabel
    const thead = table.querySelector('thead tr');
    thead.innerHTML = '';

    // Buat header tabel dari nama kolom dataset
    columns.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c;
      thead.appendChild(th);
    });

    // Kosongkan isi tabel sebelumnya
    tbody.innerHTML = '';

    // Isi tabel dengan data baris demi baris
    data.forEach(row => {
      const tr = document.createElement('tr');

      columns.forEach(c => {
        const td = document.createElement('td');
        td.textContent = row[c] ?? ''; // Jika kosong, tampilkan string kosong
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });

    // Tampilkan wrapper tabel
    wrapper.style.display = 'block';
  }

  // ==================================
  // FUNGSI MEMBACA FILE CSV (PapaParse)
  // ==================================
  function parseCSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,             // Baris pertama sebagai header
        skipEmptyLines: true,     // Abaikan baris kosong
        complete: res => resolve(res.data), // Kembalikan data hasil parsing
        error: err => reject(err)
      });
    });
  }

  // =====================================
  // FUNGSI MEMBACA FILE EXCEL (XLSX.js)
  // =====================================
  function parseExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        const wb = XLSX.read(e.target.result, { type: 'array' }); // Baca workbook
        const ws = wb.Sheets[wb.SheetNames[0]];                   // Ambil sheet pertama
        const data = XLSX.utils.sheet_to_json(ws, { defval: "" }); // Konversi ke JSON
        resolve(data);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // =================================================
  // FUNGSI MEMUAT DATASET DARI localStorage SAAT REFRESH
  // =================================================
  function loadFromStorage() {

    const storedData = localStorage.getItem('datasetRaw');
    const storedColumns = localStorage.getItem('datasetColumns');

    // Jika dataset pernah diupload sebelumnya
    if (storedData && storedColumns) {
      window.datasetRaw = JSON.parse(storedData);
      window.datasetColumns = JSON.parse(storedColumns);

      if (window.datasetRaw.length > 0) {

        // Tampilkan kembali dataset ke tabel
        renderTable(window.datasetRaw, window.datasetColumns);

        // Update form analisis & prediksi
        if (typeof window.populateVariables === 'function') window.populateVariables();
        if (typeof window.populatePrediksiForm === 'function') window.populatePrediksiForm();
        if (typeof window.updatePrediksiPlaceholder === 'function') window.updatePrediksiPlaceholder();
      }
    }
  }

  // ===========================================
  // EVENT SAAT FORM UPLOAD DI-SUBMIT
  // ===========================================
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Cegah submit ke server Laravel

    const file = fileInput.files[0];

    // Jika tidak ada file
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Pilih file dataset terlebih dahulu!',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    // Ambil ekstensi file
    const ext = file.name.split('.').pop().toLowerCase();
    let data = [];

    // Parsing sesuai tipe file
    if (ext === 'csv') {
      data = await parseCSV(file);
    } else if (ext === 'xlsx' || ext === 'xls') {
      data = await parseExcel(file);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Format tidak didukung',
        text: 'Gunakan CSV/XLSX/XLS!',
        confirmButtonColor: '#d33'
      });
      return;
    }

    // Jika dataset berhasil dibaca
    if (data.length > 0) {

      // Ambil nama kolom otomatis
      const columns = Object.keys(data[0]);

      // Tampilkan dataset ke tabel
      renderTable(data, columns);

      // Simpan dataset ke global window
      window.datasetRaw = data;
      window.datasetColumns = columns;

      // Simpan ke localStorage
      localStorage.setItem('datasetRaw', JSON.stringify(data));
      localStorage.setItem('datasetColumns', JSON.stringify(columns));

      // Update form analisis & prediksi
      if (typeof window.populateVariables === 'function') window.populateVariables();
      if (typeof window.populatePrediksiForm === 'function') window.populatePrediksiForm();
      if (typeof window.updatePrediksiPlaceholder === 'function') window.updatePrediksiPlaceholder();

      // Alert sukses upload
      Swal.fire({
        icon: 'success',
        title: 'Dataset Berhasil Diupload',
        showConfirmButton: false,
        timer: 2000
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Dataset kosong',
        text: 'Dataset kosong atau tidak terbaca!',
        confirmButtonColor: '#d33'
      });
    }
  });

  // ====================================
  // SAAT HALAMAN PERTAMA KALI DIMUAT
  // ====================================
  document.addEventListener("DOMContentLoaded", function () {

    // Muat dataset dari localStorage
    loadFromStorage();

    // Tombol hapus dataset
    const deleteBtn = document.getElementById("deleteDataset");

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {

        // Konfirmasi hapus dataset
        Swal.fire({
          title: 'Apakah Anda yakin?',
          text: "Apakah Anda yakin ingin menghapus dataset?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal'
        }).then((result) => {

          if (result.isConfirmed) {

            // Bersihkan tabel
            document.querySelector("#datasetTable thead tr").innerHTML = "";
            document.querySelector("#datasetTable tbody").innerHTML = "";
            wrapper.style.display = "none";
            fileInput.value = "";

            // Reset data global
            window.datasetRaw = [];
            window.datasetColumns = [];

            // Hapus dari localStorage
            localStorage.removeItem('datasetRaw');
            localStorage.removeItem('datasetColumns');

            // Update form analisis & prediksi
            if (typeof window.populateVariables === 'function') window.populateVariables();
            if (typeof window.populatePrediksiForm === 'function') window.populatePrediksiForm();
            if (typeof window.updatePrediksiPlaceholder === 'function') window.updatePrediksiPlaceholder();

            // Alert sukses hapus
            Swal.fire({
              icon: 'success',
              title: 'Dataset Berhasil Dihapus',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
      });
    }
  });
})();
