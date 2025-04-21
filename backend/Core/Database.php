<?php


namespace Core;

use PDO;

class Database
{
    protected $conn;
    protected $stmt;

    public function __construct($config, $username = 'root', $password = '')
    {

        $dsn = 'mysql:' . http_build_query($config, '', ';');

        $this->conn = new PDO($dsn, $username, $password, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    }

    public function prepare($query)
    {

        $this->stmt = $this->conn->prepare($query);

        return $this;
    }

    public function bindParam(string $param, mixed $var, $type = PDO::PARAM_STR)
    {
        $this->stmt->bindParam($param, $var, $type);

        return $this;
    }
    public function execute()
    {
        $this->stmt->execute();
        return $this;
    }
    public function query($query, $params = [])
    {
        $this->stmt = $this->conn->prepare($query);

        $this->stmt->execute($params);

        return $this;
    }

    public function get()
    {
        return $this->stmt->fetchAll();
    }
    public function find()
    {
        return $this->stmt->fetch();
    }
    public function findOrFail()
    {
        $result = $this->find();

        if (!$result) {
            abort();
        }

        return $result;
    }
}
