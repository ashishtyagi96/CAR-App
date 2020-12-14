<?php


namespace App\Cars;


use App\Transaction\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\WalletUser\Supplier\Supplier;
use App\PlatformUser\PlatformUser;
use App\Transaction\Helper as TransactionsHelper;

class Helper
{

    public static function getAllCarsYearOfMake($year=""){
        try{
            if($year == ""){
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('year_of_make')->distinct('year_of_make')->orderBy('year_of_make','ASC')->get();
            }else{
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('year_of_make')->distinct('year_of_make')->where('year_of_make','like','%'.$year.'%')->orderBy('year_of_make','ASC')->get();
            }
            $year_of_make=[];
            foreach($rows as $row){
                $year_of_make[]=$row->year_of_make;
            }
            return ['years'=>$year_of_make];
        }catch (\Exception $ex){
            Log::error("Get car year of make failed",['error'=>$ex]);
            throw $ex;
        }
    }

    public static function getAllCarsCompaniesByYear($data=[]){
        try{
            if($data['company'] == ""){
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('company')->distinct('company')->where('year_of_make',$data['year_of_make'])->orderBy('company','ASC')->get();
            }else{
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('company')->distinct('company')->where('year_of_make',$data['year_of_make'])->where('company','like','%'.$data['company'].'%')->orderBy('company','ASC')->get();
            }
            $company=[];
            foreach($rows as $row){
                $company[]=$row->company;
            }
            return ['companies'=>$company];
            return $company;
        }catch (\Exception $ex){
            Log::error("Get car companies of make failed",['error'=>$ex]);
            throw $ex;
        }
    }

    public static function getAllCarsModel($data=[]){
        try{
            if($data['model']==''){
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('id','company','year_of_make','is_available','amount','model')->distinct('model')->where(['year_of_make'=>$data['year_of_make'],'company'=>$data['company']])->orderBy('model','ASC')->get();
            }else{
                $rows = DB::table(Cars::DB_TABLE_NAME)->select('id','company','year_of_make','is_available','amount','model')->distinct('model')->where(['year_of_make'=>$data['year_of_make'],'company'=>$data['company']])->where('model','like','%'.$data['model'].'%')->orderBy('model','ASC')->get();
            }
            $cars=[];
            foreach($rows as $row){
                $cars[]=[
                   'id'=>$row->id,
                   'model'=>$row->model,
                   'company'=>$row->company,
                   'year_of_make'=>$row->year_of_make,
                   'is_available'=>$row->is_available,
                   'amount'=>$row->amount
                ];
            }
            return ['cars'=>$cars];
        }catch (\Exception $ex){
            Log::error("Get car model of make failed",['error'=>$ex]);
            throw $ex;
        }
    }
    
    public static function getCarDetails($car_id){
        try{
            $rows = DB::table(Cars::DB_TABLE_NAME)->select('id','company','year_of_make','is_available','amount','model')->where('id',$car_id)->get();
 
            $car_details=[];
            foreach($rows as $row){
                $car_details=[
                    'id'=>$row->id,
                    'model'=>$row->model,
                    'company'=>$row->company,
                    'year_of_make'=>$row->year_of_make,
                    'is_available'=>$row->is_available,
                    'amount'=>$row->amount
                ];
            }
            return ['car_details'=>$car_details];
        }catch (\Exception $ex){
            Log::error("Get car details failed",['error'=>$ex]);
            throw $ex;
        }
    }
}
