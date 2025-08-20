<?php

namespace App\Traits;

use Illuminate\Support\Facades\Config;

trait UsesLandlordConnection
{
    /**
     * Get the connection name for the model.
     *
     * @return string
     */
    public function getConnectionName()
    {
        return Config::get('multitenancy.landlord_database_connection_name');
    }
}