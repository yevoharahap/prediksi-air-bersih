# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import statsmodels.api as sm
import numpy as np
import traceback
from sklearn.linear_model import LinearRegression

# --- Inisialisasi Flask ---
app = Flask(__name__)
CORS(app)  # untuk izinkan akses dari frontend


# ==============================
# Bagian dari analisis.py
# ==============================

def safe_cast_numeric(df, cols):
    """Cast kolom ke numerik dengan aman"""
    df2 = df.copy()
    errors = {}
    for c in cols:
        try:
            df2[c] = pd.to_numeric(df2[c], errors='coerce')
            if df2[c].isna().all():
                errors[c] = "Kolom tidak dapat dikonversi ke numerik (semua nilai NaN)"
        except Exception as e:
            errors[c] = str(e)
    return df2, errors


def interpret_results(summary, anova, coefs):
    """Membuat interpretasi otomatis dari hasil regresi"""
    interpretasi = {"ModelSummary": [], "ANOVA": [], "Coefficients": []}

    # --- Interpretasi Model Summary ---
    r2 = summary["R2"]
    adj_r2 = summary["AdjR2"]
    interpretasi["ModelSummary"].append(f"Nilai R² = {r2:.2f} → model menjelaskan {r2*100:.1f}% variasi data.")
    interpretasi["ModelSummary"].append(f"Nilai Adjusted R² = {adj_r2:.2f} → stabilitas model tetap baik.")

    # --- Interpretasi ANOVA ---
    sig_f = anova["Regression"]["Sig"]
    if sig_f is not None:
        if sig_f < 0.05:
            interpretasi["ANOVA"].append(
                f"Nilai Sig. F-test = {sig_f:.4f} (< 0.05) → model signifikan secara keseluruhan."
            )
        else:
            interpretasi["ANOVA"].append(
                f"Nilai Sig. F-test = {sig_f:.4f} (>= 0.05) → model tidak signifikan secara keseluruhan."
            )

    # --- Interpretasi Koefisien ---
    for c in coefs:
        if c["Variable"] == "const":
            continue
        var_name = c["Variable"]
        b = c["B"]
        p = c["Sig"]

        arah = "positif" if b > 0 else "negatif"
        signif = "signifikan" if p < 0.05 else "tidak signifikan"

        interpretasi["Coefficients"].append(
            f"{var_name} → koefisien {arah} ({b:.3f}), {signif} (p = {p:.4f})."
        )

    return interpretasi

def model_to_dict(model, x_cols, y_name):
    """Mengembalikan hasil regresi dalam format mirip SPSS"""

    # --- Model Summary ---
    r = np.sqrt(model.rsquared)
    r2 = model.rsquared
    adj_r2 = model.rsquared_adj
    std_err_est = np.sqrt(model.mse_resid)

    model_summary = {
        "R": r,
        "R2": r2,
        "AdjR2": adj_r2,
        "StdError": std_err_est,
        "predictors": ", ".join(x_cols),
        "dependent": y_name
    }

    # --- ANOVA ---
    ssr = float(model.ess)   # regression sum of squares
    sse = float(model.ssr)   # residual sum of squares
    sst = ssr + sse          # total sum of squares
    df_reg = int(model.df_model)
    df_res = int(model.df_resid)
    df_tot = df_reg + df_res

    ms_reg = ssr / df_reg if df_reg > 0 else None
    ms_res = sse / df_res if df_res > 0 else None
    f_val = model.fvalue if hasattr(model, "fvalue") else None
    sig_f = model.f_pvalue if hasattr(model, "f_pvalue") else None

    anova_table = {
        "Regression": {"SS": ssr, "df": df_reg, "MS": ms_reg, "F": f_val, "Sig": sig_f},
        "Residual": {"SS": sse, "df": df_res, "MS": ms_res},
        "Total": {"SS": sst, "df": df_tot},
        "predictors": ", ".join(x_cols),
        "dependent": y_name
    }

    # --- Coefficients ---
    betas = model.params
    std_err = model.bse
    tvals = model.tvalues
    pvals = model.pvalues

    # Standardized Coefficients (Beta)
    X_std = model.model.exog.std(axis=0)
    y_std = model.model.endog.std()
    std_coef = betas * (X_std / y_std)

    coef_table = []
    for name in betas.index:
        coef_table.append({
            "Variable": name,
            "B": betas[name],
            "StdError": std_err[name],
            "Beta": None if name == "const" else std_coef[name],
            "t": tvals[name],
            "Sig": pvals[name]
        })

    # --- Interpretasi ---
    interpretasi = interpret_results(model_summary, anova_table, coef_table)

    return {
        "ModelSummary": model_summary,
        "ANOVA": anova_table,
        "Coefficients": coef_table,
        "Interpretasi": interpretasi
    }
    # ==============================
