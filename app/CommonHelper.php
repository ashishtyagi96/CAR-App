<?php

namespace App;


use Illuminate\Support\Str;

class CommonHelper {
    public static function extractAllowedData ($data = [], $allowed = []) {
        $output = [];
        foreach ($allowed as $key) {
            if (isset($data[$key])) {
                $output[$key] = $data[$key];
            }
        }

        return $output;
    }

    public static function objectAssign (&$arr1, array $arr2) {

        foreach ($arr2 as $k => $v) {
            if (isset($arr1[$k])) {
                $arr1[$k] = array_merge($arr1[$k], $arr2[$k]);
            } else {
                $arr1[$k] = $arr2[$k];
            }
        }


    }

    public static function formatData (string $data) {
        return Str::lower(preg_replace('/[#$%^&*()+=\-\[\]\';,.\/{}|":<>?~\\\\]/', " ", $data));
    }



    public static function rppg(){
        $pw = '';
        $c  = 'bcdfghjklmnprstvwz'; // consonants except hard to speak ones
        $v  = 'aeiou';              // vowels
        $a  = $c.$v;                // all

        //use two syllables...
        for($i=0;$i < 2; $i++){
            $pw .= $c[rand(0, strlen($c)-1)];
            $pw .= $v[rand(0, strlen($v)-1)];
            $pw .= $a[rand(0, strlen($a)-1)];
        }
        //... and add a nice number
        $pw .= rand(10,99);

        return ucfirst($pw);
    }
}
