<?php
    
    require('../../config/connection.php');

    class Event{

        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function getEvent(){
            try{
                $stmt = $this->dbConn->prepare("SELECT eve_title, eve_text ,eve_date, eve_end FROM events");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            } 
        }
    }
?>