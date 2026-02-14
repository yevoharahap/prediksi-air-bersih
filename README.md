## 💧 Clean Water Demand Prediction System (Laravel + Flask)

Web-based system for analyzing and predicting clean water demand using historical data and machine learning/statistical modeling.
This application is built using:
- Laravel → Main Web System & User Interface
- Flask (Python) → Machine Learning Prediction Service (API)
The system helps analyze water usage patterns and predict future water demand to support data-driven decision making for water management institutions.

## 🧠 System Architecture
This project uses a microservice architecture :

User → Laravel Web App → HTTP Request → Flask API → ML Model → Prediction Result → Laravel → User

**Explanation**

**Laravel handles:**
- data input
- visualization


**Flask handles:**
- machine learning model execution
- regression analysis
- prediction processing
- evaluation (MAPE)

Laravel communicates with Flask via HTTP API (JSON Response).

## 🚀 Main Features

**Data Management**
- Input historical clean water data
- Edit & delete dataset
- Store data in MySQL database

**Statistical Analysis**
- Multiple Linear Regression
- Simple Linear Regression (time forecasting)
- Automatic coefficient calculation (b₀, b₁, b₂)
- R-Square calculation
- t-test & F-test (ANOVA)
- SPSS-like output

**Prediction**
- Predict distribution water (X1)
- Predict water loss (X2)
- Predict clean water demand (Y)
- Machine Learning prediction via Flask API

**Evaluation**
- MAPE (Mean Absolute Percentage Error)
- Prediction accuracy classification

**Visualization**
- Interactive charts (Chart.js)
- Historical vs predicted comparison

## 🧱 Technologies Used

| Component | Technology |
|--------|--------|
| Web Framework | Laravel 10 (PHP) |
| Machine Learning API | Python Flask |
| Database | MySQL |
| Visualization | Chart.js |
| Styling | Bootstrap / Tailwind |
| ML Library | scikit-learn |
| Communication | REST API (JSON HTTP) |
| Runtime Environment | PHP 8+, Python 3.10+ |

## 📁 Project Structure

```text
project-root/
│
├── app/                    # Laravel Controllers & Business Logic
├── routes/                 # Web Routes
├── resources/
│   └── views/              # Blade Templates (UI Pages)
├── database/               # Migrations & Seeders
├── public/                 # CSS, JS, Images, Assets
│
├── python/                 # Flask Machine Learning Service
│   ├── app.py              # Prediction API Endpoint
│   └── requirements.txt    # Python Dependencies
│
└── .env.example            # Environment Configuration Template





