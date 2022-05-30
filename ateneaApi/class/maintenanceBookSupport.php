<?php
    
    require('../../config/connection.php');

    class MaintenanceBookSupport{

        private $mai_boo_sup_type;
        private $mai_boo_sup_description;
        private $mai_boo_sup_value;

        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function getSupport($supType){
            try{
                $stmt = $this->dbConn->prepare("SELECT * FROM maintenance_book_support WHERE mai_boo_sup_type = '".$supType."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
    }
?>
