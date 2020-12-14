<?php

namespace App\Auth;

use App\User\User;
use Illuminate\Support\Facades\Log;

class Auth
{

    private static $instance = null;
    private static $api = false;

    private static $permissions = null;

    /**
     * @var null|User
     */
    private static $user = null;


    const LOGIN_PAGE = 'LOGIN';



    const ACCESS_TOKEN_WEB_COOKIE_NAME = 'access_token';

    public static function initialize($access_token = '', $is_api = false)
    {
        self::$api = $is_api;
        self::setUser($access_token);

        self::$instance = new self ();
        return self::$instance;
    }



    /**
     * @return Auth
     */
    public static function getInstance()
    {
        return self::$instance;
    }


    private function __construct()
    {
    }

    private static function setUser($access_token)
    {
        try {
            //set user here accordingly
//            $decoded_token = ApiAccessToken::decodeAccessToken($access_token);
//            self::$user = new User ($decoded_token['user_id']);
//
//            if (!self::$user->isActive()) {
//                self::$user = null;
//            }
        } catch (\Exception $ex) {
            self::$user = null;
        }
    }



    /**
     * @return User
     */
    public function user()
    {
        return self::$user;
    }

    public function check()
    {
        if (!isset(self::$user)) {
            return false;
        }

        return true;
    }



    public function getPermissions()
    {
        if (isset(self::$permissions)) {
            return self::$permissions;
        }


        return self::$permissions;
    }

    public function hasPermission($permission)
    {
        $permissions = $this->getPermissions();

        return in_array($permission, $permissions);
    }
}
