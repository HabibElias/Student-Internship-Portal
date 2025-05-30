<?php

namespace Core\Middleware;

class Middleware
{
    const MAP = [
        'guest' => Guest::class,
        'auth' => Auth::class
    ];

    /**
     * @throws \Exception
     */
    public static function resolve($key)
    {
        if (!$key) {
            return;
        }

        $middleware = Middleware::MAP[$key] ?? false;

        if (!$middleware) {
            throw new \Exception("NO MIDDLEWARE ASSOCIATED WITH THAT KEY {$key}");
        }

        (new $middleware)->handle();
    }
}