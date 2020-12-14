<?php


namespace App\Http\Controllers\WebApi;
use App\Http\Controllers\Controller;
use App\Cars\Helper as CarsHelper;
use App\Response;
use App\Fetch\Fetch;
use Illuminate\Support\Facades\Log;

class Cars extends  Controller
{

    public function getAllCarsYearOfMake() {
        $response = new Response();
        try {
            $data = request()->all();
            if(!isset($data['year'])){
                $data['year']="";
            }
            $response_data = CarsHelper::getAllCarsYearOfMake($data['year']);
            $response->setApiData($response_data);

        } catch( \Exception $ex ) {
            $response->setStatusCode(400, false);
            $response->setMessage($ex->getMessage());
            return $response->sendApiResponse();
        }

        return $response->sendApiResponse();

    }

    public function getAllCarsCompaniesByYear() {
        $response = new Response();
        try {
            $data = request()->all();
            if(!isset($data['year_of_make'])){
                throw new \Exception('year of make is required');
            }
            if(!isset($data['company'])){
                $data['company']="";
            }
            $response_data = CarsHelper::getAllCarsCompaniesByYear($data);
            $response->setApiData($response_data);

        } catch( \Exception $ex ) {
            $response->setStatusCode(400, false);
            $response->setMessage($ex->getMessage());
            return $response->sendApiResponse();
        }

        return $response->sendApiResponse();

    }

    public function getAllCarsModel() {
        $response = new Response();
        try {
            $data = request()->all();
            if(!isset($data['year_of_make'])){
                throw new \Exception('year of make is required');
            }
            if(!isset($data['year_of_make'])){
                throw new \Exception('company is required');
            }
            if(!isset($data['model'])){
                $data['model']="";
            }
            $response_data = CarsHelper::getAllCarsModel($data);
            $response->setApiData($response_data);

        } catch( \Exception $ex ) {
            $response->setStatusCode(400, false);
            $response->setMessage($ex->getMessage());
            return $response->sendApiResponse();
        }

        return $response->sendApiResponse();

    }

    public function getCarDetails() {
        $response = new Response();
        try {
            $car_id = request('car_id');
            if(!isset($car_id)){
                throw new \Exception('car_id is required');
            }
            $response_data = CarsHelper::getCarDetails($car_id);
            $response->setApiData($response_data);

        } catch( \Exception $ex ) {
            $response->setStatusCode(400, false);
            $response->setMessage($ex->getMessage());
            return $response->sendApiResponse();
        }

        return $response->sendApiResponse();

    }
    
}
