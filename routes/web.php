<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DatasetController;

Route::get('/', function () {
    return view('layouts.app'); // arahkan ke app.blade.php
});
