<?php

Route::group([
    'prefix' => '/payments',
],function (){
    Route::post('/','Payments@carPayment');
});