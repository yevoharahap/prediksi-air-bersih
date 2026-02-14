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
| Visualization | Chart.js  / JavaScript |
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
```

## ⚙️ How to Run This Project
```text
# ================================
# Clean Water Demand Prediction System
# Laravel + Flask Setup Guide
# ================================

# 1. Clone repository
git clone https://github.com/yevoharahap/nama-repository.git
cd nama-repository

# ================================
# 2. LARAVEL SETUP (WEB SYSTEM)
# ================================

# install PHP dependencies
composer install

# create environment file
cp .env.example .env

# generate app key
php artisan key:generate

# IMPORTANT:
# create a MySQL database first (example: clean_water)
# then edit .env and set:
# DB_DATABASE=clean_water
# DB_USERNAME=root
# DB_PASSWORD=

# migrate database
php artisan migrate

# install frontend assets
npm install
npm run build

# run laravel server
php artisan serve


# ================================
# 3. PYTHON FLASK SETUP (ML API)
# ================================

# open new terminal, then:
cd python

# create virtual environment
python -m venv venv

# activate venv (Windows)
venv\Scripts\activate

# (Linux/Mac alternative)
# source venv/bin/activate

# install python libraries
pip install -r requirements.txt

# run flask API
python app.py

# ================================
# ACCESS APPLICATION
# ================================
# Laravel Web App:
# http://127.0.0.1:8000
#
# Flask ML API:
# http://127.0.0.1:5000
#
# NOTE:
# both servers MUST be running
# if prediction page error -> Flask server is not active
```
