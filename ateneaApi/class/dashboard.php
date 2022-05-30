<?php
    
    require('../../config/connection.php');

    class Dashboard{

        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }

        public function getTotalExpensesByYear($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT SUM(register_corrective_maintenace.reg_cor_mai_price) AS total, EXTRACT(YEAR from register_corrective_maintenace.reg_cor_mai_date_acceptation) as totalByYear
                FROM register_corrective_maintenace
                GROUP BY totalByYear");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTotalExpensesByModule(){
            try{
                $stmt = $this->dbConn->prepare("SELECT SUM(register_corrective_maintenace.reg_cor_mai_price) AS total, reg_cor_mai_moduleId as Modul
                FROM register_corrective_maintenace
                GROUP BY Modul");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTotalExpensesBySubModule(){
            try{
                $stmt = $this->dbConn->prepare("SELECT SUM(register_corrective_maintenace.reg_cor_mai_price) AS total, `reg_corr_mai_element` as Modul
                FROM register_corrective_maintenace
                GROUP BY Modul");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
    }
?>

