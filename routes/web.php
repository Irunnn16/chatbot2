<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PropspectController;
use App\Http\Controllers\ProspectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LogsController;






Route::get('/', [WelcomeController::class, 'index'])->name('home');
Route::get('/about', [WelcomeController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('documentation', [DashboardController::class, 'documentation'])->name('documentation');

    Route::put('user/bulk', [UserController::class, 'bulkUpdate'])->name('user.bulk.update');
    Route::delete('user/bulk', [UserController::class, 'bulkDelete'])->name('user.bulk.destroy');
    Route::get('user/archived', [UserController::class, 'archived'])->name('user.archived');
    Route::put('user/{user}/restore', [UserController::class, 'restore'])->name('user.restore');
    Route::delete('user/{user}/force-delete', [UserController::class, 'forceDelete'])->name('user.force-delete');
    Route::apiResource('user', UserController::class);

    Route::apiResource('role', RoleController::class);
    Route::apiResource('permission', PermissionController::class);
    Route::apiResource('media', MediaController::class);
    Route::put('article/bulk', [ArticleController::class, 'bulkUpdate'])->name('article.bulk.update');
    Route::delete('article/bulk', [ArticleController::class, 'bulkDelete'])->name('article.bulk.destroy');
    Route::post('article/{article}/upload-media', [ArticleController::class, 'uploadMedia'])->name('article.upload-media');
    Route::apiResource('article', ArticleController::class);
    
    Route::put('prospect/bulk', [ProspectController::class, 'bulkUpdate'])->name('prospect.bulk.update');
    Route::delete('prospect/bulk', [ProspectController::class, 'bulkDelete'])->name('prospect.bulk.destroy');
    Route::apiResource('prospect', ProspectController::class);
    Route::put('category/bulk', [CategoryController::class, 'bulkUpdate'])->name('category.bulk.update');
    Route::delete('category/bulk', [CategoryController::class, 'bulkDelete'])->name('category.bulk.destroy');
    Route::apiResource('category', CategoryController::class);
    Route::put('logs/bulk', [LogsController::class, 'bulkUpdate'])->name('logs.bulk.update');
    Route::delete('logs/bulk', [LogsController::class, 'bulkDelete'])->name('logs.bulk.destroy');
    Route::apiResource('logs', LogsController::class);
    
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
