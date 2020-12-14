<?php


namespace App\Traits\ModelEntityAccess;

trait
ModelEntityAccess
{
    public function __destruct () {
        unset($this->_model);
    }

    public function __get ($field) {
        if (isset($this->_model->{$field})) {
            return $this->_model->{$field};
        } else {
            return null;
        }
    }

    public function __isSet ($field) {
        if (isset($this->_model->{$field})) {
            return true;
        } else {
            return false;
        }
    }

    public function exists () {
        if (isset($this->_model)) {
            return true;
        }

        return false;
    }

    public function getEntityData(){
        return $this->_model;
    }

}
