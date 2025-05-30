<?php

namespace Core;

class Sessions
{
    protected const FLASH_KEY = '_flash';

    public static function has($key): bool
    {
        return (bool)static::get($key);
    }

    public static function put($key, $value): void
    {
        $_SESSION[$key] = $value;
    }

    public static function get($key)
    {
        return $_SESSION[static::FLASH_KEY][$key] ?? $_SESSION[$key] ?? "";
    }

    public static function flash($key, $value): void
    {
        $_SESSION[static::FLASH_KEY][$key] = $value;
    }

    public static function unFlash(): void
    {
        unset($_SESSION[static::FLASH_KEY]);
    }

    public static function flush(): void
    {
        $_SESSION = [];
    }

    public static function destroy(): void
    {
        static::flush();

        $params = session_get_cookie_params();
        setcookie('PHPSESSID', '', time() - 3600, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }

}