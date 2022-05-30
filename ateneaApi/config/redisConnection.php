<?php


    class RedisConnection{
        //Conexion a sistema cache (Base de datos no relaicional)
        public static function getRedisConn(){
            try{
                $redis = new Redis(); 
                $redis->connect('127.0.0.1', 6379); 
                return $redis;
            }catch (PDOException $e){
                echo('Connection fail: '.$e->getMessage());
                return false;
            }
        }
    }

?>