<?php


namespace App\Payments;


use App\CommonHelper;
use App\Exceptions\ValidationException;
use App\Traits\EntityAccess\EntityAccess;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class Payments
{
    const  DB_TABLE_NAME = "payments";
    use EntityAccess;


    private $_data;

    public function __construct ($array=[],$object = null) {
        if ($object) {
            $this->_data = $object;
        } elseif ($array) {
            $this->_data = $this->getData($array);
        }
    }


    private function getData($array){

        $data = null;
        try {
            $data = DB::table(self::DB_TABLE_NAME)->where([
                [
                    'id',
                    '=',
                    $array['id']
                ]
            ])->first();

        } catch (QueryException $ex) {
            Log::error('F:' . __FILE__ . ' L#:' . __LINE__ . 'get  payments data broke.', [
                'user' => $array['id'],
                'error' => $ex->getMessage(),
            ]);
            throw new \Exception('Something went wrong', 0, $ex);
        }

        return $data;

    }


    public static function create(array $data)
    {

        $validation = Validator::make($data, [
            'amount' => 'required|integer',
            'email' => 'required|string',
            'car_id' => 'required|integer',
        ]);

        if ($validation->fails()) {
            $errors = [];
            foreach ($validation->errors()->all() as $message) {
                $errors[] = $message;
            }
            Log::warning('F:' . __FILE__ . ' L#:' . __LINE__ . ' Invalid payload passed.', [
                'data' => $data,
                'error' => $errors,
            ]);

            throw new ValidationException(implode(', ', $errors), 1);
        }
        $to_insert = $data;

        try {
            DB::beginTransaction();
            $inserted = DB::table(self::DB_TABLE_NAME)->insert($to_insert);
            DB::commit();

        } catch (QueryException $ex) {
            DB::rollBack();
            Log::error('F:' . __FILE__ . ' L#:' . __LINE__ . 'payment create failed', [
                'data' => $data,
                'message' => $ex->getMessage(),
                'trace' => $ex->getTraceAsString(),
            ]);
            throw new \Exception($ex->getMessage(), 1, $ex);
        }

        return true;
    }
    
}
