<?php

namespace App\Http\Controllers\WebApi;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class HomeController extends Controller
{
    public function index () {
        return File::get(public_path() . "/build/index.html");
    }

}
