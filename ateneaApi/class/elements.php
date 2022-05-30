<?php
    
    require('../../config/connection.php');

    class Elements{

        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function getElements($subType,$subModuleId){
            try{
                $stmt = $this->dbConn->prepare("SELECT * FROM maintenance_book_support WHERE mai_boo_sup_type = '".$subType."' AND mai_boo_sup_value like '".$subModuleId."%'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
    }
?>