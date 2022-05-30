<?php
    require('../../config/connection.php');

    class Client{
        
        private $cli_name;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }

        public function getClientBasicInformation($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT cli_commercial_name FROM assets
                INNER JOIN clients ON clients.cli_id = assets.ass_cli_id
                INNER JOIN maintenance_book ON maintenance_book.mai_boo_ass_id = assets.ass_id
                WHERE maintenance_book.mai_boo_id =  '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
    }
?>