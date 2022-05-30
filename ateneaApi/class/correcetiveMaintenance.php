<?php
    
    require('../../config/connection.php');

    class CorrectiveMaintenance{

        private $cor_mai_type;
        private $cor_mai_title;
        private $cor_mai_module;
        private $cor_mai_sub_module;
        private $cor_mai_maiBooId;

        private $dbConn = null;
    
        //Constructor and Destructor methodes
        public function __construct(){
            $this->dbConn = Connection::getConn();
        }
        public function __destruct(){
            $this->dbConn = null; 
        }

        public function getCorrectiveMaintenances($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT cor_mai_id, cor_mai_type, cor_ma_title, cor_mai_module, cor_mai_sub_module
                FROM corrective_maintenance
                WHERE cor_mai_maitenance_book_id = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }

        }
        public function createCorrectiveMaintenace(){
            try{
                $stmt=$this->dbConn->prepare("INSERT INTO corrective_maintenance (cor_mai_id, cor_mai_type, cor_ma_title, cor_mai_module, cor_mai_sub_module, cor_mai_maitenance_book_id) 
                VALUES (
                    '',
                    '".$this->cor_mai_type."',
                    '".$this->cor_mai_title."',
                    '".$this->cor_mai_module."',
                    '".$this->cor_mai_sub_module."',
                    '".$this->cor_mai_maiBooId."')");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
            
        }
        public function getCorrectiveMaintenanceId($docNumber, $maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT cor_mai_id FROM `corrective_maintenance`
                WHERE cor_mai_type = '".$docNumber."'  and cor_mai_maitenance_book_id = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo ($e);
            }
        }
        public function getHistorialCorrectiveMaintenace($maiBooId){
            try{
                $stmt = $this->dbConn->prepare("SELECT maintenance_book_support.mai_boo_sup_description AS Element, reg_cor_mai_text_one, reg_cor_mai_price, reg_cor_mai_date_acceptation, reg_cor_mai_propiety
                FROM register_corrective_maintenace
                
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = reg_corr_mai_element
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getTotalExpensesYear($maiBooId){
            try{
                $stmt=$this->dbConn->prepare("SELECT SUM(register_corrective_maintenace.reg_cor_mai_price) AS totalExpense
                FROM register_corrective_maintenace
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '".$maiBooId."'");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }
        public function getTotalExpensesLastMonth($maiBooId){
            try{
                $stmt=$this->dbConn->prepare("SELECT SUM(register_corrective_maintenace.reg_cor_mai_price) AS totalExpense
                FROM register_corrective_maintenace
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '".$maiBooId."' AND 
                    (register_corrective_maintenace.reg_cor_mai_date_acceptation BETWEEN (
                        SELECT DATE_ADD(
                            (SELECT CURRENT_DATE()), INTERVAL -3 MONTH)) AND (SELECT CURRENT_DATE))");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getElementMostProblematic($maiBooId){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(maintenance_book_support.mai_boo_sup_description), maintenance_book_support.mai_boo_sup_description as result
                FROM register_corrective_maintenace
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = register_corrective_maintenace.reg_corr_mai_element
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '".$maiBooId."'
                GROUP BY maintenance_book_support.mai_boo_sup_description LIMIT 1");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function getElementMostCheaper($maiBooId){
            try{
                $stmt=$this->dbConn->prepare("SELECT COUNT(maintenance_book_support.mai_boo_sup_description), maintenance_book_support.mai_boo_sup_description as result
                FROM register_corrective_maintenace
                INNER JOIN maintenance_book_support ON maintenance_book_support.mai_boo_sup_value = register_corrective_maintenace.reg_corr_mai_element
                INNER JOIN corrective_maitenance_registers_assigned ON register_corrective_maintenace.reg_mai_cor_id = corrective_maitenance_registers_assigned.cor_mai_reg_ass_reg_id
                INNER JOIN corrective_maintenance ON corrective_maitenance_registers_assigned.cor_mai_reg_ass_corr_id = corrective_maintenance.cor_mai_id
                WHERE corrective_maintenance.cor_mai_maitenance_book_id = '".$maiBooId."'
                GROUP BY maintenance_book_support.mai_boo_sup_description LIMIT 1");
                $stmt->execute();
                return $stmt;
            }catch(Excemption $e){
                echo($e);
            }
        }

        public function setType($value) { $this->cor_mai_type = $value; }
        public function setTitle($value) { $this->cor_mai_title=$value; }
        public function setModule($value) { $this->cor_mai_module = $value; }
        public function setSubMod($value) { $this->cor_mai_sub_module = $value; }
        public function setMaiBooId($value) { $this->cor_mai_maiBooId = $value; }
       
    }
?>