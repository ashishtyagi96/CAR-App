<?php


namespace App\Http\Controllers\WebApi;

use App\Http\Controllers\Controller;
use App\Response;
use App\Cars\Cars;
use App\Payments\Payments as TrackPayments;
use Illuminate\Support\Facades\DB;


class Payments extends Controller
{

    public function carPayment(){
        $response = new Response();
        try {
            $data = request()->all();
            if(!isset($data['car_id'])){
                $response->setStatusCode(422,false);
                $response->setMessage("car id is required");
                return $response->sendApiResponse();
            }
            if(!isset($data['email_id'])){
                $response->setStatusCode(422,false);
                $response->setMessage("email id is required");
                return $response->sendApiResponse();
            }
            if(!isset($data['token'])){
                $response->setStatusCode(422,false);
                $response->setMessage("token is required");
                return $response->sendApiResponse();
            }

            $car=new Cars(['id'=>$data['car_id']]);
            if(!$car->exists()){
                throw new \Exception('Car not present');
            }
            $model=$car->getEntityData();
            if(!$model->is_available){
                throw new \Exception('Car not available for Sale');
            }
            $amount = ($model->amount*18)/100;
            DB::beginTransaction();

            $stripe = [
                "secret_key"      => config('services.stripe.secret_key'),
                "publishable_key" => config('services.stripe.publisher_key'),
              ];
              
            \Stripe\Stripe::setApiKey($stripe['secret_key']);
            $customer = \Stripe\Customer::create([
                'email' => $data['email_id'],
                'source'  => $data['token'],
            ]);
          
            $charge = \Stripe\Charge::create([
                'customer' => $customer->id,
                'amount'   => $amount,
                'currency' => 'inr',
            ]);

            $car->update(['is_available'=>0]);
            TrackPayments::create([
                'amount'=>$amount,
                'email'=>$data['email_id'],
                'car_id'=>$data['car_id']
            ]);
            DB::commit();
            $response->setStatusCode(201,'true');
            $response->setMessage("Payment Successful.");

            return $response->sendApiResponse();

        }catch( \Exception $ex ) {
            DB::rollBack();
            $response->setStatusCode(500, false);
            $response->setMessage($ex->getMessage());
            return $response->sendApiResponse();
        }
    }

}
