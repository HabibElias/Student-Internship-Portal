<?php

use \Core\Response;

function dd($smt)
{
    echo '<pre>';
    var_dump($smt);
    echo '</pre>';

    die();
}


function authorize($condition, $status = Response::FORBIDDEN)
{
    if (!$condition) {
        abort($status);
    }
}

function abort($code = Response::NOT_FOUND)
{

    http_response_code($code);

    view("{$code}.php");

    die();
}


function urlIs($value): bool
{
    return $_SERVER['REQUEST_URI'] === $value;
}

function base_path($path)
{
    return BASE_PATH . $path;
}

function view($path, $attributes = [])
{
    extract($attributes);

    require base_path("views/{$path}");
}

function redirect($path)
{
    header("location: {$path}");
    die();
}

function old($key, $default = '')
{
    return \Core\Sessions::get('old')[$key] ?? $default;
}