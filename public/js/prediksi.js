(() => {
  const form = document.getElementById("prediksiForm");
  const ySelect = document.getElementById("pred_y_var");
  const xWrapper = document.getElementById("pred_x_inputs");

  const showPredBtn = document.getElementById("showPredBtn");
  const placeholder = document.getElementById("prediksiPlaceholder");
  const message = document.getElementById("prediksiMessage");
  const resultContainer = document.getElementById("prediksiResult");

  const bulanID = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
  ];
  const bulanToIdx = {};
  bulanID.forEach((b, i) => bulanToIdx[b] = i);

  let predChart = null; // simpan chart supaya bisa destroy ulang

  function clearForm() {
    ySelect.innerHTML = "";
    xWrapper.innerHTML = "";
  }

  function populatePrediksiForm() {
    clearForm();
    if (!window.datasetColumns || window.datasetColumns.length === 0) return;

    window.datasetColumns.forEach(col => {
      const opt = document.createElement("option");
      opt.value = col;
      opt.textContent = col;
      ySelect.appendChild(opt);
    });

    window.datasetColumns.forEach(col => {
      const div = document.createElement("div");
      div.classList.add("form-check", "mb-2");

      const input = document.createElement("input");
      input.type = "checkbox";
      input.className = "form-check-input";
      input.id = "x_" + col;
      input.value = col;

      const label = document.createElement("label");
      label.className = "form-check-label ms-2";
      label.htmlFor = "x_" + col;
      label.textContent = col;

      div.appendChild(input);
      div.appendChild(label);
      xWrapper.appendChild(div);
    });
  }

  function updatePlaceholder() {
    if (window.datasetRaw && window.datasetRaw.length > 0) {
      message.textContent = "Silahkan isi variabel untuk melakukan prediksi";
      showPredBtn.disabled = false;
      showPredBtn.classList.remove("btn-secondary");
      showPredBtn.classList.add("btn-success");
    } else {
      message.textContent = "Silahkan unggah dataset terlebih dahulu";
      showPredBtn.disabled = true;
      showPredBtn.classList.remove("btn-success");
      showPredBtn.classList.add("btn-secondary");
      form.style.display = "none";
      placeholder.style.display = "block";
    }
  }

  function printPrediksi(hasil) {
    if (!hasil || hasil.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Tidak ada hasil prediksi untuk dicetak!",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    const forecastLabel = hasil[0]?.forecast_label || "Forecasting";

    let tableHtml = `
      <table>
        <thead>
          <tr>
            <th>Tahun</th>
            <th>Bulan</th>
            <th>${forecastLabel}</th>
          </tr>
        </thead>
        <tbody>`;
    hasil.forEach(r => {
      tableHtml += `
        <tr>
          <td>${r.tahun}</td>
          <td>${r.bulan}</td>
          <td>${r.forecast.toFixed(2)}</td>
        </tr>`;
    });
    tableHtml += `</tbody></table>`;

    const w = window.open('', '', 'height=800,width=1000');
    w.document.write('<html><head><title>Cetak Hasil Prediksi</title>');
    w.document.write('<style>');
    w.document.write('body{font-family:Arial, sans-serif; margin:20px;}');
    w.document.write('h3{text-align:center; margin-bottom:20px;}');
    w.document.write('table{width:100%;border-collapse:collapse;font-size:14px;}');
    w.document.write('th,td{border:1px solid #000;padding:6px 10px;text-align:center;}');
    w.document.write('thead{display:table-header-group;}');
    w.document.write('tr{page-break-inside:avoid;}');
    w.document.write('</style>');
    w.document.write('</head><body>');
    w.document.write('<h3>Hasil Prediksi Regresi Linier Berganda</h3>');
    w.document.write(tableHtml);
    w.document.write('</body></html>');
    w.document.close();
    w.focus();
    w.print();
    w.close();
  }

  function renderPrediksi(hasil) {
    document.getElementById("prediksiResultWrapper").style.display = "block";
    resultContainer.innerHTML = "";

    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm prediksi-result";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h3");
    title.className = "card-title text-center mb-4";
    title.textContent = "Hasil Prediksi Regresi Linier Berganda";
    cardBody.appendChild(title);

    const btnWrapper = document.createElement("div");
    btnWrapper.className = "d-flex flex-wrap justify-content-center gap-2 mb-4";

    const chartBtn = document.createElement("button");
    chartBtn.className = "btn btn-primary btn-sm";
    chartBtn.textContent = "Chart";

    const tableBtn = document.createElement("button");
    tableBtn.className = "btn btn-success btn-sm";
    tableBtn.textContent = "Tabel";

    const evalBtn = document.createElement("button");
    evalBtn.className = "btn btn-warning btn-sm";
    evalBtn.textContent = "Evaluasi Model";

    const cetakBtn = document.createElement("button");
    cetakBtn.className = "btn btn-secondary btn-sm";
    cetakBtn.textContent = "Cetak PDF";

    const resetBtn = document.createElement("button");
    resetBtn.className = "btn btn-danger btn-sm";
    resetBtn.textContent = "Hapus Hasil";

    [chartBtn, tableBtn, evalBtn, cetakBtn, resetBtn].forEach(btn => btnWrapper.appendChild(btn));
    cardBody.appendChild(btnWrapper);

    const chartDiv = document.createElement("div");
    chartDiv.id = "predChart";
    chartDiv.style.display = "none";

    const tableDiv = document.createElement("div");
    tableDiv.id = "predTable";

    const evalDiv = document.createElement("div");
    evalDiv.id = "predEval";
    evalDiv.style.display = "none";

    cardBody.appendChild(chartDiv);
    cardBody.appendChild(tableDiv);
    cardBody.appendChild(evalDiv);

    card.appendChild(cardBody);
    resultContainer.appendChild(card);

    const forecastLabel = hasil[0]?.forecast_label || "Forecasting";

    let html = `<div style="max-height:400px;overflow-y:auto;">
      <table class="table table-bordered">
        <thead><tr><th>Tahun</th><th>Bulan</th><th>${forecastLabel}</th></tr></thead><tbody>`;
    hasil.forEach(r => {
      html += `<tr>
        <td>${r.tahun}</td><td>${r.bulan}</td>
        <td>${r.forecast.toFixed(2)}</td>
      </tr>`;
    });
    html += "</tbody></table></div>";
    tableDiv.innerHTML = html;

    chartBtn.addEventListener("click", () => {
      chartDiv.style.display = "block";
      tableDiv.style.display = "none";
      evalDiv.style.display = "none";

      if (predChart) {
        predChart.data.labels = hasil.map(r => `${r.bulan} ${r.tahun}`);
        predChart.data.datasets[0].data = hasil.map(r => r.forecast);
        predChart.data.datasets[1].data = hasil.map(r => r.batas_atas);
        predChart.data.datasets[2].data = hasil.map(r => r.batas_bawah);
        predChart.update();
        return;
      }

      chartDiv.innerHTML = "";
      const ctx = document.createElement("canvas");
      chartDiv.appendChild(ctx);

      predChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: hasil.map(r => `${r.bulan} ${r.tahun}`),
          datasets: [
            { label: forecastLabel, data: hasil.map(r => r.forecast), borderColor: "blue", borderWidth: 2, tension: 0.2, fill: false },
            { label: "Batas Atas", data: hasil.map(r => r.batas_atas), borderColor: "red", borderDash: [5,5], fill: false },
            { label: "Batas Bawah", data: hasil.map(r => r.batas_bawah), borderColor: "green", borderDash: [5,5], fill: false }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            y: {
              beginAtZero: false,
              suggestedMin: Math.min(...hasil.map(r => r.batas_bawah)) * 0.95,
              suggestedMax: Math.max(...hasil.map(r => r.batas_atas)) * 1.05,
              ticks: { callback: value => value.toLocaleString("id-ID") }
            }
          },
          plugins: { legend: { display: true }, tooltip: { enabled: true } }
        }
      });
    });

    tableBtn.addEventListener("click", () => {
      chartDiv.style.display = "none";
      tableDiv.style.display = "block";
      evalDiv.style.display = "none";
    });

    evalBtn.addEventListener("click", () => {
      chartDiv.style.display = "none";
      tableDiv.style.display = "none";
      evalDiv.style.display = "block";

      const dataAktual2024 = window.datasetRaw.filter(d => Number(d.Tahun) === 2024);
      if (dataAktual2024.length === 0) {
        evalDiv.innerHTML = "<p class='text-danger'>Data aktual tahun 2024 tidak tersedia.</p>";
        return;
      }

      let totalAPE = 0, count = 0;
      let tableHtml = `<table class="table table-bordered">
        <thead><tr><th>Bulan</th><th>Aktual</th><th>Prediksi</th><th>Error</th><th>|Error|</th><th>APE (%)</th></tr></thead><tbody>`;

      hasil.forEach((h, idx) => {
        const dataRow = dataAktual2024[idx];
        if (!dataRow) return;
        const At = parseFloat(dataRow[ySelect.value].toString().replace(",", "."));
        const Ft = parseFloat(h.forecast);
        const error = At - Ft;
        const ape = Math.abs(error) / At;
        totalAPE += ape;
        count++;
        tableHtml += `<tr>
          <td>${dataRow.Bulan} ${dataRow.Tahun}</td>
          <td>${At.toFixed(2)}</td>
          <td>${Ft.toFixed(2)}</td>
          <td>${error.toFixed(2)}</td>
          <td>${Math.abs(error).toFixed(2)}</td>
          <td>${(ape*100).toFixed(2)}%</td>
        </tr>`;
      });

      tableHtml += "</tbody></table>";
      const mape = count > 0 ? (totalAPE / count) * 100 : 0;
      evalDiv.innerHTML = `
        <h5>Evaluasi Model (MAPE)</h5>
        ${tableHtml}
        <p><b>MAPE = ${mape.toFixed(2)}%</b></p>
        <p>Interpretasi: Nilai MAPE &lt; 10% = sangat akurat, 10–20% = baik, 20–50% = wajar, &gt;50% = buruk.</p>`;
    });

    cetakBtn.addEventListener("click", () => printPrediksi(hasil));

    resetBtn.addEventListener("click", () => {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Ingin menghapus hasil prediksi?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("prediksiResultWrapper").style.display = "none";
          resultContainer.innerHTML = "";
          if (predChart) { predChart.destroy(); predChart = null; }
          localStorage.removeItem("prediksiHasil");
          localStorage.removeItem("prediksiYVar");
          placeholder.style.display = "block";
          form.style.display = "none";

          Swal.fire({
            icon: "success",
            title: "Hasil Prediksi Berhasil Dihapus",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    });
  }

  window.populatePrediksiForm = function () {
    populatePrediksiForm();
    updatePlaceholder();
  };
  window.updatePrediksiPlaceholder = updatePlaceholder;

  document.addEventListener("DOMContentLoaded", function () {
    updatePlaceholder();

    showPredBtn.addEventListener("click", function () {
      placeholder.style.display = "none";
      form.style.display = "block";
      populatePrediksiForm();
    });

    const startMonth = document.getElementById("pred_start_month");
    const endMonth = document.getElementById("pred_end_month");
    [startMonth, endMonth].forEach(el => {
      el.addEventListener("change", () => {
        if (startMonth.value && endMonth.value && startMonth.value > endMonth.value) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Bulan akhir tidak boleh lebih kecil dari bulan mulai!",
            confirmButtonColor: "#d33"
          });
          endMonth.value = "";
        }
      });
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const y_var = ySelect.value;
      const x_vars = [...xWrapper.querySelectorAll("input:checked")].map(i => i.value);
      const start_month = document.getElementById("pred_start_month").value + "-01";
      const end_month = document.getElementById("pred_end_month").value + "-01";

      // ✅ Validasi Y
      if (!y_var) { 
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Pilih variabel Y terlebih dahulu!",
          confirmButtonColor: "#3085d6"
        });
        return; 
      }

      // ✅ Validasi minimal 1 variabel X
      if (x_vars.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Pilih variabel dependen dan independen, serta estimasi prediksi",
          confirmButtonColor: "#3085d6"
        });
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/prediksi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dataset: window.datasetRaw, y_var, x_vars, start_month, end_month })
      });

      const hasil = await response.json();
      if (hasil.error) { 
        Swal.fire({
          icon: "error",
          title: "Terjadi Error",
          text: hasil.error,
          confirmButtonColor: "#d33"
        });
        console.error(hasil.trace); 
        return; 
      }
      renderPrediksi(hasil);
      localStorage.setItem("prediksiHasil", JSON.stringify(hasil));
      localStorage.setItem("prediksiYVar", y_var);

      // ✅ SweetAlert sukses prediksi
      Swal.fire({
        icon: "success",
        title: "Prediksi Berhasil Dilakukan",
        showConfirmButton: false,
        timer: 2000
      });
    });

    const savedPrediksi = localStorage.getItem("prediksiHasil");
    if (savedPrediksi) {
      const hasil = JSON.parse(savedPrediksi);
      renderPrediksi(hasil);
      form.style.display = "block";
      placeholder.style.display = "none";
      const savedYVar = localStorage.getItem("prediksiYVar");
      if (savedYVar) ySelect.value = savedYVar;
    }
  });
})();
