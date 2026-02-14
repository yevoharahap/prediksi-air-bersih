(() => {
  const form = document.getElementById("analisisForm");
  const ySelect = document.getElementById("y_var");
  const xWrapper = document.getElementById("x_var_checkboxes");
  const resultWrapper = document.getElementById("analisisResult");

  let chartInstances = [];
  const STORAGE_KEY = "spab_hasil_analisis_v1"; // key localStorage

  function clearResult() {
    resultWrapper.innerHTML = "";
    chartInstances.forEach((ch) => {
      try { ch.destroy(); } catch (e) { }
    });
    chartInstances = [];
  }

  // helper formatting
  function fmt(n, d = 3) {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return "-";
    return Number(n).toFixed(d);
  }
  function fmtP(p) {
    if (p === null || p === undefined || Number.isNaN(Number(p))) return "-";
    if (p < 0.001) return "<0.001";
    return Number(p).toFixed(3);
  }

  // --- Chart: summary (R2 & AdjR2) ---
  function renderSummaryChart(ms) {
    if (typeof Chart === "undefined") {
      const warn = document.createElement("div");
      warn.className = "alert alert-warning";
      warn.textContent = "Chart.js belum dimuat — grafik summary tidak dapat ditampilkan.";
      return warn;
    }

    const wrapper = document.createElement("div");
    wrapper.style.height = "220px";
    const canvas = document.createElement("canvas");
    canvas.style.maxHeight = "100%";
    wrapper.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const r2val = Number(ms.R2) || 0;
    const adjR2val = Number(ms.AdjR2) || 0;
    const data = [r2val, adjR2val];

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["R²", "Adjusted R²"],
        datasets: [{
          label: "Nilai",
          data,
          backgroundColor: ["#4e73df", "#4e73df"],
          borderColor: ["#3753b6", "#3753b6"],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, title: { display: true, text: "Model Summary (Kekuatan Model Regresi)" } },
        scales: { y: { beginAtZero: true, max: 1 } }
      }
    });

    chartInstances.push(chart);
    return wrapper;
  }

  // --- Chart: coefficients ---
  function renderCoefficientChart(coefficients) {
    if (typeof Chart === "undefined") {
      const warn = document.createElement("div");
      warn.className = "alert alert-warning";
      warn.textContent = "Chart.js belum dimuat — grafik koefisien tidak dapat ditampilkan.";
      return warn;
    }

    const wrapper = document.createElement("div");
    wrapper.style.height = "220px";
    const canvas = document.createElement("canvas");
    canvas.style.maxHeight = "100%";
    wrapper.appendChild(canvas);

    const labels = coefficients.filter(c => c.Variable !== "const").map(c => c.Variable);
    const values = coefficients.filter(c => c.Variable !== "const").map(c => Number(c.B) || 0);

    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Koefisien (B)",
          data: values,
          backgroundColor: values.map(v => v >= 0 ? "rgba(0, 177, 115, 0.6)" : "rgba(255,99,132,0.6)"),
          borderColor: values.map(v => v >= 0 ? "rgba(2, 167, 71, 1)" : "rgba(255,99,132,1)"),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, title: { display: true, text: "Koefisien Regresi (Pengaruh Variabel Independen)" } },
        scales: { y: { beginAtZero: false } }
      }
    });

    chartInstances.push(chart);
    return wrapper;
  }

  // --- Interpretasi naratif ---
  function renderInterpretasi(results) {
    const div = document.createElement("div");
    div.className = "mt-3";
    const ms = results.ModelSummary || {};
    const a = results.ANOVA || {};
    const coefs = results.Coefficients || [];

    // 1. Model Summary (dijelaskan detail)
    let s = `<h5 class="fw-bold mt-3 text-center">Model Summary</h5>`;
    s += `<p>Tabel ini berisi ringkasan kekuatan dan kualitas model regresi.</p>`;
    s += `<p><b>R</b> = ${fmt(ms.R, 3)} — korelasi antara variabel independen dan dependen. Nilai mendekati 1 berarti hubungan semakin kuat.</p>`;
    s += `<p><b>R²</b> = ${fmt(ms.R2, 3)} — koefisien determinasi: sekitar ${(Number(ms.R2 || 0) * 100).toFixed(1)}% variasi Y dapat dijelaskan oleh X. Sisanya dipengaruhi faktor lain di luar model.</p>`;
    s += `<p><b>Adjusted R²</b> = ${fmt(ms.AdjR2, 3)} — R² yang dikoreksi untuk jumlah prediktor (berguna saat membandingkan model dengan jumlah X berbeda).</p>`;
    s += `<p><b>Std. Error of the Estimate</b> = ${fmt(ms.StdError, 3)} — perkiraan standar deviasi error; nilai lebih kecil menunjukkan estimasi yang lebih presisi.</p>`;

    // 2. ANOVA (dijelaskan detail)
    s += `<h5 class="fw-bold mt-3 text-center">ANOVA (Analysis of Variance)</h5>`;
    s += `<p>Bagian ini menguji apakah model regresi secara keseluruhan signifikan.</p>`;
    if (a.Regression) {
      s += `<p>Sum of Squares dikelompokkan menjadi Regression (${fmt(a.Regression.SS, 3)}) dan Residual (${fmt(a.Residual ? a.Residual.SS : null, 3)}).<br>`;
      s += `Derajat kebebasan: regression = ${a.Regression.df}, residual = ${a.Residual ? a.Residual.df : "-"}.</p>`;
      s += `<p>Mean Square = SS / df; F = ${fmt(a.Regression.F, 3)}; Sig. (p-value) = ${fmtP(a.Regression.Sig)}.</p>`;
      if (a.Regression.Sig !== null && a.Regression.Sig !== undefined) {
        if (Number(a.Regression.Sig) < 0.05) {
          s += `<p>Karena p < 0.05, model regresi secara keseluruhan dinyatakan signifikan. Artinya variabel independen yang dipilih bersama-sama berpengaruh terhadap variabel dependen.</p>`;
        } else {
          s += `<p>Karena p ≥ 0.05, model regresi secara keseluruhan tidak signifikan. Artinya variabel independen bersama-sama tidak cukup menjelaskan variasi Y.</p>`;
        }
      }
    } else {
      s += `<p>ANOVA tidak tersedia.</p>`;
    }

    // 3. Coefficients (dijelaskan detail)
    s += `<h5 class="fw-bold mt-3 text-center">Coefficients</h5>`;
    if (coefs.length > 0) {
      // Persamaan regresi
      const intercept = coefs.find(c => c.Variable === "const")?.B || 0;
      let eq = `Y = ${fmt(intercept, 3)}`;
      coefs.filter(c => c.Variable !== "const").forEach(c => {
        eq += ` ${c.B >= 0 ? "+" : "-"} ${fmt(Math.abs(c.B), 3)}*${c.Variable}`;
      });
      s += `<p>Persamaan regresi: <code>${eq}</code></p>`;

      // Penjelasan tiap variabel
      coefs.filter(c => c.Variable !== "const").forEach(c => {
        const sign = c.B >= 0 ? "positif" : "negatif";
        const effect = c.B >= 0 ? "meningkatkan" : "menurunkan";
        const significance = (c.Sig !== null && c.Sig !== undefined && Number(c.Sig) < 0.05) ? "berpengaruh signifikan" : "tidak signifikan secara statistik";
        s += `<p><b>${c.Variable}</b>: koefisien B = ${fmt(c.B, 3)} (${sign}). Artinya setiap kenaikan 1 unit ${c.Variable} akan ${effect} Y sebesar ${fmt(Math.abs(c.B), 3)} unit (asumsi variabel lain tetap). Nilai t = ${fmt(c.t, 3)}, p = ${fmtP(c.Sig)} → ${significance}.</p>`;
      });

      s += `<p>Standardized Coefficients (Beta) pada tabel membantu membandingkan pengaruh relatif antar variabel yang memiliki skala berbeda.</p>`;
    } else {
      s += `<p>Koefisien regresi tidak tersedia.</p>`;
    }

    div.innerHTML = s;
    return div;
  }

  // --- Print helper ---
  function printCardElement(card) {
    try {
      const originalBody = card.querySelector('.card-body');
      if (!originalBody) {
        Swal.fire({ icon: 'error', title: 'Oops...', text: 'Konten tidak ditemukan untuk dicetak!' });
        return;
      }

      const cloneBody = originalBody.cloneNode(true);
      const origCanvases = originalBody.querySelectorAll('canvas');
      const cloneCanvases = cloneBody.querySelectorAll('canvas');
      cloneBody.querySelectorAll('.no-print').forEach(el => el.remove());

      origCanvases.forEach((origCanvas, idx) => {
        try {
          const dataUrl = origCanvas.toDataURL('image/png');
          const img = document.createElement('img');
          img.src = dataUrl;
          img.style.maxWidth = '100%';
          img.style.display = 'block';
          if (cloneCanvases[idx] && cloneCanvases[idx].parentNode) {
            cloneCanvases[idx].parentNode.replaceChild(img, cloneCanvases[idx]);
          } else {
            cloneBody.appendChild(img);
          }
        } catch (e) {
          console.warn("Gagal konversi canvas ke gambar:", e);
        }
      });

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        Swal.fire({ icon: 'error', title: 'Popup diblokir', text: 'Mohon izinkan popup untuk mencetak.' });
        return;
      }
      printWindow.document.open();
      printWindow.document.write('<!doctype html><html><head><meta charset="utf-8"><title>Cetak Analisis</title>');
      printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
      printWindow.document.write('<style>body{padding:20px;font-family:Arial,Helvetica,sans-serif;} table{width:100%;border-collapse:collapse;} code{background:#f8f9fa;padding:2px 4px;border-radius:4px;display:inline-block;}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(cloneBody.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      const doPrint = () => {
        try {
          printWindow.focus();
          printWindow.print();
        } catch (e) {
          console.warn("Print failed:", e);
        }
      };

      const imgs = printWindow.document.images;
      if (!imgs || imgs.length === 0) {
        setTimeout(doPrint, 300);
      } else {
        let loaded = 0;
        for (let i = 0; i < imgs.length; i++) {
          imgs[i].onload = imgs[i].onerror = () => {
            loaded++;
            if (loaded === imgs.length) doPrint();
          };
        }
        setTimeout(() => { try { doPrint(); } catch (e) { } }, 3000);
      }
    } catch (e) {
      console.warn("Error saat mempersiapkan cetak:", e);
      Swal.fire({ icon: 'error', title: 'Terjadi Kesalahan', text: 'Saat menyiapkan cetak.' });
    }
  }

  // --- createCard ---
  function createCard(title, content) {
    const card = document.createElement("div");
    card.className = "card shadow-sm mb-4";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const actions = document.createElement("div");
    actions.className = "d-flex justify-content-end mb-3 gap-2";

    const printBtn = document.createElement("button");
    printBtn.type = "button";
    printBtn.className = "btn btn-primary no-print";
    printBtn.innerHTML = '<i class="fa fa-print me-1"></i> Cetak';

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "btn btn-danger no-print";
    delBtn.innerHTML = '<i class="fa fa-trash me-1"></i> Hapus';

    actions.appendChild(printBtn);
    actions.appendChild(delBtn);

    if (title) {
      const h5 = document.createElement("h5");
      h5.className = "card-title mb-3 fw-bold text-center";
      h5.textContent = title;
      cardBody.appendChild(h5);
    }

    cardBody.appendChild(actions);
    cardBody.appendChild(content);
    card.appendChild(cardBody);

    printBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      printCardElement(card);
    });

    // ✅ Konfirmasi hapus dengan SweetAlert
    delBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Ingin menghapus hasil analisis?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem(STORAGE_KEY);
          card.remove();
          clearResult();
          Swal.fire({
            icon: "success",
            title: "Hasil analisis berhasil dihapus",
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    });

    return card;
  }

  // --- Build layout and render (single card) ---
  function renderAnalisisCard(results) {
    const root = document.createElement("div");

    const row = document.createElement("div");
    row.className = "row";

    const leftCol = document.createElement("div");
    leftCol.className = "col-md-6";

    const rightCol = document.createElement("div");
    rightCol.className = "col-md-6";

    // Left tables
    if (results.ModelSummary) {
      const ms = results.ModelSummary;
      const msHtml = document.createElement("div");
      msHtml.innerHTML = `
        <h6 class="fw-bold text-center mb-2">Model Summary</h6>
        <table class="table table-bordered table-sm text-center align-middle mb-3">
          <thead class="table-light">
            <tr><th>R</th><th>R Square</th><th>Adjusted R Square</th><th>Std. Error</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>${fmt(ms.R, 3)}</td>
              <td>${fmt(ms.R2, 3)}</td>
              <td>${fmt(ms.AdjR2, 3)}</td>
              <td>${fmt(ms.StdError, 3)}</td>
            </tr>
          </tbody>
        </table>
      `;
      leftCol.appendChild(msHtml);
    }

    if (results.ANOVA) {
      const a = results.ANOVA;
      const anovaHtml = document.createElement("div");
      anovaHtml.innerHTML = `
        <h6 class="fw-bold text-center mb-2">ANOVA</h6>
        <div class="table-responsive">
          <table class="table table-bordered table-sm text-center align-middle mb-3">
            <thead class="table-light">
              <tr>
                <th>Model</th>
                <th>Sum of Squares</th>
                <th>df</th>
                <th>Mean Square</th>
                <th>F</th>
                <th>Sig.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Regression</td>
                <td>${fmt(a.Regression ? a.Regression.SS : null, 3)}</td>
                <td>${a.Regression ? a.Regression.df : "-"}</td>
                <td>${fmt(a.Regression ? a.Regression.MS : null, 3)}</td>
                <td>${fmt(a.Regression ? a.Regression.F : null, 3)}</td>
                <td>${fmtP(a.Regression ? a.Regression.Sig : null)}</td>
              </tr>
              <tr>
                <td>Residual</td>
                <td>${fmt(a.Residual ? a.Residual.SS : null, 3)}</td>
                <td>${a.Residual ? a.Residual.df : "-"}</td>
                <td>${fmt(a.Residual ? a.Residual.MS : null, 3)}</td>
                <td></td><td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td>${fmt(a.Total ? a.Total.SS : null, 3)}</td>
                <td>${a.Total ? a.Total.df : "-"}</td>
                <td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      leftCol.appendChild(anovaHtml);
    }

    if (results.Coefficients) {
      const rows = results.Coefficients.map(r => `
        <tr>
          <td>${r.Variable}</td>
          <td>${fmt(r.B, 3)}</td>
          <td>${fmt(r.StdError, 3)}</td>
          <td>${r.Beta !== null && r.Beta !== undefined ? fmt(r.Beta, 3) : ""}</td>
          <td>${fmt(r.t, 3)}</td>
          <td>${fmtP(r.Sig)}</td>
        </tr>
      `).join("");
      const coefHtml = document.createElement("div");
      coefHtml.innerHTML = `
        <h6 class="fw-bold text-center mb-2">Coefficients</h6>
        <div class="table-responsive"><table class="table table-bordered table-sm text-center align-middle">
          <thead class="table-light">
            <tr><th>Variable</th><th>B</th><th>Std. Error</th><th>Beta</th><th>t</th><th>Sig.</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table></div>
      `;
      leftCol.appendChild(coefHtml);
    }

    // Right: charts
    const chartsWrapper = document.createElement("div");
    chartsWrapper.className = "mb-3";

    if (results.ModelSummary) {
      chartsWrapper.appendChild(renderSummaryChart(results.ModelSummary));
    }

    const gap = document.createElement("div");
    gap.style.height = "12px";
    chartsWrapper.appendChild(gap);

    if (results.Coefficients) {
      chartsWrapper.appendChild(renderCoefficientChart(results.Coefficients));
    }

    rightCol.appendChild(chartsWrapper);

    row.appendChild(leftCol);
    row.appendChild(rightCol);
    root.appendChild(row);

    // Interpretation
    const interp = renderInterpretasi(results);
    root.appendChild(interp);

    // create card
    const card = createCard("Hasil Analisis Regresi Linier", root);
    resultWrapper.appendChild(card);
  }

  // --- helper for selecting X ---
  function getSelectedX() {
    return Array.from(document.querySelectorAll("#x_var_checkboxes input[type=checkbox]:checked")).map(cb => cb.value);
  }

  // --- populate variables (used by dataset.js) ---
  function populateVariables() {
    if (!ySelect || !xWrapper) return;
    ySelect.innerHTML = "";
    xWrapper.innerHTML = "";
    if (!window.datasetColumns || window.datasetColumns.length === 0) return;

    window.datasetColumns.forEach(col => {
      const opt = document.createElement("option");
      opt.value = col;
      opt.textContent = col;
      ySelect.appendChild(opt);
    });

    window.datasetColumns.forEach(col => {
      const div = document.createElement("div");
      div.classList.add("form-check", "mb-1");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input";
      checkbox.name = "x_var";
      checkbox.value = col;
      checkbox.id = "x_" + col;
      const label = document.createElement("label");
      label.className = "form-check-label";
      label.setAttribute("for", "x_" + col);
      label.textContent = col;
      div.appendChild(checkbox);
      div.appendChild(label);
      xWrapper.appendChild(div);
    });
  }

  if (!window.populateVariables) {
    window.populateVariables = populateVariables;
  }

  // --- submit handler ---
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearResult();

      if (!window.datasetRaw || !window.datasetColumns) {
        Swal.fire({ icon: "warning", title: "Upload dataset terlebih dahulu!" });
        return;
      }

      const y = ySelect.value;
      const x = getSelectedX();
      if (!y || x.length === 0) {
        Swal.fire({ icon: "warning", title: "Pilih variabel dependen dan independen!" });
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:5000/analisis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ y, X: x, data: window.datasetRaw })
        });
        const json = await res.json();
        if (json.error) {
          resultWrapper.innerHTML = `<div class="alert alert-danger">Error: ${json.error}</div>`;
          return;
        }
        const results = (json.results && json.results[y]) ? json.results[y] : (json.results || {});
        renderAnalisisCard(results);

        try {
          const payloadToSave = { y, x, results };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payloadToSave));
        } catch (err) {
          console.warn("Gagal menyimpan ke localStorage:", err);
        }

        // ✅ Popup sukses analisis
        Swal.fire({
          icon: "success",
          title: "Analisis Regresi Linier Berhasil Dilakukan",
          showConfirmButton: false,
          timer: 2000
        });

      } catch (err) {
        resultWrapper.innerHTML = `<div class="alert alert-danger">Gagal memanggil API: ${err.message}</div>`;
      }
    });
  }

  // --- on DOM ready ---
  document.addEventListener("DOMContentLoaded", function () {
    const placeholder = document.getElementById("analisisPlaceholder");
    const message = document.getElementById("analisisMessage");
    const showVarBtn = document.getElementById("showVarBtn");
    const analisisForm = document.getElementById("analisisForm");

    function updateAnalisisPlaceholder() {
      if (window.datasetRaw && window.datasetRaw.length > 0) {
        message.textContent = "Silahkan pilih variabel untuk melakukan analisis";
        showVarBtn.disabled = false;
        showVarBtn.classList.remove("btn-secondary");
        showVarBtn.classList.add("enabled", "btn-primary");
      } else {
        message.textContent = "Silahkan Unggah Dataset Terlebih dahulu";
        showVarBtn.disabled = true;
        showVarBtn.classList.remove("enabled", "btn-primary");
        showVarBtn.classList.add("btn-secondary");
        analisisForm.style.display = "none";
        placeholder.style.display = "block";
      }
    }

    updateAnalisisPlaceholder();

    showVarBtn.addEventListener("click", function () {
      placeholder.style.display = "none";
      analisisForm.style.display = "block";
    });

    const originalPopulate = window.populateVariables && window.populateVariables !== populateVariables ? window.populateVariables : null;
    window.populateVariables = function () {
      try {
        if (typeof originalPopulate === "function") originalPopulate();
      } catch (e) { }
      try { populateVariables(); } catch (e) { }
      try { updateAnalisisPlaceholder(); } catch (e) { }
      tryRestoreSavedAnalysis();
    };

    function tryRestoreSavedAnalysis() {
      let savedRaw;
      try {
        savedRaw = localStorage.getItem(STORAGE_KEY);
        if (!savedRaw) return;
      } catch (e) {
        return;
      }

      let saved;
      try {
        saved = JSON.parse(savedRaw);
      } catch (e) {
        return;
      }
      if (!saved || !saved.results) return;

      let attempts = 0;
      const maxAttempts = 30;
      const interval = setInterval(() => {
        attempts++;
        const hasYOptions = ySelect && ySelect.options && ySelect.options.length > 0;
        const hasXChecks = xWrapper && xWrapper.querySelectorAll("input[type=checkbox]").length > 0;

        if (hasYOptions && hasXChecks) {
          if (analisisForm && analisisForm.style.display === "none") {
            try { showVarBtn.click(); } catch (e) { analisisForm.style.display = "block"; }
          }

          try {
            if (saved.y && Array.from(ySelect.options).some(o => o.value === saved.y)) {
              ySelect.value = saved.y;
            }
          } catch (e) { }

          try {
            const checkboxes = xWrapper.querySelectorAll("input[type=checkbox]");
            checkboxes.forEach(cb => {
              cb.checked = saved.x && Array.isArray(saved.x) && saved.x.includes(cb.value);
            });
          } catch (e) { }

          try {
            clearResult();
            renderAnalisisCard(saved.results);
          } catch (e) {
            console.warn("Gagal render saved results:", e);
          }

          clearInterval(interval);
        } else if (attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 200);
    }

    tryRestoreSavedAnalysis();
  });

})();
