<?php
    require('../../lib/constants.php');

    class Connection{

        //Conexion a la base de datos MYSQL
        public static function getConn(){ 
            try{
                $dbConn = new PDO(DATABASE,DB_USER,DB_PASS);
            }catch (PDOException $e){
               echo('Connection fail: '.$e->getMessage());
            }
            return $dbConn;
        }
    }

?>