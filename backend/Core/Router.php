<?php

namespace Core;

use Core\Middleware\Auth;
use Core\Middleware\Guest;
use Core\Middleware\Middleware;
use Core\Response;
use Exception;

class Router
{
    protected array $routes = [];

    public function add($method, $uri, $controller): Router
    {
        $this->routes[] = [
            "uri" => $uri,
            "controller" => $controller,
            'method' => $method,
            'middleware' => null
        ];

        return $this;
    }


    public function get($uri, $controller): Router
    {
        return $this->add('GET', $uri, $controller);
    }

    public function only($key)
    {
        $this->routes[array_key_last($this->routes)]['middleware'] = $key;
    }

    public function post($uri, $controller): Router
    {
        return $this->add('POST', $uri, $controller);
    }

    public function patch($uri, $controller): Router
    {
        return $this->add('PATCH', $uri, $controller);
    }

    public function put($uri, $controller): Router
    {
        return $this->add('PUT', $uri, $controller);
    }

    public function delete($uri, $controller): Router
    {
        return $this->add('DELETE', $uri, $controller);
    }

    protected function abort($code = Response::NOT_FOUND)
    {
        http_response_code($code);

        view("{$code}.php");

        die();
    }

    /**
     * @throws Exception
     */
    public function route($uri, $method)
    {
        foreach ($this->routes as $route) {

            if ($route['uri'] === $uri && $route['method'] === strtoupper($method)) {
                Middleware::resolve($route['middleware']);

                return require base_path("Http/controllers" . $route['controller']);
            }
        }

        $this->abort();
    }
    public function previousRoute()
    {
        return $_SERVER['HTTP_REFERER'];
    }
}
