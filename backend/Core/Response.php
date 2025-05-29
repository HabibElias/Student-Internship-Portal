<?php

namespace Core;
class Response
{
    public const FORBIDDEN = 403;
    public const NOT_FOUND = 404;
    public const UNAUTHORIZED = 401;
    public const INTERNAL_SERVER_ERROR = 500;
    public const BAD_REQUEST = 400;

    public const METHOD_NOT_ALLOWED = 405;
}
