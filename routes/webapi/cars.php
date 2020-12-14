<?php

Route::group([
    'prefix' => '/cars',
],function (){
    Route::get('/years','Cars@getAllCarsYearOfMake');
    Route::get('/companies','Cars@getAllCarsCompaniesByYear');
    Route::get('/models','Cars@getAllCarsModel');
    Route::get('/{car_id}','Cars@getCarDetails');
});