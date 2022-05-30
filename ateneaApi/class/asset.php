<?php
    require('../../config/connection.php');

    class Asset{
        
        private $ass_name;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }

        public function getAssetBasicInformation($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT ass_name FROM maintenance_book
                    INNER JOIN assets ON assets.ass_id = maintenance_book.mai_boo_ass_id
                    WHERE maintenance_book.mai_boo_id =  '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
    }
?>