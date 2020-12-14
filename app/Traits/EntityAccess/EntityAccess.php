<?php


namespace App\Traits\EntityAccess;

 trait EntityAccess
{

    public function __destruct () {
        unset($this->_data);
    }

    public function __get ($field) {
        if (isset($this->_data->{$field})) {
            return $this->_data->{$field};
        } else {
            return null;
        }
    }

    public function __isSet ($field) {
        if (isset($this->_data->{$field})) {
            return true;
        } else {
            return false;
        }
    }

    public function exists () {
        if (isset($this->_data)) {
            return true;
        }

        return false;
    }

    public function getEntityData(){
        return $this->_data;
    }

}
