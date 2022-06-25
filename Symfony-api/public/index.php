<?php

use App\Kernel;

require_once dirname(__DIR__) . '/vendor/autoload_runtime.php';

return function (array $context) {
    header('Access-Control-Allow-Origin: http://localhost:8100');
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin, access-control-allow-credentials");
    header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    header("Allow: *");
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method === "OPTIONS") {
        die();
    }
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
