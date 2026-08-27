<?php

namespace App\Providers;

use App\Models\Station;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Carbon\Carbon;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        config(['app.locale' => 'id']);
	    Carbon::setLocale('id');

        if (Schema::hasTable('stations')) {
            $stationData = Station::pluck('name', 'id');

            View::share('stationData', $stationData);
        }
    }
}
