<?php

namespace App\Traits;

use Illuminate\Support\Facades\Config;

trait UsesTenantConnection
{
    /**
     * Get the connection name for the model.
     *
     * @return string
     */
    public function getConnectionName()
    {
        return Config::get('multitenancy.tenant_database_connection_name');
    }
}