<?php
    require('../../config/connection.php');

    class HistorialCorrectiveMaintenance{
       
        private $cor_mai_id;
        private $cor_mai_element;
        private $cor_mai_moduleId;
        private $cor_mai_text;
        private $cor_mai_price;
        private $cor_mai_propiety;

        private $dbConn = null;

        public function __construct(){
            $this->dbConn = Connection::getConn(); 
        }
        public function __destruct(){
            $this->dbConn = null; 
        }

        public function getHistorialCorrecive(){
            try{
                $stmt=$this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description as Module,  maintenance_book_support.mai_boo_sup_description as SubModule, reg_cor_mai_date_acceptation as Data, reg_cor_mai_price as Preu
                FROM register_corrective_maintenace
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = reg_corr_mai_element
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '1'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function countHistorialCorrective($year){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(`reg_mai_cor_id`) as register
                FROM register_corrective_maintenace
                WHERE  EXTRACT(YEAR from register_corrective_maintenace.reg_cor_mai_date_acceptation) = '".$year."'");
                $stmt->execute();
                return $stmt;

            }catch(Excemption $e){
            echo($e);
            }
        }

        public function createHistorialCorrectiveMaintenance(){
            try{
                $stmt=$this->dbConn->prepare("INSERT INTO `register_corrective_maintenace`(`reg_mai_cor_id`, `reg_corr_mai_element`, `reg_cor_mai_moduleId`, `reg_cor_mai_text_one`, `reg_cor_mai_price`, `reg_cor_mai_propiety`, `reg_cor_mai_date_acceptation`, `reg_cor_mai_date`)
                VALUES (
                    '',
                    '".$this->cor_mai_element."',
                    '".$this->cor_mai_moduleId."',
                    '".$this->cor_mai_text."',
                    '".$this->cor_mai_price."',
                    '".$this->cor_mai_propiety."',
                    (SELECT CURDATE()),
                    (SELECT CURDATE()))");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
            
        }

        public function setElement($value) { $this->cor_mai_element = $value; }
        public function setModuleId($value) { $this->cor_mai_moduleId = $value; }
        public function setText($value) { $this->cor_mai_text = $value; }
        public function setPrice($value) { $this->cor_mai_price = $value; } 
        public function setPropiety($value) { $this->cor_mai_propiety = $value; } 

    }

?>