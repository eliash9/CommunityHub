<?php

return [
    /*
     * This class is responsible for determining which tenant should be
     * the current tenant for the given request.
     */
    'tenant_finder' => \App\Multitenancy\CommunityTenantFinder::class,

    /*
     * These fields are used by tenant:artisan command to match
     * the tenant when the --tenant option is used.
     */
    'tenant_artisan_search_fields' => [
        'id',
        'slug',
    ],

    /*
     * This task will be executed when switching tenants.
     */
    'switch_tenant_tasks' => [
        \Spatie\Multitenancy\Tasks\SwitchTenantDatabaseTask::class,
    ],

    /*
     * This class is responsible for creating a new tenant database.
     */
    'tenant_database_manager' => \Spatie\Multitenancy\Tasks\CreateTenantDatabaseTask::class,

    /*
     * The connection name to reach the tenant database.
     */
    'tenant_database_connection_name' => 'tenant',

    /*
     * The connection name to reach the landlord database.
     */
    'landlord_database_connection_name' => 'landlord',

    /*
     * This key will be used to bind the current tenant in the container.
     */
    'current_tenant_container_key' => 'currentTenant',

    /*
     * You can customize some of the behavior of this package by using your own
     * action classes.
     */
    'actions' => [
        'make_tenant_current_action' => \Spatie\Multitenancy\Actions\MakeTenantCurrentAction::class,
        'forget_current_tenant_action' => \Spatie\Multitenancy\Actions\ForgetCurrentTenantAction::class,
        'make_tenant_current_action_job_chains' => \Spatie\Multitenancy\Actions\MakeTenantCurrentAction::class,
    ],
];
