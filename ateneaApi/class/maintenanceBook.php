<?php

    require('../../config/connection.php');

    class MaintenanceBook{
        private $mai_boo_id;
        private $mai_boo_title;
        private $mai_boo_it;

        private $dbConn = null;

        // Construct and Destruct methode
        public function __construct(){
            $this->mai_boo_title="";
            $this->dbConn = Connection::getConn();
        }

        //Get the Basic Information of the MaintenaceBook
        public function getMaintenanceBooks(){
            try{
                $stmt=$this->dbConn->prepare("SELECT mai_boo_id, mai_boo_title, mai_boo_it FROM maintenance_book WHERE mai_boo_status='1' ");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
               echo($e);
            } 
            
        }

        public function initMaintenanceBookWithTitle($maiBooTitle){
            try{
                $stmt = $this->dbConn->prepare("SELECT mai_boo_id, mai_boo_title, mai_boo_it FROM maintenance_book WHERE mai_boo_status='1' and mai_boo_title like '%".$maiBooTitle."%'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
        public function initMaintenanceBookWithId($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT mai_boo_id, mai_boo_title, mai_boo_it FROM maintenance_book WHERE mai_boo_status='1' and mai_boo_id = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getOwnerBasicInformation($maiBooId){ // Get the name of the Asset and the client associated to de Report
            try{
                $stmt = $this->dbConn->prepare("SELECT clients.cli_commercial_name, assets.ass_name 
                    FROM maintenance_book
                    INNER JOIN assets ON maintenance_book.mai_boo_ass_id = assets.ass_id
                    INNER JOIN clients ON assets.ass_cli_id = clients.cli_id
                    WHERE maintenance_book.mai_boo_id = '".$maiBooId."'
                ");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTitle() {}

    }
?>