# Endpoint Analisis Regresi
# ==============================
@app.route("/analisis", methods=["POST"])
def analisis():
    try:
        data = request.json
        df = pd.DataFrame(data["data"])
        y_var = data["y"]
        x_vars = data["X"]

        # Cast kolom ke numerik
        df, errors = safe_cast_numeric(df, [y_var] + x_vars)
        if errors:
            return jsonify({"error": f"Kolom tidak valid: {errors}"})

        # Fit model OLS
        X = sm.add_constant(df[x_vars])
        y = df[y_var]
        model = sm.OLS(y, X).fit()

        results = model_to_dict(model, x_vars, y_var)
        return jsonify({"results": {y_var: results}})
    except Exception as e:
        return jsonify({"error": str(e), "trace": traceback.format_exc()}), 500


# ==============================
# Bagian dari PREDIKSI
# ==============================
@app.route("/prediksi", methods=["POST"])
def prediksi():
    try:
        data = request.json
        dataset = pd.DataFrame(data["dataset"])
        y_var = data["y_var"]
        x_vars = data["x_vars"]
        start_month = pd.to_datetime(data["start_month"])
        end_month = pd.to_datetime(data["end_month"])

        # ==============================
        # Konversi semua kolom numerik ke float
        # ==============================
        for col in dataset.columns:
            if col not in ["Tahun", "Bulan"]:
                dataset[col] = dataset[col].astype(str).str.replace(",", ".").astype(float)

        # Reset index & buat periode t = 1,2,...,n
        dataset = dataset.reset_index(drop=True)
        dataset["periode"] = np.arange(1, len(dataset) + 1)

        # Nama bulan Indonesia
        bulanID = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        ]
        bulan_to_num = {name: idx+1 for idx, name in enumerate(bulanID)}

        # Hitung first_date dari dataset
        first_bulan = dataset['Bulan'].iloc[0].strip()
        first_date = pd.to_datetime(f"{dataset['Tahun'].iloc[0]}-{bulan_to_num[first_bulan]}-01")

        # Rentang bulan prediksi sesuai input user
        months = pd.date_range(start=start_month, end=end_month, freq="MS")
        hasil = []

        # Dataset untuk regresi
        X_time = dataset[["periode"]]

        if len(x_vars) == 0:
            # Regresi sederhana Y ~ periode
            y = dataset[y_var]
            model = LinearRegression().fit(X_time, y)

            for d in months:
                t_future = (d.year - first_date.year) * 12 + (d.month - first_date.month) + 1
                pred = model.predict(np.array([[t_future]]))[0]

                hasil.append({
                    "tahun": d.year,
                    "bulan": bulanID[d.month-1],
                    "forecast": float(pred),
                    "forecast_label": f"{y_var} (Forecasting)",
                    "batas_atas": float(pred*1.05),
                    "batas_bawah": float(pred*0.95)
                })

        else:
            # Regresi berganda Y ~ X1 + X2 + ...
            model_X = {x: LinearRegression().fit(X_time, dataset[x]) for x in x_vars}
            X_multi = dataset[x_vars]
            y = dataset[y_var]
            model_y = LinearRegression().fit(X_multi, y)

            for d in months:
                t_future = (d.year - first_date.year) * 12 + (d.month - first_date.month) + 1
                pred_x_dict = {x: float(model_X[x].predict(np.array([[t_future]]))[0]) for x in x_vars}
                future_X_array = np.array([pred_x_dict[x] for x in x_vars]).reshape(1, -1)
                y_future = model_y.predict(future_X_array)[0]

                hasil.append({
                    "tahun": d.year,
                    "bulan": bulanID[d.month-1],
                    "forecast": float(y_future),
                    "forecast_label": f"{y_var} (Forecasting)",
                    "prediksi_x": pred_x_dict,
                    "batas_atas": float(y_future*1.05),
                    "batas_bawah": float(y_future*0.95)
                })

        return jsonify(hasil)

    except Exception as e:
        import traceback
        return jsonify({"error": str(e), "trace": traceback.format_exc()}), 500


# ==============================
# Jalankan app
# ==============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
